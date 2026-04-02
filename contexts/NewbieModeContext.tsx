import React, { createContext, useContext, useState, useEffect } from 'react';

interface NewbieModeContextType {
  isNewbieMode: boolean;
  toggleNewbieMode: () => void;
}

const NewbieModeContext = createContext<NewbieModeContextType | undefined>(undefined);

export const NewbieModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNewbieMode, setIsNewbieMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('clarix_newbie_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('clarix_newbie_mode', JSON.stringify(isNewbieMode));
  }, [isNewbieMode]);

  const toggleNewbieMode = () => setIsNewbieMode(prev => !prev);

  return (
    <NewbieModeContext.Provider value={{ isNewbieMode, toggleNewbieMode }}>
      {children}
    </NewbieModeContext.Provider>
  );
};

export const useNewbieMode = () => {
  const context = useContext(NewbieModeContext);
  if (context === undefined) {
    throw new Error('useNewbieMode must be used within a NewbieModeProvider');
  }
  return context;
};
