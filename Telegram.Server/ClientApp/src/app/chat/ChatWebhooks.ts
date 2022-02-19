import {ChatWebhook} from "./ChatWebhook";

export class ChatWebhooks {
  private items: ChatWebhook[] = []

  async get(chatId: number) {
    const chatWebhook = this.items[chatId];
    if (!chatWebhook) {
      return await this.startWebhook(chatId)
    }
    
    return chatWebhook 
  }

  private async startWebhook(chatId: number) {
    const webhook = new ChatWebhook(chatId)
    this.items[chatId] = webhook
    await webhook.start()

    return webhook
  }
}