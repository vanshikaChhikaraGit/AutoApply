import React from 'react'
import { MaxWidthWrapper } from '../max-width-wrapper'
import { Heading } from '../Heading'
import ProfileForm from '@/forms/profileForm/profile-form'

type Props = {}

const Profile = (props: Props) => {
  return (
    <MaxWidthWrapper classname={""}>
        <Heading className='text-center mb-4 tracking-tighter text-pretty'>
            Great! Let's build your profile to start.
        </Heading>
        <ProfileForm></ProfileForm>
    </MaxWidthWrapper>
  )
}

export default Profile