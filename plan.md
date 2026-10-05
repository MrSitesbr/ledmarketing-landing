# Plano — Landing page Led Marketing / LEDM

## Objetivo e escopo

Manter uma página institucional/comercial única, de extensão média, em português brasileiro, que compile o conteúdo verificado da Led Marketing: comunicação estratégica, marca, conteúdo, redes sociais, mídia paga, SEO, websites e identidade visual. Atualizar a apresentação visual para a identidade LEDM 2026 e integrar, com contexto claro, as novas frentes de tecnologia apresentadas em `ledm.com.br`. Usar `contactsdr.com.br` apenas como referência de hierarquia comercial, CTA, faixa de marcas e FAQ; preservar identidade, textos e serviços próprios da Led. Não atribuir à Led terceirização de SDR/BDR, resultados numéricos, depoimentos inventados, certificações ou vínculos não publicados.

## Decisões de experiência e conteúdo

- Navegação por âncoras: Soluções, Clientes e parceiros, Vídeos, Tecnologia, Método e FAQ; CTA persistente para WhatsApp.
- Preservar a abertura com benefício claro e formulário no hero. O formulário coleta nome, empresa (opcional), WhatsApp e solução de interesse; sem backend, apenas prepara uma mensagem no WhatsApp oficial para revisão e envio pela própria pessoa.
- Manter as três frentes de solução: Marca e presença digital; Conteúdo e relacionamento; Performance e descoberta.
- Método em três passos: Plano de voo, Lançamento e Órbita.
- Atualizar a área de clientes inspirando-se na faixa de marcas da referência: manter DWA Adm, Bellistyle e TopCar como clientes citados no site anterior; acrescentar um grid responsivo dos oito logos que aparecem no carrossel público de `ledm.com.br` (CSF, Energimais, Construtora Terrace, RV Emergências, Vatten Pharma, Avoid Germs, Clínica Diuro e GoldLife). Identificar a origem das marcas no conteúdo da seção, separar as plataformas de mídia e não inventar parceiros formais.
- Criar uma seção “Tecnologia e experiência digital” com conteúdo público sobre LEDM.ai, onHub e LedChat. Usar dois GIFs presentes no site LEDM como ilustração — pessoa usando smartphone e pessoa trabalhando em notebook — sem apresentá-las como clientes, equipe ou depoimentos. Linkar a nova frente ao site `ledm.com.br`.
- Incluir nessa seção um diagrama HTML/CSS animado de quatro etapas — ideia, conteúdo, conversa e próximo passo — sem métricas ou resultados inventados. A animação deve ser decorativa, responsiva e respeitar `prefers-reduced-motion`; carregar GIFs de forma lazy e oferecer um quadro PNG estático quando o visitante prefere movimento reduzido.
- Manter os quatro vídeos oficiais já escolhidos (três Shorts 9:16 e um vídeo 16:9), sem autoplay.
- FAQ extensa, em formato de acordeão, ampliada para 15 perguntas e respostas com uma resposta sobre as frentes de tecnologia LEDM; manter conteúdo no HTML inicial e JSON-LD `FAQPage` equivalente. Usar termos relevantes naturalmente; não prometer posições ou resultados em buscas.
- Preservar canais, telefones, CNPJ, CTAs e informações que já foram conferidos nas páginas públicas; manter o formulário no WhatsApp sem armazenar dados.
- Manter publicação pela Vercel conectada à branch `main` do repositório `MrSitesbr/ledmarketing-landing`, em `https://ledmarketing-landing.vercel.app/`. Não substituir o site WordPress `ledmarketing.com.br` sem pedido específico.

## Direção visual

- **Movimento:** editorial digital contemporâneo com hierarquia comercial forte, grandes títulos, seções escaneáveis, prova visual por marcas e FAQ expansível. Adaptar o ritmo/clareza da referência, não sua página, copy ou identidade Contact SDR.
- **Princípios:** (1) mensagem principal legível rapidamente; (2) alternância entre áreas escuras e claras; (3) serviços organizados por objetivo; (4) marcas, formulário e CTAs visíveis sem fabricar prova social.
- **Filosofia de cor:** azul LED `#003399` como base de confiança e amarelo-luz como acento; branco e carvão sustentam contraste. Não adotar o magenta/carmesim da referência.
- **Paradigma de layout:** narrativa vertical de largura controlada, hero em duas zonas, serviços agrupados, método numerado, faixa/grid de marcas, mídia, nova seção de tecnologia e fechamento com FAQ/contato.
- **Elementos de assinatura:** (1) lâmpada amarela e wordmark LEDM oficial; (2) pontos/linhas de luz amarelos no diagrama animado; (3) cards com borda editorial e rótulos curtos.
- **Interação:** navegação por âncoras, menu móvel acessível, FAQ nativa, links oficiais. Estados hover/focus claros; nenhuma informação essencial depende de movimento.
- **Animação:** fluxo suave do diagrama e GIFs somente como ilustração; sem autoplay de vídeo, sem contadores ou barras quantitativas fictícias, com alternativa estática sob preferência por movimento reduzido.
- **Tipografia:** `Manrope` para títulos e `Inter` para leitura, com fallbacks sans-serif.
- **Essência:** agência integrada que conecta marca, conteúdo e performance; personalidade estratégica, acessível e inventiva.
- **Voz:** direta, humana e orientada à ação, sem promessas grandiosas.
- **Wordmark e logo:** substituir o logo antigo da Led Marketing pela imagem oficial LEDM 2026, uma lâmpada amarela com wordmark branco; manter no cabeçalho azul para contraste. Atualizar também favicon, Open Graph e metadados do projeto.
- **Cor de marca assinável:** azul LED `#003399`, acompanhado do amarelo-luz do símbolo LEDM.

## Implementação e estrutura

- Site estático de rota única, sem login, banco de dados ou lógica de servidor; usar React/Vite já instalado, `pnpm build:static` e saída pública em `dist/public` para Vercel.
- `client/index.html`: documento semântico, metadados com a identidade atualizada, links de logo/favicon locais, clientes, seções de vídeo/tecnologia, FAQ de 15 itens e JSON-LD equivalente.
- `client/src/index.css`: identidade azul/amarela, grid responsivo de marcas e produtos, diagrama animado, foco e regras de movimento reduzido.
- `client/src/main.tsx`: preservar navegação móvel e formulário já implementados; não adicionar tracking ou armazenamento de dados.
- `client/public/assets/`: cópias locais dos logos LEDM, dos oito logos de marcas e dos dois GIFs fornecidos pelo site LEDM; incluir os quadros PNG estáticos usados pela preferência de movimento reduzido.
- `client/public/favicon-ledmkt-2026.png`: novo símbolo/fav icon LEDM.
- `client/public/manus-routes.json`: manter a rota única `/` e o título público atual.
- `app.config.ts`: atualizar `logoUrl` literal para o novo logo público; preservar a forma exigida pelo WebDev.
- `vercel.json`: conservar `pnpm build:static` como comando de build e `dist/public` como saída.
- `TODO.md`: registrar os novos resultados como pendentes até haver evidência de implementação e publicação.

## Fontes e ativos conferidos em 05/10/2026

- Site LEDM informado pelo usuário: [ledm.com.br](https://ledm.com.br/). Logo PNG oficial de 422 × 124 px: `https://ledm.com.br/wp-content/uploads/2026/01/logo-ledmkt-2026.png`; favicon LEDM PNG de 100 × 93 px: `https://ledm.com.br/wp-content/uploads/2026/01/favicon-ledmkt-2026.png`.
- GIF mobile (180 × 180, 121 quadros): `https://ledm.com.br/wp-content/uploads/2026/01/dreamina-2026-01-24-5370-digitando-_online-video-cutter.com_.gif`. GIF notebook (240 × 240, 121 quadros): `https://ledm.com.br/wp-content/uploads/2026/01/dreamina-2026-01-24-6523-digitando-_online-video-cutter.com_.gif`. Há um terceiro GIF de pessoa falando, não selecionado para evitar aparência de depoimento.
- O carrossel de marcas dentro do bloco de experiência de `ledm.com.br` exibe oito logos com alt text: CSF, Energimais, Construtora Terrace, RV Emergências, Vatten Pharma, Avoid Germs, Clínica Diuro e GoldLife. Os assets são copiados do próprio site LEDM.
- A página LEDM apresenta LEDM.ai (orientação de marketing), onHub (organização digital de arquivos/documentos) e LedChat (atendimento/orientação com IA); descrições do site serão resumidas, sem alegar resultados ou integrações não verificadas.
- A [Contact SDR](https://contactsdr.com.br/) revisitada em 05/10/2026 mostra hero magenta, CTA destacado, blocos explicativos, logos de marcas e FAQ expansível longa. Serão adaptados hierarquia, ritmo de leitura e prova visual; não se copiam o magenta, o texto, logos ou a oferta de SDR/BDR/LDR.
- Serviços, canais, clientes DWA Adm/Bellistyle/TopCar, CNPJ e WhatsApp também se apoiam no site anterior da [Led Marketing](https://ledmarketing.com.br/), sem alterar sua página WordPress.
