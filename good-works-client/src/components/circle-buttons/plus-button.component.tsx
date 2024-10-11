import { IBaseProps } from '@/components/sidebar.component';
import { PlusIcon } from '@/icons/plus.icon';

export const PlusButton = ({
  onClick,
  title,
}: IBaseProps) => {
  return <div title={title}
              onClick={onClick}>
    <PlusIcon className="w-5 p-0.5 rounded-full bg-green-500/80 box-content cursor-pointer hover:bg-green-600 stroke-white transition-colors duration-100 ease-in-out" />
  </div>;
};
