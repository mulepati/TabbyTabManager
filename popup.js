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
            windowTitle.document
            // If you click the window title, will focus/open the given window
            windowTitle.onclick = function() {
                chrome.windows.update(windowID, {focused : true}, function(tab){});
            };
            windowTitle.innerHTML = "Window " + windowCount;
            dropzone.appendChild(windowTitle);
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

                // Append new elements
                drag.appendChild(img);
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
        console.log("done");
        makeTabsDraggable();
    });
}

function makeTabsDraggable() {
    let dragSrcEl = null;

    function handleDragStart(e) {
        console.log("Drag started!");
        dragSrcEl = this;
        console.log(this);
        this.style.opacity = '0.4';

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation();
        console.log(this);

        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            event.preventDefault();
        }

        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }

    let items = document.querySelectorAll('.box');
    console.log(items);
    items.forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}

// voice assistant
function voiceAssistant() {

}