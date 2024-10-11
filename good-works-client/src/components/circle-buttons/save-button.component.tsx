import { IBaseProps } from '@/components/sidebar.component';
import { SaveIcon } from '@/icons/save.icon';

export const SaveButton = ({
  onClick,
  title,
}: IBaseProps) => {
  return (
    <div
      title={title}
      onClick={onClick}
      className="flex shrink-0 justify-center items-center h-8 w-8 p-1 rounded-full bg-green-400 cursor-pointer hover:bg-green-500 transition-colors duration-100 ease-in-out">
      <SaveIcon className="h-5 w-5 fill-white" />
    </div>
  );
};
