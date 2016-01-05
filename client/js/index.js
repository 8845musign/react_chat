'use strict'

import Socket from 'socket.io-client'

let socket = Socket();

let form = document.getElementById('form');
let input = document.getElementById('input');
form.addEventListener('submit', function(e){
  socket.emit('chat message', { id:socket.id, message: input.value });
  input.value = '';

  e.preventDefault();
});

let message = document.getElementById('messages');
socket.on('chat message', function(data){
  let text = `<li class="listChat__message"><span class="listChat__name">${ data.name }</span><span class="listChat__time">${ new Date(data.time).toLocaleString() }</span><span class="listChat__body">${ data.message }</span></li>`
  addMessage(text);
});

function addMessage(msg) {
  var li = document.createElement('li');
  li.innerHTML = msg;
  message.appendChild(li);  
}

let memberList = document.getElementById("memberList");
/**
 * {
 *  enter : "some name",
 *  list : [
 *    "aaaa",
 *    "bbbb",
 *    "cccc"
 *  ]
 * }
 */
socket.on('enter', function(value){
  if (socket.id === value.enter.id) {
   // 自分の名前
   document.getElementById('me').innerText = value.enter.name;
  } else {
    // 他の人が入った
    addMessage(value.enter.name + "さんが入室しました。");
  }
  
  updateMembers(value.list);
});

function updateMembers(members) {
  let membersFrag = document.createDocumentFragment();

  members.forEach(function(member){
    membersFrag.appendChild(createMemberLi(member.name));
  });

  memberList.innerHTML = '';
  memberList.appendChild(membersFrag);
  
  document.querySelector('.listParticipant__count').innerText = members.length;
}

socket.on('exit', function(value){
  updateMembers(value.list);
  addMessage(value.exit.name + "さんが退室しました。");
});

function createMemberLi(name) {
  let li = document.createElement('li');
  li.innerText = name;  
  return li;
}


/**
 * {
 *  exit : "some name",
 *  members : [
 *    "aaaa",
 *    "bbbb",
 *    "cccc"
 *  ]
 * }
 */
socket.on('exit', function(value){
});