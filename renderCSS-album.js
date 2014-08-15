var loadMini = function() {
  if (document.getElementById("g_xiamini")) return;
  var el = document.createElement("link");
  el.id = "g_xiamini";
  el.rel = "stylesheet";
  el.href = chrome.extension.getURL("xiaMini-album.css");
  headEl = document.getElementsByTagName("head")[0];
  headEl.appendChild(el);
};

loadMini();

