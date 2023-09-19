const localStorageSpace = function () {
	var allStrings = ''
	for (var key in window.localStorage) {
		if (window.localStorage.hasOwnProperty(key)) {
			allStrings += window.localStorage[key]
		}
	}
	return 3 + (allStrings.length * 16) / (8 * 1024);
}
