// click event listener for "view all tabs" button on popup
document.getElementById("view").addEventListener("click", displayTabs);
document.getElementById("voice").addEventListener("click", voiceAssistant);

// Display icons and titles of all tabs in all chrome windows
function displayTabs() {
    // keys: window id
    // values: array of tabs
    let tabInfo = new Map();

    // Get all tabs in each window
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            // Add window ID to map if it isn't already there
            let windowID = tab.windowId;
            if (!tabInfo.has(windowID)) {
                tabInfo.set(windowID, [])
            }

            // Add tab to array of tabs under window id key
            tabInfo.get(windowID).push(tab);

        });

        let windows = tabInfo.keys();
        let windowCount = 1;

        let currentWindow = windows.next();
        while (!currentWindow.done) {
            let windowID = currentWindow.value;
            // WINDOW TITLE!
            let windowTitle = document.createElement("input");
            windowTitle.placeholder = "Window " + windowCount;
            document.body.appendChild(windowTitle);

            // For each tab under the current window, display favicon and title
            let tabs = tabInfo.get(windowID);
            for (let i = 0; i < tabs.length; i ++) {
                let tab = tabs[i];
                let url = tab.url;

                // FAVICON ICONS!
                let parseUrl = url.split("/");
                let faviconUrl = parseUrl[0].concat("//").concat(parseUrl[2]).concat("/favicon.ico");
                let img = document.createElement("img");
                img.src = faviconUrl;
                img.height = 32;
                img.width = 32;
                let tabID = "id";
                img.id = tabID;
                img.onclick = function(){
                    chrome.tabs.highlight({windowId: windowID, tabs: i})
                };
                img.onerror = function(){
                    img.src = "./32x32.png";
                };

                // TAB TITLES!
                let title = document.createElement("p");
                title.id = url;
                title.innerHTML = tab.title;
                title.onclick = function(){
                    chrome.tabs.highlight({windowId: windowID, tabs: i})
                };

                // Append new elements
                document.body.appendChild(img);
                document.body.appendChild(title);
            }
            // Update current window
            currentWindow = windows.next();
            windowCount++;
        }

    });


}

// go to tab
// function goToTab(windowID, tabIndex) {
//     chrome.tabs.highlight({windowId: windowID, tabs: tabIndex})
// }

// voice assistant
function voiceAssistant() {

}