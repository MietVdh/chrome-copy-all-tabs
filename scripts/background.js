chrome.runtime.onInstalled.addListener(() => {
    console.log("Copy All Tabs installed");
});

chrome.action.onClicked.addListener((clickedTab) => {
    console.log("Action clicked");
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        const message = {};
        message.type = "allTabs";
        const links = [];
        for (let tab of tabs) {
            console.log(tab);
            links.push({
                url: tab.url,
                title: tab.title
            });
        };
        message.links = links;
        chrome.tabs.sendMessage(clickedTab.id, message);
    });
});
