	
var loadNotes = function() {
  //alert("6666");
  if (document.getElementById("ln_xiamini")) return;
  
  var el = document.createElement("div");
  el.id = "ln_xiamini";
  el.className = 'ui_m3_r';
  el.innerHTML = '<iframe src=' + chrome.extension.getURL("lyricsnotes.html") + ' width="100%" height="500px">';
  headEl = document.getElementsByClassName("set_sec")[0];
  headEl.appendChild(el);

};

function removeNotes() {
  var el = document.getElementById("ln_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }

}

removeNotes();
loadNotes();

