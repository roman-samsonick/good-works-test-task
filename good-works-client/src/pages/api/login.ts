import { getBody, handle } from '@/utils/api.utils';
import { makeApiRequest, setAccessToken, setCookie, setRefreshToken } from '@/utils/request.utils';

export default handle(async (req, res) => {
  const result = await makeApiRequest({
    method: 'POST',
    path: 'auth/sign-in',
    body: getBody(req),
  });

  setAccessToken(res, result.accessToken);
  setRefreshToken(res, result.refreshToken);

  return {};
});
