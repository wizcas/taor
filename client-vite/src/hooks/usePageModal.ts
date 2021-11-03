import { LocationState } from 'history';
import { useHistory } from 'react-router-dom';

export default function usePageModal() {
  const history = useHistory<LocationState>();

  function open(path: string) {
    history.push(path);
  }

  function close() {
    history.go(-history.length + 1);
  }

  return { open, close };
}
