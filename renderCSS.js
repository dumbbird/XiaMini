var loadMini = function() {
  if (document.getElementById("g_xiamini")) return;
  var el = document.createElement("link");
  el.id = "g_xiamini";
  el.rel = "stylesheet";
  el.href = chrome.extension.getURL("xiaMini.css");
  headEl = document.getElementsByTagName("head")[0];
  headEl.appendChild(el);
};

function removeMini() {
  var el = document.getElementById("gc_xiamini");
  if (el) {
     el.parentNode.removeChild(el);
	 el = 0;
   }
   el = document.getElementById("gg_xiamini");
   if (el) {
     el.parentNode.removeChild(el);
   }
 }

removeMini();
loadMini();