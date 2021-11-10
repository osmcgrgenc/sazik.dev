require('dotenv').config();
let terminalSession = null;
const fs = require('fs');
const http = require('http');
const https = require('https');
const repl = require('repl');
const express = require('express');
const server = express();
const path = require('path');
const users = require('./User');
const code = require('./Code');
const userCode = require('./UserCode');
const UtilClass = require('../util/Util');
const { spawn } = require('child_process');
const REPLService = require('../service/REPLService');
const ErrorResponse = require('../model/response/ErrorResponse');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const codeServer = http.createServer(server);
const codeServerHttps = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
},server);
const socketCode = require('socket.io')(codeServerHttps);

/**
 * Express middleware
 *
 * @author Osman Cagri GENC
 */
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.resolve(__dirname + '/../../Front-end/')));
server.use(express.static(path.resolve(__dirname + '/../../node_modules/')));
server.use(users);
server.use(code);
server.use(userCode);

/**
 * CORS Control
 *
 * @author Osman Cagri GENC
 */
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://sazik.dev');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * Error handler
 *
 * @author Osman Cagri GENC
 */
server.use((err, req, res, next) => {
  if (!UtilClass.isNullOrEmpty(err.statusCode)) {
    res.status(err.statusCode).json(new ErrorResponse(err.statusCode, err.message, err.stack));
  } else {
    res.status(500).json(new ErrorResponse(500, err.message, null));
  }

  next();
});

/**
 * Redirect user to coding page.
 *
 * @author Osman Cagri GENC
 */
server.get('/code/:codeid?', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../Front-end/code.html'));
});

/**
 * Redirect to index
 * 
 * @author Osman Cagri GENC
 */
server.get('/index', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../Front-end/index.html'));
});

/**
 * Function performed when there is a new socket connection.
 *
 * @author Osman Cagri GENC
 */
socketCode.on('connection', (socket) => {
  socket.on('join-code', (room) => {
    socket.leaveAll();
    socket.join(room);
  });

  socket.on('code-change', (evt) => {
    socket.to(evt[0]).emit('code-change', evt[1]);
  });

  socket.on('file-stop', (evt) => {
    killTerminalSession();
  });

  socket.on('file-execute', (evt) => {
    if (terminalSession === null) {
      const replService = REPLService.init();

      terminalSession = replService.getTerminalSession(evt[0], evt[1], evt[2]);

      socket.emit('term-response', evt[0] + ' ' + process.env.CODE_LOCATION + evt[1] + '/' + evt[2], '-i');
    }

    terminalSession.stdin.setEncoding('utf8');
    terminalSession.stdout.setEncoding('utf8');
    terminalSession.stderr.setEncoding('utf8');

    terminalSession.stdout.on('data', (data) => {
      socket.emit('term-response', data);
    });

    terminalSession.stderr.on('data', (data) => {
      killTerminalSession();
      socket.emit('process-end');
      socket.emit('term-response', data);
    });

    terminalSession.on('error', (error) => {
      killTerminalSession();
      socket.emit('process-end');
      socket.emit('term-response', error.message);
    });

    terminalSession.on('close', (codeNum) => {
      killTerminalSession();
      socket.emit('term-response', `child process exited with code ${codeNum}`);
      socket.emit('process-end');
    });

    terminalSession.stdin.on('error', (data) => {
      return;
    });
  });

  socket.on('term-cmd', (evt) => {
    if (terminalSession !== null) {
      terminalSession.stdin.write(evt + '\n');
    } else {
      socket.emit('term-response', 'Please, run a file to send input.');
    }
  });
});

/**
 * Kills the terminal session.
 *
 * @author Osman Cagri GENC
 */
function killTerminalSession() {
  if (terminalSession !== null) {
    terminalSession.kill();
    terminalSession = null;
  }
}

/**
 * Server port listener.
 *
 * @author Osman Cagri GENC
 */
codeServer.listen(8000);
codeServerHttps.listen(8443);