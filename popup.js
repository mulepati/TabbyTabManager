// click event listener for "view all tabs" button on popup
document.getElementById("view").addEventListener("click", displayTabs);
document.getElementById("voice").addEventListener("click", voiceAssistant);

// display all tabs
function displayTabs() {
    chrome.tabs.query({}, function(tabs) {
        let parse = [];
        tabs.forEach(function(tab) {
            parse.push(tab);
            console.log(tab.url + '\n');
            console.log(tab.windowId);
        });
        console.log(parse.length);
    });
}

// voice assistant
function voiceAssistant() {
}