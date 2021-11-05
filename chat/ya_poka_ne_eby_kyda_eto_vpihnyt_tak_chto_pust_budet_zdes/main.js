const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".third");
//const roomName = document.getElementById("room-name");
//const userList = document.getElementById("users");

const socket = io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("joinRoom", { username, room });

socket.on("refreshChat", ({ users, room }) => {
  //outputRoomName(room);
  //outputUsers(users);
});

socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `
    <div class="message">
        <div class="name">${message.username}</div>
        <div class="time">${message.time}</div>
        <div class="text">${message.message}</div>
    </dvi>`;
    chatMessages.appendChild(div);
}

// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// function outputUsers(users) {
//   userList.innerHTML = `${users
//     .map(user => `<li>${user.username}</li>`)
//     .join('')}`;
// }