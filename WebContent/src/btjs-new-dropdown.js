btjs.newDropdown = function(options) {
	return btjs.newElement(
			options,
			{
				btype : btjs.BTYPE.DROPDOWN,
				createCode : function(id, options, automaticClasses) {
					var innerHtml = btjs.makeInnerHtml(options.text, options.html);
					var enabled = options.disabled ? 'disabled="disabled"' : '';
					var dropClass = options.dropup === true ? 'dropup'
							: 'dropdown';
					var alignClass = options.align === btjs.ALIGN.RIGHT ? 'dropdown-menu-right'
							: 'dropdown-menu-left';

					return '<div class=" '
							+ dropClass
							+ '" id = "'
							+ id
							+ '-wrapper">'
							+ '  <button id = "'
							+ id
							+ '" class="btn '
							+ automaticClasses
							+ ' dropdown-toggle" type="button"'
							+ enabled
							+ ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
							+ innerHtml
							+ '    <span id = "'
							+ id
							+ '-badge-location"></span> <span class="caret"></span>'
							+ '  </button>' + '  <ul class="dropdown-menu '
							+ alignClass + '" aria-labelledby="' + id
							+ '" id="' + id + '-items">' + '  </ul>' + '</div>';
				},
				badgeLocationId : function(id) {
					return id + '-badge-location';
				},
				iconLocationId : function(id) {
					return id;
				},
				addChildren : function($newElement, id, rawOptions) {
					if (btjs.toType(rawOptions.items) === 'array') {
						var $items = $newElement.find('#' + id + '-items');
						for (var i = 0; i < rawOptions.items.length; i++) {
							var item = options.items[i];
							var $item = null;
							switch (item.btype) {
							case 'dropdownHeader':
								$item = btjs.newDropdownHeader(item);
								break;
							case 'dropdownDivider':
								$item = btjs.newDropdownDivider(item);
								break;
							default:
								$item = btjs.newDropdownItem(item);
							}

							$items.append($item)
						}
					}
				}
			});
}
