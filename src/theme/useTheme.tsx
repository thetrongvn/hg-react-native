import * as React from 'react';
import {themes, ThemeTokens} from './theme';

export interface ThemeContextInterface {
  theme: ThemeTokens;
  setTheme: (value: ThemeTokens) => void;
}

interface ThemeProviderInterface {
  children: React.ReactNode;
}

const ThemeContext = React.createContext({} as ThemeContextInterface);

export const ThemeProvider = ({
  children,
}: ThemeProviderInterface): React.ReactElement => {
  const [theme, setTheme] = React.useState(themes.light);
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const state = React.useContext(ThemeContext);
  const {theme, setTheme} = state;

  const toggleTheme = (v: boolean) => {
    setTheme(v ? themes.dark : themes.light);
  };

  return {theme, toggleTheme};
};
