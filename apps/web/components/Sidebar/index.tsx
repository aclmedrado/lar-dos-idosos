"use client"; // Necessário para usar hooks de navegação do Next.js

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/residentes', label: 'Residentes' },
  { path: '/funcionarios', label: 'Funcionários' },
  { path: '/prontuarios', label: 'Prontuários' },
  { path: '/financeiro', label: 'Financeiro' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>Lar dos Idosos</h2>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link 
                  href={item.path} 
                  className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}