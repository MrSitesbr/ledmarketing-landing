# Plano — Landing page Led Marketing

## Objetivo e escopo

Transformar o conteúdo publicado em `ledmarketing.com.br` em uma página institucional/comercial única, de extensão média, em português brasileiro. O conteúdo apresenta a Led como agência de marketing de comunicação estratégica e performance publicitária: marca, conteúdo, redes sociais, mídia paga, SEO, websites e identidade visual. Usar `contactsdr.com.br` somente como referência de organização contemporânea orientada à conversão (mensagem direta, seções escaneáveis, prova social, processo, FAQ e CTAs); manter marca, serviços e voz próprios da Led. Não atribuir à Led terceirização de SDR/BDR, resultados numéricos, depoimentos inventados, certificações ou clientes que não apareçam no site de origem.

## Decisões de experiência e conteúdo

- Navegação por âncoras: Soluções, Clientes e parceiros, Vídeos, Método e FAQ; CTA persistente para WhatsApp.
- Abertura com benefício claro e formulário visível no hero. O formulário coleta nome, empresa (opcional), WhatsApp e solução de interesse; como o site é estático e não há backend autorizado/configurado, ele prepara uma mensagem no WhatsApp oficial da Led. A pessoa revisa e envia a mensagem no próprio WhatsApp; nada é enviado ou guardado automaticamente pelo site.
- Blocos de soluções agregados em três frentes: Marca e presença digital; Conteúdo e relacionamento; Performance e descoberta. Incluir exemplos de escopo publicados pela Led, sem listar redes/canais em excesso.
- Método em três passos com os nomes existentes: Plano de voo, Lançamento e Órbita. Trocar a seção de depoimentos por “Clientes e parceiros”: exibir DWA Adm, Bellistyle e TopCar somente como clientes citados no site da Led; mostrar em bloco separado as plataformas de mídia publicadas como canais atendidos. A fonte pública não identifica nominalmente parceiros formais, então não criar ou rotular parcerias como oficiais.
- FAQ extensa, em formato de acordeão, com 14 perguntas e respostas originais sobre marketing digital, agência de marketing, serviços, método, redes sociais, mídia paga, SEO, website/landing page, identidade visual, conteúdo, segmentos atendidos, investimento, prazos e briefing. Usar palavras-chave do portfólio publicado de forma natural; manter todas as respostas no HTML inicial e incluir dados estruturados FAQPage equivalentes. Não prometer posições ou resultados em buscadores. CTA final e rodapé com CNPJ `61.867.464/0001-94`, briefing, WhatsApp e redes confirmadas.
- O formulário e as chamadas utilizam o WhatsApp publicado pela Led: `https://api.whatsapp.com/send/?phone=5511974698846&text&type=phone_number&app_absent=0`; links públicos: briefing, Instagram `@ledmarketing.br`, Facebook `ledmkt`, LinkedIn `ledmkt` e canal oficial YouTube `@ledmkt`.
- A página foi implantada pelo usuário no projeto Vercel ligado ao repositório privado do GitHub `MrSitesbr/ledmarketing-landing`; a URL informada de produção é `https://ledmarketing-landing.vercel.app/`. Não substituir nem publicar sobre o domínio WordPress atual `ledmarketing.com.br` sem solicitação/autorização específica.

## Direção visual

- **Movimento:** editorial digital contemporâneo com referências de design suíço e brutalismo gentil; hierarquia forte, tipografia grande e seções comerciais claras, em vez de reproduzir a página ou identidade Contact SDR.
- **Princípios:** (1) mensagem principal legível em poucos segundos; (2) composição assimétrica e ritmo entre áreas escuras e claras; (3) serviços agrupados por objetivo, não por uma longa lista de canais; (4) CTAs evidentes e confiáveis.
- **Filosofia de cor:** preservar o azul profundo LED já presente no site (`#003399`) como base de confiança e foco; amarelo-luz derivado do símbolo da marca como acento energético e exclusivo; carvão/preto e papel claro sustentam contraste e leitura. Não adotar o pink/carmesim da referência.
- **Paradigma de layout:** narrativa vertical com hero em duas zonas assimétricas, faixa de capacidades, serviços em painéis alinhados à esquerda, processo numerado, social proof compacto, FAQ e fechamento de conversão; largura de leitura controlada e respiros generosos.
- **Elementos de assinatura:** (1) halo/raios de luz inspirados no ícone solar/lâmpada da marca; (2) sublinhados e pontos amarelos em headings/indicadores; (3) cards com borda editorial e pequenos rótulos numerados.
- **Interação:** navegação por âncoras, menu móvel acessível, links de contato funcionais e FAQ nativa expansível. Estados de hover/focus claros; não depender de efeitos para revelar conteúdo.
- **Animação:** microinterações suaves em hover e entrada discreta dos blocos, com movimento curto e sem animação obrigatória; respeitar `prefers-reduced-motion`.
- **Tipografia:** `Manrope` para títulos (pesos 600–800) e `Inter` para texto de leitura (400–600), com fallback sans-serif; H1 conciso, corpo de 16–18px e corpo auxiliar 14–16px.
- **Essência:** agência integrada para marcas que precisam transformar comunicação em presença e performance; personalidade **estratégica, acessível e inventiva**.
- **Voz:** direta, humana e orientada à ação, sem promessas grandiosas. Exemplos: “Marketing que conecta marca, conteúdo e performance.” / “Vamos entender seu momento e traçar o próximo passo.”
- **Wordmark:** reutilizar o logo oficial publicado pela Led; quando apresentado sem arquivo, combinar wordmark “Led Marketing” com um símbolo simples de luz/sol sem redesenhar o logo da Contact SDR.
- **Cor de marca assinável:** azul LED `#003399`, acompanhado de amarelo-luz.

## Implementação e estrutura

- Site público de rota única, sem login, banco de dados ou lógica de servidor; usar o template já inicializado (React/Vite e ferramentas instaladas), com build estático `pnpm build:static` e execução `pnpm dev:static` na porta registrada 3000.
- Para indexação, manter conteúdo semântico no HTML inicial (não depender de preenchimento após hidratação). Metadados descritivos em `client/index.html`; não declarar canonical/`og:url` com o endereço de Preview nem presumir que o domínio esteja conectado.
- `client/index.html`: documento semântico da landing page, formulário, dois formatos de vídeo, FAQ longa e JSON-LD equivalente.
- `client/src/index.css`: sistema visual, responsividade, foco e movimento reduzido.
- `client/src/main.tsx`: menu móvel e preparação, no navegador, de mensagem do formulário para WhatsApp; o site não persistirá os dados.
- `client/public/manus-routes.json`: declara a única rota `/` antes da inicialização do servidor; o logo oficial permanece referenciado pela URL HTTPS já publicada pela Led.
- `app.config.ts`: URL HTTPS durável do logo oficial para metadados do projeto Manus, preservando qualquer campo existente.
- `vercel.json`: definir `pnpm build:static` como comando de build e `dist/public` como saída estática publicada. O script padrão `pnpm build` compila também o servidor para `dist/index.js`; essa saída não pode ser servida como página inicial da landing.
- `TODO.md`: critérios de resultado desta entrega e status atualizado com base nas evidências.

## Vídeos publicados pela Led

A fonte é o canal oficial [Led Marketing / @ledmkt](https://www.youtube.com/@ledmkt). Na aba Shorts, confirmou-se: `tWh4uXZG5f0` (“LED MARKETING - Comunicação e Publicidade”), `ktEOS_o8E1Q` (“5 motivos pelos quais o seu negócio precisa de um site urgentemente”) e `5FtTx3LsEMw` (“Agora você pode mostrar seu WhatsApp no Google Meu Negócio!”). Na aba Vídeos, `ZEmHKFREznU` (“Transforme seu Negócio com nossos serviços de Comunicação e Publicidade | Led Marketing”, 0:52) será o vídeo amplo 16:9. Incorporar sem autoplay, com `youtube-nocookie.com`, carregamento lazy e proporção visual adequada.

## Marca e fonte de conteúdo

Texto, lista de serviços, método, nomes de clientes, telefones, redes sociais e CNPJ vêm da página pública da [Led Marketing](https://ledmarketing.com.br/), consultada em 05/10/2026. Ela apresenta conteúdo e redes sociais (Instagram, Facebook, LinkedIn, TikTok, YouTube e Twitter), artigos/e-books/roteiros, e-mail/newsletter, Google Ads, YouTube Ads, Meta Ads, LinkedIn Ads, TikTok Ads, Globo Ads, SEO, Google Meu Negócio e Search Console; o método publicado descreve Plano de voo, Lançamento e Órbita. Também constam os nomes Paulo Gissone (DWA Adm), Rebeca Salles (Bellistyle) e Marcelo (TopCar), CNPJ 61.867.464/0001-94 e WhatsApp (11) 9 7469-8846.

A [Contact SDR](https://contactsdr.com.br/) foi consultada em 05/10/2026 apenas como referência de organização comercial contemporânea (abertura com promessa/CTA, blocos explicativos, processo, seção de cases/clientes e perguntas frequentes extensas; não se reutilizam depoimentos como substituto de logos). Sua atividade publicada é terceirização de prospecção/vendas SDR/BDR/LDR; essa especialidade não é atribuída à Led. Nome, redação, paleta, logotipos, provas sociais e especialidade da Contact SDR não são reutilizados como se fossem da Led.
