function loadData(info, template, element) {
    fetch(`http://localhost:3001/tmp/test.json`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (template == 'message' || template == 'profile') {
                element.innerHTML = '';
            }
            info.forEach(item => {
                const rendered = Mustache.render(data[template], item);
                element.innerHTML += rendered;
            });
        })
        .then(() => {
            console.log(1);
            document.querySelector('.chat').scrollTop = document.querySelector('.chat').scrollHeight
        });
}


groupsData = [{}, {}, {}, {}, {}, {}]
contactsData = [
    {name: 'Artem', message: 'AMOGUUUUS', time: '5h ago'},
    {name: 'Artem', message: 'AMOGUUUUS', time: '5h ago'},
    {name: 'Artem', message: 'AMOGUUUUS', time: '5h ago'},
]
messagesData = [
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
    {author: 'outgoing', name: 'Yaroslav', time: '12:23', text: 'yuagdfasdsadsadadasdasdsadasddsagdsfgukydsgyufgudsa'},
    {author: 'incoming', name: 'Artem', time: '12:23', text: 'yuagdfgdsfgukydsgyufgudsa'},
];
profileData = [{name: 'Artem', status: 'last seen recently', 'info': 'AMOGUS + AMOGUS'}];


loadData(groupsData, 'group', document.querySelector('.groups'));
loadData(contactsData, 'contact', document.querySelector('.box'));
loadData(messagesData, 'message', document.querySelector('.messages'));
loadData(profileData, 'profile', document.querySelector('.profile'));