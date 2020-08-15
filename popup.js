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
            let img = document.createElement("img");
            img.src = favicons[i];
            img.height = 32;
            img.width = 32;
            img.onerror = function(){
                img.src = "./32x32.png";
            };
            document.body.appendChild(img);
        }
    });


}

// voice assistant
function voiceAssistant() {

}