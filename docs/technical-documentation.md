# Documentação Técnica - Gotas ECBR

## 1. Arquitetura do Sistema

### 1.1 Stack Tecnológica
- **Frontend Framework**: Next.js 15.4.4 com App Router
- **Linguagem**: TypeScript 5.x
- **Estilização**: Tailwind CSS 3.x + Shadcn/ui
- **Gerenciamento de Estado**: React Context API / Zustand
- **Build Tool**: Turbopack
- **Package Manager**: npm

### 1.2 Estrutura de Diretórios
```
gotas-ecbr/
├── src/
│   ├── app/                 # App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── ranking/         # Ranking page
│   │   ├── profile/         # User profile
│   │   └── api/            # API routes
│   ├── components/          # React components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── layout/         # Layout components
│   │   └── features/       # Feature-specific components
│   ├── lib/                # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
└── tests/                  # Test files
```

## 2. Componentes Principais

### 2.1 RankingCard
```typescript
interface RankingCardProps {
  position: number;
  user: {
    name: string;
    avatar?: string;
  };
  drops: number;
  isCurrentUser?: boolean;
}
```
- Exibe informações de ranking do usuário
- Destaque visual para top 3
- Indicação visual para o usuário atual

### 2.2 DropCollector
```typescript
interface DropCollectorProps {
  onScan: (qrCode: string) => Promise<void>;
  isScanning: boolean;
}
```
- Scanner de QR code
- Validação em tempo real
- Feedback visual de sucesso/erro

### 2.3 PrizeDisplay
```typescript
interface Prize {
  id: string;
  name: string;
  description: string;
  value: number;
  image: string;
  requiredDrops: number;
}
```
- Lista de prêmios disponíveis
- Status de elegibilidade
- Imagens e descrições

## 3. Gerenciamento de Estado

### 3.1 User Context
```typescript
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  drops: number;
  collectedDrops: Drop[];
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  collectDrop: (dropId: string) => Promise<void>;
}
```

### 3.2 Ranking Context
```typescript
interface RankingState {
  rankings: RankingEntry[];
  userPosition: number;
  isLoading: boolean;
  lastUpdate: Date;
  refreshRanking: () => Promise<void>;
}
```

## 4. API Design

### 4.1 Endpoints

#### Autenticação
- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Cadastro de novo usuário
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Dados do usuário autenticado

#### Gotas
- `POST /api/drops/collect` - Coletar uma gota
- `GET /api/drops/history` - Histórico de gotas do usuário
- `GET /api/drops/validate/:qrCode` - Validar QR code

#### Ranking
- `GET /api/ranking` - Lista de ranking geral
- `GET /api/ranking/me` - Posição do usuário atual

#### Prêmios
- `GET /api/prizes` - Lista de prêmios disponíveis
- `GET /api/prizes/eligibility` - Elegibilidade do usuário

### 4.2 Modelos de Dados

#### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Drop
```typescript
interface Drop {
  id: string;
  userId: string;
  lectureId: string;
  collectedAt: Date;
  points: number;
}
```

#### Lecture
```typescript
interface Lecture {
  id: string;
  title: string;
  speaker: string;
  startTime: Date;
  endTime: Date;
  qrCode: string;
  maxDrops: number;
}
```

## 5. Segurança

### 5.1 Autenticação e Autorização
- JWT tokens com expiração de 24h
- Refresh tokens para sessões longas
- Validação de tokens em todas as rotas protegidas

### 5.2 Validação de Dados
- Sanitização de inputs
- Validação de tipos com TypeScript
- Rate limiting por IP e por usuário

### 5.3 Proteção contra Fraudes
- Validação de geolocalização (opcional)
- Tempo mínimo entre coletas
- Limite de gotas por palestra
- Detecção de padrões anômalos

## 6. Performance

### 6.1 Otimizações Frontend
- Code splitting automático do Next.js
- Lazy loading de componentes pesados
- Imagens otimizadas com next/image
- Cache de dados estáticos

### 6.2 Cache Strategy
- Rankings: Cache de 30 segundos
- Dados do usuário: Cache de 5 minutos
- Prêmios: Cache de 1 hora
- Invalidação inteligente após ações

### 6.3 Real-time Updates
- Polling para atualizações de ranking
- WebSocket para notificações (futura implementação)
- Optimistic UI updates

## 7. Testes

### 7.1 Tipos de Testes
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API endpoints
- **E2E Tests**: Cypress ou Playwright
- **Performance Tests**: Lighthouse CI

### 7.2 Cobertura Esperada
- Componentes críticos: 90%+
- Utilitários e hooks: 95%+
- API routes: 85%+
- Overall: 80%+

## 8. Deploy e CI/CD

### 8.1 Ambientes
- **Development**: Local com hot reload
- **Staging**: Preview deployments no Vercel
- **Production**: Vercel com domínio customizado

### 8.2 Pipeline
1. Push para branch
2. Run linters e type check
3. Run tests
4. Build do projeto
5. Deploy automático (staging)
6. Deploy manual para produção

## 9. Monitoramento

### 9.1 Métricas
- Performance (Core Web Vitals)
- Taxa de erro
- Tempo de resposta da API
- Uso de recursos

### 9.2 Ferramentas
- Vercel Analytics
- Sentry para error tracking
- Custom analytics para métricas de negócio

## 10. Manutenção

### 10.1 Atualizações
- Dependências: Mensalmente
- Security patches: Imediatamente
- Features: Conforme roadmap

### 10.2 Backup
- Dados de usuários: Diário
- Configurações: A cada mudança
- Logs: Retenção de 30 dias