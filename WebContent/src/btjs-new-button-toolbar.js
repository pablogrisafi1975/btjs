btjs.newButtonToolbar = function(options) {
	return btjs.newElement(options, {
		btype : btjs.BTYPE.BUTTON_TOOLBAR,
		createCode : function(id, rawOptions, automaticClasses) {
			return '<div id = "' + id + '" class="btn-toolbar ' +
			+ automaticClasses
		+ '" role="toolbar"></div>';

		},
		addChildren : function($newElement, id, rawOptions) {
			if (btjs.toType(rawOptions.items) === 'array') {
				for (var i = 0; i < rawOptions.items.length; i++) {
					var item = options.items[i];
					var $item = btjs.newButtonGroup(item);
					$newElement.append($item);
				}				
			}
		}
	});
}
