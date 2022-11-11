import { PublicKey } from '@solana/web3.js';
import {ObjectId} from 'mongodb';
import { Country } from '../../types/forms/CountryType';
import { Platform } from '../../types/forms/PlatformType';
import { SocialMedia } from './SocialMedia';

export interface User {
    _id?: ObjectId,
    profile_pic: string,
    username: string,
    email: string,
    country: Country,
    public:{
        banner_img: string,
        main_platform: Platform,
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