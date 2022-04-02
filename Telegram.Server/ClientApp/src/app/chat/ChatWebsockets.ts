import {ChatWebsocket} from "./ChatWebsocket";

export class ChatWebsockets {
  private items: ChatWebsocket[] = []

  async get(chatId: number, authorizeToken: string) {
    const chatWebhook = this.items[chatId];
    if (!chatWebhook) {
      return await this.startWebhook(chatId, authorizeToken)
    }
    
    return chatWebhook 
  }

  private async startWebhook(chatId: number, authorizeToken: string) {
    const webhook = new ChatWebsocket(chatId, authorizeToken)
    this.items[chatId] = webhook
    await webhook.start()

    return webhook
  }
}