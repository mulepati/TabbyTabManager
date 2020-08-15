chrome.tabs.query({},function(tabs){
    let parse = [];
    let i = 0;
    tabs.forEach(function(tab){
        parse.push(tab);
        console.log(tab.url + '\n');
        console.log(tab.windowId);
        i += 1;
    });
    console.log(parse.length);
 });
