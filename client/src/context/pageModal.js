import { makeAutoObservable, reaction } from 'mobx';
import { createContext } from 'react';
import { useHistory } from 'react-router-dom';

class PageModal {
  constructor(history) {
    this.path = '';
    this.history = history;
    makeAutoObservable(this);
  }

  get isOpen() {
    return !!this.path && this.path !== '/';
  }

  open(path) {
    this.path = path;
  }

  close() {
    this.path = '/';
  }
}

export const PageModalContext = createContext();

export function PageModalWrapper({ children }) {
  const history = useHistory();
  const pageModal = new PageModal(history);
  reaction(
    () => pageModal.path,
    (path) => {
      if (path !== history.location.pathname) {
        history.push(path);
      }
    }
  );
  return (
    <PageModalContext.Provider value={pageModal}>
      {children}
    </PageModalContext.Provider>
  );
}
