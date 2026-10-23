import { jsPDF } from "jspdf";
import { normalize } from "./ats";

export function exportResumePdf(text: string, filename = "curriculo-meuprimeiromatch.pdf") {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 20;
  const width = 210 - margin * 2;
  const bottom = 297 - margin;
  let y = margin;
  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();
    const isTitle = line.length > 2 && line.length < 45 && line === line.toUpperCase() && /[A-ZÀ-Ú]/.test(line);
    doc.setFont("helvetica", isTitle ? "bold" : "normal");
    doc.setFontSize(isTitle ? 12 : 10.5);
    if (isTitle && y > margin) y += 3;
    const wrapped: string[] = line ? doc.splitTextToSize(line, width) : [""];
    for (const w of wrapped) {
      if (y > bottom) { doc.addPage(); y = margin; }
      doc.text(w, margin, y);
      y += isTitle ? 6.5 : 5.2;
    }
  }
  void normalize;
  doc.save(filename);
}
