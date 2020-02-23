import { MessageService } from './message.service';

describe('MessageService', () => {
    let messageService;
    beforeEach(() => {
        messageService = new MessageService();
    });

    it('should have no message to start', () => {
        expect(messageService.messages.length).toBe(0);
    });

    it('should add a message, when add is called ', () => {
        messageService.add('Hello there Mr. Digender');
        expect(messageService.messages.length).toBe(1);
    });

    it('should have no message, when clear is called ', () => {
        messageService.clear();
        expect(messageService.messages.length).toBe(0);
    });
});
