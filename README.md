# MeuPrimeiroMatch

**Seu talento no caminho certo.**

Plataforma web que compara um currículo com a descrição de uma vaga, identifica palavras-chave, sugere melhorias e gera um currículo reorganizado em PDF.

## Problema
Candidatos iniciantes não sabem se o currículo destaca os requisitos que a vaga pede, e muitos currículos são mal lidos por sistemas ATS por falta de organização.

## Público-alvo
Estudantes e candidatos a primeiro emprego, estágio e jovem aprendiz.

## Funcionalidades
- Formulário com tipo de oportunidade, área, vaga e currículo (validação, contador, exemplo e limpeza de dados)
- Análise de compatibilidade com pontuação de 0 a 100
- Palavras-chave encontradas e ausentes
- Recomendações baseadas no texto analisado
- Currículo reorganizado e editável
- Copiar currículo e baixar PDF (A4, texto selecionável)

## Tecnologias
React, TypeScript, TanStack Start, Tailwind CSS, shadcn/ui, Lucide React e jsPDF.

## Como a análise funciona
1. Os textos são normalizados (minúsculas, sem acentos e pontuação).
2. Requisitos da vaga são extraídos a partir de um dicionário de competências com sinônimos (`src/data/skills.ts`).
3. Cada requisito é procurado no currículo.
4. Compatibilidade = (requisitos encontrados / requisitos da vaga) × 100.
5. Se nenhum requisito for reconhecido, nenhuma pontuação é exibida.

Tudo é processado localmente no navegador; nada é enviado ou armazenado.

## Limitações
- Só reconhece competências presentes no dicionário.
- A comparação é textual, não semântica.
- A reorganização apenas identifica títulos de seção conhecidos; não reescreve nem inventa conteúdo.
- Não é a avaliação oficial de nenhum ATS e não garante aprovação.

## Executar localmente
```bash
bun install
bun run dev
```

## Aplicação publicada
_Inserir link aqui._

## Mega prompt e refinamentos
_Documentar aqui._

## Capturas de tela
_Inserir imagens aqui._
