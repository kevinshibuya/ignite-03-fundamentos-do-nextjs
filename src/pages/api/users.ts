import { NextApiRequest, NextApiResponse } from 'next';

// Authenication strategies:
// JWT (saves data on storage)
// Next Auth (uses social authentication apis ie, google, github, discord)
// Cognito, Auth0 (authentication services for more advanced authentication)

const Users = (request: NextApiRequest, response: NextApiResponse) => {
 const users = [
   { id: 1, name: 'John'},
   { id: 2, name: 'Emily'},
   { id: 3, name: 'Carol'},
 ]

 return response.json(users);
}

export default Users;