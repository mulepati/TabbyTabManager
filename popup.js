document.getElementById("toggle").addEventListener("click", toggleTabs);
document.getElementById("voice").addEventListener("click", voiceAssistant);

function toggleTabs() {
    let btn = document.getElementById("toggle");
    if (btn.innerHTML === "View all tabs") {
        displayTabs();
        btn.innerHTML = "Hide all tabs";
    } else {
        hideTabs();
        btn.innerHTML = "View all tabs";
    }
}

function hideTabs() {
    let div = document.getElementById("div");
    div.parentNode.removeChild(div);
}

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

        // NEW DIV TAG
        let newDiv = document.createElement("div");
        newDiv.id = "div";

        let windows = tabInfo.keys();
        let windowCount = 1;
        let currentWindow = windows.next();
        while (!currentWindow.done) {

            // New div class for each window, acts as dropzones
            let dropzone = document.createElement("div");
            dropzone.id = "div " + windowCount;
            dropzone.className = "dropzones";

            let windowID = currentWindow.value;
            // WINDOW TITLE!
            let windowTitle = document.createElement("header");
            // If you click the window title, will focus/open the given window
            windowTitle.onclick = function() {
                chrome.windows.update(windowID, {focused : true}, function(tab){});
            };
            windowTitle.innerHTML = "Window " + windowCount;

            // Delete entire window
            let deleteWindow = document.createElement("p");
            deleteWindow.innerHTML = "delete window";
            deleteWindow.onclick = function(){
                chrome.windows.remove(windowID);
            };

            // Append to div
            dropzone.appendChild(windowTitle);
            dropzone.appendChild(deleteWindow);
            dropzone.setAttribute("ondragover", "onDragOver(event);");
            dropzone.setAttribute("ondrop", "onDrop(event);");

            // For each tab under the current window, display favicon and title
            let tabs = tabInfo.get(windowID);
            for (let i = 0; i < tabs.length; i ++) {
                // New div class for each tab, acts as draggable elements
                let drag = document.createElement("div");
                drag.className = "box";
                
                let tab = tabs[i];
                drag.id = "" + tab;
                let url = tab.url;

                // FAVICON ICONS!
                let parseUrl = url.split("/");
                let faviconUrl = parseUrl[0].concat("//").concat(parseUrl[2]).concat("/favicon.ico");
                let img = document.createElement("img");
                img.src = faviconUrl;
                img.height = 32;
                img.width = 32;
                img.onclick = function(){
                    chrome.windows.update(windowID, {focused : true}, function(tab){});
                    chrome.tabs.highlight({windowId: windowID, tabs: i});
                };
                img.onerror = function(){
                    img.src = "./32x32.png";
                };

                // TAB TITLES!
                let title = document.createElement("p");
                title.innerHTML = tab.title;
                title.onclick = function(){
                    chrome.windows.update(windowID, {focused : true}, function(tab){});
                    chrome.tabs.highlight({windowId: windowID, tabs: i});
                };

                // Delete specific tab
                let deleteTab = document.createElement("p");
                deleteTab.innerHTML = "delete tab";
                deleteTab.onclick = function(){
                    chrome.tabs.remove(tab.id);
                };

                // Append new elements
                drag.appendChild(img);
                drag.appendChild(deleteTab);
                drag.appendChild(title);
                drag.setAttribute("draggable", "true");

                dropzone.appendChild(drag);
            }

            newDiv.appendChild(dropzone);
            document.body.append(newDiv);
            // Update current window
            currentWindow = windows.next();
            windowCount++;
        }

    });


}

// voice assistant
function voiceAssistant() {

}