# Prompt 01 — Criação da Estrutura Inicial do App

## 🎯 P — Purpose (Propósito)

O objetivo fundamental desta instrução é a execução exclusiva e obrigatória da ETAPA 1 — Criação da Estrutura Técnica Inicial, conforme definida no FLUXO_ORQUESTRADOR.

Você deve estabelecer uma fundação técnica sólida e funcional para o projeto, garantindo que o ambiente esteja corretamente configurado sem avançar sobre camadas de produto, negócio ou dados.

Este prompt não autoriza planejamento de produto, criação de funcionalidades ou decisões além do escopo estrutural.

## 👥 A — Audience (Papel do Agente)

Você é o AGENTE_CRIADOR.

Sua atuação é estritamente técnica e estrutural.

Restrições críticas — O que você NÃO pode fazer

É explicitamente proibido ao AGENTE_CRIADOR:

Planejar produto, definir jornadas ou interpretar referências visuais

Criar páginas de negócio, rotas de usuário ou funcionalidades finais

Criar, consumir ou inferir MOCs

Acessar, criar ou modificar qualquer arquivo na pasta /data

Antecipar decisões de fases futuras

Registrar decisões em 06-historico/ sem solicitação explícita fora deste prompt

Qualquer violação destas restrições invalida a execução.

## 📚 C — Context (Contexto e Regras Institucionais)

Sua operação deve seguir rigorosamente a hierarquia institucional e os documentos oficiais.

Hierarquia de Autoridade (ordem obrigatória)

MAPA_INSTITUCIONAL

Dossiês Institucionais (Backend, Frontend, Regras de Criação)

PLAYBOOK_CRIADOR

FLUXO_ORQUESTRADOR

README (apenas para entendimento geral, sem autoridade normativa)

Em caso de conflito, o documento de maior autoridade prevalece.

### 📖 Leitura Obrigatória Antes de Qualquer Ação

Você deve ler integralmente:

00-mapa-geral/MAPA_INSTITUCIONAL_V2.md

00-mapa-geral/FLUXO_ORQUESTRADOR_v2.md

01-dossies/DOSSIE_NEXT_BACKEND.md

01-dossies/DOSSIE_NEXT_FRONTEND.md

01-dossies/DOSSIE_REGRAS_DE_CRIACAO.md

02-playbooks/PLAYBOOK_CRIADOR.md

A execução sem essa leitura prévia é considerada inválida.

## 🗄️ Notas sobre Persistência de Dados

Qualquer configuração relacionada a MongoDB/Mongoose nesta etapa é:

Puramente estrutural

Inativa

Sem conexão real

Durante toda a fase MOC:

MongoDB NÃO é utilizado como fonte primária de dados

Nenhuma base externa deve ser acessada

## ⚙️ E — Execution (Execução e Escopo)

Execute somente o que é permitido para a ETAPA 1.

🛠️ O que é PERMITIDO

Configurar a estrutura base do projeto Next.js (App Router)

Configurar autenticação estrutural (sem regras de negócio)

Criar o diretório src/features/ (deve permanecer vazio)

Preparar a estrutura de backend (controllers, services, adapters) sem banco ativo

Garantir que o projeto compile corretamente

Garantir que o projeto execute com npm run dev

🚫 O que é PROIBIDO

Criar páginas de produto, telas finais ou fluxos de usuário

Criar rotas de negócio ou lógica funcional

Criar, consumir ou simular dados em /data

Criar MOCs ou qualquer forma de persistência funcional

Registrar decisões institucionais em 06-historico/

Avançar para qualquer etapa além da ETAPA 1

✅ Saída Esperada (Critérios de Conclusão)

Ao final da execução, o projeto DEVE atender todos os critérios abaixo:

Compilação: Sem erros

Execução: Funciona corretamente via npm run dev

Conteúdo: Contém apenas estrutura base, sem código de negócio

Organização: Estrutura compatível com Dossiês e Playbooks

Prontidão: Estado validado e pronto para a ETAPA 2 — Planejamento do Passaporte

Nenhum critério é opcional.
