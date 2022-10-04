import type { NextApiRequest, NextApiResponse } from 'next'
import { Donation } from '../../types/users/userPage/donation/DonationType';

type Error = {
  error: string | unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Donation[] | Error>
) {
  switch(req.method) {
    case 'GET':
        try {
            let donations: Donation[] = [];
            await fetch('http://localhost:3004/donations')
            .then(response => response.json())
            .then((data: Donation[]) => donations = data)
            .catch(err => console.log(err.message))
            res.status(200).json(donations)
        } catch (error) {
            res.status(400).json({error})
        }
        break;
    case 'POST':
        try {
            res.status(200).json([])
        } catch (error) {
            res.status(400).json({error})
        }
        break;
    default:
        res.json({error: 'Sorry we cannot connect'})
  }
}