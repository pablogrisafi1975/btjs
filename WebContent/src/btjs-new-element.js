/**
 * @type btjs
 * @author Pablo
 */

//TODO: btype instead of btype
//TODO: automatic html: we need a cookedOptions



btjs.newElement = function(rawOptions, customProcess) {
	btjs.automaticValidations(customProcess.btype, rawOptions);

	var id = btjs.idMaker.make(rawOptions.id);

	if (typeof customProcess.validations == 'function') {
		customProcess.validations(rawOptions);
	}

	var automaticClasses = btjs.automaticClassCreation(customProcess.btype,
			rawOptions);

	var newElementCode = customProcess.createCode(id, rawOptions,
			automaticClasses);

	var $newElement = $(newElementCode);

	btjs.subelementCreation(rawOptions, customProcess.iconLocationId, customProcess.badgeLocationId, id, $newElement);

	if (typeof customProcess.addChildren === 'function') {
		customProcess.addChildren($newElement, id, rawOptions);
	}

	if (typeof rawOptions.listeners === 'object'
			&& rawOptions.listeners !== null) {
		for ( var listener in rawOptions.listeners) {
			$newElement.on(listener, rawOptions.listeners[listener]);
		}
	}

	if (rawOptions.id === id) {
		var $oldElements = $('#' + id);

		if ($oldElements.length > 1) {
			throw Error('There are more than one elements with id '
					+ id
					+ '. There should be exaclty one if you want it to be replaced, or none to create the element');
		} else if ($oldElements.length == 1) {
			var oldClasses = $oldElements.attr("class");
			$newElement.addClass(oldClasses);
			$oldElements.replaceWith($newElement);
		}
	}

	return $newElement;
}

btjs.automaticValidations = function(btype, rawOptions) {
	btjs.validate.nonEmptyOptions(btype, rawOptions);
	btjs.validate.need(btype, rawOptions);
	btjs.validate.types(btype, rawOptions);
	btjs.validate.stringSets(btype, rawOptions);
	btjs.validate.eitherTextOrHtml(btype, rawOptions);
}

btjs.subelementCreation = function(rawOptions, iconLocationId, badgeLocationId, id, $newElement){
	btjs.subelementMaker.makeIcon(rawOptions.icon, iconLocationId, id, $newElement);
	btjs.subelementMaker.makeBadge(rawOptions.badge, badgeLocationId, id, $newElement);
	btjs.subelementMaker.makeTooltip(rawOptions.tooltip, $newElement);
	btjs.subelementMaker.makePopover(rawOptions.popover, id, $newElement);	
}

btjs.automaticClassCreation = function(btype, rawOptions) {
	var cssClasses = [];
	for ( var fieldName in rawOptions) {
		// TODO: use the word prop or property, never field or fieldName
		// javascript has hasOwnProperty
		if (rawOptions.hasOwnProperty(fieldName)) {
			var actualValue = rawOptions[fieldName];
			var converter = btjs.classMaker[fieldName];
			if (btjs.toType(converter) === 'function') {
				var cssClass = converter(btype, actualValue);
				cssClasses.push(cssClass);
			}
		}
	}
	return cssClasses.join(' ');
}

btjs.makeInnerHtml = function(text, html) {
	if (btjs.isBlankString(text) && !btjs.isBlankString(html)) {
		return html;
	} else if (!btjs.isBlankString(text) && btjs.isBlankString(html)) {
		return btjs.escapeHtml(text);
	}
	return '';
}

btjs.escapeHtml = function(unsafe) {
	return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g,
			"&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}


// TODO:
// test: mantener las clases originales
// test: escapar texto, permitir html y verificar que no vengan juntos
// test: retener id;
// test: devolver el objeto creado (jquery wrapped)
// test: verificar 0 o 1 elemento preexistente

