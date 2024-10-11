import { IElementProps } from '@/models/common.model';

export const AccountIcon = ({
  className,
  onClick,
}: IElementProps) => {
  return (
    <svg viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         stroke="#020202"
         className={className}
         onClick={onClick}>

      <circle cx="12"
              cy="7.25"
              r="5.73"></circle>
      <path className="cls-1"
            d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"></path>
    </svg>
  );
};
