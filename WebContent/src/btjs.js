/**
 * @type btjs
 * @author Pablo
 */
var btjs = function() {
	
	//TODO: label-as-badge trick to colored bagdes
	//TODO: context instead of intent
	//TODO: array to know forbidden/mandatory per component/field
	/*
	 * var NEED_LEVEL = [	  	 	
	 *   ["component", "id", "css", "style", "text", "html", "size", "context"
	 *   ["button"   , null, "css", "style", "mandatory", "html", "size", "context"
	 *   ["icon"   , null, "css", "style", "mandatory", "forbidden", "size", "context"
	 *   
	 *   
	 *   ]
	 * 
	 * ]
	 * 
	 * and init to transfor into a nice object 
	 * */
	//TODO: array for property type, based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
	//TODO: array for property values set
	//TODO: automatic verification of need status, type, value set
	//TODO: automatic conversion of properties to classes when possible
	
	var isBlankString = function(str){
		return typeof str === 'undefined' || str === null || (typeof str === 'string' && $.trim(str) === '');
	}
	var isNonNullObject = function(obj){
		return obj !== null && typeof obj === 'object'; 
	}
	
	var validate = {			
		nonEmptyOptions : function(obj ){
			if(typeof obj === 'undefined' || obj === null){
				throw new Error('Options can not be null or undefined');
			}
		},
		nonEmptyProp : function(obj, name){
			if(typeof obj[name] === 'undefined' || obj[name] === null){
				throw new Error('options.' + name + ' can not be null or undefined');
			}
		},
		emptyOrSet: function(obj, name, set){
			if(typeof obj[name] !== 'undefined' && obj[name] !== null){
				for(var i = 0; i < set.length; i++){
					if(set[i] === obj[name]){
						return
					}
				}
				throw new Error('options.' + name + ' should be null or undefined or one of ' + set);
			}
		},
		makeSet: function(obj){
			var props = [];
			for(prop in obj) {
			    if(obj.hasOwnProperty(prop)) {
			        props.push(obj[prop]);
			    }
			}
			return props;
		},
		intent: function(options){			
			this.emptyOrSet(options, 'intent', this.makeSet(btjs.INTENT));
		},
		eitherTextOrHtml: function(text, html){
			if(!isBlankString(text) && !isBlankString(html)){
				throw new Error('You can not use options.text and options.html at the same time');
			}
		},
		empty: function(obj, field){
			if(!isBlankString(obj[field])){
				throw new Error('You can not use options.' + field);
			}
		}
		//TODO: validations should specify the component type
		
	};
	
	var idMaker = {
		counter: 1,	
		pad: function(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		},
		make: function(id){
			if(isBlankString(id)){
				return 'btjs-' + this.pad(this.counter++, 5);
			}
			return id;
		}	
	};
	
	var escapeHtml = function(unsafe) {
	    return unsafe
	    	.replace(/&/g, "&amp;")
	    	.replace(/</g, "&lt;")
	    	.replace(/>/g, "&gt;")
	    	.replace(/"/g, "&quot;")
	    	.replace(/'/g, "&#039;");
	}
	
	var makeIntentClass = function(prefix, intent){
		if(isBlankString(intent)){
			return prefix + '-default';
		}
		return prefix + '-' + intent;
	}
	var makeSizeClass = function(prefix, size){
		if(isBlankString(size)){
			return '';
		}
		switch (size) {
		case btjs.SIZE.LARGE:
			return prefix + '-lg';
		case btjs.SIZE.SMALL:
			return prefix +'-sm';
		case btjs.SIZE.EXTRA_SMALL:
			return prefix +'-xs';
		}

		throw Error('invalid size: ' + size);
	}
	
	var makeInnerHtml = function(text, html){
		if(isBlankString(text) && !isBlankString(html)){
			return html;
		}else if(!isBlankString(text) && isBlankString(html)){
			return escapeHtml(text);
		}
		return '';
	}
	
	
	var newLabel = function(options){
		return newElement(options, {
			validations: function(){
				validate.intent(options);
			},
			createCode: function (id, options){
				var intentClass = makeIntentClass('label', options.intent);
				var innerHtml = makeInnerHtml(options.text, options.html);
				return '<span id = "' + id +'" class="label ' + intentClass + '" >' +
					innerHtml +
				'</span> ';
			}
		});
	}
	var newBadge = function(options){
		return newElement(options, {
			validations: function(){
				validate.intent(options);
			},
			createCode: function (id, options){
				//TODO: hack to create color badges
				var innerHtml = makeInnerHtml(options.text, options.html);
				return '<span id = "' + id +'" class="badge" >' +
				innerHtml +
				'</span> ';
			}
		});
	}
	
	var newButton = function(options){
		return newElement(options, {
			validations: function(){
				validate.intent(options);
				validate.emptyOrSet(options, 'size', [btjs.SIZE.LARGE, btjs.SIZE.SMALL, btjs.SIZE.EXTRA_SMALL]);
			},
			createCode: function (id, options){
				var intentClass = makeIntentClass('btn', options.intent);
				var innerHtml = makeInnerHtml(options.text, options.html);
				var sizeClass = makeSizeClass('btn', options.size);
				var blockLevelClass = options.blockLevel ? 'btn-block' : '';
				var activeClass = options.active ? 'active' : '';
				var enabled = options.disabled ? 'disabled="disabled"': '';
				
				return'<button class="btn btn-' + options.intent + 
						' ' + sizeClass + 
						' ' +  blockLevelClass + 
						' ' +  activeClass + 
						'" type="button" '+ enabled + '>'
						+ innerHtml
						+ '</button>';

			}
		});
	}	
	var newIcon = function(options){
		return newElement(options, {
			validations: function(){
				validate.empty(options, 'text');
				validate.empty(options, 'html');
				validate.empty(options, 'badge');
			},
			createCode: function (id, options){
				if(options.iconSource == null){
					options.iconSource = btjs.ICON_SOURCE.GLYPHICON;
				}
				switch(options.iconSource){
				case btjs.ICON_SOURCE.GLYPHICON: 
					return 	'<span id = "' + id +'" class="glyphicon glyphicon-'
					+ options.iconName + '" aria-hidden="true" ></span>';
				case btjs.ICON_SOURCE.FONT_AWESOME: 
					return 	'<span><i id="' + id +'" class="fa fa-' 
					+ options.iconName + '" aria-hidden="true" ></i></span>';
				case btjs.ICON_SOURCE.IONICONS:  
					return 	'<span><i id="' + id +'" class="ionicons ion-' 
					+ options.iconName + '" aria-hidden="true" ></i></span>';
				case btjs.ICON_SOURCE.MATERIAL:  
					return 	'<span><i id="' + id +'" class="material-icons" aria-hidden="true">' 
					+ options.iconName + '</i></span>';
				}
			}
		});
	}
	
	var newElement = function(options, customProcess){
		var id = idMaker.make(options.id);
		validate.nonEmptyOptions(options);
		validate.eitherTextOrHtml(options.text, options.html);
		
		if(typeof customProcess.validations == 'function'){
			customProcess.validations(options);
		}
		
		var newElementCode = customProcess.createCode(id, options);
		
		var $newElement = $(newElementCode);
		
		function parseIconName(iconString){
			var colonIndex = iconString.indexOf(':');
			if(colonIndex == -1){
				return iconString;
			}
			return iconString.substr(colonIndex + 1);
		}
		function parseIconSource(iconString){
			var colonIndex = iconString.indexOf(':');
			if(colonIndex == -1){
				return btjs.ICON_SOURCE.GLYPHICON;
			}
			return iconString.substr(0, colonIndex);
		}
		
		
		if(!isBlankString(options.icon) || isNonNullObject(options.icon)){
			var iconOptions = typeof options.icon == 'string' ? {
				id : id + '-icon',
				iconSource : parseIconSource(options.icon),
				iconName : parseIconName(options.icon),
			}:options.icon; //TODO: manually copy properties and change ID
			
			$icon = newIcon(iconOptions);
			$newElement.prepend('&nbsp;');
			$newElement.prepend($icon);
		}
		
		if(!isBlankString(options.badge)|| isNonNullObject(options.badge)){
			var badgeOptions = typeof options.badge == 'string' ? {
				id : id + '-badge',
				text : options.badge
			}:options.badge; //TODO: manually copy properties and change ID
			
			$badge = newBadge(badgeOptions);
			$newElement.append('&nbsp;');
			$newElement.append($badge);
		}
		
		if(typeof customProcess.addChildren === 'function'){
			customProcess.addChildren($newElement, id, options);
		}
		
		if(typeof options.tooltip === 'string'){
			$newElement.tooltip({  
			    title: options.tooltip
			});
		}else if(typeof options.tooltip === 'object' && options.tooltip !== null){
			$newElement.tooltip(  
			    options.tooltip
			);
		}		
		
		if(typeof options.popover === 'object' && options.popover !== null){
			$newElement.popover(  
			    options.popover
			);
		}
		
		if (typeof options.listeners === 'object' && options.listeners !== null) {
			for ( var listener in options.listeners) {
				$newElement.on(listener, options.listeners[listener]);
			}
		}		
		
		if(options.id === id){
			var $oldElements = $('#' + id);
			
			if($oldElements.length > 1){
				throw Error('There are more than one elements with id ' + id + '. There should be exaclty one if you want it to be replaced, or none to create the element');
			}else if($oldElements.length == 1){
				var oldClasses = $oldElements.attr("class");
				$newElement.addClass(oldClasses);
				$oldElements.replaceWith($newElement);
			}
		}

		return $newElement;
	}
	

		//TODO:
		// test: mantener las clases originaless
		// test: escapar texto, permitir html y verificar que no vengan juntos
		// test: retener id;
		// test: devolver el objeto creado (jquery wrapped)
		// test: verificar 0 o 1 elemento preexistente

	


	return {
		/**
		 * @memberOf btjs
		 */
		idMaker : idMaker,
		/**
		 * @memberOf btjs
		 */
		validate : validate,
		/**
		 * @memberOf btjs
		 */		
		newLabel:newLabel,
		/**
		 * @memberOf btjs
		 */		
		newBadge:newBadge,
		/**
		 * @memberOf btjs
		 */
		newIcon : newIcon,

		/**
		 * @memberOf btjs
		 */
		newButton : newButton,
		
		/**
		 * @memberOf btjs
		 */
		SIZE : {
			LARGE : 'large',
			SMALL : 'small',
			EXTRA_SMALL : 'extra-small'
		},
		/**
		 * @memberOf btjs
		 */
		INTENT : {
			PRIMARY : 'primary',
			SUCCESS : 'success',
			DEFAULT: 'default',
			INFO : 'info',
			WARNING : 'warning',
			DANGER : 'danger'
		},
		/**
		 * @memberOf btjs
		 */
		VISIBILITY : {
			SHOW : 'show',
			HIDDEN : 'hidden',
			INVISIBLE : 'invisible '
		},
		/**
		 * @memberOf btjs
		 */
		ICON_SOURCE : {
			GLYPHICONS : 'glyphicon',
			FONT_AWESOME : 'fontAwesome',
			IONICONS : 'ionicons',
			MATERIAL: 'material'
		}
	}
}();
