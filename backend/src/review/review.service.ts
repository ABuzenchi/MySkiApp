import { Injectable } from "@nestjs/common";
import { Review, ReviewDocument } from "./review.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(data: Partial<Review>) {
    return await this.reviewModel.create(data);
  }

  async findByResortName(resortName: string) {
  return this.reviewModel.find({ resortName }).sort({ createdAt: -1 }).exec();
}

}
