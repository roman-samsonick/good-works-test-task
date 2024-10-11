import { getBody, handle } from '@/utils/api.utils';
import { getAccessToken, getRefreshToken, makeApiRequest, setAccessToken } from '@/utils/request.utils';


export default handle(async (req, res) => {
  return await makeApiRequest({
    method: 'GET',
    path: `action/friend/${req.body.friendId}`,
    accessToken: getAccessToken(req),
    refreshToken: getRefreshToken(req),
    setAccessToken: accessToken => {
      setAccessToken(res, accessToken);
    },
  });
});
