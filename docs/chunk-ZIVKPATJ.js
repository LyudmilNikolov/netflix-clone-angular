import{T as a,ca as n,g as s,ga as c,h as e}from"./chunk-LGLQXFXM.js";var g=(()=>{let t=class t{constructor(i,r,h){this.socialAuthService=i,this.router=r,this.location=h,this.initializeAuthStateListener()}initializeAuthStateListener(){this.socialAuthService.authState.subscribe(i=>{i&&this.handleLogin(i)})}handleLogin(i){sessionStorage.setItem("loggedInUser",JSON.stringify(i)),this.router.navigate(["home"])}signOut(){sessionStorage.removeItem("loggedInUser"),this.socialAuthService.signOut(),this.location.back()}};t.\u0275fac=function(r){return new(r||t)(e(n),e(c),e(a))},t.\u0275prov=s({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();export{g as a};