chrome.tabs.query({}, function(tabs) {
    let parse = [];
    let favicons = [];
    tabs.forEach(function(tab) {
        parse.push(tab);
        let parseUrl = tab.url.split("/");
        let faviconUrl = parseUrl[0].concat("//").concat(parseUrl[2]).concat("/favicon.ico");
        favicons.push(faviconUrl);
    });
    console.log(favicons);
});