chrome.runtime.onInstalled.addListener((details) => {
  const parent = chrome.contextMenus.create({
    id: "parent",
    title: "WineSearch",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: parent,
    id: "cellar-tracker",
    title: "to CellarTracker",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "vivino",
    title: "to Vivino",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "wine-searcher",
    title: "to WineSearcher",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  switch (item.menuItemId) {
    case "cellar-tracker":
      searchCellarTracker(item.selectionText);
      break;
    case "vivino":
      searchVivino(item.selectionText);
      break;
    case "wine-searcher":
      searchWineSearcher(item.selectionText);
      break;
  }
});

const searchCellarTracker = (text) => {
  const url = new URL("https://www.cellartracker.com/list.asp?fInStock=0&Table=List&iUserOverride=0");
  url.searchParams.set('szSearch', text);
  chrome.tabs.create({ url: url.href });
}

const searchVivino = (text) => {
  const url = new URL("https://www.vivino.com/search/wines");
  url.searchParams.set('q', text);
  chrome.tabs.create({ url: url.href });
}

const searchWineSearcher = (text) => {
  const url = new URL(`https://www.wine-searcher.com/find/${text}/1/japan/-/x#t6`);
  chrome.tabs.create({ url: url.href });
}
