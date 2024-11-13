import React, { createContext, useState } from 'react';
import translations from '../translations/translations';

export const LanguageContext  = createContext();

export const LanguageProvider = ({ children }) => {
  const [label1, setLabel1] = useState(translations[global.currentLanguage].disciplinario);

  return (
    <LanguageContext.Provider value={{ label1, setLabel1 }}>
    {children}
  </LanguageContext.Provider>
  );
};
