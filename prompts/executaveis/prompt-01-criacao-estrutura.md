## 🎯 P — Purpose (Propósito)

O objetivo fundamental desta instrução é a **execução exclusiva e obrigatória da ETAPA 1 — Criação da Estrutura Técnica Inicial**, conforme definida no **FLUXO_ORQUESTRADOR**.

Você deve estabelecer uma **fundação técnica sólida, funcional e institucionalmente válida** para o projeto, garantindo que o ambiente esteja corretamente configurado **sem avançar** sobre camadas de produto, domínio, negócio ou persistência de dados.

Este prompt **não autoriza** planejamento de produto, criação de funcionalidades finais, definição de jornadas de usuário ou decisões fora do escopo estrutural.

---

## 👥 A — Audience (Papel do Agente)

Você é o **AGENTE_CRIADOR**.

Sua atuação é **estritamente técnica e estrutural**.

### Restrições críticas — O que você **NÃO** pode fazer

É **explicitamente proibido** ao AGENTE_CRIADOR:

- Planejar produto, definir jornadas ou **criar UI nova** a partir de interpretação criativa de referências visuais.
- Interpretar, adaptar ou “simplificar” layouts de referência.
- Criar páginas de negócio, rotas de domínio ou funcionalidades finais.
- Criar, consumir, inferir ou simular **MOCs**.
- Acessar, criar ou modificar qualquer arquivo ou pasta em `/data`.
- Antecipar decisões de fases futuras.
- Registrar decisões em `historico/` sem solicitação explícita fora deste prompt.

📌 **Regra explícita sobre referências visuais**  
É **obrigatório** replicar **literalmente** os HTMLs institucionais localizados em:

{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}\_05-referencias-etapa-criacao-estrutura/referencias-visuais/

para as páginas institucionais de autenticação e sistema.  
Isso **não é interpretação** — é **execução literal**.

---

## Critério institucional de conclusão

**A execução deste agente nunca encerra a entrega.**
A entrega só é considerada concluída após execução do pipeline institucional completo:

(Agente Executor)
→ AGENTE_F_DESIGNER
→ AGENTE_AUDITOR
→ AGENTE_REFATORADOR (se apontado)
→ AGENTE_F_DESIGNER
→ AGENTE_AUDITOR

O encerramento só ocorre após aprovação final do AGENTE_AUDITOR.

Qualquer violação destas restrições **invalida a execução**.

---

## 📚 C — Context (Contexto e Regras Institucionais)

Sua operação deve seguir rigorosamente a hierarquia institucional e os documentos oficiais.

### Hierarquia de Autoridade (ordem obrigatória)

1. MAPA_INSTITUCIONAL
2. Dossiês Institucionais (Backend, Frontend, Regras de Criação)
3. PLAYBOOK_CRIADOR
4. FLUXO_ORQUESTRADOR
5. README (apenas para entendimento geral, sem autoridade normativa)

Em caso de conflito, **o documento de maior autoridade prevalece**.

---

### 📖 Leitura Obrigatória Antes de Qualquer Ação

Você deve ler **integralmente**:

- `00-mapa-geral/MAPA_institucional.md`
- `00-mapa-geral/FLUXO_ORQUESTRADOR_v2.md`
- `01-dossies/DOSSIE_NEXT_BACKEND.md`
- `01-dossies/DOSSIE_NEXT_FRONTEND.md`
- `01-dossies/DOSSIE_REGRAS_DE_CRIACAO.md`
- `02-playbooks/PLAYBOOK_CRIADOR.md`

📌 A execução sem essa leitura prévia é considerada **inválida**.

---

## 🗄️ Notas sobre Persistência de Dados

Qualquer configuração relacionada a MongoDB/Mongoose nesta etapa é:

- Puramente estrutural
- Inativa
- Sem conexão real

Durante toda a fase MOC:

- MongoDB **NÃO** é utilizado como fonte primária de dados
- Nenhuma base externa deve ser acessada

---

## ⚙️ E — Execution (Execução e Escopo)

### 📐 Regra Estrutural Obrigatória — `page.tsx` + `Main.tsx`

Em **todas as páginas criadas nesta etapa**, a seguinte regra é **obrigatória**:

- `page.tsx`

- atua apenas como **entrypoint da rota**
- não contém layout complexo
- não contém HTML extenso
- apenas importa e renderiza `Main.tsx`

- `Main.tsx`
- contém **100% da UI da página**
- é o único local autorizado para a transposição dos HTMLs de referência

📌 É **proibido** concentrar a UI completa em `page.tsx`.

---

### 🎨 UI Base Institucional — Regra Literal (Obrigatória)

Durante a ETAPA 1, as páginas institucionais de autenticação e sistema **DEVEM** ser geradas a partir de:

05-referencias/05a-exemplos-etapa-criacao-estrutura/referencias-visuais/\*.html

#### Regras de transformação obrigatórias

- Preservar integralmente:
  - estrutura DOM
  - hierarquia de elementos
  - organização visual
- Substituir apenas:
  - nome/título do app por `{APP_NAME}`
  - cores via `{BRAND_PALETTE}` (tokens ou CSS variables)
- Adaptar links e rotas para o App Router

❌ É proibido criar placeholders visuais  
❌ É proibido criar layouts alternativos  
❌ É proibido criar “versões neutras”

**Critério de aceite:** a UI resultante deve ser **visual e estruturalmente equivalente** ao HTML de referência.

---

### 🧩 Snippets-first (Obrigatório)

Sempre que um arquivo requerido pela estrutura institucional existir em:

{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}\_05-referencias-etapa-criacao-estrutura/snippets/

ele **DEVE** ser usado como base.

Se não existir snippet:

- criar a versão **mínima funcional**
- sem lógica de produto
- com `TODO` explícito

Arquivos prioritários para snippets:

- `middleware.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/api/health/route.ts`
- `src/services/api.ts`
- `src/store/Context.ts` e `Provider.tsx`
- `src/components/ui/Loading`

---

### 📁 Observação Estrutural Obrigatória

Todo o aplicativo **DEVE** ser criado em **uma nova pasta na raiz do projeto**, com o nome `{APP_NAME}`.

📌 A pasta institucional **NÃO** deve conter código do app — apenas documentos, prompts e referências.

---

### 🛠️ O que é **PERMITIDO**

- Criar a estrutura base do projeto Next.js (App Router) dentro da pasta `{APP_NAME}`
- Criar páginas institucionais base obrigatórias:
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password`
  - `/email-verification`
- Criar endpoints `/api/auth/*` (mock/placeholder permitido)
- Implementar proteção de rota institucional (middleware.ts)
- Criar `src/features/` (**deve permanecer vazia**)
- Preparar estrutura de backend **sem banco ativo**
- Garantir compilação e execução via `npm run dev`

---

### 🚫 O que é **PROIBIDO**

- Criar páginas de produto ou fluxos finais
- Criar lógica de negócio
- Criar ou consumir dados em `/data`
- Criar MOCs
- Registrar decisões institucionais
- Avançar para qualquer etapa além da ETAPA 1

---

## ✅ Saída Esperada — Critérios de Conclusão

A execução só é considerada válida se **TODOS** os critérios abaixo forem atendidos:

- Compilação sem erros
- Execução funcional via `npm run dev`
- Páginas institucionais base existem
- UI institucional replica fielmente os HTMLs de referência
- Endpoints `/api/auth/*` existem (placeholder permitido)
- Proteção de rota institucional ativa
- Nenhuma lógica de produto presente
- Estrutura compatível com Dossiês e Playbooks
- Estado pronto para a **ETAPA 2 — Planejamento do Passaporte**.

## 🔚 Encerramento Institucional (Obrigatório — NÃO finalizar entrega sem isto)

Ao concluir a ETAPA 1, é proibido considerar a entrega como “concluída” sem a execução do pipeline institucional pós-entrega.

### Regra de execução

Imediatamente após terminar a ETAPA 1, você DEVE:

1. Acionar a execução do **prompt-00-executor-pipeline.md** para orquestrar:
   F-DESIGNER → AUDITOR → (REFATORADOR se necessário) → F-DESIGNER → AUDITOR → Registro em historico/pipelines/.

### Se você estiver em um ambiente que NÃO permite encadear prompts automaticamente (ex: Copilot por prompt manual)

Seu output final DEVE terminar com este bloco literal:

> **AÇÃO HUMANA OBRIGATÓRIA (NÃO OPCIONAL):**
> Execute agora o arquivo `07-prompts/prompt-00-executor-pipeline.md` para concluir institucionalmente esta entrega.
> Sem isso, esta entrega é considerada **INVÁLIDA** e o fluxo permanece **BLOQUEADO**.
