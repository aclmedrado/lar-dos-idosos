import React from 'react';
import styles from './badge.module.css';

interface BadgeProps {
  status: string;
}

export function Badge({ status }: BadgeProps) {
  const isInactive = status === 'INACTIVE';
  
  return (
    <span className={`${styles.badge} ${isInactive ? styles.inactive : styles.active}`}>
      {isInactive ? 'Inativo' : 'Ativo'}
    </span>
  );
}