import { CreatorRanking } from '@/components/features/CreatorRanking';

interface CreatorRankingPageProps {
  params: {
    creatorId: string;
  };
}

export default function CreatorRankingPage({ params }: CreatorRankingPageProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Ranking de Coletores</h1>
      <CreatorRanking creatorId={params.creatorId} limit={50} />
    </div>
  );
}