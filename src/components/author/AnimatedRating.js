import { Rating } from "@mui/material";
import { round } from "lodash";
import { useEffect, useState } from "react";

function AnimatedRating() {
  const [rating, setRating] = useState(0);
  const targetRating = 4.5;
  const animationDuration = 2000;
  const steps = round(targetRating);
  const stepValue = targetRating / steps;
  const interval = animationDuration / steps;

  useEffect(() => {
    if (rating < targetRating) {
      const timer = setTimeout(() => {
        setRating(prev => Math.min(prev + stepValue, targetRating));
      }, interval);
      return () => clearTimeout(timer);
    }
  }, [rating]);

  return (<Rating precision={0.5} value={rating} readOnly />);
}

export default AnimatedRating;