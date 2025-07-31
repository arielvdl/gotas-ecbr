require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const CREATOR_ID = '1753841950299x743679032068648000';

async function exploreCreatorRanking() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco!\n');

    // 1. Buscar dados do criador
    console.log(`🔍 Buscando dados do criador: ${CREATOR_ID}`);
    console.log('─'.repeat(70));
    
    const creatorQuery = `
      SELECT id, user_id, name, email_principal, wallet
      FROM x1_5_user 
      WHERE user_id = $1
    `;
    
    const creatorResult = await client.query(creatorQuery, [CREATOR_ID]);
    
    if (creatorResult.rows.length === 0) {
      console.log('❌ Criador não encontrado!');
      return;
    }
    
    const creator = creatorResult.rows[0];
    console.log(`Nome: ${creator.name || 'Sem nome'}`);
    console.log(`Email: ${creator.email_principal}`);
    console.log(`Wallet: ${creator.wallet}`);
    console.log(`ID interno: ${creator.id}`);

    // 2. Buscar gotas criadas por este criador
    console.log(`\n📊 Buscando gotas do criador...`);
    console.log('─'.repeat(70));
    
    const gotasQuery = `
      SELECT 
        g.id,
        g.gota_id,
        g.title,
        g.qty_total,
        g.qty_disponible,
        g.created_at
      FROM x1_6_gota g
      WHERE g.owner = $1
      ORDER BY g.created_at DESC
      LIMIT 10
    `;
    
    const gotasResult = await client.query(gotasQuery, [creator.id]);
    
    console.log(`Total de gotas encontradas: ${gotasResult.rows.length}`);
    
    if (gotasResult.rows.length > 0) {
      console.log('\nPrimeiras gotas:');
      gotasResult.rows.forEach(gota => {
        const qtdColetada = parseInt(gota.qty_total) - parseInt(gota.qty_disponible);
        console.log(`  • ${gota.title}`);
        console.log(`    ID: ${gota.gota_id}`);
        console.log(`    Coletadas: ${qtdColetada}/${gota.qty_total}`);
      });
    }

    // 3. Criar ranking de coletores
    console.log(`\n🏆 RANKING DE COLETORES DAS GOTAS DO CRIADOR`);
    console.log('─'.repeat(70));
    
    const rankingQuery = `
      WITH creator_gotas AS (
        -- Primeiro, pega todas as gotas deste criador
        SELECT 
          g.id as gota_table_id,
          g.gota_id,
          g.title as gota_title
        FROM x1_6_gota g
        WHERE g.owner = $1
      ),
      collector_stats AS (
        -- Depois, conta quantas gotas cada usuário coletou
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
        cs.user_id,
        cs.total_collected,
        cs.unique_gotas,
        u.name,
        u.email_principal,
        u.wallet,
        cs.first_collect,
        cs.last_collect,
        RANK() OVER (ORDER BY cs.total_collected DESC) as rank
      FROM collector_stats cs
      LEFT JOIN x1_5_user u ON u.id = cs.user_table_id::bigint
      ORDER BY cs.total_collected DESC
      LIMIT 20
    `;
    
    const rankingResult = await client.query(rankingQuery, [creator.id]);
    
    if (rankingResult.rows.length === 0) {
      console.log('Nenhum coletor encontrado para as gotas deste criador.');
    } else {
      console.log(`\nTop ${rankingResult.rows.length} coletores:\n`);
      
      rankingResult.rows.forEach(collector => {
        console.log(`${collector.rank}º lugar:`);
        console.log(`  Nome: ${collector.name || 'Usuário sem nome'}`);
        console.log(`  Email: ${collector.email_principal || 'Sem email'}`);
        console.log(`  Wallet: ${collector.wallet || 'Sem wallet'}`);
        console.log(`  Total de gotas coletadas: ${collector.total_collected}`);
        console.log(`  Gotas únicas: ${collector.unique_gotas}`);
        console.log(`  Primeira coleta: ${new Date(parseInt(collector.first_collect)).toLocaleDateString('pt-BR')}`);
        console.log(`  Última coleta: ${new Date(parseInt(collector.last_collect)).toLocaleDateString('pt-BR')}`);
        console.log('');
      });
    }

    // 4. Estatísticas gerais
    console.log(`\n📈 ESTATÍSTICAS GERAIS`);
    console.log('─'.repeat(70));
    
    const statsQuery = `
      WITH creator_gotas AS (
        SELECT g.id as gota_table_id
        FROM x1_6_gota g
        WHERE g.owner = $1
      )
      SELECT 
        COUNT(DISTINCT o.id) as total_orders,
        COUNT(DISTINCT o.buyer) as unique_collectors,
        COUNT(DISTINCT o.gota_id) as gotas_with_orders
      FROM x1_3_gota_orders o
      INNER JOIN creator_gotas cg ON cg.gota_table_id = o.gota_id::bigint
      WHERE o.status = 'minted'
    `;
    
    const statsResult = await client.query(statsQuery, [creator.id]);
    const stats = statsResult.rows[0];
    
    console.log(`Total de coletas: ${stats.total_orders}`);
    console.log(`Coletores únicos: ${stats.unique_collectors}`);
    console.log(`Gotas com pelo menos 1 coleta: ${stats.gotas_with_orders}`);

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await client.end();
  }
}

exploreCreatorRanking();