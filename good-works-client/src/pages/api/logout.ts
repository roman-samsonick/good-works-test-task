import { handle } from '@/utils/api.utils';
import { setAccessToken, setRefreshToken } from '@/utils/request.utils';

export default handle(async (req, res) => {
  setAccessToken(res, '-');
  setRefreshToken(res, '-');
});
