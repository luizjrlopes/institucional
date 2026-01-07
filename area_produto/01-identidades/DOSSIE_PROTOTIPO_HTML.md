# DOSSIE_PROTOTIPO_HTML.md

Dossiê Institucional — Protótipo HTML de Interfaces

**Versão:** v1.0 — Documento Normativo

---

## 1. Propósito do Protótipo HTML

O Protótipo HTML existe para **materializar a intenção visual e funcional** de uma aplicação **antes da implementação real** em Next.js.

Ele não é código de produção.
Ele não é fonte de verdade técnica.
Ele não define arquitetura.

Seu papel é:

- representar visualmente páginas e fluxos
- demonstrar hierarquia de componentes
- indicar relações entre páginas
- servir como insumo para o Passaporte da Aplicação

---

## 2. Natureza Institucional

O Protótipo HTML é um **documento de referência executável**.

Isso significa:

- ele pode ser aberto no navegador
- ele pode ter interações locais
- ele não deve depender de backend, rotas reais ou build

Em caso de conflito:

- **Dossiês > Brief > Passaporte > Protótipo HTML**

---

## 3. O que o Protótipo HTML PODE conter

### 3.1 Estrutura visual

- Layout completo da página
- Header, footer, sidebar (se existirem)
- Seções principais
- Hierarquia visual

### 3.2 Componentes simulados

- Botões
- Inputs
- Cards
- Listas
- Modais
- Accordions
- Tabs

### 3.3 Interações locais (permitidas)

- Abrir/fechar modal
- Expandir/retrair accordion
- Alternar tabs
- Mostrar tooltip ou toast
- Simular estados (loading, erro, vazio)

---

## 4. O que o Protótipo HTML NÃO PODE conter

- Navegação real entre páginas
- Uso de frameworks (React, Vue, etc.)
- Chamadas de API reais
- Dependência de backend
- Estado global persistente
- Lógica de autenticação real

Qualquer violação descaracteriza o protótipo.

---

## 5. Regra de Navegação entre Páginas

Toda ação que no produto final **mudaria de página** deve ser representada como:

- Toast
- Tooltip
- Badge
- Modal informativo

Com a informação clara:

> "Destino pretendido: /rota"

A navegação **não deve acontecer de fato**.

---

## 6. Organização dos Arquivos HTML

- Um HTML por página
- Nomenclatura alinhada à rota pretendida

  - Ex: `login.html`, `dashboard.html`, `perfil.html`

Arquivos devem ser **autoexecutáveis** (abrir direto no navegador).

---

## 7. Estilo e Recursos

- CSS inline ou arquivo único por página
- Uso permitido de bibliotecas visuais (ex: FontAwesome)
- Não utilizar bundlers
- Não utilizar imports dinâmicos

---

## 8. Relação com o Brief e o Passaporte

- O Protótipo **consome o Brief** (cores, identidade, layout base)
- O Passaporte **consome o Protótipo** (páginas, componentes, fluxos)

O Protótipo **nunca** substitui o Passaporte.

---

## 9. Critérios de Aceite do Protótipo

Um Protótipo HTML é considerado válido se:

- [ ] Abre sem erro no navegador
- [ ] Representa visualmente a página final
- [ ] Não possui navegação real entre páginas
- [ ] Usa avisos para destinos externos
- [ ] Interações locais funcionam
- [ ] Não depende de backend

---

## 10. Regra Final

> O Protótipo HTML é a ponte entre intenção visual e planejamento técnico.

Ele deve esclarecer, nunca confundir.
