/**
 * @type btjs
 * @author Pablo
 */
var btjs = function() {
	
	var NEED_LEVEL = {
		icon :{
			id: 'optional',
			cssClass: 'optional',
			cssStyle: 'optional',
			size: 'forbidden',
			iconSource: 'optional',
			iconName: 'mandatory',
			icon: 'forbidden',
			badge: 'forbidden',
			blockLevel: 'forbidden',
			tooltip: 'optional',
			popover: 'optional',
			text: 'forbidden',
			html: 'forbidden',
			intent: 'forbidden',
			size: 'forbidden',
			listeners: 'optional',
			items: 'forbidden'
		},
		badge :{
			id: 'optional',
			cssClass: 'optional',
			cssStyle: 'optional',
			size: 'forbidden',
			iconSource: 'forbidden',
			iconName: 'forbidden',
			icon: 'optional',
			badge: 'forbidden',
			blockLevel: 'forbidden',			
			tooltip: 'optional',
			popover: 'optional',
			text: 'optional',
			html: 'optional',
			intent: 'forbidden',
			listeners: 'optional',
			items: 'forbidden'
		},
		label :{
			id: 'optional',
			cssClass: 'optional',
			cssStyle: 'optional',
			size: 'optional',
			iconSource: 'forbidden',
			iconName: 'forbidden',
			icon: 'optional',
			badge: 'optional',
			blockLevel: 'optional',			
			tooltip: 'optional',
			popover: 'optional',
			text: 'optional',
			html: 'optional',
			intent: 'optional',
			listeners: 'optional',
			items: 'forbidden'
		},
		button :{
			id: 'optional',
			cssClass: 'optional',
			cssStyle: 'optional',
			size: 'optional',
			iconSource: 'forbidden',
			iconName: 'forbidden',
			icon: 'optional',
			badge: 'optional',
			blockLevel: 'optional',			
			tooltip: 'optional',
			popover: 'optional',
			text: 'optional',
			html: 'optional',
			intent: 'optional',
			listeners: 'optional',
			items: 'forbidden'
		}
		
			
	}
	
	var VALID_TYPES = {
		id: ['string'],
		cssClass: ['string'],
		cssStyle: ['string'],
		size: ['string'],
		iconSource: ['string'],
		iconName: ['string'],
		icon: ['string', 'object'],
		badge: ['string', 'object', 'boolean', 'number'],
		blockLevel: ['boolean'],
		tooltip: ['string', 'object'],
		popover: ['string', 'object'],
		text: ['string', 'object', 'boolean', 'number'],
		html: ['string'],
		intent: ['string'],
		listeners: ['object'],
		items: ['array']
	}
	
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
	
	var toType = function(obj) {
		/* from https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/ */
		  return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	};
	
	var isBlankString = function(str){
		return typeof str === 'undefined' || str === null || (typeof str === 'string' && $.trim(str) === '');
	}
	var isNonNullObject = function(obj){
		return obj !== null && typeof obj === 'object'; 
	}
	
	var validate = {			
		nonEmptyOptions : function(component, options ){
			if(typeof options === 'undefined' || options === null){
				throw new Error('Error trying to create ' + component + '. Options can not be null or undefined');
			}
		},
		eitherTextOrHtml: function(component, options){
			if(!isBlankString(options.text) && !isBlankString(options.html)){
				throw new Error('Error trying to create ' + component + ' with options: ' + JSON.stringify(options) + '. You can not use options.text and options.html at the same time');
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
			component: 'label',
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
			component: 'badge',
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
			component: 'button',
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
			component: 'icon',
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
	
	var newElement = function(rawOptions, customProcess){
		automaticValidations(rawOptions, customProcess.component);
		
		var id = idMaker.make(rawOptions.id);
		
		
		
		if(typeof customProcess.validations == 'function'){
			customProcess.validations(rawOptions);
		}
		
		var newElementCode = customProcess.createCode(id, rawOptions);
		
		var $newElement = $(newElementCode);
		
		function parseIconName(iconString){
			var slashIndex = iconString.indexOf('/');
			if(slashIndex == -1){
				return iconString;
			}
			return iconString.substr(slashIndex + 1);
		}
		function parseIconSource(iconString){
			var slashIndex = iconString.indexOf(':');
			if(slashIndex == -1){
				return btjs.ICON_SOURCE.GLYPHICON;
			}
			return iconString.substr(0, slashIndex);
		}
		
		
		if(!isBlankString(rawOptions.icon) || isNonNullObject(rawOptions.icon)){
			var iconOptions = typeof rawOptions.icon == 'string' ? {
				id : id + '-icon',
				iconSource : parseIconSource(rawOptions.icon),
				iconName : parseIconName(rawOptions.icon),
			}:rawOptions.icon; //TODO: manually copy properties and change ID
			
			$icon = newIcon(iconOptions);
			$newElement.prepend('&nbsp;');
			$newElement.prepend($icon);
		}
		
		if(!isBlankString(rawOptions.badge)|| isNonNullObject(rawOptions.badge)){
			var badgeOptions = typeof rawOptions.badge == 'string' ? {
				id : id + '-badge',
				text : rawOptions.badge
			}:rawOptions.badge; //TODO: manually copy properties and change ID
			
			$badge = newBadge(badgeOptions);
			$newElement.append('&nbsp;');
			$newElement.append($badge);
		}
		
		if(typeof customProcess.addChildren === 'function'){
			customProcess.addChildren($newElement, id, rawOptions);
		}
		
		if(typeof rawOptions.tooltip === 'string'){
			$newElement.tooltip({  
			    title: rawOptions.tooltip
			});
		}else if(typeof rawOptions.tooltip === 'object' && rawOptions.tooltip !== null){
			$newElement.tooltip(  
			    rawOptions.tooltip
			);
		}		
		
		if(typeof rawOptions.popover === 'object' && rawOptions.popover !== null){
			$newElement.popover(  
			    rawOptions.popover
			);
		}
		
		if (typeof rawOptions.listeners === 'object' && rawOptions.listeners !== null) {
			for ( var listener in rawOptions.listeners) {
				$newElement.on(listener, rawOptions.listeners[listener]);
			}
		}		
		
		if(rawOptions.id === id){
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
	
	var automaticValidations = function(rawOptions, component){
		validate.nonEmptyOptions(component, rawOptions);
		validateNeed(rawOptions, component);
		validateTypes(rawOptions, component);
		validateStringSets(rawOptions, component);
		validate.eitherTextOrHtml(component, rawOptions);
	}
	
	var validateNeed = function(rawOptions, component){
		var needLevelPerProp = NEED_LEVEL[component];
		for(var prop in needLevelPerProp){
			if(needLevelPerProp.hasOwnProperty(prop)){
				var needLevel = needLevelPerProp[prop];
				var actualValue = rawOptions[prop];
				if(needLevel === 'forbidden' && typeof actualValue !== 'undefined' && actualValue !== null){
					throw new Error('Error trying to create ' + component + ' with options: ' + JSON.stringify(rawOptions) + '. Property options.' + prop + " = " + actualValue + ' and should be null or undefined');
				}
				if(needLevel === 'mandatory' && (typeof actualValue === 'undefined' || actualValue === null)){
					throw new Error('Error trying to create ' + component + ' with options: ' + JSON.stringify(rawOptions) + '. Property options.' + prop + ' is null or undefined and should have an actual value');
				}
			}
		}
	}
	var validateTypes = function(rawOptions, component){
		var needLevelPerProp = NEED_LEVEL[component];
		for(var prop in VALID_TYPES){
			if(VALID_TYPES.hasOwnProperty(prop)){
				var validTypes = VALID_TYPES[prop];
				var actualType = toType(rawOptions[prop]);
				if(actualType !== 'undefined' && actualType !== 'null' && validTypes.indexOf(actualType) == -1){
					throw new Error('Error trying to create ' + component + ' with options: ' + JSON.stringify(rawOptions) + '. Property options.' + prop + " has type " + actualType + ' and should be one of ' + validTypes);
				}
			}
		}
	}
	var validateStringSets = function(rawOptions, component){
		var needLevelPerProp = NEED_LEVEL[component];
		for(var prop in needLevelPerProp){
			if(needLevelPerProp.hasOwnProperty(prop)){
				var needLevel = needLevelPerProp[prop];
				var actualValue = rawOptions[prop];
				if(needLevel === 'forbidden' && typeof actualValue !== 'undefined' && actualValue !== null){
					throw new Error('Error trying to create ' + component + ' with options: ' + JSON.stringify(options) + '. Property options.' + prop + " = " + actualValue, ' and should be null or undefined');
				}
				if(needLevel === 'mandatory' && (typeof actualValue === 'undefined' || actualValue === null)){
					throw new Error('Error trying to create ' + component + ' with options: ' + JSON.stringify(options) + '. Property options.' + prop + ' is null or undefined and should have an actual value');
				}
			}
		}
	}
	

		//TODO:
		// test: mantener las clases originales
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
