import { getBody, handle } from '@/utils/api.utils';
import { makeApiRequest } from '@/utils/request.utils';


export default handle(async (req, res) => {
  return await makeApiRequest({
    method: 'POST',
    path: 'user/create',
    body: getBody(req),
  });
});
