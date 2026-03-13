import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../i18n';

export enum Language {
  EN = 'en',
  ES = 'es',
  PT = 'pt',
  ALB = 'alb',
  DE = 'de',
  ZH_CN = 'zh_cn',
  KO = 'ko',
}

export type ILanguageType = `${Language}`;

type LocalesState = {
  lng: ILanguageType;
};

const STORAGE_KEY = 'i18nextLng';

const getDefaultLanguage = (): ILanguageType => {
  return Language.PT;
};

const DEFAULT_LANGUAGE: ILanguageType = getDefaultLanguage();

/**
 * Gets the current language from local storage
 * @returns The stored language or default language if not found
 */
const getLanguageFromLocalStorage = (): ILanguageType => {
  const savedLng = localStorage.getItem(STORAGE_KEY);
  if (Object.values(Language).includes(savedLng as Language)) {
    return savedLng as ILanguageType;
  }
  return DEFAULT_LANGUAGE;
};

/**
 * Saves the current language to local storage
 * @param lng Language to save
 */
const saveLanguageInLocalStorage = (lng: ILanguageType): void => {
  localStorage.setItem(STORAGE_KEY, lng);
};

const initialState: LocalesState = {
  lng: getLanguageFromLocalStorage(),
};

const localesSlice = createSlice({
  name: 'localesReducer',
  initialState,
  reducers: {
    toggleLng: state => {
      const newLang: ILanguageType = Language.PT;
      state.lng = newLang;
      saveLanguageInLocalStorage(newLang);
      i18n.changeLanguage(newLang);
    },
    setLanguage: (state, action: PayloadAction<ILanguageType>) => {
      state.lng = action.payload;
      saveLanguageInLocalStorage(action.payload);
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { toggleLng, setLanguage } = localesSlice.actions;
export default localesSlice.reducer;
