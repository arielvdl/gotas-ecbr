'use client';

import { useEffect, useState } from 'react';
import { Trophy, Medal, Award, User, Calendar, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface CollectorRank {
  rank: number;
  collector: {
    id: string;
    name: string;
    email: string;
    wallet: string;
  };
  stats: {
    totalCollected: number;
    uniqueGotas: number;
    firstCollect: string;
    lastCollect: string;
  };
}

interface CreatorStats {
  total_gotas: number;
  total_minted: number;
  total_available: number;
  unique_collectors: number;
  total_orders: number;
}

interface CreatorInfo {
  id: string;
  name: string;
  wallet: string;
  email: string;
}

interface CreatorRankingProps {
  creatorId: string;
  limit?: number;
  className?: string;
}

export function CreatorRanking({ creatorId, limit = 20, className }: CreatorRankingProps) {
  const [ranking, setRanking] = useState<CollectorRank[]>([]);
  const [creator, setCreator] = useState<CreatorInfo | null>(null);
  const [stats, setStats] = useState<CreatorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRanking();
  }, [creatorId, limit]);

  const fetchRanking = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/ranking/creator/${creatorId}?limit=${limit}`);
      const data = await response.json();

      if (data.success) {
        setRanking(data.ranking);
        setCreator(data.creator);
        setStats(data.stats);
      } else {
        setError(data.error || 'Erro ao carregar ranking');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={cn("border-destructive", className)}>
        <CardContent className="pt-6">
          <p className="text-center text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Informações do Criador e Estatísticas */}
      {creator && stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {creator.name || 'Criador Anônimo'}
            </CardTitle>
            <CardDescription>
              Estatísticas das gotas criadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total_gotas}</p>
                <p className="text-sm text-muted-foreground">Gotas Criadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total_minted}</p>
                <p className="text-sm text-muted-foreground">Total Coletadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total_available}</p>
                <p className="text-sm text-muted-foreground">Disponíveis</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.unique_collectors}</p>
                <p className="text-sm text-muted-foreground">Coletores Únicos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total_orders}</p>
                <p className="text-sm text-muted-foreground">Total de Coletas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ranking de Coletores */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Ranking de Coletores</CardTitle>
          <CardDescription>
            Top {ranking.length} pessoas que mais coletaram gotas deste criador
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ranking.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum coletor encontrado ainda
            </p>
          ) : (
            <div className="space-y-4">
              {ranking.map((entry) => (
                <div
                  key={entry.collector.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border",
                    entry.rank <= 3 && "bg-accent/10"
                  )}
                >
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    {getRankIcon(entry.rank)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">
                      {entry.collector.name || 'Usuário Anônimo'}
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
                      {formatDate(entry.stats.firstCollect)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}