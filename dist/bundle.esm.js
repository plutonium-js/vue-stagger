//
//
//
//
//
//
//
//
//
//

var script = {
	props: {
		tag: String,
		show: Boolean,
		reverse: Boolean,
		interval: {
			type:[String, Number],
			default:0
		},
		duration: {
			type:[String, Number],
			default:0
		},
		animateOnMount: {
			type: Boolean,
			default: true
		},
		easeType: {
			type: String,
			default: 'linear'
		}
	},
	created() {
		const lib = this.$PU.lib;
		this.PUD = {
			asyncRefs:new lib.asyncRefs()
		};
		this.addSlotKeys();
	},
	mounted() {
		this.$slots.default.forEach(item => {
			item.elm.classList.add("item", this.show?"item-to":"item-from");
			item.elm.addEventListener("transitionend", this.handleAnimationEnd);
		});
	},
	beforeDestroy() {
		["animateDelay","updateAnimation"].forEach(item => {this.PUD.asyncRefs.cancel(item);});
		this.$slots.default.forEach(item => {
			item.elm.removeEventListener("transitionend", this.handleAnimationEnd);
		});
	},
	beforeUpdate() {
		this.addSlotKeys();
	},
	updated() {
		if (this.PUD.curIndex===undefined) this.PUD.curIndex = this.show==this.reverse?this.$slots.default.length-1:0;
		this.$el.classList.remove("to-ended", "from-ended");
		this.$el.classList.add("active");
		this.PUD.asyncRefs.add("updateAnimation", "requestAnimationFrame", requestAnimationFrame(() => {
			//note: force reflow so that transitions apply
			this.$el.offsetWidth;
			this.animate();
		}));
	},
	methods: {
		//add unique keys to the slot children (vue requires a unique key when the slot is the descendant of a transition-group)
		addSlotKeys() {
			this.$slots.default.forEach((item, index) => {
				item.key = item.key!=null?item.key:index;
			});
		},
		//animate the slot children
		animate() {
			const _T = this;
			const lib = this.$PU.lib;
			const slots = [...this.$slots.default];
			const slotLen = slots.length;
			_animate(this.PUD.curIndex); function _animate(index) {
				_T.PUD.curIndex = index;
				const item = slots[index];
				item.elm.classList.remove("item-"+(_T.show?'from':'to'));
				item.elm.classList.add("item-"+(_T.show?'to':'from'));
				const nextIndex = index+((_T.show?1:-1)*(_T.reverse?-1:1));
				let interval = _T.duration?(parseFloat(_T.duration)*1000)/slots.length:parseFloat(_T.interval)*1000;
				if (_T.easeType!='linear') {
					const nextInRangeIndex = Math.min(Math.max(nextIndex, 0), slotLen-1);
					const pos = lib.animate.tween(index, 0, 1, slotLen-1, _T.easeType);
					const nextPos = lib.animate.tween(nextInRangeIndex, 0, 1, slotLen-1, _T.easeType);
					interval = Math.abs(pos-nextPos)*(slotLen*interval);
				}
				if (nextIndex>=0 && nextIndex<slotLen) _T.PUD.asyncRefs.add("animateDelay", "setTimeout", setTimeout(() => {
					_animate(nextIndex);
				}, interval));
			}
		},
		//handle animation end
		handleAnimationEnd(e) {
			const slots = this.$slots.default;
			if ((this.PUD.curIndex===(this.show&&!this.reverse?slots.length-1:0)) && e.target===slots[this.show?slots.length-1:0].elm) {
				this.$el.classList.remove((this.show?'from':'to')+"-ended");
				this.$el.classList.add((this.show?'to':'from')+"-ended");
				if (!this.show) this.$el.classList.remove('active');
			}
		}
	}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "transition-group",
    _vm._g({ attrs: { tag: _vm.tag || "div", css: false } }, _vm.$listeners),
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stagger = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

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
		};
		
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
		};
	};
	
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
			};
		};
		
		//cancel a reference
		this.cancel = function(id) {
			let ref = refs[id]; if (ref) {
				if (ref.type==='setTimeout') clearTimeout(ref.obj);
				else if (ref.type==='requestAnimationFrame') cancelAnimationFrame(ref.obj);
				delete refs[id];
			}
		};
	};
};

var index = {
	install(Vue) {
		Vue.component("pu-stagger", stagger);
		//create the global plutonium library object and add library methods if not already present
		const PU = Vue.prototype.$PU||(Vue.prototype.$PU = {lib:{}});		
		for (var i in lib) { if (!PU.lib[i]) PU.lib[i] = lib[i]; }
	}
};

export default index;
