import LocalEchoController from '../js/import/local-echo/local-echo.js';

let localEcho;
const term = new Terminal({
  fontFamily: "'Roboto Mono', monospace",
  cols: 100,
  rows: 8,
  cursorBlink: true
});

/**
 * Initialize terminal.
 *
 * @author Osman Cagri GENC
 */
function initTerminal() {
  term.open(document.getElementById('terminal'));
  localEcho = new LocalEchoController(term);
  term.write('Welcome to Sazik.Dev \r\n');
  term.write('\r\n');
  vueApp.$data.terminalObject = term;
  // console.log(vueApp)
  vueApp.calculatePixels();
}

/**
 * Handle terminal socket response.
 *
 * @author Osman Cagri GENC
 */
socket.on('term-response', (result) => {
  localEcho.println(result);

  handleUserInput();
});

/**
 * Handle terminal process end.
 *
 * @author Osman Cagri GENC
 */
socket.on('process-end', () => {
  vueApp.inExecution = false;
  handleUserInput();
});

/**
 * Handle user key input.
 *
 * @author Osman Cagri GENC
 */
function handleUserInput() {
  localEcho
    .read('$ ')
    .then((input) => {
      socket.emit('term-cmd', input);
    })
    .catch((error) => console.log(`Error reading: ${error}`));
}

/**
 * Runs as soon as the page is ready.
 *
 * @author Osman Cagri GENC
 */
$(document).ready(() => {
  initTerminal();
  handleUserInput();
});
