btjs.newButton = function(options) {
	return btjs.newElement(options, {
		btype : btjs.BTYPE.BUTTON,
		createCode : function(id, options, automaticClasses) {
			var innerHtml = btjs.makeInnerHtml(options.text, options.html);
			var enabled = options.disabled ? 'disabled="disabled"' : '';

			return '<button id = "' + id + '" class="btn ' + automaticClasses
					+ '" type="button" ' + enabled + '>' + innerHtml
					+ '</button>';

		}
	});
}
