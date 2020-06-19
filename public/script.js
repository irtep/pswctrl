import { addNewEntry, copyToClipboardMsg } from './functions.js';
const allDivs = document.getElementById('container');
const passInput = document.getElementById('passInput');
const passAsker = document.getElementById('passAsker');
const infoScreen = document.getElementById('infoScreen');
const downLeft = document.getElementById('downLeft');
const downRight = document.getElementById('downRight');
const checkingPass = document.getElementById('passInput').addEventListener("change", checkPass);
const sendNewEntry = document.getElementById('sendNew').addEventListener('click', addNewEntry);
let allData = null;

// this shows data of the clicked information
function showData(clickedElement) {
  // find the data:
  allData.forEach( (dataEntry, idx) => {
    if (dataEntry._id === clickedElement.target.id) {
      // add data
      downRight.innerHTML = allData[idx].response;
      // copy to clipboard
      copyToClipboardMsg(downRight, "msg");
      window.scrollTo(0, 0);
    }
  });
}

function checkPass(pass) {
  // correct password length
  if (pass.target.value.length === 7) {
    const passu = pass.target.value;
    const http = new XMLHttpRequest();
    const url = '/showAll';
    let params = 'MSG=' + passu;
    
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        const records = JSON.parse(http.responseText);
        //const records = http.responseText;
        console.log('got records', records);
        if (records === 'wrong password') {
          infoScreen.innerHTML = 'wrong password!';
        } else {
          // correct pw
          infoScreen.innerHTML = '';
          passAsker.classList.add('invis');
          allDivs.classList.remove('invis');
          allData = records;
          allData.forEach( data => {
            //data.question
            // add question to page
            downLeft.innerHTML += `<p id= ${data._id} class= "clickable">${data.question}</p>`;
            // add event listener to this
            const elements = document.getElementsByClassName('clickable');
            for (var i = 0; i < elements.length; i++) {
              elements[i].addEventListener('click', showData, false);
            }
          });
        }
      }
    }
    http.send(params);
  } else {
    infoScreen.innerHTML = 'wrong password!';
  }
  
}
window.onload = (()=> { 
  const allDivs = document.getElementById('container');
  allDivs.classList.add('invis');
});