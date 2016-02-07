btjs.classMaker = {
	makePrefix : function(component) {
		switch (component) {
		case 'button':
			return 'btn';
		case 'dropdown':
			return 'btn';
		case 'label':
			return 'label';
		}
	},
	context : function(component, actualValue) {
		var prefix = btjs.classMaker.makePrefix(component);
		if (btjs.isBlankString(actualValue)) {
			return prefix + '-default';
		}
		return prefix + '-' + actualValue;
	},
	size : function(component, actualValue) {
		var prefix = btjs.classMaker.makePrefix(component);
		if (btjs.isBlankString(actualValue)) {
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
		var prefix = btjs.classMaker.makePrefix(component);
		if (btjs.isBlankString(actualValue)) {
			return '';
		}
		return actualValue;
	},
	blockLevel : function(component, actualValue) {
		var prefix = btjs.classMaker.makePrefix(component);
		return actualValue === true ? prefix + '-block' : '';

	},
	active : function(component, actualValue) {
		return actualValue === true ? 'active' : '';
	}
}

