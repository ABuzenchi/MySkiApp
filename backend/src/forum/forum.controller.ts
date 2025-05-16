import { Controller, Get, Param } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get(':room')
  async getMessages(@Param('room') room: string) {
    return this.forumService.getMessages(room);
  }
}
