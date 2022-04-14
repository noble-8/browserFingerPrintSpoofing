(() => {
	function injectScript() {
		let parent = document.documentElement;
		let script = document.createElement("script");
		script.src = chrome.runtime.getURL("js/navigatorSpoofScript.js");
		script.async = false;
		parent.insertBefore(script, parent.firstChild);
		parent.removeChild(script);
	}

	injectScript();
})();
