import { IBaseProps } from '@/components/sidebar.component';
import { CheckmarkIcon } from '@/icons/checkmark.icon';

export const AcceptButton = ({
  onClick,
  title,
}: IBaseProps) => {
  return <div title={title}
              onClick={onClick}>
    <CheckmarkIcon className="w-4 p-1 rounded-full bg-green-600/60 box-content cursor-pointer hover:bg-green-600 fill-white transition-colors duration-100 ease-in-out" />
  </div>;
};
