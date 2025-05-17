export class ChatMessage {
  text: string;
  sender: "user" | "bot";

  constructor(text: string, sender: "user" | "bot") {
    this.text = text;
    this.sender = sender;
  }
}
