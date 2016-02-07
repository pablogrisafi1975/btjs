
btjs.idMaker = {
	counter : 1,
	pad : function(num, size) {
		var s = num + "";
		while (s.length < size)
			s = "0" + s;
		return s;
	},
	make : function(id) {
		if (btjs.isBlankString(id)) {
			return 'btjs-' + this.pad(this.counter++, 5);
		}
		return id;
	}
}