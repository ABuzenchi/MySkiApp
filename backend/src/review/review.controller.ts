import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addReview(
    @Req() req,
    @Body() body: { resortName: string; rating: number; comment: string },
  ) {
    const user = req.user;
    console.log('📥 Review primit:', body);
  console.log('👤 User din token:', user);
    return await this.reviewService.create({
      resortName: body.resortName,
      rating: body.rating,
      comment: body.comment,
      userId: user.id,
      userName: user.username,
      avatarUrl: user.profilePicture,
    });
  }

  @Get('resort/:resortName')
async getByResortName(@Param('resortName') resortName: string) {
  return this.reviewService.findByResortName(resortName);
}


}
