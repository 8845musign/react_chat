var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// server側で保持するデータ
var members = {
  cnt : 0,
  list : []
}

// 静的ファイル
app.use(express.static('public'));

// ユーザの接続
io.on('connection', function(socket){
  console.log('A member connect: ' + socket.id);
  members.list.push({
    id : socket.id,
    name : socket.handshake.query.name
  });

  // 全員に入室を通知
  io.emit('ENTER_MEMBER', {
    enter : {
      id : socket.id,
      name : socket.handshake.query.name
    },
    list : members.list
  });

  // クライアント側からの発言を受信
  socket.on('SENT_MESSAGE', function(value){
    var name = getNameFromId('/#' + value.id);
    // 全員に発言を送信
    io.emit('RECEIVE_MESSAGE', { body: value.message, name: name, time: new Date().getTime() });
  });

  // メンバーの退室
  socket.on('disconnect', function() {
    console.log("A member disconnect: " + socket.id);
    
    var id = socket.id;
    var name = getNameFromId(id);

    // データからメンバーを削除
    removeMember(id);

    // 全員に退室を通知
    io.emit('EXIT_MEMBER', {
      exit : {
        id : id,
        name : name
      },
      list : members.list
    });

  });
});

// Serverの立ち上げ
http.listen(3000, function(){
  console.log('listening on *:3000')
});


/**
 * IDから名前を取り出す
 */
function getNameFromId(id) {
  var name = '';

  console.log(members.list);

  members.list.some(function(member){
    if (id === member.id) {
      name = member.name;
      return true;
    }
  });
  
  return name;
}

function removeMember(id) {
  members.list.forEach(function(member, index){
    if (member.id === id) {
       var delMember = {
         id : member.id,
         name : member.name
       }
       members.list.splice(index, 1);
       return delMember;
    }
  });
  
  return null;
}