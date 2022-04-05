window.onload = (event) => {
	const actionBtn = document.querySelector("#change-ua");
	const spinner = document.querySelector("#spinner");

	chrome.storage.sync.get("UA_CHANGED", ({ UA_CHANGED }) => {
		if (UA_CHANGED) {
			actionBtn.textContent = "Unspoof User Agent";
			actionBtn.classList.add("btn-danger");
			actionBtn.classList.remove("btn-primary");
		} else {
			actionBtn.textContent = "Spoof User Agent";
			actionBtn.classList.add("btn-primary");
			actionBtn.classList.remove("btn-danger");
		}
	});

	actionBtn.addEventListener("click", (event) => {
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("UA_CHANGED", ({ UA_CHANGED }) => {
			userAgentChanged = UA_CHANGED;
			const newValue = !UA_CHANGED;
			chrome.storage.sync.set({ UA_CHANGED: newValue }, async () => {
				let userAgent = "";
				if (!newValue) {
					userAgent = window.navigator.userAgent;
					actionBtn.textContent = "Spoof User Agent";
				} else {
					userAgent = await getRandomUserAgent();
					actionBtn.textContent = "Unspoof User Agent";
				}
				switchBtnState(actionBtn);
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
