import zh from '../locales/zh.json';
import en from '../locales/en.json';
import zhTW from '../locales/zh-TW.json';
import ko from '../locales/ko.json';
import de from '../locales/de.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';
import da from '../locales/da.json';
import ja from '../locales/ja.json';
import pl from '../locales/pl.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';
import no from '../locales/no.json';
import ptBR from '../locales/pt-BR.json';
import th from '../locales/th.json';
import tr from '../locales/tr.json';
import uk from '../locales/uk.json';

const locales = {
  zh, en, 'zh-TW': zhTW, ko, de, es, fr, it, da, ja,
  pl, ru, ar, no, 'pt-BR': ptBR, th, tr, uk,
};

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
  const cleaned = raw.toLowerCase().replace(/_/g, '-');
  // 精确匹配
  if (LANG_MAP[cleaned]) return LANG_MAP[cleaned];
  // 取主语言
  const primary = cleaned.split('-')[0];
  if (LANG_MAP[primary]) return LANG_MAP[primary];
  return 'en';
}

export function detectLanguage() {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return resolveLocale(navigator.language);
  }
  return 'en';
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
