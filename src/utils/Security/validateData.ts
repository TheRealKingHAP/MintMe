import validator from 'validator';
import { SocialMedia } from '../../models/SocialMedia';
import { User } from '../../models/User';

export type Validator = {
    error: boolean,
    message: string,

}
function validateUserData(data: User): Validator{
    let filters: string[] = ['email', 'username', 'country', 'image', 'social_media'];
    let result: Validator = {message: '', error: false};    
    filters.map((type, idx) => {
        switch(type){
            case 'email': {
                if(!validator.isEmail(data.email)){
                    console.log('email',validator.isEmail(data.email))
                    result = {error: true, message: 'Invalid email'};
                    return result;  
                }
            }
            case 'username': {
                if(!validator.isAlphanumeric(data.username, 'es-ES', {ignore: '\s'}) || validator.isEmpty(data.username)){
                    result = {error: true, message: 'Invalid username'};
                    return result;
                }
            }
            case 'country': {
                if(!validator.isAlpha(data.country.name, 'es-ES', {ignore: '\s'}) || validator.isEmpty(data.country.name)){
                    result = {error: true, message: 'Invalid country'};
                    return result;
                }
            }
            case 'image': {
                if(!validator.contains(data.profile_pic, 'image/png') && !validator.contains(data.profile_pic, 'image/jpeg') && !validator.contains(data.profile_pic, 'image/jpg') || validator.isEmpty(data.profile_pic)){
                    result = {error: true, message:'Invalid profile picture'}
                    break;
                }
                if(!validator.contains(data.public.banner_img, 'image/jpeg') && !validator.contains(data.public.banner_img, 'image/png') && !validator.contains(data.public.banner_img, 'image/jpg') || validator.isEmpty(data.public.banner_img)){
                    result = {error: true, message: 'Invalid banner image'};
                    break;
                }
            }
            case 'social_media':{
                if(validator.isEmpty(data.public.main_platform.name)){
                    result = {error: true, message: 'Please select the main platform you use to create content'}
                }
                for(const key in data.public.social_media){
                    if(!validator.isURL(data.public.social_media[key as keyof SocialMedia]) && !validator.isEmpty(data.public.social_media[key as keyof SocialMedia])){
                        result = {error: true, message: 'Please enter a correct social media link'}
                        break;
                    }
                }
                break;
            }
            default:
                return result            
        }
    })
    
    return result
}

export default validateUserData