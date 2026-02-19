import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPPORTED_LANGS = [
  'zh', 'en', 'zh-TW', 'ko', 'de', 'es', 'fr', 'it', 'da', 'ja',
  'pl', 'ru', 'ar', 'no', 'pt-BR', 'th', 'tr', 'uk',
];

function loadLocale(lang) {
  try {
    return JSON.parse(readFileSync(join(__dirname, 'locales', `${lang}.json`), 'utf-8'));
  } catch {
    return {};
  }
}

const locales = {};
for (const lang of SUPPORTED_LANGS) {
  locales[lang] = loadLocale(lang);
}

let currentLang = 'zh';

// 语言代码 → locale key 映射
const LANG_MAP = {
  zh: 'zh', 'zh-cn': 'zh', 'zh-hans': 'zh',
  'zh-tw': 'zh-TW', 'zh-hk': 'zh-TW', 'zh-hant': 'zh-TW',
  en: 'en',
  ko: 'ko',
  de: 'de',
  es: 'es',
  fr: 'fr',
  it: 'it',
  da: 'da',
  ja: 'ja',
  pl: 'pl',
  ru: 'ru',
  ar: 'ar',
  no: 'no', nb: 'no', nn: 'no',
  pt: 'pt-BR', 'pt-br': 'pt-BR',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
};

function resolveLocale(raw) {
  if (!raw) return 'en';
  // 去掉 .UTF-8 等后缀，统一小写
  const cleaned = raw.split('.')[0].replace(/_/g, '-').toLowerCase();
  // 精确匹配
  if (LANG_MAP[cleaned]) return LANG_MAP[cleaned];
  // 取主语言
  const primary = cleaned.split('-')[0];
  if (LANG_MAP[primary]) return LANG_MAP[primary];
  return 'en';
}

export function detectLanguage() {
  const lang = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || '';
  return resolveLocale(lang);
}

export function setLang(lang) {
  currentLang = locales[lang] ? lang : 'en';
}

export function getLang() {
  return currentLang;
}

export function t(key, params) {
  let text = locales[currentLang]?.[key] || locales['en'][key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replaceAll(`{${k}}`, v);
    }
  }
  return text;
}

// 自动检测并设置语言
setLang(detectLanguage());
