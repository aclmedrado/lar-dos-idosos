import { redirect } from 'next/navigation';

export default function Home() {
  // A decisão de roteamento: a raiz redireciona para o Dashboard para melhor UX inicial
  redirect('/dashboard');
}