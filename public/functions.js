const allDivs = document.getElementById('container');
const passInput = document.getElementById('passInput');
const passAsker = document.getElementById('passAsker');
const infoScreen = document.getElementById('infoScreen');
const newQuestion = document.getElementById('newQuestion');
const newResponse = document.getElementById('newResponse');
const newUsername = document.getElementById('newUsername');

export function addNewEntry() {
  if (newQuestion.value !== '' && newResponse.value !== '') {
    const newEntry = {site: newQuestion.value, userName: newUsername.value, psw: newResponse.value}
    const pack = JSON.stringify(newEntry);
    const http = new XMLHttpRequest();
    const url = '/addNew';
    let params = 'MSG=' + pack;
    //console.log('new userEntry: ', newEntry);
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = () => {
      //console.log('sending champ: ', params);
    }
    http.send(params);
    newQuestion.value = '';
    newResponse.value = '';
    newUsername.value = '';
  }
}

// this is copy to clipboard mechanism:
// from my very early work, that i copied from somewhere from the internet...
	export function copyToClipboardMsg(elem, msgElem) {  // copy message
    //console.log('got: ', elem, msgElem);
		var succeed = copyToClipboard(elem);
	  var msg = null;
	    if (!succeed) {
	      msg = "Copy not supported or blocked.  Press Ctrl+c to copy."
	    } else {
	      msg = "Salasana kopioitu leikepöydälle. CONTROL+V voit liimata."
	    }
	    if (typeof msgElem === "string") {
	      msgElem = document.getElementById('infoScreen');
	    }
	  msgElem.innerHTML = msg;
	  setTimeout(() => {
	    msgElem.innerHTML = "";
	  }, 9000);
	}  // end of copy message
	function copyToClipboard(elem) {  // copy mechanism
		// create hidden text element, if it doesn't already exist
    //console.log('got 2: ', elem);
	  var targetId = "_hiddenCopyText_";
	  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
	  var origSelectionStart, origSelectionEnd;
	  if (isInput) {
	    // can just use the original source element for the selection and copy
	    target = elem;
	    origSelectionStart = elem.selectionStart;
	    origSelectionEnd = elem.selectionEnd;
	  } else {
	    // must use a temporary form element for the selection and copy
	    target = document.getElementById(targetId);
	    if (!target) {
	      var target = document.createElement("textarea");
	      target.style.position = "absolute";
	      target.style.left = "-9999px";
	      target.style.top = "0";
	      target.id = targetId;
	      document.body.appendChild(target);
	    }
	      target.textContent = elem.textContent;
	    }
	    // select the content
	    var currentFocus = document.activeElement;
	    target.focus();
	    target.setSelectionRange(0, target.value.length);
	    // copy the selection
	    var succeed;
	    try {
	    	succeed = document.execCommand("copy");
	    }
	    catch(e) {
	      succeed = false;
	    }
	    // restore original focus
	    if (currentFocus && typeof currentFocus.focus === "function") {
	      currentFocus.focus();
	    }
	    if (isInput) {
	      // restore prior selectio
	      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
	    }
	    else {
	      // clear temporary content
	      target.textContent = "";
	    }
	    return succeed;
	} // end of copy mechanism
