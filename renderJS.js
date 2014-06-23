var loadMini = function() {
  //alert("6666");
  if (document.getElementById("h_xiamini")) return;
  var jq = document.createElement("script");
  jq.id = "jq_xiamini";
  jq.type = 'text/javascript';
  jq.async = true;
  jq.src = chrome.extension.getURL("jquery-2.1.1.min.js");
  headEl = document.getElementsByTagName("head")[0];
  headEl.appendChild(jq);
  var el = document.createElement("script");
  el.id = "h_xiamini";
  el.type = 'text/javascript';
  el.async = true;
  el.src = chrome.extension.getURL("Collections.js");
  headEl = document.getElementsByTagName("head")[0];
  headEl.appendChild(el);
};
function removeMini() {
  var el = document.getElementById("h_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }
  el = document.getElementById("co_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

removeMini();
loadMini();

