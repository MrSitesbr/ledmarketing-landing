# Plano — Landing page Led Marketing / LEDM

## Objetivo e escopo

Manter uma página institucional/comercial única, de extensão média, em português brasileiro, que compile o conteúdo verificado da Led Marketing e LEDM. Preservar comunicação estratégica, marca, conteúdo, redes sociais, mídia paga, SEO, websites e identidade visual, acrescentando demonstrações visuais do atendimento LedChat e do fluxo editorial em Kanban. Usar `contactsdr.com.br` apenas como referência de hierarquia comercial, CTA, faixa de marcas e FAQ; preservar identidade, textos e serviços próprios da Led. Não atribuir à Led terceirização de SDR/BDR, resultados numéricos, depoimentos inventados, certificações ou vínculos não publicados.

## Decisões de experiência e conteúdo

- Navegação por âncoras: Soluções, Clientes e parceiros, Vídeos, Tecnologia, Método e FAQ; CTA persistente para WhatsApp.
- Preservar a abertura com benefício claro e formulário no hero. O formulário coleta nome, empresa (opcional), WhatsApp e solução de interesse; sem backend, apenas prepara uma mensagem no WhatsApp oficial para revisão e envio pela própria pessoa.
- Manter as três frentes de solução: Marca e presença digital; Conteúdo e relacionamento; Performance e descoberta.
- Método em três passos: Plano de voo, Lançamento e Órbita.
- Dentro da seção Método, inserir um bloco próprio “Do Kanban à publicação” e usar o arquivo `simulacao-producao.html` do ZIP enviado pelo usuário como demonstração animada em iframe isolado. Preservar o HTML/CSS/JS do arquivo como está; o ciclo de 12 s mostra os quadros Em Produção/Publicado e a prévia Instagram, sem campanhas ou clientes reais.
- Atualizar a área de clientes inspirando-se na faixa de marcas da referência: manter DWA Adm, Bellistyle e TopCar como clientes citados no site anterior; acrescentar um grid responsivo dos oito logos que aparecem no carrossel público de `ledm.com.br` (CSF, Energimais, Construtora Terrace, RV Emergências, Vatten Pharma, Avoid Germs, Clínica Diuro e GoldLife). Identificar a origem das marcas no conteúdo da seção, separar as plataformas de mídia e não inventar parceiros formais.
- Criar uma seção “Tecnologia e experiência digital” com conteúdo público sobre LEDM.ai, onHub e LedChat. Usar dois GIFs presentes no site LEDM como ilustração — pessoa usando smartphone e pessoa trabalhando em notebook — sem apresentá-las como clientes, equipe ou depoimentos. Linkar a nova frente ao site `ledm.com.br`.
- Acrescentar à seção de tecnologia uma simulação do LedChat usando o arquivo `simulacao-ledchat.html` enviado no ZIP, preservando o HTML/CSS/JS como está e embutindo-o em iframe isolado. Identificar que é exemplo visual — não atendimento ao vivo —, sem conexão ou transmissão de mensagens/dados.
- Manter no diagrama HTML/CSS de quatro etapas — ideia, conteúdo, conversa e próximo passo — uma animação decorativa responsiva com `prefers-reduced-motion`; carregar GIFs de forma lazy e oferecer um quadro PNG estático quando o visitante prefere movimento reduzido.
- Manter os quatro vídeos oficiais já escolhidos (três Shorts 9:16 e um vídeo 16:9), sem autoplay.
- FAQ expansível com 16 perguntas e respostas, incluindo uma resposta descritiva sobre o fluxo Kanban; manter o conteúdo no HTML inicial e JSON-LD `FAQPage` equivalente. Usar termos relevantes naturalmente; não prometer posições ou resultados em buscas.
- Preservar canais, telefones, CNPJ, CTAs e informações que já foram conferidos nas páginas públicas; manter o formulário no WhatsApp sem armazenar dados.
- Manter publicação pela Vercel conectada à branch `main` do repositório `MrSitesbr/ledmarketing-landing`, em `https://ledmarketing-landing.vercel.app/`. Não substituir o site WordPress `ledmarketing.com.br` sem pedido específico.

## Direção visual

- **Movimento:** editorial digital contemporâneo com hierarquia comercial forte, grandes títulos, seções escaneáveis, prova visual por marcas, demonstrações de produto e FAQ expansível. Adaptar o ritmo/clareza da referência, não sua página, copy ou identidade Contact SDR.
- **Princípios:** (1) mensagem principal legível rapidamente; (2) alternância entre áreas escuras e claras; (3) serviços organizados por objetivo; (4) demonstrações e provas sempre rotuladas para não sugerir funcionalidades ou cases inexistentes.
- **Filosofia de cor:** azul LED `#003399` como base de confiança e amarelo-luz como acento; branco e carvão sustentam contraste. Não adotar o magenta/carmesim da referência.
- **Paradigma de layout:** narrativa vertical de largura controlada, hero em duas zonas, serviços agrupados, método numerado, quadro Kanban ligado a prévia de conteúdo, faixa/grid de marcas, mídia, nova seção de tecnologia e fechamento com FAQ/contato.
- **Elementos de assinatura:** (1) lâmpada amarela e wordmark LEDM oficial; (2) pontos/linhas amarelos no diagrama animado; (3) cards editoriais que lembram um quadro de produção e mensagens em bolhas de conversa.
- **Interação:** navegação por âncoras, menu móvel acessível, FAQ nativa e links oficiais. As duas demonstrações são apenas visuais, rodam em iframes com `sandbox="allow-scripts"` e não enviam dados. Estados de foco claros; nenhum conteúdo essencial depende de movimento. Cada uma traz um botão acessível para reproduzir/reiniciar.
- **Animação:** carregar os documentos fornecidos quando suas seções se aproximarem da viewport e descarregá-los ao sair para reiniciar o ciclo na volta. Preservar o ciclo de 12 segundos do Kanban e a sequência/typing do LedChat exatamente como no ZIP. Com `prefers-reduced-motion`, manter o iframe descarregado por padrão; só carregá-lo após clique explícito no botão.
- **Tipografia:** `Manrope` para títulos e `Inter` para leitura, com fallbacks sans-serif.
- **Essência:** agência integrada que conecta marca, conteúdo e performance; personalidade estratégica, acessível e inventiva.
- **Voz:** direta, humana e orientada à ação, sem promessas grandiosas.
- **Wordmark e logo:** imagem oficial LEDM 2026, uma lâmpada amarela com wordmark branco; manter no cabeçalho azul para contraste. Favicon, Open Graph e metadados do projeto seguem a mesma identidade.
- **Cor de marca assinável:** azul LED `#003399`, acompanhado do amarelo-luz do símbolo LEDM.

## Implementação e estrutura

- Site estático de rota única, sem login, banco de dados ou lógica de servidor; usar HTML inicial semântico e React/Vite já instalado, `pnpm build:static` e saída pública em `dist/public` para Vercel.
- `client/index.html`: seções existentes, iframes sandboxados e botões de reprodução para os dois arquivos enviados; FAQ de 16 itens no HTML inicial e JSON-LD `FAQPage` equivalente.
- `client/src/index.css`: identidade azul/amarela, layout responsivo e acessível dos contêineres externos, poster de pausa e controles; a folha de estilo do código fornecido permanece isolada dentro dos documentos iframe.
- `client/src/main.tsx`: preservar navegação móvel e formulário; carregar os iframes ao entrarem na viewport (ou por clique), descarregá-los ao sair, e mantê-los descarregados por padrão sob `prefers-reduced-motion` até o opt-in; sem API, envio ou armazenamento pela landing.
- Kanban: usar `simulacao-producao.html` do ZIP sem alterar seu HTML/CSS/JS; preservar a travessia de cartão, subida do preenchimento e mudança para a prévia Instagram no ciclo de 12 segundos. O arquivo usa imagens/fontes externas referenciadas nele; o iframe restringe scripts ao próprio contexto, sem acesso ao documento pai.
- Chat: usar `simulacao-ledchat.html` do ZIP sem alterar seu HTML/CSS/JS; preservar a conversa animada e a rotação de fluxos demonstrativos. O input/botão pertencem ao mock visual e não transmitem mensagens. Incluir botão externo de reprodução/reinício e não conectar atendimento real.
- `client/public/assets/`: cópias locais dos logos LEDM, dos oito logos de marcas e dos dois GIFs fornecidos pelo site LEDM; incluir os quadros PNG estáticos usados pela preferência de movimento reduzido.
- `client/public/favicon-ledmkt-2026.png`: novo símbolo/fav icon LEDM.
- `client/public/manus-routes.json`: manter a rota única `/` e o título público atual.
- `app.config.ts`: `logoUrl` literal para o novo logo público; preservar a forma exigida pelo WebDev.
- `vercel.json`: conservar `pnpm build:static` como comando de build e `dist/public` como saída.
- `TODO.md`: manter cada resultado em aberto até a respectiva implementação estar concluída e comprovada; só então marcá-lo como concluído.

## Fontes e ativos conferidos em 05/10/2026

- Site LEDM informado pelo usuário: [ledm.com.br](https://ledm.com.br/). Logo PNG oficial de 422 × 124 px: `https://ledm.com.br/wp-content/uploads/2026/01/logo-ledmkt-2026.png`; favicon LEDM PNG de 100 × 93 px: `https://ledm.com.br/wp-content/uploads/2026/01/favicon-ledmkt-2026.png`.
- GIF mobile (180 × 180, 121 quadros): `https://ledm.com.br/wp-content/uploads/2026/01/dreamina-2026-01-24-5370-digitando-_online-video-cutter.com_.gif`. GIF notebook (240 × 240, 121 quadros): `https://ledm.com.br/wp-content/uploads/2026/01/dreamina-2026-01-24-6523-digitando-_online-video-cutter.com_.gif`. Há um terceiro GIF de pessoa falando, não selecionado para evitar aparência de depoimento.
- O carrossel de marcas dentro do bloco de experiência de `ledm.com.br` exibe oito logos com alt text: CSF, Energimais, Construtora Terrace, RV Emergências, Vatten Pharma, Avoid Germs, Clínica Diuro e GoldLife. Os assets são copiados do próprio site LEDM.
- A página LEDM apresenta LEDM.ai (orientação de marketing), onHub (organização digital de arquivos/documentos) e LedChat (atendimento/orientação com IA); descrições do site serão resumidas, sem alegar resultados ou integrações não verificadas.
- Conteúdo enviado pelo usuário nesta tarefa: seis mensagens de demonstração em contexto de busca por apartamento e markup/CSS de um quadro de conteúdo “Em Produção” → “Publicado” com prévia Instagram e pauta imobiliária. O novo conteúdo usa o exemplo com aviso explícito de simulação e layout autônomo/responsivo.
- A [Contact SDR](https://contactsdr.com.br/) revisitada em 05/10/2026 mostra hero magenta, CTA destacado, blocos explicativos, logos de marcas e FAQ expansível longa. Serão adaptados hierarquia, ritmo de leitura e prova visual; não se copiam o magenta, o texto, logos ou a oferta de SDR/BDR/LDR.
- Serviços, canais, clientes DWA Adm/Bellistyle/TopCar, CNPJ e WhatsApp também se apoiam no site anterior da [Led Marketing](https://ledmarketing.com.br/), sem alterar sua página WordPress.
