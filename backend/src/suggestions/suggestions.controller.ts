// backend/src/suggestions/suggestions.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post('predict')
  async predict(@Body() body: any) {
    return this.suggestionsService.getPredictionFromFastAPI(body);
  }

  @Post('suggest')
  async suggest(@Body() body: any) {
    return this.suggestionsService.getSuggestionsFromFastAPI(body);
  }
}
