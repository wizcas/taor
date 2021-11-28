import { useNavigate } from 'react-router-dom';

export default function usePageModal() {
  const navigate = useNavigate();

  function open(path: string) {
    navigate(path);
  }

  function close() {
    navigate(-Number.MAX_SAFE_INTEGER);
  }

  return { open, close };
}
