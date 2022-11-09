import { PublicKey } from '@solana/web3.js';
import {ObjectId} from 'mongodb';
import { SocialMedia } from './SocialMedia';

export interface User {
    _id?: ObjectId,
    profile_pic: string,
    username: string,
    email: string,
    country: string,
    public:{
        banner_img: string,
        main_platform: string,
        social_media: SocialMedia
        feed:{ 
            bio:{
                title: string, 
                description: string, 
                thumbnail: string,
                introduction: string,
            }
        }
        public_wallet: string | PublicKey
    }
}