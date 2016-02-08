btjs.newButtonGroup = function(options) {
	return btjs.newElement(options, {
		btype : btjs.BTYPE.BUTTON_GROUP,
		createCode : function(id, rawOptions, automaticClasses) {
			var buttonGroupClass = rawOptions.vertical === true ? 'btn-group-vertical' : 'btn-group';
			
			if(!rawOptions.justified){
				return '<div id = "' + id + '" class="' 
							+ buttonGroupClass + ' ' 
							+ automaticClasses
						+ '" role="group"></div>';
			}else{
				var template = '<div id = "' + id + '" class="' + buttonGroupClass 
					+ ' btn-group-justified ' +
					+ automaticClasses
				+ '" role="group">';
				if (btjs.toType(rawOptions.items) === 'array') {
					for (var i = 0; i < rawOptions.items.length; i++) {
						var wrapperId = id + 'item' + i + '-wrapper';
						template += '<div id = "' + wrapperId + '" class="btn-group" role="group"></div>';
					}
				}
				
				return template += '</div>';
				
			}

		},
		addChildren : function($newElement, id, rawOptions) {
			if (btjs.toType(rawOptions.items) === 'array') {
				for (var i = 0; i < rawOptions.items.length; i++) {
					var item = options.items[i];
					var $item = btjs.newButton(item);
					if(!rawOptions.justified){
						$newElement.append($item);
					}else{
						var wrapperId = id + 'item' + i + '-wrapper';
						$newElement.find('#' + wrapperId).append($item);
					}
				}				
			}
		}
	});
}
