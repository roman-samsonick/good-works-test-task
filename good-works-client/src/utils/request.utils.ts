import { EAppError } from '@/utils/api.utils';
import { NextApiResponse } from 'next';

export async function makeClientRequest<T>({
  body,
  path,
  method = 'GET',
}: {
  path: string,
  body?: T,
  method?: string,
}) {
  return await makeRequest({
    body,
    path: `http://localhost:3000/api/${path}`,
    method,
  });
}

const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'http://api:4000';

export async function makeApiRequest<T>({
  body,
  path,
  method = 'GET',
  accessToken,
  setAccessToken,
  refreshToken,
}: {
  path: string,
  body?: T,
  method?: string,
  accessToken?: string,
  refreshToken?: string,
  setAccessToken?: (accessToken: string) => void,
}) {
  try {
    return await makeRequest({
      body,
      path: `${apiBaseUrl}/${path}`,
      method,
      accessToken,
    });
  } catch (e: any) {
    if (e.type === EAppError.INVALID_TOKEN && setAccessToken && refreshToken) {
      const { accessToken: newAccessToken } = await makeRequest({
        body: {
          refreshToken,
        },
        path: `${apiBaseUrl}/auth/refresh`,
        method: 'POST',
      });

      setAccessToken(newAccessToken);

      return await makeRequest({
        body,
        path: `${apiBaseUrl}/${path}`,
        method,
        accessToken: newAccessToken,
      });
    } else {
      throw e;
    }
  }
}


export async function makeRequest<T>({
  body,
  path,
  method = 'GET',
  accessToken,
}: {
  path: string,
  body?: T,
  method?: string,
  accessToken?: string,
}) {
  const resp = await fetch(path, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      'Content-Type': 'application/json',
    },
  });

  const data = await resp.json();

  if (data.error) {
    throw data;
  }

  return data;
}

export const getAccessToken = (req: { cookies: any }) => {
  return req.cookies.accessToken;
};

export const getRefreshToken = (req: { cookies: any }) => {
  return req.cookies.refreshToken;
};

interface IWithAppendHeader {
  appendHeader: (name: string, value: string) => void;
}

export const setCookie = (res: IWithAppendHeader, name: string, value: string) => {
  res.appendHeader(
    'Set-Cookie',
    `${name}=${value}; SameSite=Strict; Path=/; HttpOnly`,
  );
};

export const setAccessToken = (res: IWithAppendHeader, token: string) => {
  setCookie(res, 'accessToken', token);
};

export const setRefreshToken = (res: IWithAppendHeader, token: string) => {
  setCookie(res, 'refreshToken', token);
};
