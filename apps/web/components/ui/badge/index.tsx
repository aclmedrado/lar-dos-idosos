import React from 'react';
import styles from './badge.module.css';

export type BadgeStatus = 'ACTIVE' | 'INACTIVE' | 'HOSPITALIZED' | 'ON_LEAVE';

interface BadgeProps {
  status: BadgeStatus;
}

export function Badge({ status }: BadgeProps) {
  let label: string = status;
  let statusClass = styles.inactive; // Fallback seguro para estados desconhecidos

  switch (status) {
    case 'ACTIVE':
      label = 'Ativo';
      statusClass = styles.active;
      break;
    case 'INACTIVE':
      label = 'Inativo';
      statusClass = styles.inactive;
      break;
    case 'HOSPITALIZED':
      label = 'Hospitalizado';
      statusClass = styles.hospitalized;
      break;
    case 'ON_LEAVE':
      label = 'Afastado';
      statusClass = styles.onLeave;
      break;
  }

  return (
    <span className={`${styles.badge} ${statusClass}`}>
      {label}
    </span>
  );
}
