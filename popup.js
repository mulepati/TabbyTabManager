// click event listener for "view all tabs" button on popup
document.getElementById("view").addEventListener("click", displayTabs);
document.getElementById("voice").addEventListener("click", voiceAssistant);

// display all tabs
function displayTabs() {
    chrome.tabs.query({}, function(tabs) {
        let parse = [];
        let favicons = [];
        tabs.forEach(function(tab) {
            parse.push(tab);
            let parseUrl = tab.url.split("/");
            let faviconUrl = parseUrl[0].concat("//").concat(parseUrl[2]).concat("/favicon.ico");
            favicons.push(faviconUrl);
        });

        for (let i = 0; i < favicons.length; i++) {
            let btn = document.createElement("BUTTON");
            btn.innerHTML = favicons[i];
            document.body.appendChild(btn);
        }
    });


}

// voice assistant
function voiceAssistant() {
}