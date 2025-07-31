import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/services/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { creatorId: string } }
) {
  try {
    const creatorId = params.creatorId;
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');

    // Busca o ranking de coletores
    const [ranking, stats] = await Promise.all([
      DatabaseService.getCreatorCollectorsRanking(creatorId, limit),
      DatabaseService.getCreatorStats(creatorId)
    ]);

    // Busca informações do criador
    const creator = await DatabaseService.getUserById(creatorId);

    return NextResponse.json({
      success: true,
      creator: creator ? {
        id: creator.user_id,
        name: creator.name,
        wallet: creator.wallet,
        email: creator.email_principal
      } : null,
      stats: stats || {
        total_gotas: 0,
        total_minted: 0,
        total_available: 0,
        unique_collectors: 0,
        total_orders: 0
      },
      ranking: ranking.map(collector => ({
        rank: collector.rank,
        collector: {
          id: collector.collector_id,
          name: collector.collector_name,
          email: collector.collector_email,
          wallet: collector.collector_wallet
        },
        stats: {
          totalCollected: collector.total_collected,
          uniqueGotas: collector.unique_gotas,
          firstCollect: new Date(parseInt(collector.first_collect)).toISOString(),
          lastCollect: new Date(parseInt(collector.last_collect)).toISOString()
        }
      }))
    });
  } catch (error) {
    console.error('Error fetching creator ranking:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar ranking do criador' 
      },
      { status: 500 }
    );
  }
}