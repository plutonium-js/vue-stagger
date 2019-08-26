<style></style>

<template>
	<transition-group
		:tag = "tag||'div'"
		v-on = "$listeners"
		:css = "false"
	><slot/></transition-group>
</template>

<script>
	export default {
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
			}
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
			if (this.PUD.curIndex===undefined) this.PUD.curIndex = this.show==this.reverse?this.$slots.default.length-1:0
			this.$el.classList.remove("to-ended", "from-ended");
			this.$el.classList.add("active");
			this.PUD.asyncRefs.add("updateAnimation", "requestAnimationFrame", requestAnimationFrame(() => {
				//note: force reflow so that transitions apply
				this.$el.offsetWidth;
				this.animate()
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
	}
</script>























