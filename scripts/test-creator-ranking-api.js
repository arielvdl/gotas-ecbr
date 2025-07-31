const CREATOR_ID = '1753841950299x743679032068648000';
const API_URL = `http://localhost:3000/api/ranking/creator/${CREATOR_ID}?limit=10`;

async function testCreatorRankingAPI() {
  console.log('🔍 Testando API de Ranking do Criador');
  console.log('─'.repeat(70));
  console.log(`Criador ID: ${CREATOR_ID}`);
  console.log(`URL: ${API_URL}\n`);

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Erro na resposta:', response.status, response.statusText);
      console.error('Dados:', data);
      return;
    }

    if (!data.success) {
      console.error('❌ Erro:', data.error);
      return;
    }

    // Mostra informações do criador
    console.log('👤 INFORMAÇÕES DO CRIADOR:');
    console.log('─'.repeat(70));
    if (data.creator) {
      console.log(`Nome: ${data.creator.name || 'Sem nome'}`);
      console.log(`Email: ${data.creator.email}`);
      console.log(`Wallet: ${data.creator.wallet}`);
    } else {
      console.log('Criador não encontrado');
    }

    // Mostra estatísticas
    console.log('\n📊 ESTATÍSTICAS:');
    console.log('─'.repeat(70));
    if (data.stats) {
      console.log(`Total de Gotas Criadas: ${data.stats.total_gotas}`);
      console.log(`Total Coletadas: ${data.stats.total_minted}`);
      console.log(`Disponíveis: ${data.stats.total_available}`);
      console.log(`Coletores Únicos: ${data.stats.unique_collectors}`);
      console.log(`Total de Coletas: ${data.stats.total_orders}`);
    }

    // Mostra ranking
    console.log('\n🏆 RANKING DE COLETORES:');
    console.log('─'.repeat(70));
    
    if (data.ranking && data.ranking.length > 0) {
      data.ranking.forEach(entry => {
        console.log(`\n${entry.rank}º lugar:`);
        console.log(`  Nome: ${entry.collector.name || 'Anônimo'}`);
        console.log(`  Email: ${entry.collector.email || 'Sem email'}`);
        console.log(`  Wallet: ${entry.collector.wallet || 'Sem wallet'}`);
        console.log(`  Total Coletado: ${entry.stats.totalCollected} gotas`);
        console.log(`  Gotas Únicas: ${entry.stats.uniqueGotas}`);
        console.log(`  Primeira Coleta: ${new Date(entry.stats.firstCollect).toLocaleDateString('pt-BR')}`);
        console.log(`  Última Coleta: ${new Date(entry.stats.lastCollect).toLocaleDateString('pt-BR')}`);
      });
    } else {
      console.log('Nenhum coletor encontrado');
    }

    console.log('\n✅ Teste concluído com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao testar API:', error.message);
  }
}

// Aguarda um pouco para garantir que o servidor está pronto
console.log('⏳ Aguardando servidor inicializar...\n');
setTimeout(testCreatorRankingAPI, 2000);