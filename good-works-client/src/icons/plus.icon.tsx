import { IElementProps } from '@/models/common.model';

export const PlusIcon = ({
  onClick,
  className,
}: IElementProps) => {
  return (
    <svg viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         stroke="#000000"
         className={className}
         onClick={onClick}
    >
      <path id="Vector"
            d="M6 12H12M12 12H18M12 12V18M12 12V6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
    </svg>
  );
};
