import { IValueCallback } from '@/models/common.model';

interface IFieldWithLabelProps {
  label: string,
  value: string;
  setValue: IValueCallback<string>
  placeholder: string
}

export const LabelInput = ({
  label,
  value,
  setValue,
  placeholder,
}: IFieldWithLabelProps) => {
  return (
    <div className="flex flex-col grow">
      <div className="text-sm">{label}</div>
      <input value={value}
             placeholder={placeholder}
             className="flex items-center text-base h-5 bg-blue-100 py-4 px-2 rounded-lg ring-0 ring-offset-0 outline-none border-none"
             onChange={e => setValue(e.target.value)} />
    </div>
  );
};
