const elements = fetch(`/static/elements.json`).then(res => res.json());
function $(element) {
    return document.querySelector(element);
}

// socket events

const socket = io();

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

socket.emit("joinRoom", { username, room });

socket.on("refreshChat", ({ users, room }) => {
  
});

socket.on('message', (message) => {
    renderMessage(message);
    $('.chat').scrollTop = $('.chat').scrollHeight;
});


// HTMLElements events

document.addEventListener('DOMContentLoaded', () => {
    initContent();
});

$('.message-form').addEventListener('submit', (event) => {
    sendMessage(event);
});


// functions

function sendMessage(event) {
    event.preventDefault();

    const message = event.target.elements.msg.value;
    socket.emit("chatMessage", message);

    event.target.elements.msg.value = "";
    event.target.elements.msg.focus();
}

function renderMessage(message) {
    elements.then((res) => {
        const rendered = Mustache.render(res.message, message);
        $('.messages').innerHTML += rendered;
    })
}

async function loadData(info, template, parent) {
    await elements.then((res) => {
        if (template == 'message' || template == 'profile') {
            parent.innerHTML = '';
        }
        info.forEach(item => {
            const rendered = Mustache.render(res[template], item);
            parent.innerHTML += rendered;
        });
    }).then(() => {
        if (template == 'message') {
            $('.chat').scrollTop = $('.chat').scrollHeight;
        }
    });
}

async function initContent() {
    await loadData(groupsData, 'group', $('.groups'));
    await loadData(pinnedContactsData, 'contact', $('.pinned'));
    await loadData(directContactsData, 'contact', $('.direct'));

    document.querySelectorAll('.contact').forEach(item => {
        item.addEventListener('click', () => {
            const partner = item.getAttribute('name');
            loadData(chatsData[partner], 'message', $('.messages'));
            loadData(profileData[partner], 'profile', $('.profile'));
        })
    });
}





groupsData = [{}, {}, {}, {}, {}, {}];
pinnedContactsData = [
    {name: 'Artem', message: 'AMOGUUUUS', time: '5h ago'},
    {name: 'Oleg', message: 'AMOGUUUUS', time: '5h ago'},
    {name: 'Nikita', message: 'AMOGUUUUS', time: '5h ago'}
];
directContactsData = [
    {name: 'Oleg', message: 'AMOGUUUUS', time: '5h ago'},
    {name: 'Artem', message: 'AMOGUUUUS', time: '5h ago'},
    {name: 'Nikita', message: 'AMOGUUUUS', time: '5h ago'}
];
chatsData = {
    Artem: [
        {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
        {author: 'outgoing', name: 'Yaroslav', time: '12:23', text: 'yuagdfasdsadsadadasdasdsadasddsagdsfgukydsgyufgudsa'},
        {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    ],
    Oleg: [
        {author: 'outgoing', name: 'Yaroslav', time: '12:23', text: 'yuagdfasdsadsadadasdasdsadasddsagdsfgukydsgyufgudsa'},
        {author: 'incoming', name: 'Oleg', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
        {author: 'incoming', name: 'Oleg', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    ],
    Nikita: [
        {author: 'outgoing', name: 'Yaroslav', time: '12:23', text: 'yuagdfasdsadsadadasdasdsadasddsagdsfgukydsgyufgudsa'},
        {author: 'incoming', name: 'Nikita', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
        {author: 'outgoing', name: 'Yaroslav', time: '12:23', text: 'yuagdfasdsadsadadasdasdsadasddsagdsfgukydsgyufgudsa'},
    ]
};
profileData = {
    Artem: [{name: 'Artem', status: 'last seen recently', 'info': 'AMOGUS + AMOGUS'}],
    Oleg: [{name: 'Oleg', status: 'last seen recently', 'info': 'AMOGUS + AMOGUS'}],
    Nikita: [{name: 'Nikita', status: 'last seen recently', 'info': 'AMOGUS + AMOGUS'}]
};