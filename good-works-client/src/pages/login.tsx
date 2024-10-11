import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { EAppError } from '@/utils/api.utils';
import { makeClientRequest } from '@/utils/request.utils';
import { ErrorPanel } from '@/components/errorPanel.component';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<EAppError | undefined>();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setError(undefined);

    try {
      await makeClientRequest({
        path: '/login',
        method: 'POST',
        body: {
          username: formData.get('username'),
          password: formData.get('password'),
        },
      });

      await router.push('/');
    } catch (e: any) {
      setError(e.type);
    }
  }

  return <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account to continue make good works
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6"
            onSubmit={onSubmit}>
        <div>
          <label htmlFor="username"
                 className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input id="username"
                   name="username"
                   type="text"
                   autoComplete="username"
                   required
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password"
                   className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input id="password"
                   name="password"
                   type="password"
                   autoComplete="current-password"
                   required
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <Link href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Register now
        </Link>
      </p>

      {error === EAppError.INVALID_CREDENTIALS &&
        <ErrorPanel message="Invalid username or password"
                    title="Sign in failed" />
      }
    </div>
  </div>;
}
