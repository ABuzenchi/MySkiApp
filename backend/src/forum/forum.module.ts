import { Module } from '@nestjs/common';
import { ForumGateaway } from './forum-gateaway';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumMessage, ForumMessageSchema } from './forum-message.schema';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ForumMessage.name, schema: ForumMessageSchema }]),
  ],
  controllers: [ForumController],
  providers: [ForumService, ForumGateaway],
})
export class ForumModule {}
