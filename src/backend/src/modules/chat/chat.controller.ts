import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Body("message") message: string
  ): Promise<{ response: string }> {
    const response = await this.chatService.generateResponse(message);
    return { response };
  }
}
