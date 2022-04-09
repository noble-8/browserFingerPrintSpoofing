window.onload = (event) => {
	const changeUABtn = document.querySelector("#changeUA");
	const blockImageBtn = document.querySelector("#blockImg");
	const blockJSBtn = document.querySelector("#blockJS");

	const spinner = document.querySelector("#spinner");

	chrome.storage.sync.get("UA_CHANGED", ({ UA_CHANGED }) => {
		if (UA_CHANGED) {
			changeUABtn.textContent = "User Agent Spoofed";
			changeUABtn.classList.add("btn-danger");
			changeUABtn.classList.remove("btn-primary");
		} else {
			changeUABtn.textContent = "Spoof User Agent";
			changeUABtn.classList.add("btn-primary");
			changeUABtn.classList.remove("btn-danger");
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

	changeUABtn.addEventListener("click", (event) => {
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("UA_CHANGED", ({ UA_CHANGED }) => {
			const uaChanged = !UA_CHANGED;
			chrome.storage.sync.set({ UA_CHANGED: uaChanged }, async () => {
				let userAgent = "";
				if (uaChanged) {
					userAgent = await getRandomUserAgent();
					changeUABtn.textContent = "User Agent Spoofed";
				} else {
					userAgent = window.navigator.userAgent;
					changeUABtn.textContent = "Spoof User Agent";
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
						switchBtnState(changeUABtn);
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

	async function reload() {
		let [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});
		chrome.tabs.reload(tab.id);
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
};
