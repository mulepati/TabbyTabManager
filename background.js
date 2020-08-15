chrome.tabs.query({},function(tabs){
    let i = 0;
    tabs.forEach(function(tab){
      console.log(tab.url + '\n');
      console.log(tab.windowId);
      i += 1;
    });
    console.log(i);
 });
