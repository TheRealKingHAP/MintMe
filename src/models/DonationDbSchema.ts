import { ObjectId } from "mongodb"

export type DonationDbSchema = {
    _id: ObjectId | string,
    receiver: ObjectId | string,
    signature: string
}