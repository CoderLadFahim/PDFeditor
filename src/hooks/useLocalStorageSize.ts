const useLocalStorageKeySize = (key: string): number => {
	let allStrings = ''
	for (const localStorageKey in window.localStorage) {
		if (window.localStorage.hasOwnProperty(localStorageKey)) {
			if (localStorageKey !== key) continue; 
			allStrings += window.localStorage[localStorageKey]
		}
	}
	return (3 + (allStrings.length * 16) / (8 * 1024)) / 1024;
}

export default useLocalStorageKeySize;
