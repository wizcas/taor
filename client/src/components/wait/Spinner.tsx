import { MoonLoader } from 'react-spinners';
import { LengthType } from 'react-spinners/interfaces';

interface Props {
  size?: LengthType;
  loading?: boolean;
  dark?: boolean;
  color?: string;
}

export default function Spinner(props: Props) {
  const { size = 48, loading, dark, color } = props;
  const actualColor = color || dark ? 'white' : 'black';
  return <MoonLoader size={size} loading={loading} color={actualColor} />;
}
