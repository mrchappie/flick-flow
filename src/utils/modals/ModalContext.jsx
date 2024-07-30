import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (name, props = {}) => {
    setModal({ name, props });
  };

  const closeModal = () => setModal(null);

  return (
    <div>
      <ModalContext.Provider value={{ modal, openModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    </div>
  );
}

export const useModal = () => useContext(ModalContext);
