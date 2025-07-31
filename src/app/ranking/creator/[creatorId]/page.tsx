import { CreatorRanking } from '@/components/features/CreatorRanking';

interface CreatorRankingPageProps {
  params: Promise<{
    creatorId: string;
  }>;
}

export default async function CreatorRankingPage({ params }: CreatorRankingPageProps) {
  const { creatorId } = await params;
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Ranking de Coletores</h1>
      <CreatorRanking creatorId={creatorId} limit={50} />
    </div>
  );
}