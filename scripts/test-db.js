require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function testConnection() {
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
    console.log('Conectando com:', {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER
    });

    await client.connect();
    console.log('✅ Conexão estabelecida com sucesso!\n');

    // Busca tabelas
    const tablesResult = await client.query(`
      SELECT table_name, table_type
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('=== TABELAS ENCONTRADAS ===');
    tablesResult.rows.forEach(table => {
      console.log(`📊 ${table.table_name} (${table.table_type})`);
    });

    // Busca colunas
    const columnsResult = await client.query(`
      SELECT table_name, column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);

    console.log('\n=== ESTRUTURA DAS TABELAS ===');
    let currentTable = '';
    columnsResult.rows.forEach(column => {
      if (column.table_name !== currentTable) {
        currentTable = column.table_name;
        console.log(`\n📋 Tabela: ${currentTable}`);
        console.log('─'.repeat(40));
      }
      
      const nullable = column.is_nullable === 'YES' ? '(nullable)' : '(not null)';
      const defaultVal = column.column_default ? ` default: ${column.column_default}` : '';
      
      console.log(`  • ${column.column_name}: ${column.data_type} ${nullable}${defaultVal}`);
    });

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

testConnection();