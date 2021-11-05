const socket = io(baseURL);
const editor = document.getElementById('editor');

/**
 * Initialize the page
 *
 * @author Osman Cagri GENC
 */
function init() {}

/**
 * Returns the name of the room sent by parameter
 *
 * @author Osman Cagri GENC
 */
function getRoomName() {
  let regexUrl = /([a-z]+:\/\/){1}([a-z]+(:[0-9]+|(\.[a-z]+)+)\/(code){1}\/)/;

  let url = window.location.href.replace(regexUrl, '');

  let roomName = url.split('/')[0];
  
  return roomName;
}

/**
 * Connects to desired code room
 *
 * @author Osman Cagri GENC
 */
function joinCodeRoom(fileName) {
  socket.emit('join-code', getRoomName() + '#' + fileName);
}

/**
 * Function performed as soon as page is fully loaded
 *
 * @author Osman Cagri GENC
 */
$(document).ready(() => {
  init();
});
