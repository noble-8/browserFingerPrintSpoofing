window.onload = (event) => {
	const spoofNavBtn = document.querySelector("#spoofNav");
	const spoofUABtn = document.querySelector("#spoofUA");
	const blockImageBtn = document.querySelector("#blockImg");
	const blockJSBtn = document.querySelector("#blockJS");
	const spinner = document.querySelector("#spinner");

	chrome.storage.sync.get("NAV_SPOOFED", ({ NAV_SPOOFED }) => {
		if (NAV_SPOOFED) {
			spoofNavBtn.textContent = "Navigator Spoofed";
			spoofNavBtn.classList.add("btn-danger");
			spoofNavBtn.classList.remove("btn-primary");
		} else {
			spoofNavBtn.textContent = "Spoof Navigator";
			spoofNavBtn.classList.add("btn-primary");
			spoofNavBtn.classList.remove("btn-danger");
		}
	});

	chrome.storage.sync.get("UA_SPOOFED", ({ UA_SPOOFED }) => {
		if (UA_SPOOFED) {
			spoofUABtn.textContent = "User Agent Spoofed";
			spoofUABtn.classList.add("btn-danger");
			spoofUABtn.classList.remove("btn-primary");
		} else {
			spoofUABtn.textContent = "Spoof User Agent";
			spoofUABtn.classList.add("btn-primary");
			spoofUABtn.classList.remove("btn-danger");
		}
	});

	chrome.storage.sync.get("IMG_BLOCKED", ({ IMG_BLOCKED }) => {
		if (IMG_BLOCKED) {
			blockImageBtn.textContent = "Images Blocked";
			blockImageBtn.classList.add("btn-danger");
			blockImageBtn.classList.remove("btn-primary");
		} else {
			blockImageBtn.textContent = "Block Images";
			blockImageBtn.classList.add("btn-primary");
			blockImageBtn.classList.remove("btn-danger");
		}
	});

	chrome.storage.sync.get("JS_BLOCKED", ({ JS_BLOCKED }) => {
		if (JS_BLOCKED) {
			blockJSBtn.textContent = "JS Blocked";
			blockJSBtn.classList.add("btn-danger");
			blockJSBtn.classList.remove("btn-primary");
		} else {
			blockJSBtn.textContent = "Block JS";
			blockJSBtn.classList.add("btn-primary");
			blockJSBtn.classList.remove("btn-danger");
		}
	});

	spoofNavBtn.addEventListener("click", (event) => {
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("NAV_SPOOFED", ({ NAV_SPOOFED }) => {
			const navSpoofed = !NAV_SPOOFED;
			chrome.storage.sync.set({ NAV_SPOOFED: navSpoofed }, () => {
				if (navSpoofed) {
					spoofNavBtn.textContent = "Navigator Spoofed";
				} else {
					spoofNavBtn.textContent = "Spoof Navigator";
				}
				switchBtnState(spoofNavBtn);
				spinner.classList.add("d-none");
				spoofNavigator(navSpoofed);
			});
		});
	});

	spoofUABtn.addEventListener("click", (event) => {
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("UA_SPOOFED", ({ UA_SPOOFED }) => {
			const uaSpoofed = !UA_SPOOFED;
			chrome.storage.sync.set({ UA_SPOOFED: uaSpoofed }, async () => {
				let userAgent = "";
				if (uaSpoofed) {
					userAgent = await getRandomUserAgent();
					spoofUABtn.textContent = "User Agent Spoofed";
				} else {
					userAgent = window.navigator.userAgent;
					spoofUABtn.textContent = "Spoof User Agent";
				}
				chrome.declarativeNetRequest.updateDynamicRules(
					{
						removeRuleIds: [1],
						addRules: [
							{
								id: 1,
								priority: 10,
								action: {
									type: "modifyHeaders",
									requestHeaders: [
										{
											header: "user-agent",
											operation: "set",
											value: userAgent,
										},
									],
								},
								condition: {
									urlFilter: "*",
									resourceTypes: ["main_frame"],
								},
							},
						],
					},
					() => {
						switchBtnState(spoofUABtn);
						spinner.classList.add("d-none");
						reload();
					}
				);
			});
		});
	});

	blockImageBtn.addEventListener("click", (event) => {
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("IMG_BLOCKED", ({ IMG_BLOCKED }) => {
			const imageBlocked = !IMG_BLOCKED;
			chrome.storage.sync.set({ IMG_BLOCKED: imageBlocked }, () => {
				if (imageBlocked) {
					blockImageBtn.textContent = "Images Blocked";
				} else {
					blockImageBtn.textContent = "Block Images";
				}
				chrome.contentSettings["images"].set(
					{
						primaryPattern: "<all_urls>",
						setting: imageBlocked ? "block" : "allow",
					},
					() => {
						switchBtnState(blockImageBtn);
						spinner.classList.add("d-none");
						reload();
					}
				);
			});
		});
	});

	blockJSBtn.addEventListener("click", (event) => {
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("JS_BLOCKED", ({ JS_BLOCKED }) => {
			const jsBlocked = !JS_BLOCKED;
			chrome.storage.sync.set({ JS_BLOCKED: jsBlocked }, () => {
				if (jsBlocked) {
					blockJSBtn.textContent = "JS Blocked";
				} else {
					blockJSBtn.textContent = "Block JS";
				}
				chrome.contentSettings["javascript"].set(
					{
						primaryPattern: "<all_urls>",
						setting: jsBlocked ? "block" : "allow",
					},
					() => {
						switchBtnState(blockJSBtn);
						spinner.classList.add("d-none");
						reload();
					}
				);
			});
		});
	});

	async function getCurrentTabId() {
		let [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});
		return tab.id;
	}

	async function reload() {
		const tabId = await getCurrentTabId();
		chrome.tabs.reload(tabId);
	}

	async function getRandomUserAgent() {
		const response = await fetch(
			"https://browser-fingerprint-spoof.herokuapp.com/getRandomUserAgent"
		);
		let userAgent = await response.text();
		return userAgent;
	}

	function switchBtnState(btn) {
		btn.classList.toggle("btn-primary");
		btn.classList.toggle("btn-danger");
	}

	async function spoofNavigator(navSpoofed) {
		const id = "inject_script";
		if (navSpoofed) {
			chrome.scripting.registerContentScripts(
				[
					{
						id,
						matches: ["<all_urls>"],
						runAt: "document_start",
						js: ["js/script.js"],
					},
				],
				() => {
					reload();
				}
			);
		} else {
			chrome.scripting.unregisterContentScripts({ ids: [id] }, () => {
				reload();
			});
		}
	}
};
