import React from 'react';
import styles from './feedback.module.css';

interface FeedbackProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

export function Feedback({ type, message }: FeedbackProps) {
  if (!message) return null;
  return (
    <div className={`${styles.feedback} ${styles[type]}`}>
      {message}
    </div>
  );
}