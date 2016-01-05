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
  console.log('a user connected');

  var addMemberName = 'member' + (++members.cnt);
  members.list.push({
    id : socket.id,
    name : addMemberName
  });

  io.emit('enter', {
    enter : {
      id : socket.id,
      name : addMemberName
    },
    list : members.list
  });

  socket.on('disconnect', function(socket){
    console.log(arguments);
    console.log('user disconnected');
    console.log(socket.id);
    console.log(members.list);
    var delMember = removeMember(socket.id);    
    if (!delMember) return;

    io.emit('exit', {
      exit : {
        id : delMember.id,
        name : delMember.name
      },
      list : members.list
    });    
  });

  socket.on('chat message', function(value){
    var name = getNameFromId(value.id);
    io.emit('chat message', { message: value.message, name: name, time: new Date().getTime() });
  });});

http.listen(3000, function(){
  console.log('listening on *:3000')
});


function getNameFromId(id) {
  var name = '';

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
       member.list.splice(index, 1);
       return delMember;
    }
  });
  
  return null;
}