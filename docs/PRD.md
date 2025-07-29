# Product Requirements Document (PRD) - Gotas ECBR

## 1. Visão Geral do Produto

### 1.1 Nome do Produto
Gotas ECBR

### 1.2 Descrição
Sistema de gamificação para eventos WEB3 ARENA onde participantes coletam "gotas" durante palestras e competem por prêmios através de um ranking em tempo real.

### 1.3 Objetivo
Aumentar o engajamento dos participantes durante as palestras do evento WEB3 ARENA, incentivando a presença e participação ativa através de um sistema de recompensas gamificado.

## 2. Público-Alvo

### 2.1 Usuário Principal
- Participantes do evento WEB3 ARENA
- Idade: 18-45 anos
- Perfil: Entusiastas de tecnologia blockchain, Web3 e criptomoedas
- Nível técnico: Médio a avançado

### 2.2 Necessidades do Usuário
- Acompanhar seu progresso durante o evento
- Visualizar ranking em tempo real
- Coletar recompensas de forma simples
- Interface intuitiva e responsiva

## 3. Funcionalidades Principais

### 3.1 Sistema de Ranking
- **Visualização em tempo real**: Exibir posição atual do usuário
- **Top 3 destaque**: Mostrar os três primeiros colocados com destaque visual
- **Informações exibidas**: Posição, nome/apelido, quantidade de gotas

### 3.2 Coleta de Gotas
- **QR Code por palestra**: Cada palestra terá um QR code único
- **Validação por tempo**: Gotas só podem ser coletadas durante a palestra
- **Feedback visual**: Confirmação imediata ao coletar uma gota

### 3.3 Sistema de Prêmios
- **Visualização de prêmios**: Lista de prêmios disponíveis (ex: Ledger Classic 2025)
- **Regras claras**: Critérios para ganhar cada prêmio
- **Status de elegibilidade**: Indicar se o usuário está elegível

### 3.4 Perfil do Usuário
- **Cadastro simplificado**: Nome, email, telefone
- **Histórico de gotas**: Lista de palestras assistidas
- **Total de gotas**: Contador geral

## 4. Requisitos Técnicos

### 4.1 Frontend
- **Framework**: Next.js 15+ com TypeScript
- **Estilização**: Tailwind CSS + Shadcn/ui
- **Responsividade**: Mobile-first design
- **Tema**: Dark mode como padrão

### 4.2 Backend
- **API**: RESTful ou GraphQL
- **Autenticação**: JWT tokens
- **Validação**: Regras de negócio para coleta de gotas

### 4.3 Banco de Dados
- **Usuários**: Informações de cadastro e autenticação
- **Gotas**: Registro de coletas com timestamp
- **Palestras**: Informações e QR codes únicos
- **Rankings**: Cache para performance

### 4.4 Segurança
- **OWASP Top 10**: Seguir diretrizes de segurança
- **Rate limiting**: Prevenir abuso na coleta de gotas
- **Validação**: Server-side para todas as operações críticas

## 5. Design e UX

### 5.1 Princípios de Design
- **Minimalista**: Interface limpa e focada
- **Dark theme**: Fundo escuro (#0a0a0a) com elementos contrastantes
- **Hierarquia visual**: Destaque para informações importantes
- **Microinterações**: Feedback visual para ações do usuário

### 5.2 Componentes Principais
- **Header**: Logo WEB3 ARENA + navegação mínima
- **Card de Ranking**: Design similar ao mockup fornecido
- **Botões**: Estilo arredondado com hover states
- **Tabs**: Navegação entre "prêmios" e "ranking"

## 6. Fluxos de Usuário

### 6.1 Primeiro Acesso
1. Usuário acessa o app
2. Tela de cadastro/login
3. Tutorial rápido sobre como funciona
4. Redirecionamento para dashboard

### 6.2 Coleta de Gota
1. Usuário está na palestra
2. Escaneia QR code apresentado
3. App valida localização/tempo
4. Gota é creditada
5. Atualização do ranking

### 6.3 Visualização de Ranking
1. Usuário acessa aba "ranking"
2. Vê sua posição atual
3. Pode scrollar para ver outros participantes
4. Atualização automática a cada 30 segundos

## 7. Métricas de Sucesso

### 7.1 KPIs
- **Taxa de engajamento**: % de participantes usando o app
- **Gotas por usuário**: Média de gotas coletadas
- **Retenção**: Usuários ativos durante todo o evento
- **Satisfação**: NPS pós-evento

### 7.2 Analytics
- Tempo de permanência no app
- Funcionalidades mais utilizadas
- Taxa de conclusão de coleta
- Horários de pico de uso

## 8. Roadmap

### 8.1 MVP (Fase 1)
- Sistema de ranking básico
- Coleta de gotas via QR code
- Visualização de prêmios
- Interface responsiva

### 8.2 Melhorias Futuras (Fase 2)
- Notificações push
- Sistema de achievements
- Integração com redes sociais
- Histórico de eventos anteriores

## 9. Considerações Finais

Este PRD serve como guia para o desenvolvimento do Gotas ECBR. O foco principal é criar uma experiência simples, engajante e confiável que agregue valor ao evento WEB3 ARENA e proporcione uma experiência memorável aos participantes.