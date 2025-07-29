# CLAUDE.md - Instruções para IA

## Contexto do Projeto

Você está trabalhando no **Gotas ECBR**, um sistema de gamificação para o evento WEB3 ARENA. O projeto permite que participantes coletem "gotas" durante palestras e compitam por prêmios através de um ranking.

## Stack Tecnológica

- **Framework**: Next.js 15.4.4 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + Shadcn/ui
- **Build**: Turbopack
- **Package Manager**: npm

## Diretrizes de Desenvolvimento

### 1. Padrões de Código

- Use TypeScript com tipagem estrita
- Siga as convenções do Next.js App Router
- Componentes devem ser funcionais com hooks
- Use `'use client'` apenas quando necessário
- Prefira Server Components quando possível

### 2. Estrutura de Arquivos

```
src/
├── app/          # Páginas e rotas
├── components/   # Componentes reutilizáveis
│   ├── ui/      # Componentes base do Shadcn
│   └── features/ # Componentes específicos
├── lib/         # Utilitários
├── hooks/       # Custom hooks
├── services/    # Lógica de API
└── types/       # TypeScript types
```

### 3. Estilização

- Use Tailwind CSS classes
- Tema dark por padrão
- Cores principais:
  - Background: #0a0a0a
  - Foreground: #ffffff
  - Accent: Conforme necessário
- Use a função `cn()` para classes condicionais

### 4. Componentes

Ao criar componentes:
- Exporte como `export function ComponentName()`
- Use interfaces para props
- Implemente loading states
- Adicione error boundaries quando apropriado

### 5. Segurança

- SEMPRE siga OWASP Top 10
- Valide inputs no servidor
- Use HTTPS em produção
- Implemente rate limiting
- Sanitize dados do usuário
- Nunca exponha chaves sensíveis

### 6. Performance

- Otimize imagens com next/image
- Use lazy loading quando apropriado
- Implemente cache strategies
- Minimize re-renders desnecessários

### 7. Estado da Aplicação

- Para estado local: useState/useReducer
- Para estado global: Context API ou Zustand
- Para dados do servidor: considere React Query/SWR

### 8. Comandos Úteis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run lint     # Linting
npm run test     # Testes
```

## Funcionalidades Principais

### 1. Sistema de Ranking
- Exibir top 3 com destaque
- Atualização em tempo real (30s)
- Mostrar posição do usuário atual

### 2. Coleta de Gotas
- Scanner de QR Code
- Validação por tempo/local
- Feedback visual imediato

### 3. Sistema de Prêmios
- Lista de prêmios (ex: Ledger)
- Status de elegibilidade
- Regras claras

## Estrutura de Dados

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  drops: number;
}
```

### Drop
```typescript
interface Drop {
  id: string;
  userId: string;
  lectureId: string;
  collectedAt: Date;
}
```

### RankingEntry
```typescript
interface RankingEntry {
  position: number;
  user: User;
  totalDrops: number;
}
```

## UI/UX Guidelines

1. **Mobile First**: Sempre desenvolva pensando em mobile
2. **Dark Theme**: Use o tema escuro como padrão
3. **Feedback Visual**: Toda ação deve ter feedback
4. **Loading States**: Sempre mostre estado de carregamento
5. **Error Handling**: Mensagens de erro claras e acionáveis

## Git Workflow

1. Commits semânticos (feat:, fix:, docs:, etc.)
2. Branch naming: feature/nome-da-feature
3. PRs com descrição detalhada
4. Code review obrigatório

## Notas Importantes

- O projeto está em desenvolvimento inicial
- Foque em criar um MVP funcional primeiro
- Priorize a experiência do usuário
- Mantenha o código limpo e documentado
- Teste funcionalidades críticas

## Contato e Suporte

Para dúvidas sobre o projeto, consulte a documentação em `/docs` ou revise o PRD para entender melhor os requisitos de negócio.