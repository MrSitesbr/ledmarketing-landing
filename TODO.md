# Entregas da landing page Led Marketing

## [x] Landing page única, média e orientada à conversão

Criar uma página institucional/comercial única, em português brasileiro, que condense o conteúdo real de `ledmarketing.com.br` em extensão média; usar `contactsdr.com.br` apenas como referência contemporânea de organização e conversão, preservando o posicionamento, a identidade, os serviços e os canais de contato próprios da Led Marketing, sem associá-la a serviços de SDR. Incluir apresentação inicial da Led Marketing com proposta de valor clara e chamada principal para contato; resumo institucional enxuto da agência e de sua atuação em comunicação estratégica e performance publicitária; hierarquia de conteúdo orientada à conversão e navegação por âncoras.

## [x] Serviços, método e conteúdo fiel às fontes

Apresentar serviços cobrindo conteúdo, redes sociais, mídia paga, SEO, websites e identidade visual. Explicar o processo de trabalho em planejamento, lançamento e otimização. Usar fielmente textos, diferenciais, provas e informações disponíveis em `ledmarketing.com.br`, condensando-os sem criar alegações não verificadas.

## [x] Contatos, chamadas e dados institucionais reais

Distribuir chamadas para contato ao longo da página, usando apenas canais e informações reais publicados no site da Led. Incluir rodapé com dados institucionais, contatos e links reais relevantes da Led Marketing.

## [x] Layout responsivo e legível

Entregar layout responsivo para desktop e dispositivos móveis, com boa legibilidade e ações de contato em destaque.

## [x] Formulário destacado no hero

Incluir no banner hero um formulário acessível e responsivo com nome, empresa (opcional), WhatsApp e solução de interesse. Validar os campos obrigatórios; ao continuar, preparar uma mensagem com esses dados no número oficial da Led `5511974698846`, abrir o WhatsApp e deixar a pessoa revisar e enviar. O site não deve salvar os dados nem enviar mensagens sem ação do visitante, pois a página é estática e não existe um backend de captação configurado.

## [x] Seção de clientes e parceiros, sem depoimentos

Substituir a área de depoimentos por uma seção visual intitulada “Clientes e parceiros”. Mostrar DWA Adm, Bellistyle e TopCar como clientes citados no site atual da Led, e apresentar em bloco separado as plataformas de mídia que a Led atende. Não criar textos de depoimentos, nomes/logos de parceiros formais, certificações ou vínculos não verificados.

## [x] Seção de Shorts verticais e vídeo amplo

Acrescentar uma seção com vídeos Shorts no formato 9:16 e, em outra seção, um player maior no formato 16:9. Usar vídeos publicados no canal oficial `@ledmkt`; carregar sem autoplay e de forma responsiva/lazy.

## [x] FAQ extensa com conteúdo SEO fiel

Expandir a seção de perguntas e respostas para pelo menos 12 perguntas e respostas completas sobre os serviços, canais, método e briefing da Led. Incluir naturalmente termos de busca relevantes como agência/marketing digital, redes sociais, mídia paga/Google Ads/Meta Ads, SEO para sites e YouTube, website, landing page, identidade visual, conteúdo e e-mail marketing. Manter as respostas presentes no HTML inicial e iguais à marcação estruturada FAQPage; sem keyword stuffing, dados inventados ou promessa de ranking/resultados.

## [x] Build estático correto na Vercel

Configurar o repositório para executar `pnpm build:static` e publicar apenas `dist/public` na raiz de `https://ledmarketing-landing.vercel.app/`. A URL pública deve entregar a landing page HTML da Led em vez do bundle de servidor `dist/index.js`, com estilos e scripts estáticos funcionando. Registrar a correção na branch `main` do GitHub conectada para que a integração de deploy da Vercel possa reconstruir a página. Não alterar o site WordPress em `ledmarketing.com.br`.

## [x] Atualizar a identidade visual para LEDM 2026 e refinar a prova de marcas

Revisitar o layout à luz de `contactsdr.com.br`, aproveitando a hierarquia direta do hero, CTA destacado, prova visual por marcas e FAQ expansível sem copiar identidade, paleta ou textos da referência. Trocar o logo antigo da Led Marketing pelo logo LEDM 2026 e atualizar o favicon do site e o logo de metadados do projeto. Manter azul/amarelo LEDM. Na seção “Clientes e parceiros”, manter os três clientes publicados no site anterior (DWA Adm, Bellistyle e TopCar) e acrescentar um grid responsivo dos oito logos publicados no carrossel de `ledm.com.br` (CSF, Energimais, Construtora Terrace, RV Emergências, Vatten Pharma, Avoid Germs, Clínica Diuro e GoldLife), com textos alternativos; separar as plataformas de mídia e não inventar parceiros formais.

## [x] Adicionar a nova seção LEDM de tecnologia e um gráfico animado acessível

Criar uma seção curta que apresente, com descrições fiéis ao site LEDM, LEDM.ai, onHub e LedChat, incluindo um link para `https://ledm.com.br/`. Reutilizar dois GIFs publicados nesse site (pessoa usando smartphone e pessoa trabalhando em notebook), sem apresentá-las como clientes, equipe ou depoimentos; carregar as imagens de forma lazy e oferecer PNG estático quando `prefers-reduced-motion` estiver ativo. Criar um diagrama HTML/CSS responsivo e animado de quatro passos — ideia, conteúdo, conversa e próximo passo — sem métricas, contadores ou resultados inventados. Acrescentar a nova âncora ao menu e uma pergunta/resposta correspondente no FAQ visível e no JSON-LD `FAQPage`.
