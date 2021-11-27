export interface ModalRef<T = undefined> {
  open(args?: T): void;
  close(): void;
}
