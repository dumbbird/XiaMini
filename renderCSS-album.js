var loadMini = function() {
  //alert("6666");
  if (document.getElementById("g_xiamini")) return;
  var el = document.createElement("link");
  el.id = "g_xiamini";
  el.rel = "stylesheet";
  el.href = chrome.extension.getURL("xiaMini-album.css");
  headEl = document.getElementsByTagName("head")[0];
  headEl.appendChild(el);
};

function removeMini() {
  var el = document.getElementById("g_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

removeMini();
loadMini();

