btjs.newDropdownDivider = function(options) {
	return btjs.newElement(options, {
		btype : btjs.BTYPE.DROPDOWN_DIVIDER,
		createCode : function(id, options, automaticClasses) {
			return '<li id = "' + id + '" class = "divider"></li>';
		}
	});
}
