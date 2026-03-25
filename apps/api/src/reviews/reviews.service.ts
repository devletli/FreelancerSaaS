import { Injectable } from '@nestjs/common';
import { MarketplaceRepository } from '../platform/marketplace.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly repository: MarketplaceRepository) {}

  create(payload: CreateReviewDto) {
    return this.repository.createReview(payload);
  }
}
