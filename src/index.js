import stagger from "./stagger.vue";

const lib = new function() {
	//animate methods
	this.animate = new function(){
		
		//tween a value
		this.tween = function(time, startVal, endVal, duration, easeType) {
			let val = startVal;
			if (duration && startVal!==endVal) {
				let type = (easeType||'quadratic-inout').replace(/ease/i,"quadratic").replace(/in\-out/i,"inout").split('-');
				const ease = (this.ease[type[1]||'inout']||(()=>{}))[type[0]]||this.ease.inout.quadratic;
				val = ease(time, startVal, endVal-startVal, duration);
			}
			return val;
		}
		
		//easing functions
		this.ease = {
			in:{
				quadratic:(t,b,c,d) => c*(t/=d)*t+b,
				cubic: (t,b,c,d) => c*(t/=d)*t*t+b,
				quartic:(t,b,c,d) => c*(t/=d)*t*t*t+b,
				quintic:(t,b,c,d) => c*(t/=d)*t*t*t*t+b,
				sinusoidal:(t,b,c,d) => -c*Math.cos(t/d*(Math.PI/2))+c+b,
				exponential:(t,b,c,d) => t==0 ? b : c*Math.pow(2,10*(t/d - 1))+b,
				circular:(t,b,c,d) => -c*(Math.sqrt(1-(t/=d)*t)-1)+b
			},
			out:{
				quadratic:(t,b,c,d) => -c*(t/=d)*(t-2)+b,
				cubic:(t,b,c,d) => c*((t=t/d-1)*t*t+1)+b,
				quartic:(t,b,c,d) => -c*((t=t/d-1)*t*t*t-1)+b,
				quintic:(t,b,c,d) => c*((t=t/d-1)*t*t*t*t+1)+b,
				sinusoidal:(t,b,c,d) => c*Math.sin(t/d*(Math.PI/2))+b,
				exponential:(t,b,c,d) => t==d ? b+c : c*(-Math.pow(2,-10*t/d)+1)+b,
				circular:(t,b,c,d) => c*Math.sqrt(1-(t=t/d-1)*t)+b
			},
			inout:{
				linear:(t,b,c,d) => c*t/d+b,
				quadratic:(t,b,c,d) => (t/=d/2)<1 ? c/2*t*t+b : -c/2*((--t)*(t-2)-1)+ b,
				cubic:(t,b,c,d) => (t/=d/2)<1 ? c/2*t*t*t+b : c/2*((t-=2)*t*t+2)+b,
				quartic:(t,b,c,d) => (t/=d/2)<1 ? c/2*t*t*t*t+b : -c/2*((t-=2)*t*t*t-2)+b,
				quintic:(t,b,c,d) => (t/=d/2)<1 ? c/2*t*t*t*t*t+b : c/2*((t-=2)*t*t*t*t+2)+b,
				sinusoidal:(t,b,c,d) => -c/2 * (Math.cos(Math.PI*t/d)-1)+b,
				exponential:(t,b,c,d) => t==0 ? b : t==d ? b+c : (t/=d/2)<1 ? c/2*Math.pow(2,10*(t - 1))+b : c/2*(-Math.pow(2,-10*--t)+2)+b,
				circular:(t,b,c,d) => (t/=d/2)<1 ? -c/2*(Math.sqrt(1-t*t)-1)+b : c/2*(Math.sqrt(1-(t-=2)*t)+1)+ b
			}
		}
	}
	
	//asynchronous reference manager (setTimeout, requestAnimationFrame, and future functionality as needed)
	this.asyncRefs = function() {
		const _T = this;
		const refs = {};
		
		//add a reference
		this.add = function(id, type, obj) {
			_T.cancel(id);
			refs[id] = {
				obj:obj,
				type:type
			}
		}
		
		//cancel a reference
		this.cancel = function(id) {
			let ref = refs[id]; if (ref) {
				if (ref.type==='setTimeout') clearTimeout(ref.obj);
				else if (ref.type==='requestAnimationFrame') cancelAnimationFrame(ref.obj);
				delete refs[id];
			}
		}
	}
}

export default {
	install(Vue) {
		Vue.component("pu-stagger", stagger);
		//create the global plutonium library object and add library methods if not already present
		const PU = Vue.prototype.$PU||(Vue.prototype.$PU = {lib:{}});		
		for (var i in lib) { if (!PU.lib[i]) PU.lib[i] = lib[i]; }
	}
};















