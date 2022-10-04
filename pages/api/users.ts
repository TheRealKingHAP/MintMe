import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorInfo } from 'react';
import { UserType } from '../../types/users/UserType';

type Error = {
  error: string | unknown  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType[] | Error>
) {
  switch(req.method) {
    case 'GET':
        try{
            let users: UserType[] = [];
            await fetch('http://localhost:3004/users')
            .then(response => response.json())
            .then((data: UserType[]) => users = data)
            .catch(err => res.status(400).send(err))
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json({error})
        }

        break;
    case 'POST':
        try{
            res.status(200).json([])
        } catch (error){
            res.status(400).json({error})
        }
        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
