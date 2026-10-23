# MeuPrimeiroMatch

**Seu talento no caminho certo.**

O **MeuPrimeiroMatch** é uma aplicação web desenvolvida para ajudar estudantes e profissionais em início de carreira a entenderem melhor a compatibilidade entre seus currículos e as oportunidades de emprego.

A plataforma permite comparar um currículo com a descrição de uma vaga, identificar competências encontradas e ausentes, visualizar recomendações de melhoria e gerar uma versão reorganizada do currículo, com possibilidade de edição e exportação em PDF.

O projeto foi desenvolvido como parte de um desafio do **Bootcamp da DIO**, utilizando inteligência artificial como apoio no planejamento, na definição dos requisitos e na construção da aplicação com o Lovable.

**Aplicação publicada:** https://cv-keyword-compass.lovable.app

## 1. Problema identificado

Durante a busca pelo primeiro emprego ou estágio, muitos candidatos encontram dificuldades para adaptar seus currículos às exigências de cada oportunidade.

Nem sempre fica claro quais competências precisam ser destacadas, quais requisitos já estão presentes no currículo ou como organizar as informações de maneira adequada para os processos seletivos.

Além disso, os sistemas de rastreamento de candidatos, conhecidos como ATS (*Applicant Tracking Systems*), podem considerar a estrutura e os termos presentes nos currículos durante a triagem.

A partir desse cenário, surgiu a proposta de desenvolver uma ferramenta simples e acessível para ajudar candidatos a analisar e organizar melhor suas informações profissionais.

## 2. Solução proposta

O MeuPrimeiroMatch busca facilitar a comparação entre currículos e vagas por meio de uma interface intuitiva.

O usuário informa a descrição da oportunidade e o conteúdo do currículo. A aplicação identifica competências reconhecidas nos dois textos, calcula uma estimativa de compatibilidade e apresenta recomendações para melhorar a organização das informações.

Também é possível gerar uma versão reorganizada do currículo, revisar o conteúdo e exportá-lo em PDF.

A proposta não é substituir uma análise profissional de recrutamento, mas oferecer um recurso de apoio para quem está começando a construir sua trajetória no mercado de trabalho.

## 3. Público-alvo

O projeto foi pensado principalmente para:

- Estudantes em busca de estágio;
- Candidatos ao primeiro emprego;
- Jovens aprendizes;
- Pessoas que desejam organizar melhor seus currículos;
- Profissionais que precisam identificar competências mencionadas em uma vaga.

## 4. Funcionalidades implementadas

### Análise de compatibilidade

O usuário pode informar o tipo de oportunidade, a área de interesse, a descrição da vaga e o conteúdo do currículo.

A aplicação compara os textos e apresenta uma pontuação estimada de compatibilidade, de 0 a 100%, quando identifica requisitos reconhecidos.

### Identificação de palavras-chave

A análise separa as competências em dois grupos:

- **Encontradas:** requisitos da vaga também identificados no currículo;
- **Ausentes:** requisitos mencionados na vaga que não foram identificados no currículo.

Essa classificação permite visualizar quais competências já estão representadas e quais merecem atenção.

### Recomendações de melhoria

Com base nos requisitos identificados, o sistema apresenta sugestões para melhorar a apresentação do currículo.

As recomendações incentivam o usuário a destacar conhecimentos e experiências que realmente possui, sem adicionar qualificações fictícias.

### Currículo reorganizado

A aplicação identifica seções conhecidas do currículo e organiza as informações em uma estrutura mais adequada para leitura.

O conteúdo gerado pode ser revisado e editado antes da exportação.

### Exportação em PDF

O usuário pode copiar o conteúdo reorganizado ou gerar um arquivo PDF em formato A4, com texto selecionável.

### Privacidade e acessibilidade

O processamento da análise é realizado localmente no navegador, sem necessidade de cadastro ou armazenamento dos currículos em um banco de dados.

A interface também foi planejada considerando princípios de acessibilidade e Design Universal, buscando proporcionar uma experiência simples para diferentes perfis de usuários.

## 5. Tecnologias utilizadas

- **React:** construção da interface;
- **TypeScript:** implementação da lógica da aplicação;
- **TanStack Start:** estrutura do projeto;
- **Tailwind CSS:** estilização;
- **shadcn/ui:** componentes de interface;
- **Lucide React:** ícones;
- **jsPDF:** geração de arquivos PDF;
- **Lovable:** desenvolvimento assistido por inteligência artificial;
- **ChatGPT:** apoio na organização da ideia, elaboração do prompt e refinamento dos requisitos.

## 6. Como a análise funciona

O MeuPrimeiroMatch utiliza uma abordagem de correspondência textual baseada em regras e em um dicionário de competências.

O processo acontece da seguinte maneira:

1. O usuário informa a descrição da vaga e o currículo.
2. Os textos são normalizados para facilitar a comparação.
3. A aplicação procura requisitos presentes em seu dicionário de competências.
4. Os requisitos identificados na vaga são comparados com o currículo.
5. O sistema calcula uma porcentagem estimada de compatibilidade.
6. São apresentadas as palavras-chave encontradas, ausentes e as recomendações.

O cálculo utilizado é:

**Compatibilidade (%) = (Requisitos encontrados no currículo / Requisitos identificados na vaga) × 100**

Caso nenhum requisito seja reconhecido, a aplicação não apresenta uma pontuação de compatibilidade.

O dicionário de competências e seus sinônimos está localizado em `src/data/skills.ts`.

**Importante:** essa pontuação representa apenas uma estimativa simplificada de correspondência textual. Não equivale à avaliação oficial de um sistema ATS nem garante aprovação em processos seletivos.

## 7. Desenvolvimento com inteligência artificial

O projeto foi desenvolvido utilizando conceitos de **Vibe Coding**, abordagem na qual ferramentas de inteligência artificial auxiliam na criação de aplicações a partir de instruções em linguagem natural.

Durante o desenvolvimento, utilizei o ChatGPT para estruturar a proposta, organizar os requisitos e elaborar as instruções enviadas ao Lovable.

O Lovable foi utilizado para implementar a interface e as funcionalidades da aplicação.

Esse processo também permitiu exercitar a elaboração de prompts, a definição de prioridades e a avaliação das soluções geradas.

### 7.1 Planejamento inicial

A ideia inicial era construir uma aplicação com análise de compatibilidade, identificação de requisitos, recomendações personalizadas e geração de currículos.

Durante o planejamento, também foram considerados aspectos como:

- Facilidade de uso;
- Organização das informações;
- Acessibilidade;
- Privacidade dos dados;
- Clareza das recomendações;
- Exportação do currículo;
- Prevenção de informações profissionais inventadas.

### 7.2 Mega prompt

O prompt utilizado para orientar a construção do MVP foi organizado em um documento Markdown, com a descrição do produto, seus objetivos, funcionalidades, regras de negócio, requisitos técnicos e critérios de aceitação.

Entre as principais instruções estavam:

- Criar uma aplicação web responsiva chamada MeuPrimeiroMatch;
- Utilizar uma identidade visual baseada em branco, cinza e roxo;
- Permitir a inserção de currículo e descrição de vaga;
- Identificar palavras-chave encontradas e ausentes;
- Calcular uma estimativa transparente de compatibilidade;
- Apresentar recomendações contextualizadas;
- Reorganizar o currículo sem inventar experiências ou qualificações;
- Permitir a edição e a exportação do currículo em PDF;
- Priorizar uma implementação simples, funcional e sem dependência de APIs externas.

**Observação:** os tópicos acima representam uma síntese das instruções utilizadas. O mega prompt integral deve ser preservado separadamente para documentar o processo de desenvolvimento.

### 7.3 Refinamentos e decisões

Durante a construção, foi necessário avaliar a complexidade da solução e priorizar as funcionalidades essenciais.

Uma das primeiras propostas envolvia uma arquitetura mais elaborada, com integração de IA generativa e diferentes etapas de processamento.

Entretanto, considerando as limitações de créditos da ferramenta e o objetivo de concluir um MVP funcional, a implementação foi simplificada.

As principais decisões foram:

1. **Redução da complexidade:** priorização de uma aplicação com fluxo de análise completo, evitando funcionalidades extras.
2. **Processamento local:** utilização de regras em TypeScript para identificar competências e calcular a compatibilidade.
3. **Pontuação transparente:** apresentação de um resultado baseado nos requisitos reconhecidos, sem simular uma avaliação oficial de ATS.
4. **Recomendações responsáveis:** sugestões que não presumem conhecimentos ou experiências não informados.
5. **Currículo editável:** possibilidade de revisar o conteúdo antes da exportação.
6. **Exportação em PDF:** disponibilização de um arquivo simples e legível.
7. **Correções técnicas:** ajustes realizados durante a construção para solucionar erros de compilação e melhorar o funcionamento da aplicação.

Essa experiência demonstrou a importância de definir um escopo viável e validar o funcionamento da aplicação, em vez de apenas solicitar uma grande quantidade de funcionalidades.

## 8. Fluxo de utilização

O funcionamento da aplicação pode ser resumido em quatro etapas:

**1. Informar os dados**

O usuário seleciona o tipo de oportunidade e insere o currículo e a descrição da vaga.

**2. Analisar a compatibilidade**

O sistema identifica requisitos presentes nos textos e calcula uma estimativa de correspondência.

**3. Consultar os resultados**

A aplicação apresenta a pontuação, as palavras-chave encontradas, as ausentes e as recomendações.

**4. Revisar e exportar**

O usuário acessa a versão reorganizada do currículo, realiza os ajustes necessários e pode copiar o conteúdo ou baixar o PDF.

## 9. Capturas de tela

As capturas abaixo devem demonstrar as principais etapas da aplicação.

### Página inicial

Interface de apresentação do MeuPrimeiroMatch, com a proposta da plataforma e acesso à análise.

<!-- Adicionar captura da página inicial aqui. -->

### Formulário de análise

Tela utilizada para informar a descrição da vaga e o currículo.

<!-- Adicionar captura do formulário aqui. -->

### Resultado da análise

Visualização da pontuação estimada, das competências identificadas e das recomendações.

<!-- Adicionar captura dos resultados aqui. -->

### Currículo reorganizado

Etapa de revisão e edição do currículo antes da exportação.

<!-- Adicionar captura do editor aqui. -->

### PDF exportado

Exemplo de currículo gerado pela aplicação.

<!-- Adicionar captura do PDF aqui. -->

## 10. Executar o projeto localmente

Para executar a aplicação em ambiente local, é necessário ter o Bun instalado.

Clone o repositório:

```bash
git clone https://github.com/EduuR07/cv-keyword-compass.git
```

Acesse a pasta:

```bash
cd cv-keyword-compass
```

Instale as dependências:

```bash
bun install
```

Inicie o servidor de desenvolvimento:

```bash
bun run dev
```

Depois, acesse o endereço local informado no terminal.

## 11. Limitações e melhorias futuras

O MeuPrimeiroMatch foi desenvolvido como um MVP e possui algumas limitações.

A análise reconhece apenas competências cadastradas no dicionário da aplicação. Por isso, alguns requisitos podem não ser identificados.

A comparação também é predominantemente textual, sem interpretação semântica aprofundada.

A reorganização do currículo utiliza regras para identificar seções conhecidas, mas não realiza uma reescrita generativa do conteúdo.

Entre as melhorias que poderiam ser desenvolvidas futuramente estão:

- Análise semântica mais avançada;
- Recomendações mais personalizadas;
- Ampliação do dicionário de competências;
- Melhorias no layout dos currículos exportados;
- Mais opções de formatação;
- Aprimoramento da identificação de experiências e projetos;
- Testes com diferentes formatos de currículos e descrições de vagas.

Essas possibilidades não fazem parte, necessariamente, da versão atual da aplicação.

## 12. Aprendizados

O desenvolvimento do MeuPrimeiroMatch foi uma oportunidade de praticar conceitos de Vibe Coding e compreender melhor o papel da inteligência artificial na criação de software.

Um dos principais aprendizados foi perceber que a qualidade de um prompt não depende apenas da quantidade de detalhes, mas também da clareza dos requisitos e da viabilidade da implementação.

Também foi importante aprender a adaptar o escopo do projeto diante das limitações encontradas, priorizando as funcionalidades necessárias para entregar uma solução utilizável.

A experiência reforçou a importância de testar o resultado produzido pela IA, identificar problemas e compreender as limitações técnicas da aplicação.

## 13. Links do projeto

**Aplicação publicada:** https://cv-keyword-compass.lovable.app

**Repositório GitHub:** https://github.com/EduuR07/cv-keyword-compass

## 14. Autor

**Eduardo Rodrigues Bueno**

Estudante de Análise e Desenvolvimento de Sistemas.

GitHub: https://github.com/EduuR07

LinkedIn: https://www.linkedin.com/in/eduardobueno07/

---

Projeto desenvolvido para fins educacionais durante um desafio do Bootcamp da DIO, com apoio de ferramentas de inteligência artificial.
