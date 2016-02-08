/**
 * @type btjs
 * @author Pablo
 * 
 * SubElements are icons, badge, tooltip and popover. Things that (most) other
 * elements can have, and can eventually be defined with single line of text,
 * even if it has to be parsed a little bit
 */

btjs.subelementMaker = {
	parseIconString : function(iconString) {
		var slashIndex = iconString.indexOf('/');
		return {
			iconName : slashIndex == -1 ? iconString : iconString
					.substr(slashIndex + 1),
			iconSource : slashIndex == -1 ? btjs.ICON_SOURCE.GLYPHICON
					: iconString.substr(0, slashIndex)
		}
	},
	makeIcon : function(icon, iconLocationId, id, $newElement) {
		if (btjs.isSignificantStringOrObject(icon)) {
			var iconOptions = typeof icon == 'string' ? btjs.subelementMaker
					.parseIconString(icon) : btjs.deepCopy(icon);

			iconOptions.id = id + '-icon';

			var $icon = btjs.newIcon(iconOptions);
			var $iconLocation = btjs.toType(iconLocationId) === 'function' ? $newElement
					.find('#' + iconLocationId(id))
					: $newElement;

			$iconLocation.prepend('&nbsp;');
			$iconLocation.prepend($icon);
		}
	},
	makeBadge : function(badge, badgeLocationId, id, $newElement) {
		if (btjs.isSignificantStringOrObject(badge)) {
			var badgeOptions = typeof badge == 'string' ? {
				text : badge
			} : btjs.deepCopy(badge);

			badgeOptions.id = id + '-icon';

			var $badge = btjs.newBadge(badgeOptions);
			var $badgeLocation = btjs.toType(badgeLocationId) === 'function' ? $newElement
					.find('#' + badgeLocationId(id))
					: $newElement;

			$badgeLocation.append('&nbsp;');
			$badgeLocation.append($badge);
		}
	},
	makeTooltip : function(tooltip, $newElement) {
		if (btjs.isSignificantStringOrObject(tooltip)) {
			if (typeof tooltip === 'string') {
				$newElement.tooltip({
					title : tooltip
				});
			} else {
				$newElement.tooltip(tooltip);
			}
		}
	},
	parsePopoverString : function(popoverString) {
		var slashIndex = popoverString.indexOf('/');
		return {
			title : slashIndex == -1 ? '' : popoverString.substr(0, slashIndex),
			content : slashIndex == -1 ? popoverString : popoverString
					.substr(slashIndex + 1),
		}
	},
	makePopover : function(popover, id, $newElement) {
		if (btjs.isSignificantStringOrObject(popover)) {
			// TODO: enable popover in buttons/dropdowns using trigger = focus
			// so they dissapear when clicking anywhere (dismissible)

			var popoverOptions = typeof popover == 'string' ? btjs.subelementMaker
					.parsePopoverString(popover)
					: btjs.deepCopy(popover);

			popoverOptions.id = id + '-popover';
			$newElement.popover(popoverOptions);
		}
	}
}
