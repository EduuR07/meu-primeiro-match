import { jsPDF } from "jspdf";

const M = 20; // margem uniforme (mm)
const W = 210 - M * 2;
const BOTTOM = 297 - M;
const DARK: [number, number, number] = [17, 17, 17];
const GRAY: [number, number, number] = [75, 75, 75];
const LINE: [number, number, number] = [190, 190, 190];
const EXAMPLE_TAG = /^\s*(\[[^\]]*(exemplo|fict[ií]cio)[^\]]*\])\s*/i;

const isTitle = (l: string) =>
  l.length > 2 && l.length < 45 && l === l.toUpperCase() && /[A-ZÀ-Ú]/.test(l) && !/[@\d]/.test(l);

export function buildResumePdf(text: string): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let lines = text.replace(/\r/g, "").split("\n").map((l) => l.trimEnd());
  while (lines.length && !lines[0]!.trim()) lines.shift();
  // O título de contato é implícito no cabeçalho com nome + dados.
  if (lines[0]?.trim() === "DADOS PESSOAIS E CONTATO") lines = lines.slice(1);

  let y = M;
  const ensure = (h: number) => { if (y + h > BOTTOM) { doc.addPage(); y = M; } };
  const write = (t: string, size: number, bold: boolean, color: [number, number, number], lh: number) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    for (const w of doc.splitTextToSize(t, W) as string[]) { ensure(lh); doc.text(w, M, y + lh * 0.75); y += lh; }
  };

  // Cabeçalho: nome + contatos até o primeiro título de seção
  let i = 0;
  const first = lines[i] ?? "";
  const tag = first.match(EXAMPLE_TAG);
  if (tag) write(tag[1]!, 8.5, false, GRAY, 4.5);
  const name = tag ? first.slice(tag[0].length) : first;
  if (name.trim()) write(name.trim(), 20, true, DARK, 9);
  i++;
  const contacts: string[] = [];
  while (i < lines.length && !isTitle(lines[i]!.trim())) { if (lines[i]!.trim()) contacts.push(lines[i]!.trim()); i++; }
  if (contacts.length) { y += 1; contacts.forEach((c) => write(c, 10, false, GRAY, 5)); }
  y += 3;
  doc.setDrawColor(...DARK); doc.setLineWidth(0.4); doc.line(M, y, M + W, y);
  y += 5;

  // Seções
  for (; i < lines.length; i++) {
    const l = lines[i]!.trim();
    if (isTitle(l)) {
      y += 3;
      ensure(7 + 2 + 5.2 * 2); // evita título isolado no fim da página
      write(l, 11.5, true, DARK, 6);
      doc.setDrawColor(...LINE); doc.setLineWidth(0.25); doc.line(M, y, M + W, y);
      y += 2.5;
    } else if (!l) {
      y += 2;
    } else {
      write(l, 10.5, false, DARK, 5.2);
    }
  }
  return doc;
}

export function exportResumePdf(text: string, filename = "curriculo-meuprimeiromatch.pdf") {
  buildResumePdf(text).save(filename);
}
