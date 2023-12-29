/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
//signal-property.helper.ts
import { signal, Signal } from '@angular/core';

const cacheMap = Symbol('Cached values');

function getObservableMap<T extends Object, K extends keyof T>(
    obj: T
): Map<K, Signal<T[K]>> {
    // upsert the cacheMap
    return ((obj as any)[cacheMap] =
        (obj as any)[cacheMap] ?? new Map<any, any>());
}

function isUsingAccessor<T extends Object, K extends keyof T>(
    obj: T,
    variable: K
): boolean {
    // the prototype of the object (and not the own property) is holding information about the object getters at the time of the construction
    const prototypeOfObject = Object.getPrototypeOf(obj);
    const descriptorOfPrototype = Object.getOwnPropertyDescriptor(
        prototypeOfObject,
        variable
    );
    return (
        !!descriptorOfPrototype &&
        ('get' in descriptorOfPrototype || 'set' in descriptorOfPrototype)
    );
}

function checkIsNotAccessor<T extends Object, K extends keyof T>(
    obj: T,
    variable: K
): void {
    if (isUsingAccessor(obj, variable)) {
        throw new Error('Listening value accessors is not supported');
    }
}

function createSignalProperty<T extends Object, K extends keyof T>(
    obj: T,
    variable: K
): Signal<T[K]> {
    const defaultDescriptor: PropertyDescriptor =
        Object.getOwnPropertyDescriptor(obj, variable) ??
        defaultPropertyDescriptor();
    const aSignal = signal<T[K]>(undefined as any);

    checkIsNotAccessor(obj, variable);

    const { enumerable, configurable } = defaultDescriptor;
    const descriptor: PropertyDescriptor = {
        configurable,
        enumerable,
        get: () => defaultDescriptor.value,
        set: (nextValue) => {
            defaultDescriptor.value = nextValue;
            aSignal.set(nextValue);
        },
    };

    const isValueAlreadyDeclared = 'value' in defaultDescriptor;
    if (isValueAlreadyDeclared) {
        aSignal.set(defaultDescriptor.value);
    }

    Object.defineProperty(obj, variable, descriptor);

    return aSignal.asReadonly();
}

function defaultPropertyDescriptor(): PropertyDescriptor {
    return {
        configurable: true,
        enumerable: true,
        writable: true,
    };
}

export function asSignal<T extends Object, K extends keyof T>(
    obj: T,
    property: K
): Signal<T[K]> {
    const map = getObservableMap(obj);

    if (!map.has(property)) {
        map.set(property, createSignalProperty(obj, property));
    }
    // casting is mandatory
    return map.get(property)! as Signal<T[K]>;
}