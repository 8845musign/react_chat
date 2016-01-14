var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var members = {
  cnt : 0,
  list : []
}

app.use(express.static('public'));

io.on('connection', function(socket){
  members.list.push({
    id : socket.id,
    name : socket.handshake.query.name
  });

  io.emit('ENTER_MEMBER', {
    enter : {
      id : socket.id,
      name : socket.handshake.query.name
    },
    list : members.list
  });

  socket.on('SENT_MESSAGE', function(value){
    var name = getNameFromId('/#' + value.id);
    io.emit('RECEIVE_MESSAGE', { body: value.message, name: name, time: new Date().getTime() });
  });});

http.listen(3000, function(){
  console.log('listening on *:3000')
});


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

// function removeMember(id) {
//   members.list.forEach(function(member, index){
//     if (member.id === id) {
//        var delMember = {
//          id : member.id,
//          name : member.name
//        }
//        member.list.splice(index, 1);
//        return delMember;
//     }
//   });
  
//   return null;
// }