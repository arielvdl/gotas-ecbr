import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const params = await context.params;
    const userId = params.userId;

    // Busca o usuário pelo ID interno
    const result = await query(
      'SELECT id, user_id, name, email_principal, wallet FROM x1_5_user WHERE id = $1 LIMIT 1',
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const user = result.rows[0];

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        user_id: user.user_id,
        name: user.name || `Usuário ${user.id}`,
        email: user.email_principal,
        wallet: user.wallet
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar informações do usuário' 
      },
      { status: 500 }
    );
  }
}