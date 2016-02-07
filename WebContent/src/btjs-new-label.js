btjs.newLabel = function(options) {
	return btjs.newElement(options, {
		btype : btjs.BTYPE.LABEL,
		createCode : function(id, options, automaticClasses) {
			var innerHtml = btjs.makeInnerHtml(options.text, options.html);
			return '<span id = "' + id + '" class="label ' + automaticClasses
					+ '" >' + innerHtml + '</span> ';
		}
	});
}
