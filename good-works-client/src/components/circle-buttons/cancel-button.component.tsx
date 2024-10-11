import { IBaseProps } from '@/components/sidebar.component';
import { CrossIcon } from '@/icons/cross.icon';
import { IPropsWithClassname } from '@/models/common.model';

export const CancelButton = ({
  onClick,
  title,
  className,
}: IBaseProps & IPropsWithClassname) => {
  return <div title={title}
              onClick={onClick}>
    <CrossIcon className={`w-4 p-1 rounded-full bg-red-500 box-content cursor-pointer hover:bg-red-600 stroke-white transition-colors duration-100 ease-in-out ${className}`} />
  </div>;
};
