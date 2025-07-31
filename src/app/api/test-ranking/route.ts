import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Teste simples de conexão
    const result = await query('SELECT NOW() as time');
    
    // Busca criador específico
    const creatorId = '1753841950299x743679032068648000';
    const creatorResult = await query(
      'SELECT id, user_id, name FROM x1_5_user WHERE user_id = $1',
      [creatorId]
    );
    
    return NextResponse.json({
      success: true,
      connection: 'OK',
      time: result.rows[0]?.time,
      creator: creatorResult.rows[0] || null
    });
  } catch (error) {
    console.error('Test ranking error:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      stack: (error as Error).stack
    }, { status: 500 });
  }
}