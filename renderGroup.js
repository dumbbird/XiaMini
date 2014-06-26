	
var loadGroup = function() {
   var el = document.createElement("a");
	el.id = "gr_xiamini";
	el.className = 'bigtext middle  ';
	el.href = '/group';
	el.innerHTML = '小组';
  headEl = document.getElementsByClassName('subnav')[0];
  headEl.style.width = '320px';
  headEl.insertBefore(el, headEl.childNodes[3]);
  // sale = document.getElementsByClassName['bigtext last'][0];
  // sale.childNodes[0].style.display = 'none';
};

function removeGroup() {
  var el = document.getElementById("gr_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }

}
//alert("6676");
removeGroup();
loadGroup();

