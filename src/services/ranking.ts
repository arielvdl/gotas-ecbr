export interface ApiRankingItem {
  user_id: number;
  raridade: string;
  total: number;
  points: number;
}

export interface RankingUser {
  id: string;
  name: string;
  drops: number;
  position: number;
  definido?: boolean;
}

const CREATOR_ID = '1753841950299x743679032068648000';

interface UserInfoResponse {
  id: number;
  user_id: string;
  name: string;
}

async function fetchUserInfo(userId: number): Promise<string> {
  try {
    // Usa a API externa para buscar informações do usuário
    const response = await fetch(`https://api.gotas.com/api:vSSd8do6/get_infos_user?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data: UserInfoResponse = await response.json();
      return data.name || `Usuário #${userId}`;
    }
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
  }
  
  // Se falhar, retorna um nome padrão
  return `Usuário #${userId}`;
}

// Dados fixos dos ganhadores - remover quando voltar a usar a API
const FIXED_WINNERS = [
  { user_id: 35631, name: "Alan Puntim", total: 17, position: 1, definido: true },
  { user_id: 1030, name: "Talles Feliciano", total: 16, position: 2, definido: true },
  // Os próximos com 15 gotas - posições 3 e 4 serão definidas por ordem de email
  { user_id: 160954, name: "Você tem 15 gotas?", total: 15, position: 3, definido: false },
  { user_id: 111402, name: "Envie email para garantir!", total: 15, position: 4, definido: false },
  // Candidatos: 160954 (Aislan), 111402 (Eco Dry), 161948 (Fabio Melo)
];

export async function fetchRanking(): Promise<RankingUser[]> {
  // TEMPORÁRIO: Retornando dados fixos dos ganhadores
  // Descomente o código abaixo quando quiser voltar a usar a API
  const result = FIXED_WINNERS.map(winner => ({
    id: winner.user_id.toString(),
    name: winner.name,
    drops: winner.total,
    position: winner.position,
    definido: winner.definido
  }));
  
  console.log('Returning fixed winners:', result);
  return result;

  /* CÓDIGO DA API - MANTIDO PARA USO FUTURO
  try {
    const response = await fetch(`https://api.gotas.com/api:vSSd8do6/ranking_creator/geral?creator_id=${CREATOR_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiRankingItem[] = await response.json();
    
    // Pegar apenas os top 4
    const top4 = data.slice(0, 4);
    
    // Buscar nomes dos usuários em paralelo
    const rankingWithNames = await Promise.all(
      top4.map(async (item, index) => {
        const name = await fetchUserInfo(item.user_id);
        return {
          id: item.user_id.toString(),
          name: name,
          drops: item.total,
          position: index + 1
        };
      })
    );

    return rankingWithNames;
  } catch (error) {
    console.error('Error fetching ranking:', error);
    throw error;
  }
  */
}