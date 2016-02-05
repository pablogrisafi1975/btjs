/**
 * @type btjs
 * @author Pablo
 */
var btjs = function() {
	
	//TODO: separar en partes y compilar de alguna manera... grunt

	var NEED_LEVEL = {
		icon : {
			id : 'optional',
			cssClass : 'optional',
			cssStyle : 'optional',
			size : 'forbidden',
			iconSource : 'optional',
			iconName : 'mandatory',
			icon : 'forbidden',
			badge : 'forbidden',
			blockLevel : 'forbidden',
			tooltip : 'optional',
			popover : 'optional',
			text : 'forbidden',
			html : 'forbidden',
			intent : 'forbidden',
			size : 'forbidden',
			listeners : 'optional',
			visibility : 'optional',
			items : 'forbidden'
		},
		badge : {
			id : 'optional',
			cssClass : 'optional',
			cssStyle : 'optional',
			size : 'forbidden',
			iconSource : 'forbidden',
			iconName : 'forbidden',
			icon : 'optional',
			badge : 'forbidden',
			blockLevel : 'forbidden',
			tooltip : 'optional',
			popover : 'optional',
			text : 'optional',
			html : 'optional',
			intent : 'forbidden',
			listeners : 'optional',
			visibility : 'optional',
			items : 'forbidden'
		},
		label : {
			id : 'optional',
			cssClass : 'optional',
			cssStyle : 'optional',
			size : 'optional',
			iconSource : 'forbidden',
			iconName : 'forbidden',
			icon : 'optional',
			badge : 'optional',
			blockLevel : 'optional',
			tooltip : 'optional',
			popover : 'optional',
			text : 'optional',
			html : 'optional',
			intent : 'optional',
			listeners : 'optional',
			visibility : 'optional',
			items : 'forbidden'
		},
		button : {
			id : 'optional',
			cssClass : 'optional',
			cssStyle : 'optional',
			size : 'optional',
			iconSource : 'forbidden',
			iconName : 'forbidden',
			icon : 'optional',
			badge : 'optional',
			blockLevel : 'optional',
			tooltip : 'optional',
			popover : 'optional',
			text : 'optional',
			html : 'optional',
			intent : 'optional',
			listeners : 'optional',
			visibility : 'optional',
			items : 'forbidden'
		},
		dropdown : {
			id : 'optional',
			cssClass : 'optional',
			cssStyle : 'optional',
			size : 'optional',
			iconSource : 'forbidden',
			iconName : 'forbidden',
			icon : 'optional',
			badge : 'optional',
			blockLevel : 'optional',
			tooltip : 'optional',
			popover : 'optional',
			text : 'optional',
			html : 'optional',
			intent : 'optional',
			listeners : 'optional',
			visibility : 'optional',
			items : 'optional'
		},
		'dropdown-item' : {
			id : 'optional',
			cssClass : 'optional',
			cssStyle : 'optional',
			size : 'forbidden',
			iconSource : 'forbidden',
			iconName : 'forbidden',
			icon : 'optional',
			badge : 'optional',
			blockLevel : 'forbidden',
			tooltip : 'optional',
			popover : 'forbidden',
			text : 'optional',
			html : 'optional',
			intent : 'forbidden',
			listeners : 'optional',
			visibility : 'forbidden',
			items : 'forbidden'
		},
		'dropdown-header' : {
			id : 'optional',
			cssClass : 'optional',
			cssStyle : 'optional',
			size : 'forbidden',
			iconSource : 'forbidden',
			iconName : 'forbidden',
			icon : 'optional',
			badge : 'optional',
			blockLevel : 'forbidden',
			tooltip : 'optional',
			popover : 'forbidden',
			text : 'optional',
			html : 'optional',
			intent : 'forbidden',
			listeners : 'optional',
			visibility : 'forbidden',
			items : 'forbidden'
		},
		'dropdown-divider' : {
			id : 'optional',
			cssClass : 'optional',
			cssStyle : 'optional',
			size : 'forbidden',
			iconSource : 'forbidden',
			iconName : 'forbidden',
			icon : 'forbidden',
			badge : 'forbidden',
			blockLevel : 'forbidden',
			tooltip : 'forbidden',
			popover : 'forbidden',
			text : 'forbidden',
			html : 'forbidden',
			intent : 'forbidden',
			listeners : 'forbidden',
			visibility : 'forbidden',
			items : 'forbidden'
		}

	}

	var VALID_TYPES = {
		id : [ 'string' ],
		cssClass : [ 'string' ],
		cssStyle : [ 'string' ],
		size : [ 'string' ],
		iconSource : [ 'string' ],
		iconName : [ 'string' ],
		icon : [ 'string', 'object' ],
		badge : [ 'string', 'object', 'boolean', 'number' ],
		blockLevel : [ 'boolean' ],
		tooltip : [ 'string', 'object' ],
		popover : [ 'string', 'object' ],
		text : [ 'string', 'object', 'boolean', 'number' ],
		html : [ 'string' ],
		intent : [ 'string' ],
		listeners : [ 'object' ],
		visibility : [ 'string' ],
		items : [ 'array' ]
	}

	var stringSet = function(component, field) {
		switch (field) {
		case 'size':
			if (component === 'button' || component === 'label') {
				return [ btjs.SIZE.LARGE, btjs.SIZE.SMALL,
						btjs.SIZE.EXTRA_SMALL ];
			} else {
				return [ btjs.SIZE.LARGE, btjs.SIZE.SMALL ];
			}
		case 'visibility':
			return [ btjs.VISIBILITY.SHOW, btjs.VISIBILITY.HIDDEN,
					btjs.VISIBILITY.INVISIBLE ]

		case 'iconSource':
			return [ btjs.ICON_SOURCE.GLYPHICONS,
					btjs.ICON_SOURCE.FONT_AWESOME, btjs.ICON_SOURCE.IONICONS,
					btjs.ICON_SOURCE.MATERIAL ]
		case 'intent':
			if (component === 'button') {
				return [ btjs.INTENT.PRIMARY, btjs.INTENT.SUCCESS,
						btjs.INTENT.DEFAULT, btjs.INTENT.INFO,
						btjs.INTENT.WARNING, btjs.INTENT.DANGER,
						btjs.INTENT.LINK ];
			}
			return [ btjs.INTENT.PRIMARY, btjs.INTENT.SUCCESS,
					btjs.INTENT.DEFAULT, btjs.INTENT.INFO, btjs.INTENT.WARNING,
					btjs.INTENT.DANGER ];
		}

	}

	// TODO: label-as-badge trick to colored bagdes
	// TODO: context instead of intent
	// TODO: array to know forbidden/mandatory per component/field
	/*
	 * var NEED_LEVEL = [ ["component", "id", "css", "style", "text", "html",
	 * "size", "context" ["button" , null, "css", "style", "mandatory", "html",
	 * "size", "context" ["icon" , null, "css", "style", "mandatory",
	 * "forbidden", "size", "context"
	 *  ] ]
	 * 
	 * and init to transfor into a nice object
	 */
	// TODO: array for property type, based on
	// https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
	// TODO: array for property values set
	// TODO: automatic verification of need status, type, value set
	// TODO: automatic conversion of properties to classes when possible
	var toType = function(obj) {
		/*
		 * from
		 * https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
		 */
		return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
				.toLowerCase()
	};

	var isBlankString = function(str) {
		return typeof str === 'undefined' || str === null
				|| (typeof str === 'string' && $.trim(str) === '');
	}
	var isNonNullObject = function(obj) {
		return obj !== null && typeof obj === 'object';
	}

	var validate = {
		throwError : function(component, rawOptions, details) {
			var base = 'Error trying to create ' + component
					+ ' with options: ' + JSON.stringify(rawOptions) + '. ';
			throw new Error(base + details);
		},
		nonEmptyOptions : function(component, rawOptions) {
			if (typeof rawOptions === 'undefined' || rawOptions === null) {
				this.throwError(component, rawOptions,
						'Options can not be null or undefined');
			}
		},
		eitherTextOrHtml : function(component, rawOptions) {
			if (!isBlankString(rawOptions.text)
					&& !isBlankString(rawOptions.html)) {
				this
						.throwError(component, rawOptions,
								'You can not use options.text and options.html at the same time');
			}
		},
		need : function(component, rawOptions) {
			var needLevelPerProp = NEED_LEVEL[component];
			for ( var prop in needLevelPerProp) {
				if (needLevelPerProp.hasOwnProperty(prop)) {
					var needLevel = needLevelPerProp[prop];
					var actualValue = rawOptions[prop];
					if (needLevel === 'forbidden'
							&& typeof actualValue !== 'undefined'
							&& actualValue !== null) {
						this.throwError(component, rawOptions,
								'Property options.' + prop + " = "
										+ actualValue
										+ ' and should be null or undefined');
					}
					if (needLevel === 'mandatory'
							&& (typeof actualValue === 'undefined' || actualValue === null)) {
						this
								.throwError(
										component,
										rawOptions,
										'Property options.'
												+ prop
												+ ' is null or undefined and should have an actual value');
					}
				}
			}
		},
		types : function(component, rawOptions) {
			var needLevelPerProp = NEED_LEVEL[component];
			for ( var prop in VALID_TYPES) {
				if (VALID_TYPES.hasOwnProperty(prop)) {
					var validTypes = VALID_TYPES[prop];
					var actualType = toType(rawOptions[prop]);
					if (actualType !== 'undefined' && actualType !== 'null'
							&& validTypes.indexOf(actualType) == -1) {
						this.throwError(component, rawOptions,
								'Property options.' + prop + " has type "
										+ actualType + ' and should be one of '
										+ validTypes);
					}
				}
			}
		},
		stringSets : function(component, rawOptions) {
			for ( var prop in rawOptions) {
				if (rawOptions.hasOwnProperty(prop)) {
					var actualValue = rawOptions[prop];
					if (toType(actualValue) === 'string') {
						var validStrings = stringSet(component, prop);
						if (toType(validStrings) === 'array'
								&& validStrings.indexOf(actualValue) === -1) {
							this
									.throwError(
											component,
											rawOptions,
											'Property options.'
													+ prop
													+ " = "
													+ actualValue
													+ ' and should be null or undefined or one of '
													+ validStrings);
						}
					}
				}
			}
		}
	};

	/*
	 * every method assumes data is already validated, so no need to check
	 * anything
	 */
	var classMaker = {
		makePrefix : function(component) {
			switch (component) {
			case 'button': return 'btn';
			case 'dropdown': return 'btn';
			case 'label': return 'label';
			}
		},
		intent : function(component, actualValue) {
			var prefix = classMaker.makePrefix(component);
			if (isBlankString(actualValue)) {
				return prefix + '-default';
			}
			return prefix + '-' + actualValue;
		},
		size : function(component, actualValue) {
			var prefix = classMaker.makePrefix(component);
			if (isBlankString(actualValue)) {
				return '';
			}
			switch (actualValue) {
			case btjs.SIZE.LARGE:
				return prefix + '-lg';
			case btjs.SIZE.SMALL:
				return prefix + '-sm';
			case btjs.SIZE.EXTRA_SMALL:
				return prefix + '-xs';
			}
		},
		visibility : function(component, actualValue) {
			var prefix = classMaker.makePrefix(component);
			if (isBlankString(actualValue)) {
				return '';
			}
			return actualValue;
		},
		blockLevel : function(component, actualValue) {
			var prefix = classMaker.makePrefix(component);
			return actualValue === true ? prefix + '-block' : '';

		},
		active : function(component, actualValue) {
			return actualValue === true ? 'active' : '';
		}
	}

	var idMaker = {
		counter : 1,
		pad : function(num, size) {
			var s = num + "";
			while (s.length < size)
				s = "0" + s;
			return s;
		},
		make : function(id) {
			if (isBlankString(id)) {
				return 'btjs-' + this.pad(this.counter++, 5);
			}
			return id;
		}
	};

	var escapeHtml = function(unsafe) {
		return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
				/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	}

	var makeInnerHtml = function(text, html) {
		if (isBlankString(text) && !isBlankString(html)) {
			return html;
		} else if (!isBlankString(text) && isBlankString(html)) {
			return escapeHtml(text);
		}
		return '';
	}

	var newLabel = function(options) {
		return newElement(options, {
			component : 'label',
			createCode : function(id, options, automaticClasses) {
				var innerHtml = makeInnerHtml(options.text, options.html);
				return '<span id = "' + id + '" class="label '
						+ automaticClasses + '" >' + innerHtml + '</span> ';
			}
		});
	}
	var newBadge = function(options) {
		return newElement(options, {
			component : 'badge',
			createCode : function(id, options, automaticClasses) {
				// TODO: hack to create color badges
				var innerHtml = makeInnerHtml(options.text, options.html);
				return '<span id = "' + id + '" class="badge" >' + innerHtml
						+ '</span> ';
			}
		});
	}

	var newButton = function(options) {
		return newElement(options, {
			component : 'button',
			createCode : function(id, options, automaticClasses) {
				var innerHtml = makeInnerHtml(options.text, options.html);
				var enabled = options.disabled ? 'disabled="disabled"' : '';

				return '<button id = "' + id + '" class="btn ' + automaticClasses
						+ '" type="button" ' + enabled + '>' + innerHtml
						+ '</button>';

			}
		});
	}
	var newDropdown = function(options) {
		return newElement(options, {
			component : 'dropdown',
			createCode : function(id, options, automaticClasses) {
				var innerHtml = makeInnerHtml(options.text, options.html);
				var enabled = options.disabled ? 'disabled="disabled"' : '';
				var dropClass = options.dropup === true ? 'dropup' : 'dropdown';
				var alignClass = options.align === btjs.ALIGN.RIGHT ? 'dropdown-menu-right' : 'dropdown-menu-left';
				
				return '<div class=" ' + dropClass + '" id = "' + id + '-wrapper">'
					+ '  <button id = "' + id + '" class="btn ' + automaticClasses + ' dropdown-toggle" type="button"' 
				+ enabled + ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
				+ innerHtml
				+ '    <span id = "' + id + '-badge-location"></span> <span class="caret"></span>'
				+ '  </button>'
				+ '  <ul class="dropdown-menu ' + alignClass + '" aria-labelledby="' + id + '" id="' + id + '-items">'
				+ '  </ul>' 
				+ '</div>';
			},
			badgeLocationId : function(id){
				return id + '-badge-location';
			},
			iconLocationId : function(id){
				return id;
			},
			addChildren: function($newElement, id, rawOptions){
				if(toType(rawOptions.items) === 'array'){
					var $items = $newElement.find('#' + id + '-items');
					for (var i = 0; i < rawOptions.items.length; i++) {
						var item = options.items[i];
						var $item = null;
						switch(item.type){
						case 'dropdown-header': 
							$item = newDropdownHeader(item);
							break;
						case 'dropdown-divider': 
							$item = newDropdownDivider(item);
							break;
						default: 
							$item = newDropdownItem(item);
						}
						
						$items.append($item)
					}
				}
			}
		});
	}
	var newDropdownItem = function(options) {
		return newElement(options, {
			component : 'dropdown-item',
			createCode : function(id, options, automaticClasses) {
				var innerHtml = makeInnerHtml(options.text, options.html);
				var disabledClass = options.disabled ? 'disabled' : '';
				return 	'<li id = "' + id + '" class = "' + disabledClass + '">'+
							'<a href="#"><span id = "' + id + '-icon-location"></span>' + innerHtml + '<span id = "' + id + '-badge-location"></span></a>' + 
						'</li>';
			},
			badgeLocationId : function(id){
				return id + '-badge-location';
			},
			iconLocationId : function(id){
				return id + '-icon-location';
			},
		});
	}
	var newDropdownHeader = function(options) {
		return newElement(options, {
			component : 'dropdown-header',
			createCode : function(id, options, automaticClasses) {
				var innerHtml = makeInnerHtml(options.text, options.html);
				return 	'<li id = "' + id + '" class = "dropdown-header">'+
				'<span id = "' + id + '-icon-location"></span>' + innerHtml + '<span id = "' + id + '-badge-location"></span>' + 
				'</li>';
			},
			badgeLocationId : function(id){
				return id + '-badge-location';
			},
			iconLocationId : function(id){
				return id + '-icon-location';
			},
		});
	}
	var newDropdownDivider = function(options) {
		return newElement(options, {
			component : 'dropdown-divider',
			createCode : function(id, options, automaticClasses) {
				return 	'<li id = "' + id + '" class = "divider"></li>';
			}
		});
	}
	var newIcon = function(options) {
		return newElement(options, {
			component : 'icon',
			createCode : function(id, options) {
				if (options.iconSource == null) {
					options.iconSource = btjs.ICON_SOURCE.GLYPHICON;
				}
				switch (options.iconSource) {
				case btjs.ICON_SOURCE.GLYPHICON:
					return '<span id = "' + id
							+ '" class="glyphicon glyphicon-'
							+ options.iconName
							+ '" aria-hidden="true" ></span>';
				case btjs.ICON_SOURCE.FONT_AWESOME:
					var icons = $.map(options.iconName.split(' '), function(s){return 'fa-' + s;}).join(' ');
					return '<span><i id="' + id + '" class="fa '
							+ icons
							+ '" aria-hidden="true" ></i></span>';
				case btjs.ICON_SOURCE.IONICONS:
					return '<span><i id="' + id + '" class="ionicons ion-'
							+ options.iconName
							+ '" aria-hidden="true" ></i></span>';
				case btjs.ICON_SOURCE.MATERIAL:
					return '<span><i id="' + id
							+ '" class="material-icons" aria-hidden="true">'
							+ options.iconName + '</i></span>';
				}
			}
		});
	}

	var newElement = function(rawOptions, customProcess) {
		automaticValidations(customProcess.component, rawOptions);

		var id = idMaker.make(rawOptions.id);

		if (typeof customProcess.validations == 'function') {
			customProcess.validations(rawOptions);
		}

		var automaticClasses = automaticClassCreation(customProcess.component,
				rawOptions);

		var newElementCode = customProcess.createCode(id, rawOptions,
				automaticClasses);

		var $newElement = $(newElementCode);
		
		function parseIconName(iconString) {
			var slashIndex = iconString.indexOf('/');
			if (slashIndex == -1) {
				return iconString;
			}
			return iconString.substr(slashIndex + 1);
		}
		function parseIconSource(iconString) {
			var slashIndex = iconString.indexOf('/');
			if (slashIndex == -1) {
				return btjs.ICON_SOURCE.GLYPHICON;
			}
			return iconString.substr(0, slashIndex);
		}

		if (!isBlankString(rawOptions.icon) || isNonNullObject(rawOptions.icon)) {
			var iconOptions = typeof rawOptions.icon == 'string' ? {
				id : id + '-icon',
				iconSource : parseIconSource(rawOptions.icon),
				iconName : parseIconName(rawOptions.icon),
			} : rawOptions.icon; // TODO: manually copy properties and change
			// ID

			$icon = newIcon(iconOptions);
			$iconLocation = toType(customProcess.iconLocationId) === 'function' ?
					$newElement.find('#' + customProcess.iconLocationId(id)):
					$newElement;
			
			$iconLocation.prepend('&nbsp;');
			$iconLocation.prepend($icon);
		}

		if (!isBlankString(rawOptions.badge)
				|| isNonNullObject(rawOptions.badge)) {
			var badgeOptions = typeof rawOptions.badge == 'string' ? {
				id : id + '-badge',
				text : rawOptions.badge
			} : rawOptions.badge; // TODO: manually copy properties and change
			// ID

			$badge = newBadge(badgeOptions);
			$badgeLocation = toType(customProcess.badgeLocationId) === 'function' ?
					$newElement.find('#' + customProcess.badgeLocationId(id)):
					$newElement;
			
			$badgeLocation.append('&nbsp;');
			$badgeLocation.append($badge);
		}

		if (typeof customProcess.addChildren === 'function') {
			customProcess.addChildren($newElement, id, rawOptions);
		}

		if (typeof rawOptions.tooltip === 'string') {
			$newElement.tooltip({
				title : rawOptions.tooltip
			});
		} else if (typeof rawOptions.tooltip === 'object'
				&& rawOptions.tooltip !== null) {
			$newElement.tooltip(rawOptions.tooltip);
		}

		if (typeof rawOptions.popover === 'object'
				&& rawOptions.popover !== null) {
			$newElement.popover(rawOptions.popover);
		}

		if (typeof rawOptions.listeners === 'object'
				&& rawOptions.listeners !== null) {
			for ( var listener in rawOptions.listeners) {
				$newElement.on(listener, rawOptions.listeners[listener]);
			}
		}

		if (rawOptions.id === id) {
			var $oldElements = $('#' + id);

			if ($oldElements.length > 1) {
				throw Error('There are more than one elements with id '
						+ id
						+ '. There should be exaclty one if you want it to be replaced, or none to create the element');
			} else if ($oldElements.length == 1) {
				var oldClasses = $oldElements.attr("class");
				$newElement.addClass(oldClasses);
				$oldElements.replaceWith($newElement);
			}
		}

		return $newElement;
	}

	var automaticValidations = function(component, rawOptions) {
		validate.nonEmptyOptions(component, rawOptions);
		validate.need(component, rawOptions);
		validate.types(component, rawOptions);
		validate.stringSets(component, rawOptions);
		validate.eitherTextOrHtml(component, rawOptions);
	}

	var automaticClassCreation = function(component, rawOptions) {
		var cssClasses = [];
		for ( var fieldName in rawOptions) {
			// TODO: use the word prop or property, never field or fieldName
			// javascript has hasOwnProperty
			if (rawOptions.hasOwnProperty(fieldName)) {
				var actualValue = rawOptions[fieldName];
				var converter = classMaker[fieldName];
				if (toType(converter) === 'function') {
					var cssClass = converter(component, actualValue);
					cssClasses.push(cssClass);
				}
			}
		}
		return cssClasses.join(' ');
	}

	// TODO:
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
		newLabel : newLabel,
		/**
		 * @memberOf btjs
		 */
		newBadge : newBadge,
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
		newDropdown : newDropdown,
		
		/**
		 * @memberOf btjs
		 */
		newDropdownItem : newDropdownItem,
		/**
		 * @memberOf btjs
		 */
		newDropdownHeader : newDropdownHeader,
		/**
		 * @memberOf btjs
		 */
		newDropdownDivider : newDropdownDivider,

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
			DEFAULT : 'default',
			INFO : 'info',
			WARNING : 'warning',
			DANGER : 'danger',
			LINK : 'link'
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
			MATERIAL : 'material'
		},
		/**
		 * @memberOf btjs
		 */
		ALIGN : {
			LEFT : 'left',
			RIGHT : 'right'
		}
	}
}();
