require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function exploreGotasTables() {
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

    // Tabelas principais relacionadas a Gotas
    const mainTables = [
      'x1_5_user',          // Usuários
      'x1_6_gota',          // Gotas
      'x1_14_gota_reports', // Relatórios de gotas
      'x1_2_gota_comments', // Comentários em gotas
      'x1_3_gota_orders',   // Pedidos de gotas
      'x1_72_customer_gota_send' // Envio de gotas
    ];

    for (const tableName of mainTables) {
      console.log(`\n📊 Explorando ${tableName}:`);
      console.log('─'.repeat(50));

      // Busca a estrutura da view
      const structureQuery = `
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = '${tableName}'
        ORDER BY ordinal_position;
      `;

      const structure = await client.query(structureQuery);
      
      console.log('Colunas:');
      structure.rows.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? '(nullable)' : '(not null)';
        console.log(`  • ${col.column_name}: ${col.data_type} ${nullable}`);
      });

      // Tenta buscar alguns registros de exemplo
      try {
        const sampleQuery = `SELECT * FROM ${tableName} LIMIT 2`;
        const sample = await client.query(sampleQuery);
        
        if (sample.rows.length > 0) {
          console.log(`\nExemplo de dados (${sample.rows.length} registros):`);
          console.log(JSON.stringify(sample.rows, null, 2));
        } else {
          console.log('\nTabela vazia');
        }
      } catch (err) {
        console.log('\nErro ao buscar dados de exemplo:', err.message);
      }
    }

    // Busca tabelas base que alimentam as views
    console.log('\n\n📋 TABELAS BASE RELACIONADAS:');
    console.log('─'.repeat(50));
    
    const baseTables = await client.query(`
      SELECT DISTINCT table_name 
      FROM information_schema.columns 
      WHERE table_name LIKE 'mvpw1_%' 
        AND table_name NOT LIKE '%_test_%'
      ORDER BY table_name;
    `);

    baseTables.rows.forEach(table => {
      console.log(`  • ${table.table_name}`);
    });

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

exploreGotasTables();