
var loadMini = function() {
  //alert("6666");
  if (document.getElementById("t_xiamini")) return;
  var el = document.createElement("link");
  el.id = "t_xiamini";
  el.rel = 'stylesheet';
  el.href = chrome.extension.getURL("hideTrans.css");
  headEl = document.getElementsByTagName("body")[0];
  headEl.appendChild(el);
  $("#J_transdislrc").click();
};
function removeMini() {
  var el = document.getElementById("t_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }
 }

removeMini();
loadMini();



