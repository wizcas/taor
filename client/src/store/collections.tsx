import { createContext, PropsWithChildren } from 'react';
import { Collection, CollectionDbRow, ToCollectionDbRow } from '@/types';

const PAGE_SIZE = 32;

class Collections {
  private readonly db = new PouchDB<CollectionDbRow>('collections');

  async list(page = 0): Promise<Collection[]> {
    const result = await this.db.allDocs({
      include_docs: true,
      limit: PAGE_SIZE,
      skip: page * PAGE_SIZE,
    });
    return result.rows
      .map((row) => {
        if (!row.doc) return null;
        const { _id, _rev, ...values } = row.doc;
        return {
          id: _id,
          rev: _rev,
          ...values,
        } as Collection;
      })
      .filter(Boolean) as Collection[];
  }

  async create(collection: Collection) {
    const doc = ToCollectionDbRow(
      { ...collection, id: Date.now().toString() },
      { isNew: true }
    );
    try {
      const response = await this.db.put(doc);
      if (!response.ok) {
        throw new Error('writing failed');
      }
    } catch (e) {
      console.error('Error creating collection', e);
    }
  }

  async update(collection: Collection) {
    try {
      const response = await this.db.put(ToCollectionDbRow(collection));
      if (!response.ok) {
        throw new Error('writing failed');
      }
    } catch (e) {
      console.error('Error updating collection', e);
    }
  }

  async delete(collection: Collection) {
    try {
      const response = await this.db.remove(ToCollectionDbRow(collection));
      if (!response.ok) {
        throw new Error('writing failed');
      }
    } catch (e) {
      console.error('Error updating collection', e);
    }
  }
}

export const CollectionsContext = createContext<Collections>(new Collections());

export function PreferencesWrapper({ children }: PropsWithChildren<unknown>) {
  const preferences = new Collections();
  return (
    <CollectionsContext.Provider value={preferences}>
      {children}
    </CollectionsContext.Provider>
  );
}
