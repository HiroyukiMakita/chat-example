const Http = require('http');
const SocketIo = require('socket.io');
const Fs = require('fs');

// node サーバー http://localhost:3333
const server = Http.createServer(function (req, res) {
  // サーバーからのレスポンスヘッダー設定
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // サーバーからのレスポンスで HTML を返す
  res.end(Fs.readFileSync(__dirname + '/index.html', 'utf-8'));
}).listen(3333); // ポート競合の場合は値を変更

const io = SocketIo(server);

io.sockets.on('connection', function (socket) {
  // クライアントからメッセージを受信する
  socket.on('client_to_server', function (data) {
    // クライアントにメッセージを送信する
    io.sockets.emit('server_to_client', { value: data.value });
  });
});
