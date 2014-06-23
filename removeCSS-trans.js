function removeMini() {
  var el = document.getElementById("t_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }
  
  $("#J_transdislrc").click();
  
  // if (document.getElementById("to_xiamini")) return;
  // var el = document.createElement("script");
  // el.id = "to_xiamini";
  // el.type = 'text/javascript';
  // el.src = chrome.extension.getURL("showTrans.js");
  // headEl = document.getElementsByTagName("head")[0];
  // headEl.appendChild(el);
}
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	// //var url = message;
	// alert("5678");
 // });
removeMini();