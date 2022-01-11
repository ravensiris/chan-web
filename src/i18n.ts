import {addMessages, getLocaleFromNavigator, init} from 'svelte-i18n';

import en from '../assets/locales/en.json';

addMessages('en', en);

void init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
