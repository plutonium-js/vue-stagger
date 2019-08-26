# Plutonium [vue.js stagger component]
### About
An advanced Vue.js component that adds staggered CSS transition animations to child elements.
   * Stagger animate child elements / components
   * Define animations with pure CSS transitions
   * Control transitions with a simple 'show' Boolean value
   * Transitions auto reverse when changing the 'show' state while active
   * Perfect for animating drop down menus and lists


### Links

* [Stagger Home](https://plutonium.dev/wp/libraries/vue-stagger)
   * [Documentation](https://plutonium.dev/wp/libraries/vue-stagger/documentation)
   * [API](https://plutonium.dev/wp/libraries/vue-stagger/api)


### Bookmarks
* [Install](#install)
* [Import](#import)
   * [Module](#Module)
   * [CDN Script Tags](#CDN-Script-Tags)
* [Instantiate](#instantiate)
* [Animate](#animate)
* [License](#license)


### <a id="install"></a>Install
```
> npm install @plutonium-js/vue-stagger
```

**[:arrow_up_small:](#bookmarks)**	

### <a id="import" style="color:yellow;"></a>Import

* <a id="Module"></a>**Module**
   
   Using ES6...
   ```javascript
   import stagger from '@plutonium-js/vue-stagger';
   Vue.use(stagger);
   ```
  Using CommonJS...
   ```javascript
   const stagger = require('@plutonium-js/vue-stagger').default;
   Vue.use(stagger);
   ```
    
* <a id="CDN-Script-Tags"></a>**CDN Script Tag**
   
    Add the component directly to a web page.
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@plutonium-js/vue-stagger@1/dist/bundle.umd.js"></script>
   <script>
      Vue.use(window.puStagger);
   </script>
   ```
   
**[:arrow_up_small:](#bookmarks)**	
   
### <a id="instantiate"></a>Instantiate
Create new stagger instances by adding the <strong>&lt;pu-stagger/&gt;</strong> tag to your HTML.  All child elements and components will be animated based on your transition styles and stagger properties.
```html
<div id="app">
   <pu-stagger
      id = "myStagger"
      tag = "div"
      :show = "show"
      :interval = "0"
      :duration = ".5"
      :reverse = "true"
      ease-type = "linear"
   >
      <div>my child element 1</div>
      <div>my child element 2</div>
      <div>my child element 3</div>
   </pu-stagger>
</div>
```
Stagger tag property options...
   * <strong>id</strong> - A custom attribute that is inherited, Stagger inherits all custom attributes.
   * <strong>tag</strong>: [string] - The tag name to use for your root stagger component element (default is 'DIV').
   * <strong>show</strong>: [bool] - when changed, staggered animation transitions start.
   * <strong>interval</strong>: [float] - This is the stagger interval (time between starting staggered transition animations).
   * <strong>duration</strong>: [float] - If defined, the interval is set to the duration divided by the child item count.
   * <strong>reverse</strong>: [bool] - This reverses the stagger direction. (e.g... when true the show transitions start at the last child element vs. the first)
   * <strong>ease-type</strong>: [string] - The stagger timing ease type ['linear', 'ease', 'quadratic', 'cubic', 'quartic', 'quintic', 'sinusoidal', 'exponential', 'circular']. Specify direction by appending '-in', '-out', or '-inout' to the name (e.g. 'ease-in').
  
   


**[:arrow_up_small:](#bookmarks)**	

### <a id="animate"></a>Animate
Animating Stagger instances requires CSS transitions to exist on the components child elements. Transitions are then triggered by a change in the Boolean 'show' property value.

Add CSS transitions that target Stagger child elements as shown below...

```html
<style>
   #myStagger>.item {
      transition: all 1s ease;
   }
   #myStagger>.item-from {
      transform:rotate(0deg);
      opacity: 0;
   }
   #myStagger>.item-to {
      transform:rotate(360deg);
      opacity: 1;
   }
</style>
```
Stagger conditionally adds the following class names...
   * '<strong>item</strong>' - Applied to all child elements.
   * '<strong>item-to</strong>' - Applied to all child elements when show is true (applied on a stagger).
   * '<strong>item-from</strong>' - Applied to all child elements when show is false (applied on a stagger).
   * '<strong>to-ended</strong>' - Applied to the root stagger element when all 'to' transitions have ended.
   * '<strong>from-ended</strong>' - Applied to the root stagger element when all 'from' transitions have ended.
   * '<strong>active</strong>' - Applied when animated and only removed when all 'from' transitions end.
   
Trigger Stagger transitions by changing the 'show' property...

```html
<script>
	new Vue({
	   el: '#app',
	   data:{
		  show:false
	   },
	   mounted() {
		  //animate when mounted with a 1 second delay
		  this.show = !this.show;
	   }
	});
</script>
```
The following shows the code required to create a simple stagger transition...
```html
<style>
   #myStagger>.item {
      transition: all 1s ease;
   }
   #myStagger>.item-from {
      transform:rotate(0deg);
      opacity: 0;
   }
   #myStagger>.item-to {
      transform:rotate(360deg);
      opacity: 1;
   }
</style>

<div id="app">
   <pu-stagger
      id = "myStagger"
      tag = "div"
      :show = "show"
      :interval = "0"
      :duration = ".5"
      :reverse = "true"
      ease-type = "linear"
   >
      <div>my child element 1</div>
      <div>my child element 2</div>
      <div>my child element 3</div>
   </pu-stagger>
</div>

<script>
	new Vue({
	   el: '#app',
	   data:{
		  show:false
	   },
	   mounted() {
		  //animate when mounted with a 1 second delay
		  this.show = !this.show;
	   }
	});
</script>
```

**[:arrow_up_small:](#bookmarks)**	

### <a id="license"></a>License

Released under the [MIT license](LICENSE.md)

Author: Jesse Dalessio / [Plutonium.dev](https://plutonium.dev)

**[:arrow_up_small:](#bookmarks)**