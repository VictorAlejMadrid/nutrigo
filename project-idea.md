# NutriGO - Documento de Especificação (Demonstração Offline)

**Principais cores da logo, usar e adequar ao app**

- #0C3527 (verde escuro) - cor principal
- #D57A4E (laranja, terra) - cor para detalhes
- #FFFFFF (branco) - usado no fundo

## 1. A Ideia Principal

A NutriGO é uma startup voltada para o segmento de fitness, saúde e bem-estar. O principal serviço do aplicativo consiste em desenvolver dietas personalizadas baseadas nas características do usuário e converter, de forma automática, esses planos alimentares em listas de compras práticas.

O aplicativo foca em resolver uma grande dor do público-alvo (representado pela persona Juliana): a frustração de perder muito tempo organizando, planejando e indo ao mercado para manter uma rotina alimentar saudável. O objetivo central é oferecer praticidade, reduzindo a zero o atrito logístico na execução de dietas. Na versão final, haverá integração com redes de supermercados locais para entrega em domicílio, mas, para esta demonstração offline, todo o processo de parcerias com mercados e atacadistas será simulado localmente.

---

## 2. Fluxos do Usuário

A demonstração será guiada por quatro fluxos lineares principais, utilizando dados _mockados_ (simulados) no próprio código.

### Fluxo 1: Onboarding e Criação de Perfil

1. O usuário abre o aplicativo e é recebido por uma tela de boas-vindas destacando a proposta de valor: "Da dieta ao mercado em um clique".
2. O usuário preenche um formulário rápido com seus dados (idade, peso, objetivo principal e restrições alimentares).
3. O aplicativo processa os dados (localmente) e exibe uma mensagem de sucesso.

### Fluxo 2: Geração do Plano Alimentar

1. Após o onboarding, o aplicativo apresenta um painel com um plano alimentar gerado e sugerido pelo sistema.
2. O usuário pode visualizar as refeições diárias (café da manhã, almoço, lanches, jantar).
3. O usuário tem a opção de "Aprovar Dieta" ou "Substituir Alimentos" (esta última exibindo opções pré-definidas no código).

### Fluxo 3: Automação da Lista de Compras

1. Com a dieta aprovada, o usuário clica no botão "Gerar Lista de Compras".
2. O aplicativo consolida todos os ingredientes do plano alimentar em quantidades exatas para o período (ex: semana ou mês).
3. A tela exibe a lista categorizada (ex: Hortifruti, Carnes, Laticínios).

### Fluxo 4: Checkout Simulado (Integração de Mercado)

1. O usuário visualiza o carrinho de compras montado com a taxa de serviço (simulação do modelo B2C de 8%) ou a isenção de taxa (simulação da Assinatura Premium).
2. O usuário seleciona um supermercado parceiro fictício na sua região.
3. O aplicativo exibe uma tela de "Pedido Confirmado" simulando o envio da lista para a logística do mercado.

---

## 3. Requisitos da Demonstração (Offline)

### Requisitos Funcionais

- **RF01:** O sistema deve permitir o preenchimento de dados do usuário em um formulário local sem necessidade de autenticação real.
- **RF02:** O sistema deve conter um banco de dados estático (JSON local ou classes _mock_) contendo pelo menos 3 perfis de dietas diferentes (ex: Emagrecimento, Hipertrofia, Manutenção).
- **RF03:** O sistema deve calcular matematicamente a quantidade de itens da lista de compras multiplicando as porções diárias da dieta pelos dias selecionados pelo usuário.
- **RF04:** O sistema deve simular a tela de finalização de compra calculando o subtotal dos ingredientes fictícios e aplicando as regras de precificação simuladas (taxa de 8% para modalidade gratuita ou isenção para modalidade Premium).

### Requisitos Não Funcionais

- **RNF01:** A navegação deve ser fluida e ocorrer sem telas de carregamento reais, utilizando apenas _delays_ artificiais curtos (ex: 1 segundo) para simular o processamento.
- **RNF02:** O gerenciamento de estado (ex: de dieta para carrinho) deve persistir na memória apenas durante a sessão ativa do aplicativo.
- **RNF03:** A interface de usuário (UI) deve refletir uma identidade visual moderna voltada para o público digital e _fitness_.

---

## 4. Critérios de Aceite

Para garantir que a demonstração cumpra seu propósito de validar a ideia do NutriGO, os seguintes critérios devem ser atingidos:

- **Critério 1 (Perfil):** O usuário deve conseguir preencher um objetivo (ex: "Quero saúde e organização") e, ao avançar, a tela seguinte deve obrigatoriamente exibir um plano alimentar que corresponda à seleção.
- **Critério 2 (Conversão em Lista):** A conversão da dieta em lista de compras deve acontecer com apenas um clique na interface. A lista gerada não pode conter itens que não estejam na dieta aprovada.
- **Critério 3 (Experiência de Compra):** A tela final de checkout deve exibir de forma clara a separação entre o valor dos produtos simulados e a taxa de serviço do NutriGO, deixando evidente o modelo de monetização para fins de apresentação do negócio.
- **Critério 4 (Isolamento Offline):** O aplicativo não deve quebrar ou exibir mensagens de "Erro de Conexão" ao tramitar entre as abas de dietas, carrinho e supermercados parceiros; todos os dados devem ser resgatados da memória local da aplicação.
