# donation-checkout.js — Checkbox de Doacao no Checkout Legado VTEX

Script JavaScript puro (ES5) que injeta um checkbox de doacao no checkout6 legado da VTEX. Hospedado via GitHub Pages e instalado pelo lojista via GTM ou `checkout6-custom.js`.

---

## Pre-requisitos

- Loja com **checkout6 legado** da VTEX habilitado
- **jQuery** disponivel globalmente no checkout (ja e padrao do checkout6)
- **`vtexjs`** disponivel globalmente no checkout (ja e padrao do checkout6)
- **SKU de doacao** cadastrado no catalogo da loja com seller `1`

---

## Opcao A — Instalacao via GTM (recomendado)

1. Acesse o Google Tag Manager da loja
2. Crie uma nova tag do tipo **Custom HTML**
3. Configure o gatilho para disparar na **pagina de checkout**
4. Adicione o seguinte conteudo na tag:

```html
<script
  src="https://{usuario}.github.io/{repo}/donation-checkout.js"
  data-sku-id="SEU_SKU_ID"
></script>
```

Substitua:
- `{usuario}` — seu usuario do GitHub
- `{repo}` — nome do repositorio
- `SEU_SKU_ID` — ID numerico do SKU de doacao (ver secao abaixo)

---

## Opcao B — Instalacao via `checkout6-custom.js`

Adicione o trecho abaixo ao arquivo `checkout6-custom.js` da loja (Admin VTEX → Configuracoes da Loja → Storefront → Checkout → editar arquivo):

```javascript
var s = document.createElement('script')
s.src = 'https://{usuario}.github.io/{repo}/donation-checkout.js'
s.setAttribute('data-sku-id', 'SEU_SKU_ID')
document.head.appendChild(s)
```

Substitua `{usuario}`, `{repo}` e `SEU_SKU_ID` conforme descrito na Opcao A.

---

## Como obter o SKU ID

1. Acesse o painel admin da VTEX
2. Navegue ate **Catalogo → Produtos e SKUs**
3. Localize o produto de doacao cadastrado
4. Clique em **SKUs** na coluna de acoes
5. Copie o valor da coluna **ID do SKU**

O valor e numerico (ex: `12345`). Use esse valor no atributo `data-sku-id`.

---

## Configurar GitHub Pages

Para que o script fique acessivel via URL publica:

1. No repositorio GitHub, acesse **Settings → Pages**
2. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/checkout-cdn`
3. Clique em **Save**
4. Aguarde o deploy (pode levar alguns minutos)
5. A URL resultante sera:
   ```
   https://{usuario}.github.io/{repo}/donation-checkout.js
   ```

> **Nota:** a configuracao do GitHub Pages e uma acao manual realizada uma unica vez apos o merge do codigo na branch `main`.

---

## Ativar e desativar a doacao

- **Para ativar:** adicionar a tag de script conforme Opcao A ou B acima
- **Para desativar:** remover ou comentar o trecho de instalacao no GTM ou no `checkout6-custom.js`

O script nao verifica o status do app — a responsabilidade de exibir ou ocultar o checkbox e inteiramente do lojista via presenca ou ausencia do parametro de instalacao.

---

## Nota sobre marketplace

O script adiciona o item de doacao com `seller: '1'`, que corresponde ao seller principal da loja.

Em ambientes de **marketplace com sellers terceiros**, verifique qual o seller correto para o item de doacao antes de instalar o script. Se necessario, ajuste o valor de `seller` no script antes de publicar via GitHub Pages.
