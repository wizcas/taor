import classNames from 'classnames';
import FeatherIcon from '../icon/FeatherIcon';

interface Props {
  text?: string;
  icon?: string;
}

export default function HeaderWithDivider({ text, icon }: Props) {
  return (
    <div
      className={classNames(
        'flex flex-row items-center gap-2',
        'mt-6 mb-4',
        'text-md font-semibold text-gray-600'
      )}
    >
      {icon && <FeatherIcon icon={icon} />}
      {text && <div>{text}</div>}
      <hr
        className={classNames('flex-1', {
          'ml-4': text || icon,
        })}
      />
    </div>
  );
}
