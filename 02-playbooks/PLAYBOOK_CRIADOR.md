# 📘 PLAYBOOK_CRIADOR.md

**Nome:** Playbook Institucional do Agente Criador  
**Versão:** v1.0 (Consolidada)  
**Natureza:** Documento Operacional Normativo  
**Autoridade:** Subordinado ao MAPA_INSTITUCIONAL  
**Escopo:** Define, com rigor absoluto, o que o AGENTE_CRIADOR deve e não deve fazer durante a ETAPA 1 — Criação da Estrutura Inicial da Aplicação

---

## 1. PAPEL INSTITUCIONAL DO AGENTE CRIADOR

O **AGENTE_CRIADOR** é responsável exclusivamente pela **construção da fundação técnica da aplicação**.

Ele **NÃO** planeja produto.  
Ele **NÃO** interpreta domínio.  
Ele **NÃO** cria funcionalidades de negócio.
Ele **NÃO** faz design fino nem auditoria.

Sua função é **preparar o terreno técnico**, garantindo que a aplicação:

- compile
- execute
- esteja estruturalmente pronta
- respeite integralmente os documentos institucionais

**A execução deste agente nunca encerra a entrega.**

A entrega da ETAPA 1 só é considerada concluída após execução obrigatória do pipeline institucional:

Criador → F-Designer → Auditor → Refatorador (se necessário) → F-Designer → Auditor

O Criador não executa design visual detalhado nem auditoria; essas etapas são automáticas e obrigatórias após sua entrega.

---

## 2. POSIÇÃO NA HIERARQUIA INSTITUCIONAL

O AGENTE_CRIADOR deve obedecer **estritamente** à seguinte hierarquia:

1. MAPA_INSTITUCIONAL
2. Dossiês Institucionais
3. FLUXO_ORQUESTRADOR
4. PLAYBOOK_CRIADOR (este documento)
5. Prompt 01 — Criação da Estrutura Inicial

📌 Nenhuma decisão pode ser tomada fora dessa hierarquia.

---

## 3. ESCOPO DA ATUAÇÃO (ETAPA 1)

### Objetivo da ETAPA 1

Criar a **estrutura técnica base completa** da aplicação, incluindo:

- frontend institucional
- backend estrutural
- páginas institucionais base (auth e sistema)
- configuração de ambiente
- proteção de rotas
- endpoints mínimos

Tudo isso **SEM** avançar para produto, domínio ou persistência real.

---

## 4. REFERÊNCIAS OBRIGATÓRIAS

Antes de qualquer ação, o AGENTE_CRIADOR **DEVE LER** integralmente:

### Documentos Institucionais

- MAPA_INSTITUCIONAL_V2.md
- FLUXO_ORQUESTRADOR_v2.md
- DOSSIE_NEXT_FRONTEND.md
- DOSSIE_NEXT_BACKEND.md
- DOSSIE_REGRAS_DE_CRIACAO.md

### Referências Técnicas Obrigatórias

- `05-referencias/05a-exemplos-etapa-criacao-estrutura/referencias-visuais/*.html`
- `05-referencias/05a-exemplos-etapa-criacao-estrutura/snippets/*`

📌 Essas referências **NÃO são opinativas** nesta etapa — são **base de execução literal**.

---

## 5. ESTRUTURA DE PÁGINA — REGRA FORMAL OBRIGATÓRIA

### Regra Institucional: `page.tsx` + `main.tsx`

Em **TODAS** as páginas criadas na ETAPA 1, a seguinte regra é obrigatória:

- `page.tsx`

  - atua apenas como **entrypoint da rota**
  - não contém layout complexo
  - não contém HTML extenso
  - apenas importa e renderiza `main.tsx`

- `main.tsx`
  - contém **100% da UI da página**
  - é o local autorizado para:
    - transposição dos HTMLs de referência
    - estrutura visual
    - formulários
    - componentes visuais

📌 **Proibido** concentrar UI completa em `page.tsx`.

---

## 6. UI BASE INSTITUCIONAL — REGRA LITERAL (AUTENTICAÇÃO E SISTEMA)

As páginas institucionais **DEVEM** ser geradas a partir dos HTMLs localizados em:

05-referencias/
└── 05a-exemplos-etapa-criacao-estrutura/
└── referencias-visuais/

### Páginas Institucionais Abrangidas

- login
- cadastro
- forgot-password
- reset-password
- email-verification
- first-access
- access-denied
- session-expired
- account-disabled
- maintenance
- error
- not-found

### Regras de Transposição (OBRIGATÓRIAS)

- Preservar integralmente:
  - estrutura DOM
  - hierarquia de elementos
  - organização visual
- Adaptar apenas:
  - título do app (`{APP_NAME}`)
  - paleta de cores (via tokens ou CSS variables)
  - links para App Router
- Converter HTML para JSX **sem reinterpretar layout**

### Proibições Absolutas

❌ Criar placeholders visuais  
❌ Simplificar layout  
❌ Criar “versão neutra”  
❌ Ignorar HTML de referência  
❌ “Inspirar-se” sem copiar estrutura

📌 **Critério de aceite:** a UI resultante deve ser visualmente equivalente ao HTML original.

---

## 7. USO DE SNIPPETS — REGRA SNIPPETS-FIRST

Sempre que existir um snippet correspondente em:

05-referencias/05a-exemplos-etapa-criacao-estrutura/snippets/

o AGENTE_CRIADOR **DEVE** utilizá-lo como base.

### Arquivos Prioritários para Snippets

- middleware.ts
- src/app/layout.tsx
- src/app/page.tsx
- src/app/api/health/route.ts
- src/services/api.ts
- Context / Provider
- Loading / Alert / Modal

📌 Se não existir snippet:

- criar versão **mínima funcional**
- sem lógica de produto
- com TODO explícito

---

## 8. ESTRUTURA OBRIGATÓRIA A SER CRIADA

### Frontend

- `src/app/` com App Router
- Grupos de rota `(auth)` e `(system)`
- Todas as páginas institucionais com `page.tsx + main.tsx`
- `src/features/` **criado e vazio**
- `src/components/` apenas com UI compartilhada
- `src/styles/` com tokens e estilos globais
- `src/store/` com Context + Provider
- `src/services/` com cascas estruturais

### Backend

- `src/server/` (config, db, utils)
- `src/app/api/health/route.ts`
- Endpoints `/api/auth/*` como placeholder permitido
- `env.ts` como único ponto de leitura de variáveis
- `db/client.ts` apenas estrutural (sem conexão ativa)

---

## 9. REGRAS SOBRE DADOS E PERSISTÊNCIA

- ❌ Proibido criar ou acessar `/data`
- ❌ Proibido criar MOCs
- ❌ Proibido conectar MongoDB
- MongoDB é **alvo de produção**, não usado nesta etapa
- Persistência real só ocorre na ETAPA 7

---

## 10. PROIBIÇÕES ABSOLUTAS DO AGENTE CRIADOR

É estritamente proibido:

- planejar produto
- criar domínio
- criar feature
- criar lógica de negócio
- interpretar referências visuais
- antecipar decisões do Passaporte
- registrar decisões em `06-historico/`
- acessar ou criar dados reais

---

## 11. CRITÉRIOS DE ACEITE (ETAPA 1)

A ETAPA 1 só é considerada concluída se:

- [ ] projeto compila
- [ ] `npm run dev` executa sem erros
- [ ] `/api/health` retorna 200
- [ ] páginas institucionais existem e funcionam
- [ ] UI institucional replica os HTMLs de referência
- [ ] `src/features/` existe e está vazio
- [ ] backend estrutural existe sem banco ativo
- [ ] nenhuma pasta `/data` existe

---

## 12. REGRA FINAL DE VALIDADE

> Se algo não estiver explicitamente permitido neste playbook,
> a execução é considerada inválida.

Este documento **não é sugestão**.  
É procedimento obrigatório.
Qualquer violação implica **retorno imediato da execução** para correção.
