export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalDrops: number;
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  value: number;
  image: string;
  position: number;
}

export interface RankingEntry {
  position: number;
  user: User;
  totalDrops: number;
}

// Mock de usuários para desenvolvimento
export const mockUsers: User[] = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', totalDrops: 45 },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', totalDrops: 42 },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro@email.com', totalDrops: 38 },
  { id: '4', name: 'Ana Costa', email: 'ana@email.com', totalDrops: 35 },
  { id: '5', name: 'Carlos Ferreira', email: 'carlos@email.com', totalDrops: 32 },
  { id: '6', name: 'Beatriz Lima', email: 'beatriz@email.com', totalDrops: 30 },
  { id: '7', name: 'Ricardo Alves', email: 'ricardo@email.com', totalDrops: 28 },
  { id: '8', name: 'Fernanda Rocha', email: 'fernanda@email.com', totalDrops: 25 },
  { id: '9', name: 'Lucas Mendes', email: 'lucas@email.com', totalDrops: 22 },
  { id: '10', name: 'Juliana Barbosa', email: 'juliana@email.com', totalDrops: 20 },
];

// Mock de prêmios
export const mockPrizes: Prize[] = [
  {
    id: '1',
    name: 'Ledger Classic 2025',
    description: 'Hardware wallet para criptomoedas',
    value: 2938.00,
    image: '/ledger-classic.png',
    position: 1
  },
  {
    id: '2',
    name: 'Ledger Classic 2025',
    description: 'Hardware wallet para criptomoedas',
    value: 2938.00,
    image: '/ledger-classic.png',
    position: 2
  },
  {
    id: '3',
    name: 'Ledger Classic 2025',
    description: 'Hardware wallet para criptomoedas',
    value: 2938.00,
    image: '/ledger-classic.png',
    position: 3
  }
];

// Mock de ranking
export const mockRanking: RankingEntry[] = mockUsers
  .sort((a, b) => b.totalDrops - a.totalDrops)
  .map((user, index) => ({
    position: index + 1,
    user,
    totalDrops: user.totalDrops
  }));

// Simula o usuário atual logado
export const currentUser: User = {
  id: '11',
  name: 'Você',
  email: 'voce@email.com',
  totalDrops: 15
};