import { Platform } from "../types/forms/PlatformType";

export default class Platforms {
    platforms: Platform[];

    constructor(){
        this.platforms = [
            {
                name: 'Twitch', 
                base_url: 'https://www.twitch.tv', 
                logo: 'https://raw.githubusercontent.com/gauravghongde/social-icons/9d939e1c5b7ea4a24ac39c3e4631970c0aa1b920/SVG/Color/Twitch.svg'
            },
            {
                name: 'Facebook',
                base_url: 'https://www.facebook.com',
                logo: 'https://raw.githubusercontent.com/gauravghongde/social-icons/9d939e1c5b7ea4a24ac39c3e4631970c0aa1b920/SVG/Color/Facebook.svg'
            },
            {
                name: 'Twitter',
                base_url: 'https://www.twitter.com',
                logo: 'https://raw.githubusercontent.com/gauravghongde/social-icons/9d939e1c5b7ea4a24ac39c3e4631970c0aa1b920/SVG/Color/Twitter.svg'
            },
            {
                name: 'Youtube',
                base_url: 'https://youtube.com',
                logo: 'https://raw.githubusercontent.com/gauravghongde/social-icons/9d939e1c5b7ea4a24ac39c3e4631970c0aa1b920/SVG/Color/Youtube.svg'
            },
            {
                name: 'Instagram',
                base_url: 'https://instagram.com',
                logo: 'https://raw.githubusercontent.com/gauravghongde/social-icons/master/SVG/Color/Instagram.svg'
            }

        ]
    }
}