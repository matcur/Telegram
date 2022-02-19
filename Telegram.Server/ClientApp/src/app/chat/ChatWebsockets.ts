import {ChatWebsocket} from "./ChatWebsocket";

export class ChatWebsockets {
  private items: ChatWebsocket[] = []

  async get(chatId: number) {
    const chatWebhook = this.items[chatId];
    if (!chatWebhook) {
      return await this.startWebhook(chatId)
    }
    
    return chatWebhook 
  }

  private async startWebhook(chatId: number) {
    const webhook = new ChatWebsocket(chatId)
    this.items[chatId] = webhook
    await webhook.start()

    return webhook
  }
}