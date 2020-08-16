// click event listener for "view all tabs" button on popup
document.getElementById("view").addEventListener("click", displayTabs);
document.getElementById("voice").addEventListener("click", voiceAssistant);

// display all tabs
function displayTabs() {
    // map:
    // keys: window id
    // values: array of tabs
    let tabInfo = new Map();

    // Get info for all tabs
    chrome.tabs.query({}, function(tabs) {
        let allTabs = []; // array of all tabs
        //let favicons = []; // array of all favicon urls
        tabs.forEach(function(tab) {
            // add to array of all tabs
            allTabs.push(tab);

            // parse url and create favicon url
            // let parseUrl = tab.url.split("/");
            // let faviconUrl = parseUrl[0].concat("//").concat(parseUrl[2]).concat("/favicon.ico");
            // favicons.push(faviconUrl);

            let windowID = tab.windowId;
            if (!tabInfo.has(windowID)) {
                tabInfo.set(windowID, [])
            }

            // even indexes = tab urls
            // odd indexes = tab title
            tabInfo.get(windowID).push(tab);

        });

        let windows = tabInfo.keys();
        let windowCount = 1;

        let currentWindow = windows.next();
        while (!currentWindow.done) {
            let windowID = currentWindow.value;
            // WINDOW TITLE
            let windowTitle = document.createElement("input");
            windowTitle.placeholder = "Window " + windowCount;
            document.body.appendChild(windowTitle);

            let tabs = tabInfo.get(windowID);
            for (let i = 0; i < tabs.length; i ++) {
                let tab = tabs[i];

                // FAVICON ICONS!
                let parseUrl = tab.url.split("/");
                let faviconUrl = parseUrl[0].concat("//").concat(parseUrl[2]).concat("/favicon.ico");
                let img = document.createElement("img");
                img.src = faviconUrl;
                img.height = 32;
                img.width = 32;
                img.onerror = function(){
                    img.src = "./32x32.png";
                };

                // TAB TITLES!
                let tabTitle = document.createElement("p");
                tabTitle.innerHTML = tab.title;

                // Append new elements
                document.body.appendChild(img);
                document.body.appendChild(tabTitle);
            }
            // Update current window
            currentWindow = windows.next();
            windowCount++;
        }

        // for (let i = 0; i < favicons.length; i++) {
        //     /*let img = document.createElement("img");
        //     img.src = favicons[i];
        //     img.height = 32;
        //     img.width = 32;
        //     img.id = i;
        //     img.onerror = function(){
        //         img.src = "./32x32.png";
        //     };*/
        //
        //     /*let h = document.createElement("p");
        //     let t = document.createTextNode(allTabs[i].title);
        //     h.appendChild(t);
        //     document.body.appendChild(img);
        //     document.body.appendChild(h);*/
        // }
    });


}

// voice assistant
function voiceAssistant() {

}