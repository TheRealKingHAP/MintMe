export interface UserType {
    id: {$oid: string},
    profile_pic: string,
    first_name: string,
    last_name: string,
    email: string,
    country: string,
    public:{
        banner_img: string,
        main_platform: string,
        social_media:{
            twitch: string,
            instagram: string,
            tiktok: string,
            facebook: string
        },
        feed:{ 
            bio:{
                title: string, 
                description: string, 
                thumbnail: string,
                introduction: string,
            }
        }
        public_wallet: string
    }
}