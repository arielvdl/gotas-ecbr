import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

import { getTableSchema } from '../src/lib/db';

async function exploreDatabase() {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Carregada' : 'Não encontrada');
    console.log('Conectando ao banco de dados...\n');
    
    const schema = await getTableSchema();
    
    console.log('=== TABELAS ENCONTRADAS ===\n');
    const tableNames = new Set<string>();
    
    schema.tables.forEach((table: any) => {
      console.log(`📊 ${table.table_name} (${table.table_type})`);
      tableNames.add(table.table_name);
    });
    
    console.log('\n=== ESTRUTURA DAS TABELAS ===\n');
    
    let currentTable = '';
    schema.columns.forEach((column: any) => {
      if (column.table_name !== currentTable) {
        currentTable = column.table_name;
        console.log(`\n📋 Tabela: ${currentTable}`);
        console.log('─'.repeat(40));
      }
      
      const nullable = column.is_nullable === 'YES' ? '(nullable)' : '(not null)';
      const defaultVal = column.column_default ? ` default: ${column.column_default}` : '';
      
      console.log(`  • ${column.column_name}: ${column.data_type} ${nullable}${defaultVal}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Erro ao explorar o banco:', error);
    process.exit(1);
  }
}

exploreDatabase();