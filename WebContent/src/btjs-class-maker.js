btjs.classMaker = {
	makePrefix : function(btype) {
		switch (btype) {
		case 'button':
			return 'btn';
		case 'buttonGroup':
			return 'btn-group';
		case 'dropdown':
			return 'btn';
		case 'label':
			return 'label';
		}
	},
	context : function(btype, actualValue) {
		var prefix = btjs.classMaker.makePrefix(btype);
		if (btjs.isBlankString(actualValue)) {
			return prefix + '-default';
		}
		return prefix + '-' + actualValue;
	},
	size : function(btype, actualValue) {
		var prefix = btjs.classMaker.makePrefix(btype);
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
	visibility : function(btype, actualValue) {
		var prefix = btjs.classMaker.makePrefix(btype);
		if (btjs.isBlankString(actualValue)) {
			return '';
		}
		return actualValue;
	},
	blockLevel : function(btype, actualValue) {
		var prefix = btjs.classMaker.makePrefix(btype);
		return actualValue === true ? prefix + '-block' : '';

	},
	active : function(btype, actualValue) {
		return actualValue === true ? 'active' : '';
	}
}

