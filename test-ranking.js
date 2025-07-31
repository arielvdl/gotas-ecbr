// Script para testar o ranking diretamente no banco
require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const CREATOR_ID = '1753841950299x743679032068648000';

async function testRanking() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados!\n');

    // Query simplificada para testar
    const query = `
      WITH creator_info AS (
        SELECT id FROM x1_5_user WHERE user_id = $1 LIMIT 1
      )
      SELECT 
        ci.id as creator_internal_id,
        COUNT(*) as total_gotas
      FROM creator_info ci
      LEFT JOIN x1_6_gota g ON g.owner = ci.id
      GROUP BY ci.id
    `;

    console.log('🔍 Buscando informações do criador...');
    const result = await client.query(query, [CREATOR_ID]);
    
    if (result.rows.length > 0) {
      console.log('Criador encontrado!');
      console.log('ID interno:', result.rows[0].creator_internal_id);
      console.log('Total de gotas criadas:', result.rows[0].total_gotas);
    } else {
      console.log('❌ Criador não encontrado com o ID:', CREATOR_ID);
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

testRanking();