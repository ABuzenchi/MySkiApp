import { useEffect, useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { AddReviewForm } from './AddReviewForm';
import classes from './reviews.module.css';
import { Review } from '../../interfaces/review.interface';

interface SlopeReviewsInterface {
  resortName: string;
}

export const SlopeReviews = ({ resortName }: SlopeReviewsInterface) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = async () => {
  try {
    const res = await fetch(`http://localhost:3000/reviews/resort/${resortName}`);
    const data = await res.json();
    console.log("🧾 Review-uri primite:", data);
    if (Array.isArray(data)) {
      setReviews(data);
    } else {
      console.error("Review response is not an array:", data);
      setReviews([]);
    }
  } catch (err) {
    console.error("Eroare la fetch reviews:", err);
    setReviews([]);
  }
};


  useEffect(() => {
    loadReviews();
  }, [resortName]);

  return (
    <div className={classes.reviewsWrapper}>
      <h2>Recenzii</h2>
      <AddReviewForm resortName={resortName} onReviewAdded={loadReviews} />
      {reviews.length === 0 ? (
        <p>Nu există recenzii pentru acest domeniu schiabil încă.</p>
      ) : (
        reviews.map((r) => (
          <ReviewCard
            key={r._id}
            rating={r.rating}
            comment={r.comment}
            userName={r.userName}
            avatarUrl={r.avatarUrl}
          />
        ))
      )}
    </div>
  );
};