import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const skillWikiDir = path.join(root, 'skills/wiki');

function listSkillWikiFiles() {
  if (!fs.existsSync(skillWikiDir)) {
    return [];
  }

  return fs
    .readdirSync(skillWikiDir)
    .filter((entry) => entry.endsWith('.md'))
    .sort()
    .map((entry) => path.join(skillWikiDir, entry));
}

function parseBulletSection(markdown, heading) {
  const match = markdown.match(
    new RegExp(`## ${heading}\\n\\n([\\s\\S]*?)(?:\\n## |$)`),
  );

  if (!match) {
    return [];
  }

  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).replace(/^`|`$/g, ''));
}

function parseSummary(markdown) {
  const match = markdown.match(/## Summary\n\n([\s\S]*?)(?:\n## |$)/);
  if (!match) {
    return '';
  }

  return match[1].replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildSnippet(markdown, queryTokens) {
  const bodyWithoutProvenance = markdown.replace(
    /## Provenance\n\n[\s\S]*?(?=\n## |$)/,
    '',
  );

  const lines = bodyWithoutProvenance
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith('#'));

  const matchedLine = lines.find((line) => {
    const normalized = line.toLowerCase();
    return queryTokens.some((token) => normalized.includes(token));
  });

  return matchedLine ?? lines[0] ?? '';
}

function loadSkillWikiCorpus() {
  return listSkillWikiFiles().map((filePath) => {
    const relativePath = path.relative(root, filePath).replace(/\\/g, '/');
    const markdown = fs.readFileSync(filePath, 'utf8');
    const title =
      markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ??
      path.basename(filePath, '.md');
    const summary = parseSummary(markdown);
    const tags = parseBulletSection(markdown, 'Tags');

    return {
      id: path.basename(filePath, '.md'),
      title,
      summary,
      tags,
      path: relativePath,
      markdown,
    };
  });
}

export function searchSkillWiki(query, options = {}) {
  const limit = Math.max(1, options.limit ?? 5);
  const corpus = loadSkillWikiCorpus();
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return [];
  }

  return corpus
    .map((entry) => {
      const searchableText = [
        entry.title,
        entry.summary,
        entry.tags.join(' '),
        entry.markdown,
      ]
        .join('\n')
        .toLowerCase();

      let score = 0;
      for (const token of queryTokens) {
        if (entry.title.toLowerCase().includes(token)) {
          score += 8;
        }
        if (entry.summary.toLowerCase().includes(token)) {
          score += 4;
        }
        if (entry.tags.some((tag) => tag.toLowerCase().includes(token))) {
          score += 3;
        }
        if (searchableText.includes(token)) {
          score += 1;
        }
      }

      return {
        ...entry,
        score,
        snippet: buildSnippet(entry.markdown, queryTokens),
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, limit)
    .map(({ markdown, ...entry }) => entry);
}
