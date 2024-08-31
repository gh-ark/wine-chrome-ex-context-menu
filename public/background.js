chrome.runtime.onInstalled.addListener((details) => {
  const parent = chrome.contextMenus.create({
    id: "parent",
    title: "WineSearch",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: parent,
    id: "wine-searcher",
    title: "to WineSearcher",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "vivino",
    title: "to Vivino",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  switch (item.menuItemId) {
    case "wine-searcher":
      searchWineSearcher(item.selectionText);
      break;
    case "vivino":
      searchVivino(item.selectionText);
      break;
  }
});

const searchWineSearcher = (text) => {
  const url = new URL(`https://www.wine-searcher.com/find/${text}/1/japan/-/x`);
  chrome.tabs.create({ url: url.href });
}

const searchVivino = (text) => {
  const url = new URL("https://www.vivino.com/search/wines");
  url.searchParams.set('q', text);
  chrome.tabs.create({ url: url.href });
}
