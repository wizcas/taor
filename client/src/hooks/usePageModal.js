import { useHistory } from 'react-router';

export function usePageModal() {
  const history = useHistory();

  function open(path) {
    history.push(path);
  }

  function close() {
    history.push('/');
  }

  return { open, close };
}
