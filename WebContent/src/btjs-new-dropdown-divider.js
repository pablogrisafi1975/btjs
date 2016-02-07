btjs.newDropdownDivider = function(options) {
	return btjs.newElement(options, {
		component : 'dropdown-divider',
		createCode : function(id, options, automaticClasses) {
			return '<li id = "' + id + '" class = "divider"></li>';
		}
	});
}
