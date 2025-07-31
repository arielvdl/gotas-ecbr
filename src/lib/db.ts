import { Pool, PoolConfig } from 'pg';

const poolConfig: PoolConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 30000,
  query_timeout: 30000,
  statement_timeout: 30000
};

const pool = new Pool(poolConfig);

export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

export async function getTableSchema() {
  const tablesQuery = `
    SELECT 
      table_name,
      table_type
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `;
  
  const columnsQuery = `
    SELECT 
      table_name,
      column_name,
      data_type,
      is_nullable,
      column_default
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position;
  `;
  
  try {
    const [tables, columns] = await Promise.all([
      query(tablesQuery),
      query(columnsQuery)
    ]);
    
    return {
      tables: tables.rows,
      columns: columns.rows
    };
  } catch (error) {
    console.error('Error fetching schema:', error);
    throw error;
  }
}

export async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    return { success: true, time: result.rows[0].now };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export default pool;