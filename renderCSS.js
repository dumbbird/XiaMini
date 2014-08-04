var loadMini = function() {
  //alert("6666");
  if (document.getElementById("g_xiamini")) return;
  var el = document.createElement("link");
  el.id = "g_xiamini";
  el.rel = "stylesheet";
  el.href = chrome.extension.getURL("xiaMini.css");
  headEl = document.getElementsByTagName("head")[0];
  headEl.appendChild(el);
};

loadMini();