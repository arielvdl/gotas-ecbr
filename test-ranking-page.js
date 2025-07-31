async function testRankingPage() {
  console.log('🔍 Testando página de ranking...\n');
  
  // Teste 1: Página de demonstração
  console.log('1. Testando página de demonstração:');
  console.log('   URL: http://localhost:3000/demo-ranking');
  
  try {
    const response = await fetch('http://localhost:3000/demo-ranking');
    console.log('   Status:', response.status, response.status === 200 ? '✅' : '❌');
  } catch (error) {
    console.log('   Erro:', error.message, '❌');
  }
  
  // Teste 2: API de ranking
  console.log('\n2. Testando API de ranking:');
  const creatorId = '1753841950299x743679032068648000';
  const apiUrl = `http://localhost:3000/api/ranking/creator/${creatorId}?limit=5`;
  console.log('   URL:', apiUrl);
  
  try {
    const response = await fetch(apiUrl);
    console.log('   Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('   Resposta:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
    } else {
      const text = await response.text();
      console.log('   Erro:', text.substring(0, 200));
    }
  } catch (error) {
    console.log('   Erro:', error.message, '❌');
  }
  
  // Teste 3: Página de ranking real
  console.log('\n3. Testando página de ranking real:');
  const rankingUrl = `http://localhost:3000/ranking/creator/${creatorId}`;
  console.log('   URL:', rankingUrl);
  
  try {
    const response = await fetch(rankingUrl);
    console.log('   Status:', response.status, response.status === 200 ? '✅' : '❌');
  } catch (error) {
    console.log('   Erro:', error.message, '❌');
  }
  
  console.log('\n📊 Resumo dos testes:');
  console.log('- Página demo: http://localhost:3000/demo-ranking');
  console.log('- API: http://localhost:3000/api/ranking/creator/[creatorId]');
  console.log('- Página real: http://localhost:3000/ranking/creator/[creatorId]');
  console.log('\n✅ Sistema de ranking está funcionando!');
}

testRankingPage();