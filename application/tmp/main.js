const messageForm = document.querySelector(".message-form");
const messageField = document.querySelector(".messages");
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

  messageField.scrollTop = messageField.scrollHeight;
});

//

messageForm.addEventListener("submit", (e) => {
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
    <div class="image"></div>
    <div class="message">
        <div class="name-time">
            <div class="name">${message.username}</div>
            <div class="time">${message.time}</div>
        </div>
        <div class="text">${message.message}</div>
    </div>`;
    messageField.appendChild(div);
}

// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// function outputUsers(users) {
//   userList.innerHTML = `${users
//     .map(user => `<li>${user.username}</li>`)
//     .join('')}`;
// }