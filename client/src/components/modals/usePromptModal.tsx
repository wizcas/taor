import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ConfirmModal, { PromptModalProps, PromptModalRef } from './PromptModal';

interface UsePromptModalReturn {
  prompt(): Promise<boolean>;
}
export type UsePromptModalArgs = Omit<
  PromptModalProps,
  'isOpen' | 'onOk' | 'onCancel'
>;

type CloseCallback = (result: boolean) => void;

export default function usePromptModal(
  args: UsePromptModalArgs
): UsePromptModalReturn {
  const containerRef = useRef<DocumentFragment | null>(null);
  const modalRef = useRef<PromptModalRef>(null);
  const closeRef = useRef<CloseCallback | null>(null);
  const timerRef = useRef<number>(0);

  function render() {
    containerRef.current = document.createDocumentFragment();
    ReactDOM.render(
      <ConfirmModal
        ref={modalRef}
        onOk={() => closeRef.current?.(true)}
        onCancel={() => closeRef.current?.(false)}
        {...args}
      />,
      containerRef.current
    );
  }

  function dispose(wait: boolean) {
    function destroy() {
      if (containerRef.current) {
        ReactDOM.unmountComponentAtNode(containerRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
    if (wait) {
      modalRef.current?.close();
      timerRef.current = setTimeout(destroy, 300);
    } else {
      destroy();
    }
  }

  useEffect(() => {
    return () => dispose(false);
  }, []);

  async function prompt() {
    return new Promise<boolean>((resolve) => {
      function close(result: boolean) {
        dispose(true);
        resolve(result);
      }
      closeRef.current = close;
      render();
    });
  }

  return { prompt };
}
