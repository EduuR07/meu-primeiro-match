# MeuPrimeiroMatch — Plataforma de Análise e Otimização de Currículos ATS

## 1. Contexto do projeto

Desenvolva uma aplicação web completa, funcional e responsiva chamada **MeuPrimeiroMatch**.

**Slogan:** Seu talento no caminho certo.

A plataforma será voltada principalmente a estudantes e candidatos que buscam:

- Primeiro emprego;
- Estágio;
- Jovem aprendiz;
- Oportunidades profissionais de nível inicial.

O objetivo é ajudar pessoas com pouca ou nenhuma experiência profissional a comparar seus currículos com descrições de vagas, identificar requisitos relevantes e gerar uma versão mais organizada e adequada à leitura por sistemas ATS (Applicant Tracking Systems).

A aplicação deve valorizar experiências reais, projetos acadêmicos, cursos, conhecimentos e competências do candidato.

**Regra fundamental: a aplicação nunca deve inventar experiências profissionais, habilidades, cursos, certificações, datas ou qualquer outra informação.**

### Prioridade

Entregar um MVP realmente funcional, publicável e demonstrável, com o menor número possível de dependências e sem funcionalidades desnecessárias.

Não entregue apenas uma interface estática ou uma demonstração visual.

Todas as funcionalidades principais devem funcionar com textos reais fornecidos pelo usuário.

---

## 2. Tecnologias

Utilize preferencialmente:

- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui;
- Lucide React;
- jsPDF para exportação.

Utilize uma arquitetura simples, organizada em componentes reutilizáveis.

Não implemente autenticação, banco de dados, dashboard administrativo ou integrações externas desnecessárias.

A aplicação deve funcionar sem depender de APIs pagas.

Priorize processamento local no navegador, utilizando TypeScript para análise de compatibilidade textual.

---

## 3. Identidade visual

Crie uma interface moderna, profissional, jovem, minimalista e acolhedora.

A identidade deve transmitir confiança, crescimento profissional, tecnologia e oportunidades.

### Paleta de cores

- Roxo principal: #4C0DB4
- Lilás: #A78BFA
- Branco: #FFFFFF
- Cinza de fundo: #F3F4F6
- Cinza de bordas: #E5E7EB
- Verde: #10B981
- Laranja: #F59E0B
- Texto principal: #111827

### Diretrizes visuais

- Utilize a fonte Inter.
- Predominância de branco e cinza-claro.
- Roxo em botões, títulos, navegação e destaques.
- Verde para competências identificadas.
- Laranja para requisitos ausentes e recomendações.
- Cards com bordas arredondadas.
- Sombras discretas.
- Espaçamento confortável.
- Ícones Lucide.
- Layout totalmente responsivo.
- Estados de foco visíveis.
- Contraste adequado.

Evite excesso de gradientes e elementos decorativos.

Crie um logotipo tipográfico simples para MeuPrimeiroMatch, com um símbolo relacionado a conexão, crescimento ou oportunidades.

---

## 4. Estrutura da aplicação

Desenvolva a aplicação como uma Single Page Application (SPA), com quatro etapas visuais:

1. Página inicial.
2. Nova análise.
3. Resultados da análise.
4. Currículo otimizado.

As etapas podem ser controladas por estado React, sem necessidade de múltiplas rotas.

O usuário deve conseguir navegar entre elas sem perder os dados durante a utilização.

---

## 5. Página inicial

Crie uma landing page contendo:

### Cabeçalho

- Logotipo MeuPrimeiroMatch;
- Como funciona;
- Recursos;
- Sobre;
- Botão "Começar agora".

### Seção principal

Título:

**Seu currículo mais alinhado. Suas oportunidades mais perto.**

Descrição:

"Descubra como seu currículo combina com uma vaga e receba sugestões para destacar suas habilidades, cursos e projetos, mesmo sem experiência profissional."

Botão principal:

**Analisar meu currículo**

Botão secundário:

**Como funciona**

Inclua uma composição visual moderna relacionada a estudantes, currículos e oportunidades profissionais.

### Benefícios

Apresente quatro cards:

1. Análise de compatibilidade.
2. Identificação de palavras-chave.
3. Recomendações personalizadas.
4. Currículo otimizado para ATS.

### Como funciona

Apresente três etapas:

1. Cole a descrição da vaga.
2. Insira seu currículo.
3. Receba a análise e gere uma versão otimizada.

### Rodapé

Inclua uma descrição curta do projeto e o aviso:

"O MeuPrimeiroMatch oferece uma estimativa de compatibilidade textual e não garante aprovação em processos seletivos."

---

## 6. Formulário de análise

Crie uma interface com os seguintes campos:

### Tipo de oportunidade

Seleção obrigatória:

- Primeiro emprego;
- Estágio;
- Jovem aprendiz.

### Área de interesse

Campo opcional.

Exemplos:

- Tecnologia;
- Administração;
- Logística;
- Atendimento;
- Marketing;
- Recursos Humanos;
- Outras áreas.

### Descrição da vaga

Textarea obrigatório para colar a descrição completa da oportunidade.

### Meu currículo

Textarea obrigatório para inserir o conteúdo do currículo.

### Funcionalidades

- Contador de caracteres.
- Validação dos campos.
- Mensagens de erro.
- Botão "Usar exemplo".
- Botão "Analisar compatibilidade".
- Botão "Limpar dados".

O botão "Usar exemplo" deve preencher os campos com um currículo fictício e uma vaga demonstrativa, identificados claramente como exemplos.

Os resultados, porém, devem ser calculados normalmente pelo mesmo algoritmo utilizado para textos reais.

Não utilize pontuações fixas ou previamente definidas.

---

## 7. Motor de análise ATS

Implemente um algoritmo funcional em TypeScript para comparar a descrição da vaga com o currículo.

O algoritmo deve analisar os textos reais inseridos pelo usuário.

### Etapa 1 — Normalização

Normalize os textos:

- Converta para letras minúsculas.
- Remova acentos para comparação.
- Trate pontuação e espaços.
- Preserve palavras compostas relevantes.

### Etapa 2 — Extração de requisitos

Identifique competências e palavras-chave relevantes presentes na descrição da vaga.

Utilize um dicionário extensível com competências comuns em vagas de nível inicial.

Inclua termos relacionados a:

- Tecnologia;
- Administração;
- Logística;
- Atendimento;
- Comunicação;
- Organização;
- Trabalho em equipe;
- Ferramentas de escritório;
- Linguagens de programação;
- Cursos e formação acadêmica.

Considere sinônimos conhecidos.

Exemplos:

- Excel e Microsoft Excel;
- JavaScript e JS;
- Atendimento ao cliente e suporte ao cliente, quando semanticamente equivalentes no contexto.

Não utilize todas as palavras da vaga como requisitos.

Ignore palavras comuns, artigos, preposições e termos sem relevância profissional.

O algoritmo deve trabalhar com requisitos efetivamente identificados, e não apenas contar palavras repetidas.

### Etapa 3 — Comparação

Compare os requisitos identificados com o currículo.

Classifique em:

**Encontrados:** termos ou competências identificados no currículo.

**Não identificados:** requisitos da vaga que não foram encontrados no currículo.

A ausência de uma palavra-chave não significa necessariamente que o candidato não possua aquela competência.

### Etapa 4 — Pontuação

Calcule uma pontuação estimada de compatibilidade:

Compatibilidade = (requisitos identificados no currículo / total de requisitos extraídos da vaga) × 100.

Cada requisito único deve ser contado uma vez.

A pontuação deve variar entre 0 e 100.

Não utilize números aleatórios.

Se nenhum requisito relevante for extraído, não exiba uma pontuação artificial. Informe que não foi possível realizar uma análise confiável.

Explique que a pontuação é uma estimativa simplificada de correspondência textual, não uma avaliação oficial de sistemas ATS.

### Etapa 5 — Recomendações

Gere recomendações específicas com base nos requisitos identificados.

Exemplos:

- "A vaga menciona Excel, mas essa ferramenta não foi identificada no currículo. Caso você tenha conhecimento, considere incluí-la."
- "Seu currículo apresenta projetos acadêmicos. Considere destacá-los em uma seção própria."
- "Organize sua formação acadêmica para facilitar a leitura."
- "Utilize títulos claros para as seções do currículo."

As recomendações devem refletir os dados analisados.

Não apresente recomendações falsas ou incompatíveis com as informações fornecidas.

---

## 8. Tela de resultados

Crie um dashboard simples e visualmente agradável contendo:

### Indicador de compatibilidade

Exiba uma porcentagem de 0 a 100, acompanhada de um indicador circular ou barra de progresso.

### Resumo

Apresente uma explicação curta sobre a correspondência entre currículo e vaga.

### Cards

**Palavras-chave encontradas**

Exiba os requisitos identificados no currículo.

Utilize detalhes verdes.

**Palavras-chave ausentes**

Exiba requisitos presentes na vaga, mas não identificados no currículo.

Utilize detalhes laranja.

**Recomendações**

Exiba sugestões práticas para melhorar a apresentação do currículo.

Utilize detalhes roxos.

### Aviso obrigatório

"Esta análise representa uma estimativa simplificada de compatibilidade textual. Não corresponde à avaliação oficial de um ATS e não garante aprovação em processos seletivos."

### Botões

- "Gerar currículo otimizado";
- "Fazer nova análise".

---

## 9. Geração do currículo otimizado

Implemente uma funcionalidade real que gere uma versão reorganizada do currículo inserido.

Como o MVP utiliza processamento local, a otimização deve ser baseada em regras de formatação e organização, sem prometer reescrita por inteligência artificial.

### Requisitos

- Preservar as informações originais.
- Identificar títulos de seções quando possível.
- Organizar espaços e quebras de linha.
- Padronizar títulos reconhecidos.
- Melhorar a legibilidade.
- Manter as informações editáveis.
- Não excluir conteúdo desconhecido.
- Não inventar qualificações.

### Estrutura sugerida

Quando identificadas no texto original:

- Dados pessoais e contato;
- Objetivo profissional;
- Formação acadêmica;
- Experiência profissional;
- Projetos acadêmicos;
- Cursos e certificações;
- Habilidades e competências.

Não crie experiências ou seções com informações fictícias.

Se o algoritmo não conseguir identificar alguma seção, preserve o conteúdo original em vez de descartá-lo.

### Editor

Exiba o currículo reorganizado em uma área editável.

O usuário deve poder revisar e modificar o conteúdo antes da exportação.

Inclua um aviso:

"Revise seu currículo antes de enviar. A ferramenta reorganiza as informações fornecidas, mas não verifica sua veracidade."

---

## 10. Exportação do currículo

Implemente:

- Botão "Copiar currículo";
- Botão "Baixar PDF".

### PDF

Utilize jsPDF.

O arquivo deve:

- Utilizar tamanho A4;
- Ter margens adequadas;
- Conter texto selecionável;
- Respeitar quebras de linha;
- Criar páginas adicionais quando necessário;
- Preservar acentos e caracteres do português;
- Utilizar estrutura simples de uma coluna;
- Evitar tabelas e elementos gráficos complexos.

O PDF deve conter somente o currículo otimizado.

Não inclua pontuação, dashboard ou recomendações dentro do arquivo.

O conteúdo exportado deve corresponder ao texto revisado pelo usuário.

---

## 11. Acessibilidade e Design Universal

Implemente:

- Navegação por teclado;
- Labels nos campos;
- Contraste adequado;
- Estados de foco;
- Mensagens de erro compreensíveis;
- Layout responsivo;
- Indicadores que não dependam apenas das cores;
- Botões com áreas de clique adequadas.

A aplicação deve funcionar em desktop e dispositivos móveis.

---

## 12. Privacidade

Não implemente armazenamento permanente.

Não envie currículos para servidores externos.

Realize a análise localmente no navegador.

Não registre informações pessoais em logs.

Inclua um botão "Limpar meus dados" que apague as informações preenchidas e os resultados da análise.

---

## 13. Tratamento de erros

Implemente mensagens para:

- Descrição da vaga vazia;
- Currículo vazio;
- Texto insuficiente para análise;
- Ausência de requisitos reconhecíveis;
- Falha na geração do PDF.

Nenhum botão deve ser apenas decorativo.

Não apresente resultados fictícios.

---

## 14. Organização do código

Organize a implementação em arquivos reutilizáveis.

Sugestão:

- `src/components` — componentes da interface;
- `src/lib/ats.ts` — análise de compatibilidade;
- `src/lib/resume.ts` — reorganização do currículo;
- `src/lib/pdf.ts` — exportação;
- `src/pages` ou estrutura equivalente — telas;
- `src/data` — exemplos demonstrativos e dicionário de competências.

Adapte os caminhos à estrutura do projeto gerada pelo Lovable.

Evite arquitetura excessivamente complexa.

---

## 15. README e documentação

Crie ou atualize o arquivo `README.md` do projeto com:

1. Nome e descrição do MeuPrimeiroMatch.
2. Problema que a aplicação resolve.
3. Público-alvo.
4. Funcionalidades implementadas.
5. Tecnologias utilizadas.
6. Explicação do funcionamento da análise.
7. Explicação das limitações do algoritmo.
8. Como executar o projeto localmente.
9. Espaço para inserir o link da aplicação publicada.
10. Espaço para documentar o mega prompt e os refinamentos.
11. Espaço para capturas de tela demonstrando o funcionamento.

Não invente links, testes realizados ou funcionalidades inexistentes.

O README deve ser escrito em português brasileiro, utilizando Markdown simples.

---

## 16. Critérios de aceitação

Considere o MVP concluído somente quando:

1. A página inicial carregar corretamente.
2. O usuário conseguir inserir uma vaga e um currículo.
3. A análise calcular uma pontuação a partir dos textos.
4. As palavras-chave encontradas e ausentes forem exibidas.
5. As recomendações forem relacionadas aos dados fornecidos.
6. O currículo reorganizado for gerado.
7. O usuário conseguir editar o currículo.
8. O botão de copiar funcionar.
9. O PDF for exportado corretamente.
10. A interface funcionar em dispositivos móveis.
11. Não houver informações profissionais inventadas.
12. O projeto estiver preparado para publicação.

---

## 17. Prioridades de implementação

Priorize rigorosamente:

1. Análise real de compatibilidade.
2. Exibição dos resultados.
3. Geração e edição do currículo reorganizado.
4. Exportação PDF.
5. Landing page.
6. Refinamentos visuais.
7. README.

Não adicione funcionalidades extras antes de concluir o fluxo principal.

**Implemente diretamente o MVP funcional, evitando ciclos desnecessários de planejamento e refinamento.**

O resultado deve ser uma aplicação pronta para demonstração e publicação, com identidade visual própria, funcionamento real e documentação clara.
