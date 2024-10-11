import { IBaseProps } from '@/components/sidebar.component';
import { TrashIcon } from '@/icons/trash.icon';

export const TrashButton = ({
  title,
  onClick,
}: IBaseProps) => {
  return (
    <div onClick={onClick}
         title={title}>
      <TrashIcon
        className="h-8 p-1.5 bg-red-500 stroke-white rounded-full cursor-pointer hover:bg-red-600 transition-colors duration-100 ease-in-out" />

    </div>
  );
};
