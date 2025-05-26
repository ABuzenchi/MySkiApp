import { Rating, Textarea, Button } from '@mantine/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './reviews.module.css';
import { RootState } from '../../store';

interface AddReviewFormProps {
  domainId: string;
  onReviewAdded: () => void;
}

export const AddReviewForm = ({ domainId, onReviewAdded }: AddReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    const res = await fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ domainId, rating, comment }),

    });

    if (res.ok) {
      setComment('');
      onReviewAdded();
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className={classes.form}>
      <Rating value={rating} onChange={setRating} />
      <Textarea
        placeholder="Scrie o recenzie..."
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
        mt="sm"
      />
      <Button onClick={handleSubmit} mt="sm">Trimite</Button>
    </div>
  );
};