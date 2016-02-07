btjs.newIcon = function(options) {
	return btjs.newElement(options, {
		btype : btjs.BTYPE.ICON,
		createCode : function(id, options) {
			if (options.iconSource == null) {
				options.iconSource = btjs.ICON_SOURCE.GLYPHICON;
			}
			switch (options.iconSource) {
			case btjs.ICON_SOURCE.GLYPHICON:
				return '<span id = "' + id + '" class="glyphicon glyphicon-'
						+ options.iconName + '" aria-hidden="true" ></span>';
			case btjs.ICON_SOURCE.FONT_AWESOME:
				var icons = $.map(options.iconName.split(' '), function(s) {
					return 'fa-' + s;
				}).join(' ');
				return '<span><i id="' + id + '" class="fa ' + icons
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
