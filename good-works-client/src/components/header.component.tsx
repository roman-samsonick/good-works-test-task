import { AccountIcon } from '@/icons/account.icon';
import { userSlice } from '@/store/slices/user.slice';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/router';


export const Header = () => {
  const router = useRouter();
  const user = useAppSelector(userSlice.selectors.user);
  if (!user) {
    return <></>;
  }

  return (
    <div className="relative flex justify-center items-center h-10 bg-blue-100">
      <div className="text-2xl font-bold cursor-pointer text-gray-700"
           onClick={() => router.push('/')}>
        GoodWorks
      </div>
      <div className="w-5 absolute right-5 p-1.5 bg-blue-300 rounded-full border-solid border-blue-400 border box-content cursor-pointer hover:bg-blue-400 hover:shadow-blue-500 shadow duration-200 ease-in-out transition-colors"
           onClick={() => router.push('/account')}>
        <AccountIcon />
      </div>
    </div>
  );
};
