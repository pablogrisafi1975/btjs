/**
 * @type btjs
 * @author Pablo
 */
btjs.NEED_LEVEL = {
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
		context : 'forbidden',
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
		context : 'forbidden',
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
		context : 'optional',
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
		popover : 'forbidden',
		text : 'optional',
		html : 'optional',
		context : 'optional',
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
		popover : 'forbidden',
		text : 'optional',
		html : 'optional',
		context : 'optional',
		listeners : 'optional',
		visibility : 'optional',
		items : 'optional'
	},
	dropdownItem : {
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
		context : 'forbidden',
		listeners : 'optional',
		visibility : 'forbidden',
		items : 'forbidden'
	},
	dropdownHeader : {
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
		context : 'forbidden',
		listeners : 'optional',
		visibility : 'forbidden',
		items : 'forbidden'
	},
	dropdownDivider : {
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
		context : 'forbidden',
		listeners : 'forbidden',
		visibility : 'forbidden',
		items : 'forbidden'
	},
	buttonGroup : {
		id : 'optional',
		cssClass : 'optional',
		cssStyle : 'optional',
		size : 'optional',
		iconSource : 'forbidden',
		iconName : 'forbidden',
		icon : 'forbidden',
		badge : 'forbidden',
		blockLevel : 'optional',
		tooltip : 'optional',
		popover : 'optional',
		text : 'forbidden',
		html : 'forbidden',
		context : 'forbidden',
		listeners : 'optional',
		visibility : 'optional',
		items : 'optional'
	},
	buttonToolbar : {
		id : 'optional',
		cssClass : 'optional',
		cssStyle : 'optional',
		size : 'optional',
		iconSource : 'forbidden',
		iconName : 'forbidden',
		icon : 'forbidden',
		badge : 'forbidden',
		blockLevel : 'optional',
		tooltip : 'optional',
		popover : 'optional',
		text : 'forbidden',
		html : 'forbidden',
		context : 'forbidden',
		listeners : 'optional',
		visibility : 'optional',
		items : 'optional'
	}

};

btjs.VALID_TYPES = {
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
	context : [ 'string' ],
	listeners : [ 'object' ],
	visibility : [ 'string' ],
	items : [ 'array' ]
}

btjs.stringSet = function(btype, field) {
	switch (field) {
	case 'size':
		if (btype === 'button' || btype === 'buttonGroup' || btype === 'buttonToolbar' || btype === 'label') {
			return [ btjs.SIZE.LARGE, btjs.SIZE.SMALL, btjs.SIZE.EXTRA_SMALL ];
		} else {
			return [ btjs.SIZE.LARGE, btjs.SIZE.SMALL ];
		}
	case 'visibility':
		return [ btjs.VISIBILITY.SHOW, btjs.VISIBILITY.HIDDEN,
				btjs.VISIBILITY.INVISIBLE ]

	case 'iconSource':
		return [ btjs.ICON_SOURCE.GLYPHICONS, btjs.ICON_SOURCE.FONT_AWESOME,
				btjs.ICON_SOURCE.IONICONS, btjs.ICON_SOURCE.MATERIAL ]
	case 'context':
		if (btype === 'button') {
			return [ btjs.CONTEXT.PRIMARY, btjs.CONTEXT.SUCCESS,
					btjs.CONTEXT.DEFAULT, btjs.CONTEXT.INFO,
					btjs.CONTEXT.WARNING, btjs.CONTEXT.DANGER,
					btjs.CONTEXT.LINK ];
		}
		return [ btjs.CONTEXT.PRIMARY, btjs.CONTEXT.SUCCESS,
				btjs.CONTEXT.DEFAULT, btjs.CONTEXT.INFO, btjs.CONTEXT.WARNING,
				btjs.CONTEXT.DANGER ];
	}

}

// TODO: array to know forbidden/mandatory per btype/field
/*
 * var NEED_LEVEL = [ ["btype", "id", "css", "style", "text", "html", "size",
 * "context" ["button" , null, "css", "style", "mandatory", "html", "size",
 * "context" ["icon" , null, "css", "style", "mandatory", "forbidden", "size",
 * "context" ] ]
 * 
 * and init to transfor into a nice object
 */
btjs.validate = {
	throwError : function(btype, rawOptions, details) {
		var base = 'Error trying to create ' + btype + ' with options: '
				+ JSON.stringify(rawOptions) + '. ';
		throw new Error(base + details);
	},
	nonEmptyOptions : function(btype, rawOptions) {
		if (typeof rawOptions === 'undefined' || rawOptions === null) {
			this.throwError(btype, rawOptions,
					'Options can not be null or undefined');
		}
	},
	eitherTextOrHtml : function(btype, rawOptions) {
		if (!btjs.isBlankString(rawOptions.text)
				&& !btjs.isBlankString(rawOptions.html)) {
			this
					.throwError(btype, rawOptions,
							'You can not use options.text and options.html at the same time');
		}
	},
	need : function(btype, rawOptions) {
		var needLevelPerProp = btjs.NEED_LEVEL[btype];
		for ( var prop in needLevelPerProp) {
			if (needLevelPerProp.hasOwnProperty(prop)) {
				var needLevel = needLevelPerProp[prop];
				var actualValue = rawOptions[prop];
				if (needLevel === 'forbidden'
						&& typeof actualValue !== 'undefined'
						&& actualValue !== null) {
					this.throwError(btype, rawOptions, 'Property options.'
							+ prop + " = " + actualValue
							+ ' and should be null or undefined');
				}
				if (needLevel === 'mandatory'
						&& (typeof actualValue === 'undefined' || actualValue === null)) {
					this
							.throwError(
									btype,
									rawOptions,
									'Property options.'
											+ prop
											+ ' is null or undefined and should have an actual value');
				}
			}
		}
	},
	types : function(btype, rawOptions) {
		var needLevelPerProp = btjs.NEED_LEVEL[btype];
		for ( var prop in btjs.VALID_TYPES) {
			if (btjs.VALID_TYPES.hasOwnProperty(prop)) {
				var validTypes = btjs.VALID_TYPES[prop];
				var actualType = btjs.toType(rawOptions[prop]);
				if (actualType !== 'undefined' && actualType !== 'null'
						&& validTypes.indexOf(actualType) == -1) {
					this.throwError(btype, rawOptions, 'Property options.'
							+ prop + " has type " + actualType
							+ ' and should be one of ' + validTypes);
				}
			}
		}
	},
	stringSets : function(btype, rawOptions) {
		for ( var prop in rawOptions) {
			if (rawOptions.hasOwnProperty(prop)) {
				var actualValue = rawOptions[prop];
				if (btjs.toType(actualValue) === 'string') {
					var validStrings = btjs.stringSet(btype, prop);
					if (btjs.toType(validStrings) === 'array'
							&& validStrings.indexOf(actualValue) === -1) {
						this.throwError(btype, rawOptions, 'Property options.'
								+ prop + " = " + actualValue
								+ ' and should be null or undefined or one of '
								+ validStrings);
					}
				}
			}
		}
	}
};
