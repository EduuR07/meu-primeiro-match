import { SKILLS } from "@/data/skills";

export function normalize(text: string): string {
  return ` ${text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9#+.\-\s]/g, " ")
    .replace(/[.\-](?=\s|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

function contains(norm: string, term: string): boolean {
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[\\s])${esc}(?=[\\s]|$)`).test(norm);
}

export function extractSkills(text: string): string[] {
  const norm = normalize(text);
  return Object.entries(SKILLS)
    .filter(([, syns]) => syns.some((s) => contains(norm, s)))
    .map(([label]) => label);
}

export type AnalysisResult = {
  score: number | null;
  required: string[];
  found: string[];
  missing: string[];
  recommendations: string[];
};

export const MIN_CHARS = 80;

export function validate(job: string, resume: string) {
  const e: { job?: string; resume?: string } = {};
  if (!job.trim()) e.job = "Cole a descrição da vaga.";
  else if (job.trim().length < MIN_CHARS) e.job = `Texto insuficiente: use pelo menos ${MIN_CHARS} caracteres.`;
  if (!resume.trim()) e.resume = "Insira o conteúdo do seu currículo.";
  else if (resume.trim().length < MIN_CHARS) e.resume = `Texto insuficiente: use pelo menos ${MIN_CHARS} caracteres.`;
  return e;
}

export function analyze(job: string, resume: string): AnalysisResult {
  const required = extractSkills(job);
  const inResume = new Set(extractSkills(resume));
  const found = required.filter((r) => inResume.has(r));
  const missing = required.filter((r) => !inResume.has(r));
  const score = required.length ? Math.round((found.length / required.length) * 100) : null;

  const rec: string[] = [];
  missing.slice(0, 6).forEach((m) =>
    rec.push(`A vaga menciona ${m}, mas isso não foi identificado no currículo. Caso você tenha esse conhecimento, considere incluí-lo.`),
  );
  const r = normalize(resume);
  if (/projeto/.test(r)) rec.push("Seu currículo apresenta projetos. Considere destacá-los em uma seção própria, como “Projetos acadêmicos”.");
  else rec.push("Se você participou de projetos acadêmicos, voluntários ou pessoais, eles podem valorizar seu currículo.");
  if (!/(formacao|escolaridade|ensino|graduacao|faculdade)/.test(r)) rec.push("Não identificamos uma seção de formação acadêmica. Organize sua escolaridade para facilitar a leitura.");
  if (!/(@|telefone|celular|whatsapp|linkedin)/.test(r)) rec.push("Não encontramos dados de contato (e-mail, telefone ou LinkedIn). Inclua-os no topo do currículo.");
  if (!/(objetivo)/.test(r)) rec.push("Considere incluir um objetivo profissional curto, alinhado à vaga.");
  if (found.length) rec.push(`Mantenha em destaque as competências já alinhadas à vaga: ${found.slice(0, 5).join(", ")}.`);
  rec.push("Utilize títulos claros para as seções do currículo.");
  return { score, required, found, missing, recommendations: rec };
}
