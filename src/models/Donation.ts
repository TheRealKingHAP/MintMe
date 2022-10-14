import {ObjectId} from 'mongodb'

export interface Donation{
    _id?: ObjectId,
    id?: ObjectId,
    sender: string,
    receiver: {
        id: {
            $oid: string
        },
        address: string
    },
    amount: number,
    date: string,
    message: string,
}