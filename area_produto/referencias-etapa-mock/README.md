# Referências Etapa Mock (Construção do Produto)

## 📍 Objetivo

Este diretório contém **todas as referências visuais e funcionais** que o **AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO** utilizará para criar o passaporte do produto.

---

## 📁 Estrutura de Diretórios

```text
referencias-etapa-mock/
├── html/           # Protótipos HTML das páginas do produto
├── imagens/        # Wireframes, mockups, designs visuais
├── md/             # Anotações funcionais, regras de negócio, fluxos
└── README.md       # Este arquivo
```

---

## 🎯 Como Utilizar

### 1. Fase de Preparação (Antes da Geração do Passaporte)

**O usuário/designer deve colocar neste diretório:**

#### `/html/`

- Protótipos HTML funcionais das páginas
- Nomeação sugerida: `page-home.html`, `page-dashboard.html`, `page-perfil.html`
- Cada HTML deve representar uma página completa do produto

#### `/imagens/`

- Wireframes das telas
- Mockups de design
- Capturas de tela de referência
- Diagramas de fluxo visual

#### `/md/`

- Anotações funcionais de cada página
- Regras de negócio específicas
- Fluxos de interação
- Critérios de validação
- Requisitos técnicos específicos

**Exemplo de estrutura em `/md/`:**

```markdown
# Página: Home

## Funcionalidades

- Exibir dashboard com resumo
- Mostrar últimas atividades
- Permitir acesso rápido às seções

## Regras de Negócio

- Apenas usuários autenticados veem o dashboard
- Dados devem ser carregados de forma assíncrona
- Loading state obrigatório

## Componentes Necessários

- DashboardCard
- ActivityFeed
- QuickAccessMenu
```

---

### 2. Fase de Geração do Passaporte

O **AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO**:

1. Lê o [BRIEF_PRODUTO.md](../01-identidades/BRIEF_PRODUTO.md) para entender objetivos
2. Analisa **todos os arquivos** deste diretório (`html/`, `imagens/`, `md/`)
3. Extrai:
   - Estrutura de páginas
   - Componentes necessários
   - Regras de negócio
   - Fluxos de interação
   - Requisitos visuais
4. Gera o **PASSAPORTE_DO_PRODUTO.md** consolidando tudo

---

## ✅ Checklist de Qualidade

Antes de acionar o agente gerador, certifique-se de que:

- [ ] Cada página do produto tem um HTML em `/html/`
- [ ] Cada página tem documentação funcional em `/md/`
- [ ] Imagens de referência estão em `/imagens/` (se aplicável)
- [ ] Fluxos de navegação estão documentados
- [ ] Regras de negócio específicas estão explícitas
- [ ] Estados de loading/erro estão definidos
- [ ] Critérios de validação estão documentados

---

## 📌 Observações Importantes

### Diferença entre Etapas

**Referências de CRIAÇÃO** (`[stack_id]/001_05-referencias-etapa-criacao-estrutura/`):

- Páginas institucionais (login, register, forgot-password)
- Estrutura base da aplicação
- Autenticação e autorização

**Referências de MOCK** (este diretório):

- Páginas do produto específico
- Funcionalidades de negócio
- Telas únicas do sistema

### Reutilização

Se o produto tiver páginas similares, você pode:

- Criar um HTML base e documentar variações no `.md`
- Referenciar componentes já criados na etapa de estrutura
- Documentar padrões de reuso

---

## 🚫 O que NÃO colocar aqui

- ❌ Código de produção (isso é gerado pelo AGENTE_EVOLUTOR)
- ❌ Configurações de banco de dados (isso vem depois)
- ❌ Lógica de integração com APIs externas (fase posterior)
- ❌ Páginas institucionais (login, register - já estão na etapa de criação)

---

## 🔄 Ciclo de Vida

1. **Preparação** - Designer/usuário popula este diretório
2. **Geração** - AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO analisa e cria passaporte
3. **Validação** - AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO verifica
4. **Implementação** - AGENTE_EVOLUTOR usa o passaporte para criar páginas
5. **Iteração** - Se necessário ajustar, atualizar referências e regenerar passaporte
