
btjs.newBadge = function(options) {
		return btjs.newElement(options, {
			component : 'badge',
			createCode : function(id, options, automaticClasses) {
				// TODO: hack to create color badges
				var innerHtml = btjs.makeInnerHtml(options.text, options.html);
				return '<span id = "' + id + '" class="badge" >' + innerHtml
						+ '</span> ';
			}
		});
	}
