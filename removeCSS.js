function removeMini() {
  var el = document.getElementById("g_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }
  el = document.getElementById("ln_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }
}
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	// //var url = message;
	// alert("5678");
 // });
removeMini();