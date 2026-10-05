# Site Deadman

Site estático (HTML/CSS/JS puro, sem build). Abra `index.html` no navegador para ver.

- `index.html`: página inteira, com estilos e scripts embutidos.
- `assets/`: telas do app (tiradas da identidade visual) e favicon.

## Onde editar
- Textos: cada texto em inglês tem a versão em português no atributo `data-pt`.
- Cores: variáveis no topo do `<style>` (Void, Grave, Bone, Pulse, Missed, Flatline, Ash).
- Animação de abertura: bloco `INTRO` no fim do `<script>` (passos 1 a 4 com os tempos em ms).
- Lista de espera: o formulário ainda não envia para lugar nenhum. Ligue a um serviço (Formspree, Supabase, Mailchimp etc.) no handler `submit`.

## Como publicar
- Netlify Drop: arraste a pasta `deadman-site` em app.netlify.com/drop.
- Vercel: `npx vercel` dentro da pasta, ou importe um repositório GitHub.
- GitHub Pages: suba a pasta num repositório e ative Pages em Settings > Pages.
Depois aponte seu domínio (ex.: deadman.xyz) nas configurações de domínio do serviço.
