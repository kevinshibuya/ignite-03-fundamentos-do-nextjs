import { NextApiRequest, NextApiResponse } from 'next';

// on http://localhost:3000/api/users/login/token/1
// request.params returns { params: [ 'login', 'token', '1' ] }

const Users = (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query);

  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Emily' },
    { id: 3, name: 'Carol' },
  ]

  return response.json(users);
}

export default Users;