/**
 * @type btjs
 * @author Pablo
 */

// TODO: automatic conversion of properties to classes when possible
btjs.toType = function(obj) {
	/*
	 * from
	 * https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
	 */
	return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
			.toLowerCase()
};

btjs.isBlankString = function(str) {
	return typeof str === 'undefined' || str === null
			|| (typeof str === 'string' && $.trim(str) === '');
}
btjs.isNonNullObject = function(obj) {
	return obj !== null && typeof obj === 'object';
}
btjs.isSignificantStringOrObject = function(obj) {
	return !btjs.isBlankString(obj) || btjs.isNonNullObject(obj);
}

btjs.deepCopy = function(obj){
	return jQuery.extend(true, {}, obj);
}


