import{ba as a,fa as n,g as s,h as o}from"./chunk-3QPVFU3T.js";var l=(()=>{let t=class t{constructor(i,r){this.socialAuthService=i,this.router=r,this.initializeAuthStateListener()}initializeAuthStateListener(){this.socialAuthService.authState.subscribe(i=>{i&&this.handleLogin(i)})}handleLogin(i){sessionStorage.setItem("loggedInUser",JSON.stringify(i)),this.router.navigate(["home"])}signOut(){sessionStorage.removeItem("loggedInUser"),this.socialAuthService.signOut(),this.router.navigate(["/"])}};t.\u0275fac=function(r){return new(r||t)(o(a),o(n))},t.\u0275prov=s({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();export{l as a};
