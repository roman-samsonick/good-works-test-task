import { IBaseProps } from '@/components/sidebar.component';
import { EditIcon } from '@/icons/edit.icon';

export const EditButton = ({
  title,
  onClick,
}: IBaseProps) => {
  return (
    <div onClick={onClick}
         title={title}
         className="flex justify-center items-center h-8 w-8 p-1 bg-green-400 rounded-full cursor-pointer hover:bg-green-500 transition-colors duration-100 ease-in-out">
      <EditIcon className="h-4/5 fill-white" />
    </div>
  );
};
