import { useNavigate } from 'react-router-dom';

export default function usePageModal() {
  const navigate = useNavigate();

  function open(path: string) {
    navigate(path);
  }

  function close() {
    navigate(-1);
  }

  return { open, close };
}
