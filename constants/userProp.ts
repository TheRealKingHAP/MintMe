import { User } from "../src/models/User";

export const UserProp: User= {
    username: '',
    country: {code: '', name: ''},
    email: '',
    profile_pic:'',
    public:{
        banner_img: '',
        main_platform:{base_url: '', logo: '', name: ''},
        public_wallet:'',
        feed:{
            bio:{
                title:'',
                thumbnail:'',
                description:'',
                introduction:'',
            }
        },
        social_media:{
            facebook:'',
            instagram:'',
            tiktok:'',
            twitch:'',
            twitter: '',
            youtube: ''
        }
    }
}