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
  @Body() body: { domainId: string; rating: number; comment: string },
) {
  const user = req.user;
  return await this.reviewService.create({
    domainId: body.domainId,
    rating: body.rating,
    comment: body.comment,
    userId: user.id,
    userName: user.username,
    avatarUrl: user.profilePicture,
  });
}
@Get('domain/:domainId')
getByDomainId(@Param('domainId') domainId: string) {
  return this.reviewService.findByDomainId(domainId);
}

}