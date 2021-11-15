// declarations

const socket = io();

const elements = fetch('/static/elements.json').then(res => res.json());

async function render(data, template, parent) {
    await elements.then((res) => {
        data.forEach(item => {
            const rendered = Mustache.render(res[template], item);
            parent.innerHTML += rendered;
        });
    });
}

function $(element) {
    return document.querySelector(element);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? parseInt(decodeURIComponent(matches[1])) : undefined;
}

function transformDate(date) {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}`;
}


// // socket events

socket.on('chats', async (data) => {
    data.forEach(item => {
        item.createdAt = transformDate(data[0].createdAt);
    });
    await render(data, 'contact', $('.direct'));

    document.querySelectorAll('.contact').forEach(item => {
        item.addEventListener('click', async () => {
            if ($('.active')) {
                $('.active').classList.remove('active');
            }
            item.classList.add('active');
            await socket.emit('joinChats', item.id, getCookie('user-id'));
        })
    });
});

socket.on('history', async (data) => {
    data.forEach(item => {
        item.time = transformDate(item.time);
        if($('.active').getAttribute('name') != item.firstName) {
            item.direction = 'outgoing';
        }
    });
    $('.messages').innerHTML = '';
    await render(data, 'message', $('.messages'));

    $('.chat').scrollTop = $('.chat').scrollHeight;
});

socket.on('message', async (data) => {
    data.direction = 'outgoing';
    await render([data], 'message', $('.messages'));
    $('.chat').scrollTop = $('.chat').scrollHeight;
});


// HTMLElements events

document.addEventListener('DOMContentLoaded', async () => {
    await elements.then((res) => {
        document.getElementsByTagName('style')[0].innerHTML += res.styles;
    })

    await socket.emit('getChats', getCookie('user-id'));
});

$('.message-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const message = event.target.elements.message.value;
    socket.emit('chatMessage', message, getCookie('user-id'), $('.active').id);

    event.target.elements.message.value = "";
    event.target.elements.message.focus();
});

$('.search-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    console.log(name);
});