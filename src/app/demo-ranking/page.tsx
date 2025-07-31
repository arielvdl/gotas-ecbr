'use client';

import { Trophy, Medal, Award, User, Package, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Dados de demonstração
const mockData = {
  creator: {
    id: '1753841950299x743679032068648000',
    name: 'João Silva - Criador de Conteúdo',
    wallet: '0x123...abc',
    email: 'joao@exemplo.com'
  },
  stats: {
    total_gotas: 25,
    total_minted: 487,
    total_available: 63,
    unique_collectors: 142,
    total_orders: 487
  },
  ranking: [
    {
      rank: 1,
      collector: {
        id: '123',
        name: 'Maria Santos',
        email: 'maria@exemplo.com',
        wallet: '0x456...def'
      },
      stats: {
        totalCollected: 45,
        uniqueGotas: 18,
        firstCollect: '2024-01-15T10:30:00Z',
        lastCollect: '2024-01-30T15:45:00Z'
      }
    },
    {
      rank: 2,
      collector: {
        id: '456',
        name: 'Pedro Oliveira',
        email: 'pedro@exemplo.com',
        wallet: '0x789...ghi'
      },
      stats: {
        totalCollected: 38,
        uniqueGotas: 15,
        firstCollect: '2024-01-10T09:00:00Z',
        lastCollect: '2024-01-29T18:30:00Z'
      }
    },
    {
      rank: 3,
      collector: {
        id: '789',
        name: 'Ana Costa',
        email: 'ana@exemplo.com',
        wallet: '0xabc...jkl'
      },
      stats: {
        totalCollected: 32,
        uniqueGotas: 14,
        firstCollect: '2024-01-12T14:20:00Z',
        lastCollect: '2024-01-28T16:10:00Z'
      }
    },
    {
      rank: 4,
      collector: {
        id: '012',
        name: 'Carlos Mendes',
        email: 'carlos@exemplo.com',
        wallet: '0xdef...mno'
      },
      stats: {
        totalCollected: 28,
        uniqueGotas: 12,
        firstCollect: '2024-01-08T11:00:00Z',
        lastCollect: '2024-01-27T13:25:00Z'
      }
    },
    {
      rank: 5,
      collector: {
        id: '345',
        name: 'Beatriz Lima',
        email: 'beatriz@exemplo.com',
        wallet: '0xghi...pqr'
      },
      stats: {
        totalCollected: 24,
        uniqueGotas: 10,
        firstCollect: '2024-01-14T08:45:00Z',
        lastCollect: '2024-01-26T17:50:00Z'
      }
    }
  ]
};

export default function DemoRankingPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Demonstração - Ranking de Coletores</h1>

      {/* Informações do Criador */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {mockData.creator.name}
          </CardTitle>
          <CardDescription>
            Estatísticas das gotas criadas por este criador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{mockData.stats.total_gotas}</p>
              <p className="text-sm text-muted-foreground">Gotas Criadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{mockData.stats.total_minted}</p>
              <p className="text-sm text-muted-foreground">Total Coletadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{mockData.stats.total_available}</p>
              <p className="text-sm text-muted-foreground">Disponíveis</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{mockData.stats.unique_collectors}</p>
              <p className="text-sm text-muted-foreground">Coletores Únicos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{mockData.stats.total_orders}</p>
              <p className="text-sm text-muted-foreground">Total de Coletas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Ranking de Coletores</CardTitle>
          <CardDescription>
            Top 5 pessoas que mais coletaram gotas deste criador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.ranking.map((entry) => (
              <div
                key={entry.collector.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  entry.rank <= 3 ? 'bg-accent/10' : ''
                }`}
              >
                <div className="flex-shrink-0 w-12 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">
                    {entry.collector.name}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {entry.collector.wallet}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Package className="h-3 w-3" />
                    {entry.stats.totalCollected} gotas
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Desde {formatDate(entry.stats.firstCollect)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informação sobre o demo */}
      <Card className="border-orange-500/50 bg-orange-50/10 dark:bg-orange-950/10">
        <CardContent className="pt-6">
          <p className="text-sm text-center">
            ⚠️ Esta é uma demonstração com dados fictícios. 
            Para ver dados reais, a conexão com o banco de dados precisa estar ativa.
          </p>
          <p className="text-sm text-center mt-2">
            ID do criador usado: <code className="bg-muted px-2 py-1 rounded">
              {mockData.creator.id}
            </code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}