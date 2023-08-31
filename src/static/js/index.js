/* Event listeners */
window.onload=function(){
  const copy = document.getElementById("copy");
  copy.addEventListener("click", copyOnClipboard);
}

/* Functions */
function getConfig() {

  copyOnClipboard(config);
  document.getElementsByClassName("result").addClass()
}

function copyOnClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = "AKSDLASKHDAS";
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

