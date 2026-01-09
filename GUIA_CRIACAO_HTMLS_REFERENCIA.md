# GUIA DE CRIAÇÃO DE HTMLS DE REFERÊNCIA VISUAL

## 🎯 Objetivo

Este documento define as **regras obrigatórias** para criar HTMLs de referência que serão usados pelos agentes IA para gerar páginas de autenticação e sistema.

---

## 📋 REGRAS CRÍTICAS

### 1. 🎨 CORES - Sistema de Tokens Obrigatório

**NUNCA use cores HEX diretamente no HTML.**

#### ✅ CORRETO: Usar Tokens

```html
<style>
  :root {
    --primary-color: {{primary_color}};
    --secondary-color: {{secondary_color}};
    --surface-color: {{surface_color}};
    --text-primary: {{text_primary}};
    --background-color: {{background_color}};
    --border-color: {{border_color}};
    --error-color: {{error_color}};
    --success-color: {{success_color}};
  }
</style>

<button
  style="background-color: var(--primary-color); color: var(--surface-color);"
>
  Login
</button>

<!-- OU inline com tokens -->
<div style="background: {{surface_color}}; border: 1px solid {{border_color}};">
  Conteúdo
</div>
```

#### ❌ ERRADO: HEX Direto

```html
<!-- ❌ NÃO faça isso -->
<button style="background-color: #6366F1; color: #FFFFFF;">Login</button>

<div style="background: #F9FAFB; border: 1px solid #E5E7EB;">Conteúdo</div>
```

**Motivo:** Os agentes farão substituição mecânica dos tokens pelos valores reais do BRIEF_PRODUTO.md. Cores hardcoded causam inconsistência visual.

---

### 2. 📦 COMPONENTES - Estados Visuais Completos

**TODOS os componentes devem ter estados visuais funcionais.**

#### Estados Obrigatórios:

**Inputs/Formulários:**

- ✅ Estado normal
- ✅ Estado focus (`:focus` com ring/borda destacada)
- ✅ Estado error (borda vermelha + mensagem)
- ✅ Estado disabled (opacity reduzida)
- ✅ Placeholder visível

**Botões:**

- ✅ Estado normal
- ✅ Estado hover (`:hover` com cor mais escura)
- ✅ Estado active (`:active` visual feedback)
- ✅ Estado loading (spinner ou "Carregando...")
- ✅ Estado disabled (opacity + cursor not-allowed)

**Links:**

- ✅ Estado normal
- ✅ Estado hover (underline ou cor alterada)
- ✅ Estado visited (opcional)

**Cards/Containers:**

- ✅ Sombra (shadow)
- ✅ Borda visível
- ✅ Padding adequado
- ✅ Responsive (adapta mobile)

#### Exemplo Completo:

```html
<style>
  /* Input States */
  .input-field {
    border: 1px solid {{border_color}};
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
  }

  .input-field:focus {
    outline: none;
    border-color: {{primary_color}};
    box-shadow: 0 0 0 3px {{primary_color}}20; /* 20 = opacity */
  }

  .input-field.error {
    border-color: {{error_color}};
  }

  .input-field:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: {{surface_color}};
  }

  /* Button States */
  .btn-primary {
    background: {{primary_color}};
    color: {{surface_color}};
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: {{primary_color}}; /* Agente deve aplicar darken */
    filter: brightness(0.9);
  }

  .btn-primary:active {
    transform: scale(0.98);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary.loading {
    position: relative;
    color: transparent;
  }

  .btn-primary.loading::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid {{surface_color}};
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

<input type="email" class="input-field" placeholder="seu@email.com" required />

<div
  class="error-message"
  style="color: {{error_color}}; font-size: 0.875rem; margin-top: 0.25rem;"
>
  Email inválido
</div>

<button class="btn-primary">Entrar</button>

<button class="btn-primary loading" disabled>Carregando...</button>
```

---

### 3. 🏗️ ESTRUTURA - Organização do HTML

**Ordem de Seções (Páginas de Auth):**

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{page_title}} | {{APP_NAME}}</title>

    <!-- Fontes -->
    <link
      href="https://fonts.googleapis.com/css2?family={{font_primary}}&display=swap"
      rel="stylesheet"
    />

    <style>
      /* 1. Tokens de Cores */
      :root {
        --primary-color: {{primary_color}};
        /* ... outros tokens ... */
      }

      /* 2. Reset/Base */
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: '{{font_primary}}', sans-serif; }

      /* 3. Layout */
      .container { max-width: 400px; margin: 0 auto; padding: 2rem; }

      /* 4. Componentes */
      .btn { /* ... */ }
      .input { /* ... */ }
      .card { /* ... */ }

      /* 5. Estados */
      .input:focus { /* ... */ }
      .btn:hover { /* ... */ }

      /* 6. Responsivo */
      @media (max-width: 768px) {
        .container { padding: 1rem; }
      }
    </style>
  </head>
  <body style="background: {{background_color}};">
    <!-- SEÇÃO 1: Container Principal -->
    <div class="container">
      <!-- SEÇÃO 2: Header (Logo + Título) -->
      <div class="header">
        <img src="logo.png" alt="{{APP_NAME}}" />
        <h1 style="color: {{text_primary}};">{{page_title}}</h1>
        <p style="color: {{text_secondary}};">{{page_subtitle}}</p>
      </div>

      <!-- SEÇÃO 3: Formulário -->
      <form class="form">
        <!-- Campos do formulário -->
      </form>

      <!-- SEÇÃO 4: Links Secundários -->
      <div class="links">
        <a href="forgot-password.html" style="color: {{primary_color}};">
          Esqueceu a senha?
        </a>
      </div>

      <!-- SEÇÃO 5: Footer (opcional) -->
      <div class="footer">
        <p style="color: {{text_secondary}};">© 2026 {{APP_NAME}}</p>
      </div>
    </div>
  </body>
</html>
```

---

### 4. 📝 VARIÁVEIS - Tokens Permitidos

**Lista Completa de Tokens:**

#### Identidade do Produto:

- `{{APP_NAME}}` - Nome da aplicação
- `{{page_title}}` - Título da página
- `{{page_subtitle}}` - Subtítulo da página

#### Cores (12 tokens):

- `{{primary_color}}` - Cor primária (botões, links)
- `{{secondary_color}}` - Cor secundária (badges, tags)
- `{{accent_color}}` - Cor de destaque (hover, foco)
- `{{background_color}}` - Fundo da página
- `{{surface_color}}` - Fundo de cards/modais
- `{{text_primary}}` - Texto principal
- `{{text_secondary}}` - Texto secundário/subtle
- `{{border_color}}` - Bordas de inputs/cards
- `{{error_color}}` - Erros/validação
- `{{success_color}}` - Sucesso/confirmação
- `{{warning_color}}` - Avisos
- `{{info_color}}` - Informações

#### Tipografia:

- `{{font_primary}}` - Fonte principal (corpo de texto)
- `{{font_heading}}` - Fonte de títulos
- `{{font_mono}}` - Fonte monoespaçada (código)

---

### 5. 🚫 ANTI-PATTERNS (Proibições)

#### ❌ PROIBIDO: Tailwind CSS

```html
<!-- ❌ NÃO use classes Tailwind -->
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">Conteúdo</div>

<!-- ✅ Use CSS inline ou <style> -->
<div
  style="background: {{primary_color}}; color: {{surface_color}}; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
>
  Conteúdo
</div>
```

**Motivo:** Agentes precisam replicar EXATAMENTE. Tailwind requer configuração adicional e pode não estar disponível.

#### ❌ PROIBIDO: JavaScript Complexo

```html
<!-- ❌ NÃO adicione lógica complexa -->
<script>
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      /* ... */
    });
    // ...
  });
</script>

<!-- ✅ APENAS validação HTML5 e estados visuais -->
<input type="email" required pattern="[^\s@]+@[^\s@]+\.[^\s@]+" />
<button type="submit">Entrar</button>
```

**Motivo:** Agentes irão reimplementar a lógica em React/Next.js. HTML deve ser apenas visual.

#### ❌ PROIBIDO: Bibliotecas Externas (exceto fontes)

```html
<!-- ❌ NÃO use -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

<!-- ✅ Permitido -->
<link
  href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
  rel="stylesheet"
/>
```

#### ❌ PROIBIDO: Imagens Externas (exceto placeholders)

```html
<!-- ❌ NÃO use URLs externas -->
<img src="https://example.com/user-avatar.jpg" />

<!-- ✅ Use placeholders ou nome de arquivo local -->
<img src="logo.png" alt="Logo" />
<img src="user-avatar.png" alt="Avatar" />
```

---

### 6. ✅ CHECKLIST DE VALIDAÇÃO

Antes de finalizar um HTML de referência:

- [ ] **Tokens de cores:** Todas as cores usam `{{token}}` (nenhum HEX direto)
- [ ] **Estados visuais:** Inputs têm focus, error, disabled
- [ ] **Estados visuais:** Botões têm hover, active, loading, disabled
- [ ] **Responsivo:** Funciona em mobile (min-width 360px)
- [ ] **Acessibilidade:** Labels vinculados a inputs (`for="id"`)
- [ ] **Validação HTML5:** Atributos `required`, `type`, `pattern` corretos
- [ ] **Sem Tailwind:** Classes são customizadas ou inline
- [ ] **Sem JS complexo:** Apenas HTML/CSS visual
- [ ] **Tokens APP_NAME:** Substituíveis por nome do produto
- [ ] **Fontes:** Usa `{{font_primary}}` ou `{{font_heading}}`

---

## 📚 EXEMPLOS COMPLETOS

### Exemplo 1: Login Page (Mínimo Viável)

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login | {{APP_NAME}}</title>

    <style>
      :root {
        --primary-color: {{primary_color}};
        --surface-color: {{surface_color}};
        --text-primary: {{text_primary}};
        --text-secondary: {{text_secondary}};
        --border-color: {{border_color}};
        --error-color: {{error_color}};
        --background-color: {{background_color}};
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: '{{font_primary}}', -apple-system, sans-serif;
        background: var(--background-color);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 1rem;
      }

      .card {
        background: var(--surface-color);
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      .logo {
        width: 64px;
        height: 64px;
        margin: 0 auto 1.5rem;
        display: block;
      }

      h1 {
        color: var(--text-primary);
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--text-secondary);
        text-align: center;
        margin-bottom: 2rem;
        font-size: 0.875rem;
      }

      .form-group {
        margin-bottom: 1.25rem;
      }

      label {
        display: block;
        color: var(--text-primary);
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: all 0.2s;
        background: var(--surface-color);
        color: var(--text-primary);
      }

      input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      input.error {
        border-color: var(--error-color);
      }

      .error-message {
        color: var(--error-color);
        font-size: 0.75rem;
        margin-top: 0.25rem;
        display: none;
      }

      input.error ~ .error-message {
        display: block;
      }

      .btn {
        width: 100%;
        padding: 0.875rem;
        background: var(--primary-color);
        color: var(--surface-color);
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        margin-top: 0.5rem;
      }

      .btn:hover {
        filter: brightness(0.9);
      }

      .btn:active {
        transform: scale(0.98);
      }

      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .link {
        text-align: center;
        margin-top: 1.5rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }

      .link a {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
      }

      .link a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <img src="logo.png" alt="{{APP_NAME}}" class="logo" />

      <h1>Bem-vindo de volta</h1>
      <p>Entre com suas credenciais para continuar</p>

      <form>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            required
          />
          <span class="error-message">Email inválido</span>
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            minlength="8"
          />
          <span class="error-message"
            >Senha deve ter no mínimo 8 caracteres</span
          >
        </div>

        <button type="submit" class="btn">Entrar</button>
      </form>

      <div class="link">
        <a href="forgot-password.html">Esqueceu sua senha?</a>
      </div>

      <div class="link">
        Não tem uma conta? <a href="register.html">Cadastre-se</a>
      </div>
    </div>
  </body>
</html>
```

---

## 🎯 RESUMO EXECUTIVO

**Para criar HTMLs de referência:**

1. **Use tokens de cores** (`{{primary_color}}`) - NUNCA HEX direto
2. **Implemente todos os estados visuais** (hover, focus, error, disabled, loading)
3. **Siga estrutura organizada** (Header → Form → Links → Footer)
4. **Evite Tailwind** - use CSS inline ou `<style>`
5. **Evite JavaScript** - apenas HTML/CSS visual
6. **Seja mobile-first** - responsivo desde o início
7. **Use validação HTML5** - `required`, `type`, `pattern`
8. **Tokens de identidade** - `{{APP_NAME}}`, `{{page_title}}`

**Lembre-se:** Estes HTMLs são **REFERÊNCIAS VISUAIS**. Os agentes irão replicá-los em React/Next.js/TypeScript, mas o design e estados devem estar 100% prontos no HTML.

---

**Versão:** 1.0  
**Última Atualização:** 08/01/2026  
**Responsável:** Sistema Institucional
