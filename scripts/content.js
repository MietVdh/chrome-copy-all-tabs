// Receiving a message
chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'allTabs') {
        console.log("Requesting all tabs");
        const html = copyAllTabs(request);
        sendToClipboard(html);
    }
});

// Return <ul> with all tab hyperlinks
function copyAllTabs(request) {
    let msg = document.createElement('ul');
    for (let link of request.links) {
        let li = document.createElement('li');
        li.innerHTML = `<a href="${link.url}">${link.title}</a>`;
        msg.append(li);
    }
    const HTML = msg.outerHTML;
    // sendToClipboard(HTML);
    return HTML
}

// Send html to clipboard
function sendToClipboard(html) {
    const TYPE = "text/html";
    const BLOB = new Blob([html], {type: TYPE});
    const data = [new ClipboardItem({ [TYPE]: BLOB})];

    navigator.clipboard.write(data).then(
        () => {
            // clipboard successfully set
        },
        (err) => {
            // clipboard write failed
            console.log(err);
        });
}


// <a href="https://www.flaticon.com/free-icons/tab" title="tab icons">Tab icons created by Freepik - Flaticon</a>
