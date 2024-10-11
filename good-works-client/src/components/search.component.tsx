import { LoaderIcon } from '@/icons/loader.icon';
import { IValueCallback } from '@/models/common.model';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { IUser } from '@/models/IUser.model';
import { makeClientRequest } from '@/utils/request.utils';

export const useSearchState = () => {
  const [rawTerm, setRawTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [term] = useDebounce(rawTerm, 1000);
  const [searchResults, setSearchResults] = useState<IUser[]>([]);

  useEffect(() => {
    const search = async () => {
      if (!term) {
        return;
      }

      setLoading(true);

      try {
        setSearchResults(
          await makeClientRequest({
            method: 'POST',
            path: 'user/search',
            body: { term },
          }),
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [term]);

  return {
    loading,
    rawTerm,
    setRawTerm,
    searchResults,
  };
};

const Loader = () => {
  return <div role="status">
    <LoaderIcon className="w-5 animate-spin text-blue-400 fill-blue-800" />
    <span className="sr-only">Loading...</span>
  </div>;
};
export const Search = ({
  setTerm,
  term,
  loading,
}: {
  loading: boolean
  term: string,
  setTerm: IValueCallback<string>
}) => {
  return <div className="flex items-center p-1 h-10 relative">
    <input className="appearance-none flex items-center p-3 h-full w-full rounded-2xl outline-none border-blue-400 focus:border"
           placeholder="Search..."
           value={term}
           onChange={e => {
             if (!loading) {
               setTerm(e.target.value);
             }
           }} />
    {loading && <div className="absolute top-2.5 right-2.5 text-xs">
      <Loader />
    </div>}
  </div>;
};
