# Onboarding Flow — NutriGO (Demonstração Offline)

## Resumo

Documento que descreve o fluxo de onboarding e criação de perfil para a demonstração offline do NutriGO. Contém sequência de telas, campos do formulário, validações, dados mock necessários, estado em sessão e critérios de aceite para a implementação.

## Objetivos

- Coletar os dados mínimos para gerar um plano alimentar personalizado localmente.
- Garantir navegação fluida e feedback claro ao usuário (delays artificiais de ~1s).
- Persistir estado apenas durante a sessão (memória), sem chamadas externas.

## Escopo

- Fluxo linear: Boas-vindas → Formulário de perfil (1–2 passos) → Confirmação/Sucesso → Redirecionar para geração de plano.
- Offline: todos os dados e regras são mockados localmente.

## Personas

- Juliana (representação do público-alvo): pessoa ocupada, busca praticidade para manter dieta.

## Sequência de telas (passo a passo)

1. Tela de Boas-vindas
   - Propósito: apresentar proposta de valor e iniciar onboarding.
   - Componentes: título, subtítulo, ilustração, botão principal `Começar`.

2. Formulário de Perfil (dividido em 5 etapas)

- Layout: título fixo no topo, input aparece centralizado (vertical e horizontalmente) com foco automático.
- Diretriz de interação: após preencher cada campo e clicar `Continuar`, executar animação de confirmação (check) e transição para a próxima etapa.
- Fluxo em 5 etapas:
  1. Etapa 1 — Identificação
  - Campos: `nome` (opcional), `idade` (obrigatório).
  - Validação: 13 ≤ idade ≤ 120.
  - UX: título no topo, input central; ao avançar, mostrar micro-check animado e transição (campo encolhe e anima para o topo).
  2. Etapa 2 — Peso
  - Campos: `pesoKg` (obrigatório).
  - Validação: 20 ≤ peso ≤ 500.
  - UX: input central, ao confirmar animar um pulso e substituir pelo próximo input.
  3. Etapa 3 — Objetivo
  - Campos: `objetivo` (select). Opções: `Emagrecimento`, `Hipertrofia`, `Manutenção`, `Saúde e organização`, `Outro` (campo texto aparece se selecionado).
  - UX: cada opção tem micro-interação; confirmação com animação de seleção.
  4. Etapa 4 — Restrições alimentares
  - Campos: `restricoes` (multi-select com chips) + campo `outras` (opcional).
  - UX: chips animam entrada/remoção; ao confirmar, animação de checklist.
  5. Etapa 5 — Duração e Revisão
  - Campos: `duracaoDias` (select: 7, 14, 30) + resumo/review dos dados preenchidos.
  - UX: mostrar cartão de revisão; ao confirmar, animação de sucesso e redirecionamento.
- Navegação entre etapas: `Voltar` (com animação inversa) e `Continuar`; indicador de progresso discreto (pontos ou barra fina no topo).
- Regras: não permitir avançar se campos obrigatórios inválidos; mostrar feedback inline.
- Acessibilidade: respeitar `prefers-reduced-motion` (desativar animações intensas) e manter foco lógico ao mudar de etapa.
- Sugestões técnicas: implementar animações com `Framer Motion` (React) ou CSS `@keyframes`; transições recomendadas: 300-400ms, easing suave (ex.: cubic-bezier(.22,.99,.46,.98)). Usar SVG stroke animation para o checkmark.

3. Confirmação & Processamento
   - Ao submeter: exibir estado "Processando seu perfil" por ~1s, então mostrar mensagem de sucesso e botão `Ver Plano`.

4. Redirecionamento para o painel de plano alimentar (Fluxo 2)
   - Ao confirmar, salvar perfil em estado de sessão e navegar para geração de plano.

## Campos do formulário (detalhado)

- `idade` — integer, obrigatório. Validação: 13 ≤ idade ≤ 120. Placeholder: "Ex.: 29". Mensagem de erro: "Informe uma idade válida."
- `pesoKg` — number, obrigatório. Validação: 20 ≤ peso ≤ 500. Placeholder: "Ex.: 68". Mensagem: "Informe um peso em kg válido."
- `objetivo` — select, obrigatório. Opções sugeridas: `Emagrecimento`, `Hipertrofia`, `Manutenção`, `Saúde e organização`, `Outro` (texto livre).
- `restricoes` — multi-select + campo "outras" (opcional). Opções: `Glúten`, `Lactose`, `Vegetariano`, `Vegano`, `Nenhuma`.
- `duracaoDias` — select, obrigatório. Options: `7`, `14`, `30` (default `7`).
- `nome` — text, opcional (personalização da interface).

## Validações e mensagens UX

- Validação inline imediata em cada campo (ex.: se `peso` não numérico, mostrar "Peso inválido").
- Se o formulário estiver incompleto e o usuário tentar avançar, exibir resumo de erros no topo: "Corrija os campos destacados para continuar."
- Mensagem de sucesso: "Perfil salvo — gerando seu plano alimentar..." seguida de delay e redirecionamento.

## Dados mock e exemplos

Exemplo de payload de usuário:

```json
{
  "profile": {
    "nome": "Juliana",
    "idade": 29,
    "pesoKg": 68,
    "objetivo": "Emagrecimento",
    "restricoes": ["Lactose"],
    "duracaoDias": 7
  }
}
```

Exemplo mínimo de perfis de dieta mock (sumário):

```json
[
  {
    "id": "emagrecimento",
    "title": "Emagrecimento",
    "summary": "Déficit calórico moderado, 3 refeições + lanches"
  },
  {
    "id": "hipertrofia",
    "title": "Hipertrofia",
    "summary": "Aumento de calorias com foco em proteína"
  },
  { "id": "manutencao", "title": "Manutenção", "summary": "Calorias de manutenção e balanceamento" }
]
```

Esses perfis devem existir em `src/mocks/diets.json` (ou similar) para a demo.

## Estado e persistência (recomendação)

- Persistir somente em memória durante a sessão (ex.: React Context, Zustand, ou simples singleton JS).
- Estado mínimo sugerido:

```json
{
  "onboarding": {
    "step": 2,
    "profile": {
      /* payload acima */
    }
  },
  "selectedDietId": "emagrecimento",
  "plan": null
}
```

- Chave importante: `profile` deve ser suficiente para que o gerador de plano (Fluxo 2) retorne um plano determinístico baseado em `objetivo` e `restricoes`.

## Delay artificial e feedback

- Usar delay artificial curto (ex.: 1000ms) para simular processamento em operações-chave: submissão do formulário e geração do plano.
- Mostrar skeletons ou pequenos spinners durante o delay para manter sensação de fluidez.

## Critérios de aceite específicos para o onboarding

1. O usuário consegue preencher o objetivo e prosseguir; ao avançar, a tela seguinte deve receber os dados e exibir a opção de gerar/visualizar o plano.
2. O formulário bloqueia envio com campos obrigatórios vazios e exibe mensagens de erro claras.
3. O processo não depende de rede externa — trocar de abas não deve exibir erros de conexão.

## Testes manuais (checklist)

1. Preencher dados válidos → clicar `Começar` → ver mensagem de processamento → ver `Plano gerado`/navegar.
2. Tentar avançar com `idade` ou `peso` inválidos → ver mensagens de erro inline.
3. Selecionar restrição `Lactose` → confirmar que perfil enviado contém `restricoes` com `Lactose`.
4. Reiniciar app (nova sessão) → verificar que estado anterior não persiste.

## Wireframes rápidos (estrutura de componentes)

- `WelcomeScreen`
  - Header, Subtitle, CTA `Começar`
- `ProfileForm` (ou `ProfileStep1`, `ProfileStep2`)
  - FieldGroup: `idade`, `peso`
  - FieldGroup: `objetivo`, `restricoes`, `duracao`
  - Buttons: `Voltar`, `Continuar`
- `ProcessingModal`
  - Spinner + "Processando seu perfil"
- `ProfileSuccess`
  - Checkmark + botão `Ver Plano`

## Acessibilidade & internacionalização (breve)

- Labels associados a inputs; foco visível; contrastes seguindo cores do projeto (`#0C3527`, `#D57A4E`).
- Textos curtos, traduzíveis; usar arquivos i18n simples para a demo.

## Próximos passos para implementação

1. Criar `src/mocks/diets.json` com os perfis mínimos (3 perfis).
2. Implementar `WelcomeScreen` e `ProfileForm` com validações descritas.
3. Implementar utilitário `simulateProcessing(ms=1000)` e integrar UX.
4. Conectar estado global de sessão e roteamento para o painel de plano.

---

Documento gerado a partir de `project-idea.md` (resumo do Fluxo 1).
