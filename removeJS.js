function removeMini() {
  var el = document.getElementById("h_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }
  
  if (document.getElementById("co_xiamini")) return;
  var el = document.createElement("script");
  el.id = "co_xiamini";
  el.type = 'text/javascript';
  el.src = chrome.extension.getURL("Collections-off.js");
  headEl = document.getElementsByTagName("head")[0];
  headEl.appendChild(el);
}
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	// //var url = message;
	// alert("5678");
 // });
removeMini();