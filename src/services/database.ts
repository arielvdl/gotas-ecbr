import { query } from '@/lib/db';
import type { User, Gota, GotaOrder, GotaComment, GotaReport } from '@/types/database';

export class DatabaseService {
  // User queries
  static async getUserByWallet(wallet: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM x1_5_user WHERE wallet_minusculo = $1 LIMIT 1',
      [wallet.toLowerCase()]
    );
    return result.rows[0] || null;
  }

  static async getUserById(userId: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM x1_5_user WHERE user_id = $1 LIMIT 1',
      [userId]
    );
    return result.rows[0] || null;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM x1_5_user WHERE email_principal = $1 LIMIT 1',
      [email]
    );
    return result.rows[0] || null;
  }

  // Gota queries
  static async getActiveGotas(limit = 20): Promise<Gota[]> {
    const now = Date.now().toString();
    const result = await query(
      `SELECT * FROM x1_6_gota 
       WHERE can_started = true 
         AND block_to_mint = false
         AND (end_date > $1 OR no_end_date = true)
         AND start_date <= $1
       ORDER BY created_at DESC 
       LIMIT $2`,
      [now, limit]
    );
    return result.rows;
  }

  static async getGotaById(gotaId: string): Promise<Gota | null> {
    const result = await query(
      'SELECT * FROM x1_6_gota WHERE gota_id = $1 LIMIT 1',
      [gotaId]
    );
    return result.rows[0] || null;
  }

  static async getGotasByOwner(ownerId: string): Promise<Gota[]> {
    const result = await query(
      'SELECT * FROM x1_6_gota WHERE owner = $1 ORDER BY created_at DESC',
      [ownerId]
    );
    return result.rows;
  }

  // GotaOrder queries
  static async getUserOrders(userId: string): Promise<GotaOrder[]> {
    const result = await query(
      'SELECT * FROM x1_3_gota_orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async getOrderById(orderId: string): Promise<GotaOrder | null> {
    const result = await query(
      'SELECT * FROM x1_3_gota_orders WHERE order_id = $1 LIMIT 1',
      [orderId]
    );
    return result.rows[0] || null;
  }

  static async getGotaOrders(gotaId: string): Promise<GotaOrder[]> {
    const result = await query(
      'SELECT * FROM x1_3_gota_orders WHERE gota_id = $1 ORDER BY created_at DESC',
      [gotaId]
    );
    return result.rows;
  }

  // Comment queries
  static async getGotaComments(gotaId: string): Promise<GotaComment[]> {
    const result = await query(
      'SELECT * FROM x1_2_gota_comments WHERE gota_id = $1 AND is_hided = false ORDER BY created_at DESC',
      [gotaId]
    );
    return result.rows;
  }

  // Statistics
  static async getUserGotaCount(userId: string): Promise<number> {
    const result = await query(
      'SELECT COUNT(*) as count FROM x1_3_gota_orders WHERE user_id = $1 AND status = $2',
      [userId, 'minted']
    );
    return parseInt(result.rows[0].count);
  }

  static async getGotaStats(gotaId: string): Promise<{
    totalMinted: number;
    totalOrders: number;
    uniqueCollectors: number;
  }> {
    const [minted, orders, collectors] = await Promise.all([
      query(
        'SELECT COUNT(*) as count FROM x1_3_gota_orders WHERE gota_id = $1 AND status = $2',
        [gotaId, 'minted']
      ),
      query(
        'SELECT COUNT(*) as count FROM x1_3_gota_orders WHERE gota_id = $1',
        [gotaId]
      ),
      query(
        'SELECT COUNT(DISTINCT buyer) as count FROM x1_3_gota_orders WHERE gota_id = $1',
        [gotaId]
      )
    ]);

    return {
      totalMinted: parseInt(minted.rows[0].count),
      totalOrders: parseInt(orders.rows[0].count),
      uniqueCollectors: parseInt(collectors.rows[0].count)
    };
  }

  // Ranking for ECBR event
  static async getECBRRanking(limit = 100): Promise<Array<{
    user_id: string;
    name: string;
    email: string;
    wallet: string;
    total_gotas: number;
    rank: number;
  }>> {
    const result = await query(
      `WITH user_gotas AS (
        SELECT 
          o.user_id,
          COUNT(DISTINCT o.id) as total_gotas
        FROM x1_3_gota_orders o
        WHERE o.status = 'minted'
        GROUP BY o.user_id
      )
      SELECT 
        u.user_id,
        u.name,
        u.email_principal as email,
        u.wallet,
        ug.total_gotas,
        RANK() OVER (ORDER BY ug.total_gotas DESC) as rank
      FROM user_gotas ug
      JOIN x1_5_user u ON u.id = ug.user_id::text
      ORDER BY total_gotas DESC
      LIMIT $1`,
      [limit]
    );
    return result.rows;
  }

  // Ranking de coletores por criador específico
  static async getCreatorCollectorsRanking(
    creatorUserId: string, 
    limit = 100
  ): Promise<Array<{
    collector_id: string;
    collector_name: string;
    collector_email: string;
    collector_wallet: string;
    total_collected: number;
    unique_gotas: number;
    first_collect: string;
    last_collect: string;
    rank: number;
  }>> {
    const result = await query(
      `WITH creator_info AS (
        -- Busca o ID interno do criador
        SELECT id FROM x1_5_user WHERE user_id = $1 LIMIT 1
      ),
      creator_gotas AS (
        -- Pega todas as gotas deste criador
        SELECT 
          g.id as gota_table_id,
          g.gota_id,
          g.title as gota_title
        FROM x1_6_gota g
        CROSS JOIN creator_info ci
        WHERE g.owner = ci.id
      ),
      collector_stats AS (
        -- Conta quantas gotas cada usuário coletou
        SELECT 
          o.buyer as user_id,
          o.user_id as user_table_id,
          COUNT(DISTINCT o.id) as total_collected,
          COUNT(DISTINCT o.gota_id) as unique_gotas,
          MIN(o.created_at) as first_collect,
          MAX(o.created_at) as last_collect
        FROM x1_3_gota_orders o
        INNER JOIN creator_gotas cg ON cg.gota_table_id = o.gota_id::bigint
        WHERE o.status = 'minted'
        GROUP BY o.buyer, o.user_id
      )
      SELECT 
        cs.user_id as collector_id,
        COALESCE(u.name, 'Anônimo') as collector_name,
        COALESCE(u.email_principal, '') as collector_email,
        COALESCE(u.wallet, '') as collector_wallet,
        cs.total_collected,
        cs.unique_gotas,
        cs.first_collect,
        cs.last_collect,
        RANK() OVER (ORDER BY cs.total_collected DESC) as rank
      FROM collector_stats cs
      LEFT JOIN x1_5_user u ON u.id = cs.user_table_id::bigint
      ORDER BY cs.total_collected DESC
      LIMIT $2`,
      [creatorUserId, limit]
    );
    return result.rows;
  }

  // Estatísticas do criador
  static async getCreatorStats(creatorUserId: string): Promise<{
    total_gotas: number;
    total_minted: number;
    total_available: number;
    unique_collectors: number;
    total_orders: number;
  } | null> {
    const result = await query(
      `WITH creator_info AS (
        SELECT id FROM x1_5_user WHERE user_id = $1 LIMIT 1
      ),
      creator_gotas AS (
        SELECT 
          g.id,
          g.qty_total,
          g.qty_disponible
        FROM x1_6_gota g
        CROSS JOIN creator_info ci
        WHERE g.owner = ci.id
      ),
      gota_stats AS (
        SELECT 
          COUNT(DISTINCT cg.id) as total_gotas,
          SUM(CAST(cg.qty_total AS INTEGER)) as total_capacity,
          SUM(CAST(cg.qty_disponible AS INTEGER)) as total_available
        FROM creator_gotas cg
      ),
      order_stats AS (
        SELECT 
          COUNT(DISTINCT o.id) as total_orders,
          COUNT(DISTINCT o.buyer) as unique_collectors
        FROM x1_3_gota_orders o
        INNER JOIN creator_gotas cg ON cg.id::text = o.gota_id
        WHERE o.status = 'minted'
      )
      SELECT 
        COALESCE(gs.total_gotas, 0) as total_gotas,
        COALESCE(gs.total_capacity - gs.total_available, 0) as total_minted,
        COALESCE(gs.total_available, 0) as total_available,
        COALESCE(os.unique_collectors, 0) as unique_collectors,
        COALESCE(os.total_orders, 0) as total_orders
      FROM gota_stats gs
      CROSS JOIN order_stats os`,
      [creatorUserId]
    );
    
    return result.rows[0] || null;
  }

  // Busca gotas de um criador específico
  static async getGotasByCreatorUserId(creatorUserId: string): Promise<Gota[]> {
    const result = await query(
      `SELECT g.* 
       FROM x1_6_gota g
       INNER JOIN x1_5_user u ON u.id = g.owner
       WHERE u.user_id = $1
       ORDER BY g.created_at DESC`,
      [creatorUserId]
    );
    return result.rows;
  }
}