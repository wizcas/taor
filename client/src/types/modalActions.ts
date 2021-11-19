export interface ModalActions<T = undefined> {
  open(args?: T): void;
  close(): void;
}
