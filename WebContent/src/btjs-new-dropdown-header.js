btjs.newDropdownHeader = function(options) {
	return btjs.newElement(options, {
		component : 'dropdown-header',
		createCode : function(id, options, automaticClasses) {
			var innerHtml = btjs.makeInnerHtml(options.text, options.html);
			return '<li id = "' + id + '" class = "dropdown-header">'
					+ '<span id = "' + id + '-icon-location"></span>'
					+ innerHtml + '<span id = "' + id
					+ '-badge-location"></span>' + '</li>';
		},
		badgeLocationId : function(id) {
			return id + '-badge-location';
		},
		iconLocationId : function(id) {
			return id + '-icon-location';
		},
	});
}