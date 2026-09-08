import {I18n} from 'i18n-js';
import {findBestLanguageTag} from 'react-native-localize';

import en from './en.json';
import vi from './vi.json';

const translations = {en, vi};
const best = findBestLanguageTag(Object.keys(translations));

const i18n = new I18n(translations);
i18n.enableFallback = true;
i18n.locale = best?.languageTag ?? 'en';

export default i18n;
