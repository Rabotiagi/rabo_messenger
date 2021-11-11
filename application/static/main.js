const elements = fetch(`/static/elements.json`).then(res => res.json());
function $(element) {
    return document.querySelector(element);
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// socket events

const socket = io();

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

socket.on('message', (message) => {
    renderMessage(message);
    $('.chat').scrollTop = $('.chat').scrollHeight;
});

socket.on('chats', (data) => {
    //console.log(data);
    initContent(data);
});

socket.on('history', async (data) => {
    console.log(data);
    //await render(data, 'message', $('.messages'));
});

// HTMLElements events

document.addEventListener('DOMContentLoaded', async () => {
    await getChats();
});

$('.message-form').addEventListener('submit', (event) => {
    sendMessage(event);
});


// functions

async function getChats() {
    await socket.emit('getChats', +getCookie('user-id'));
}

async function render(data, template, parent) {
    await elements.then((res) => {
        if (template == 'message' || template == 'profile') {
            parent.innerHTML = '';
        }
        data.forEach(item => {
            const rendered = Mustache.render(res[template], item);
            parent.innerHTML += rendered;
        });
    }).then(() => {
        if (template == 'message') {
            $('.chat').scrollTop = $('.chat').scrollHeight;
        }
    });
}

async function initContent(data) {
    //await render(data, 'group', $('.groups'));
    await render(data, 'contact', $('.pinned'));
    //await render(data, 'contact', $('.direct'));

    document.querySelectorAll('.contact').forEach(item => {
        item.addEventListener('click', async () => {
            await socket.emit('joinChats', +getCookie('user-id'));
        })
    });
}

function sendMessage(event) {
    event.preventDefault();

    const message = event.target.elements.msg.value;
    socket.emit('chatMessage', message, +getCookie('user-id'), 1);

    event.target.elements.msg.value = "";
    event.target.elements.msg.focus();
}

function renderMessage(message) {
    elements.then((res) => {
        const rendered = Mustache.render(res.message, message);
        $('.messages').innerHTML += rendered;
    })
}