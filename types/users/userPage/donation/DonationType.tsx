export interface Donation{
    id: {
        $oid: string
    },
    sender: string,
    receiver: {
        id: {
            $oid: string
        },
        address: string
    },
    amount: number,
    date: string
}