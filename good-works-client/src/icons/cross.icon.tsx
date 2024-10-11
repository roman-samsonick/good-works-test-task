import { IElementProps } from '@/models/common.model';

export const CrossIcon = ({
  onClick,
  className,
}: IElementProps) => {
  return (
    <svg viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         stroke="#000000"
         onClick={onClick}
         className={className}>
      <path d="M19 5L4.99998 19M5.00001 5L19 19"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
    </svg>
  );
};
