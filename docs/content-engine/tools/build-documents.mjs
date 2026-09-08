import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const moduleDirectory = process.argv[2];
if (!moduleDirectory) {
  throw new Error('Usage: node build-documents.mjs /absolute/path/to/node_modules');
}
const require = createRequire(path.join(path.resolve(moduleDirectory), '_loader.cjs'));
const { marked } = require('marked');
const {
  AlignmentType, Document, Footer, Header, HeadingLevel, PageNumber,
  Packer, Paragraph, TextRun,
} = require('docx');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'entregables');
const documents = [
  ['01-cuaderno-del-doctor.md', '01-cuaderno-del-doctor.docx', true],
  ['02-guia-de-conversaciones.md', '02-guia-de-conversaciones.docx', false],
  ['03-north-star.template.md', '03-north-star.docx', false],
];

function inline(tokens, format = {}) {
  return tokens.flatMap((token) => {
    if (token.type === 'strong') return inline(token.tokens, { ...format, bold: true });
    if (token.type === 'em') return inline(token.tokens, { ...format, italics: true });
    if (token.type === 'br') return [new TextRun({ break: 1 })];
    if (token.type === 'escape' || token.type === 'text' || token.type === 'codespan') {
      if (token.tokens) return inline(token.tokens, format);
      return [new TextRun({ text: token.text, ...format })];
    }
    throw new Error(`Unsupported inline Markdown token: ${token.type}`);
  });
}

function body(tokens, workbook) {
  const paragraphs = [];
  let startPage = false;
  for (const token of tokens) {
    if (token.type === 'space') continue;
    if (token.type === 'html' && token.text.trim() === '<!-- pagebreak -->') {
      startPage = true;
      continue;
    }
    if (token.type === 'heading') {
      const levels = [null, HeadingLevel.TITLE, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2];
      paragraphs.push(new Paragraph({
        heading: levels[token.depth],
        children: inline(token.tokens),
        pageBreakBefore: startPage,
        keepNext: true,
      }));
      startPage = false;
      continue;
    }
    if (token.type === 'paragraph') {
      const isResponse = workbook && /\[(Escriba|Completar)/.test(token.text)
        && !token.text.startsWith('**');
      const isQuestion = workbook && /[?]$/.test(token.text);
      paragraphs.push(new Paragraph({
        children: inline(token.tokens),
        pageBreakBefore: startPage,
        keepNext: isQuestion,
        keepLines: true,
        spacing: isResponse ? { after: 650 } : undefined,
      }));
      startPage = false;
      continue;
    }
    if (token.type === 'list') {
      for (const item of token.items) {
        const content = item.tokens.flatMap((child) => {
          if (child.type === 'space') return [];
          if (child.type !== 'text') throw new Error('Only plain list items are supported');
          return inline(child.tokens);
        });
        paragraphs.push(new Paragraph({
          children: content,
          bullet: { level: 0 },
          spacing: { after: 100 },
          keepLines: true,
        }));
      }
      continue;
    }
    throw new Error(`Unsupported block Markdown token: ${token.type}`);
  }
  return paragraphs;
}

await fs.mkdir(outputDirectory, { recursive: true });
for (const [source, output, workbook] of documents) {
  const markdown = await fs.readFile(path.join(root, source), 'utf8');
  const document = new Document({
    creator: 'Proyecto Dr. Mejia',
    title: markdown.split('\n')[0].replace(/^# /, ''),
    description: 'Documento de trabajo en espanol para construir el contexto editorial.',
    styles: {
      default: {
        document: {
          run: { font: 'Arial', size: 22, color: '000000', language: { value: 'es-NI' } },
          paragraph: { spacing: { after: 140, line: 270 } },
        },
        title: {
          run: { font: 'Arial', size: 44, bold: true, color: '000000' },
          paragraph: { spacing: { before: 0, after: 220 } },
        },
        heading1: {
          run: { font: 'Arial', size: 30, bold: true, color: '000000' },
          paragraph: { spacing: { before: 140, after: 180 } },
        },
        heading2: {
          run: { font: 'Arial', size: 23, bold: true, color: '000000' },
          paragraph: { spacing: { before: 140, after: 100 } },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 950, bottom: 950, left: 1080, right: 1080, header: 420, footer: 420 },
        },
      },
      headers: {
        default: new Header({ children: [new Paragraph({
          children: [new TextRun({ text: 'Dr. Mej\u00eda  |  Contexto editorial', size: 17, color: '000000' })],
        })] }),
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Documento de trabajo  |  ', size: 17 }),
            new TextRun({ children: [PageNumber.CURRENT], size: 17 }),
            new TextRun({ text: ' de ', size: 17 }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 17 }),
          ],
        })] }),
      },
      children: body(marked.lexer(markdown), workbook),
    }],
  });
  await fs.writeFile(path.join(outputDirectory, output), await Packer.toBuffer(document));
  console.log(output);
}
