actionBtn = document.querySelector("#change-ua");

chrome.storage.sync.get("UA_CHANGED", ({ UA_CHANGED }) => {
	actionBtn.textContent = UA_CHANGED ? "Stop" : "Change UA";
});

actionBtn.addEventListener("click", (event) => {
	chrome.storage.sync.get("UA_CHANGED", ({ UA_CHANGED }) => {
		userAgentChanged = UA_CHANGED;
		const newValue = !UA_CHANGED;
		chrome.storage.sync.set({ UA_CHANGED: newValue }, async () => {
			let userAgent = "";
			if (!newValue) {
				userAgent = window.navigator.userAgent;
				actionBtn.textContent = "Change UA";
			} else {
				userAgent = await getRandomUserAgent();
				actionBtn.textContent = "Stop";
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
					reload();
				}
			);
		});
	});
});

async function reload() {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	chrome.tabs.reload(tab.id);
}

async function getRandomUserAgent() {
	const response = await fetch(
		"https://browser-fingerprint-spoof.herokuapp.com/getRandomUserAgent"
	);
	let userAgent = await response.text();
	return userAgent;
}
