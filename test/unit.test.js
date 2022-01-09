const chatService = require('../application/chat/socketServices/chats.js');
const associate = require('../application/database/associate.js');
const autoFill = require('../application/database/autoInsert.js');
const seq = require('../application/database/connection.js');
const emitter = require('events');
const Chats = require('../application/database/models/chats.js');
const {renderChats} = require('../application/chat/utils/dataProcessing.js');
const wrapper = require('../application/chat/utils/wrapper.js');

describe('chats service testing', () => {
    const ee = new emitter();
    const events = ['chats', 'history', 'message', 'refreshChats'];

    beforeAll(async () => {
        await associate();
        await seq.sync({force: true});
        await autoFill();

        events.map(event => ee.on(event, () => {}));
        ee.join = () => {};
        ee.IO = {
            sockets: {
                sockets: []
            },
            to: () => ee
        };

        for(let [key, value] of Object.entries(chatService)){
            chatService[key] = value.bind(ee);
        }
    });

    afterEach(() => jest.clearAllMocks());

    describe('get user chats', () => {
        const id = 1;

        it('should return chats', async () => {
            const spy = jest.spyOn(ee, 'emit')
            await chatService.getChats(id);

            expect(spy).toBeCalledWith('chats', await renderChats(id));
        });
    });

    describe('create new chat', () => {
        const users = [1, 2, 3];
        const chatName = 'NEW CHAT';

        it('should create chat', async () => {
            const spy = jest.spyOn(Chats, 'create');
            await chatService.createChat(users, chatName);

            expect(spy).toBeCalledWith({users, chatName});
        });
    });

    describe('joining chat', () => {
        const chatId = '1';

        it('should join a chat', async () => {
            const joinSpy = jest.spyOn(ee, 'join');
            const emitSpy = jest.spyOn(ee, 'emit');
            await chatService.joinChat(chatId);

            expect(joinSpy).toBeCalledWith(+chatId);
            expect(emitSpy).toBeCalled();
        });
    });

    describe('chatMessage', () => {
        const msg = '';
        const user = 1;
        const chat = 1;
        const firstName = '123';

        it('should handle a new message', async () => {
            const spy = jest.spyOn(ee, 'emit');
            await chatService.chatMessage(msg, user, chat);
            const chats = await renderChats(+user);

            expect(spy).toHaveBeenCalledWith('message', wrapper(firstName, msg, user), chat);
            expect(spy).toHaveBeenCalledWith('refreshChats',
                chats.find(c => c.chat === chat)
            );
        });
    });

    describe('chat deleting', () => {
        const chat = 1;

        it('should delete chat by id', async () => {
            await chatService.deleteChat(chat);
            const res = await Chats.findAll({
                where: {
                    chatId: chat
                }
            });

            expect(res).toEqual([]);
        });
    });
});