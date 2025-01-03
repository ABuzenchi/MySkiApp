import { Module } from '@nestjs/common';
import { ForumGateaway } from './forum-gateaway';

@Module({
    providers:[ForumGateaway]
})
export class ForumModule {}
