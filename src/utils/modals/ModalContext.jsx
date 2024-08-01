import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (name, props = {}) => {
    setModal({ name, props });
  };

  const closeModal = (e) => {
    if (e === 'outside') {
      setModal(null);
    }
    if (e.target === e.currentTarget) {
      setModal(null);
    }
  };

  return (
    <div>
      <ModalContext.Provider value={{ modal, openModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    </div>
  );
}

export const useModal = () => useContext(ModalContext);
