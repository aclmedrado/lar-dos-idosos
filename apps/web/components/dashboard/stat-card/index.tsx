import React from 'react';
import { Card } from '@/components/ui/card';
import styles from './stat-card.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  helperText?: string;
  isCurrency?: boolean;
}

export function StatCard({ title, value, helperText, isCurrency }: StatCardProps) {
  return (
    <Card className={styles.statCard}>
      <h4 className={styles.statTitle}>{title}</h4>
      <div className={`${styles.statValue} ${isCurrency ? styles.currency : ''}`}>
        {value}
      </div>
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </Card>
  );
}