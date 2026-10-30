import { createContext, useContext, useEffect, useState } from 'react';

const CheckinContext = createContext(null);

export function CheckinProvider({ children }) {
  const [registros, setRegistros] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('oficinapro-registros') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('oficinapro-registros', JSON.stringify(registros));
  }, [registros]);

  function adicionarRegistro(registro) {
    setRegistros((anteriores) => [registro, ...anteriores]);
  }

  function limparHistorico() {
    setRegistros([]);
  }

  return (
    <CheckinContext.Provider value={{ registros, adicionarRegistro, limparHistorico }}>
      {children}
    </CheckinContext.Provider>
  );
}

export function useCheckins() {
  const context = useContext(CheckinContext);
  if (!context) throw new Error('useCheckins deve ser usado dentro de CheckinProvider');
  return context;
}
