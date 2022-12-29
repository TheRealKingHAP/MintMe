import React, { useState} from 'react'
import { User } from '../../src/models/User'
import SignupImageInput from '../sign-up/form/SignupImageInput';
import SignupInput from '../sign-up/form/SignupInput'
import SignupTextAreaInput from '../sign-up/form/SignupTextAreaInput';

type PersonalInfo = {
    user: User,
    callback: CallableFunction
};
function PersonalInfo({user, callback}: PersonalInfo) {
    const [updatedInfo, setUpdatedInfo] = useState<User>(user)
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleUpdateChanges = () => {
        callback(updatedInfo);
    }
    const handleEdit = () => {
        if(isEditing){
            return
        }
        setIsEditing(true);
    }

    return (
        <div id='Personal Info' className='p-5 flex flex-col  w-3/4 items-center '>
            <h3 className='text-xl landscape:2xl:text-2xl font-semibold'>Edit profile</h3>
            <div id='Inputs' className='mt-12 space-y-10 w-full landscape:2xl:w-96'>
                <div id='ProfilePic' className='space-y-5'>
                    <p className='text-violet-400 '>Profile picture</p>
                    <SignupImageInput imgStyle='rounded-xl' image={updatedInfo.profile_pic} handleChange={(value:string) => {setUpdatedInfo(prev => ({...prev, profile_pic:value})), handleEdit()}} className={'w-32 h-32'} />
                </div>
                <SignupInput inputValue={updatedInfo.username} title='Username' inputType='text'  handleChange={(value: string) =>{ setUpdatedInfo({...updatedInfo, username: value}), handleEdit()}} className=''/>
                <SignupInput inputType='text' title='E-mail' inputValue={updatedInfo.email} handleChange={(value: string) =>{ setUpdatedInfo({...updatedInfo, email: value}), handleEdit()}}/>
                <SignupInput inputType='text' title='Greeting' inputValue={updatedInfo.public.feed.bio.introduction} handleChange={(value: string) => {setUpdatedInfo({...updatedInfo, public: {...updatedInfo.public, feed:{bio: {...updatedInfo.public.feed.bio, introduction: value} }}}), handleEdit()}} />
                <div>
                    <p className='text-violet-400 '>About</p>
                    <SignupTextAreaInput inputValue={updatedInfo.public.feed.bio.description} title='About' handleChange={(value: string) =>{ setUpdatedInfo({...updatedInfo, public:{...updatedInfo.public, feed:{bio: {...updatedInfo.public.feed.bio, description: value}}}}), handleEdit()}}/>
                </div>
                <div id='Banner' className='space-y-5'>
                    <p className='text-violet-400 '>Banner</p>
                    <SignupImageInput imgStyle='rounded-xl' image={updatedInfo.public.banner_img} handleChange={(value: string) =>{ setUpdatedInfo(prev => ({...prev, public:{...prev.public, banner_img: value}})), handleEdit()}} className='h-36 w-full'/>
                </div>
            </div>
            <button onClick={handleUpdateChanges} disabled={isEditing ? false : true} className={`bg-violet-500 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl cursor-pointer w-44 p-2 text-white font-medium`}>Save changes</button>
        </div>
    )
}

export default PersonalInfo