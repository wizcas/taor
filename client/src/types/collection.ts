import { ImageMetadata } from './image';

export interface Collection {
  id?: string;
  rev?: string;
  name: string;
  images: ImageMetadata[];
}

export interface CollectionDbRow extends Omit<Collection, 'id' | 'rev'> {
  _id: string;
  _rev: string;
}

export function ToCollectionDbRow(
  collection: Collection,
  { isNew }: { isNew?: boolean } = {}
): CollectionDbRow {
  const { id, rev, ...rest } = collection;
  if (!id) {
    throw new Error('id is required');
  }
  if (!rev && !isNew) {
    throw new Error('rev is required');
  }
  return { _id: id, _rev: rev || '', ...rest };
}
