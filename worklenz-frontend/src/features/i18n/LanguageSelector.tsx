import { Button } from '@/shared/antd-imports';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ILanguageType, setLanguage } from './localesSlice';

const LanguageSelector = () => {
  const language = useAppSelector(state => state.localesReducer.lng);
  const dispatch = useAppDispatch();

  const handleLanguageChange = (lang: ILanguageType) => {
    dispatch(setLanguage(lang));
  };

  const languageLabels = {
    en: 'PT',
    es: 'PT',
    pt: 'PT',
    alb: 'PT',
    de: 'PT',
    zh_cn: 'PT',
    ko: 'PT',
  };

  return (
    <Button
      shape="circle"
      onClick={() => handleLanguageChange('pt' as ILanguageType)}
      style={{
        textTransform: 'capitalize',
        fontWeight: 500,
        minWidth: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Idioma do aplicativo em português"
    >
      {languageLabels[language]}
    </Button>
  );
};

export default LanguageSelector;
