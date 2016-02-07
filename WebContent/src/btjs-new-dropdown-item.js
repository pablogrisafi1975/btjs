btjs.newDropdownItem = function(options) {
	return btjs.newElement(options, {
		component : 'dropdown-item',
		createCode : function(id, options, automaticClasses) {
			var innerHtml = btjs.makeInnerHtml(options.text, options.html);
			var disabledClass = options.disabled ? 'disabled' : '';
			return '<li id = "' + id + '" class = "' + disabledClass + '">'
					+ '<a href="#"><span id = "' + id
					+ '-icon-location"></span>' + innerHtml + '<span id = "'
					+ id + '-badge-location"></span></a>' + '</li>';
		},
		badgeLocationId : function(id) {
			return id + '-badge-location';
		},
		iconLocationId : function(id) {
			return id + '-icon-location';
		},
	});
}