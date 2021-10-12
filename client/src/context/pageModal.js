import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

class PageModal {
  path = '';

  constructor() {
    makeAutoObservable(this);
  }

  get isOpen() {
    return !!this.path;
  }

  open(path) {
    this.path = path;
  }

  close() {
    this.path = '';
  }
}

export const PageModalContext = createContext();

export function PageModalWrapper({ children }) {
  return (
    <PageModalContext.Provider value={new PageModal()}>
      {children}
    </PageModalContext.Provider>
  );
}
