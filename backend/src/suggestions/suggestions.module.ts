// backend/src/suggestions/suggestions.module.ts
import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { SlopeModule } from 'src/slope/slope.module';

@Module({
   imports: [SlopeModule],
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class SuggestionsModule {}
