import React from 'react'
import { MaxWidthWrapper } from './max-width-wrapper'
import { Heading } from './Heading'

type Props = {}

const Profile = (props: Props) => {
  return (
    <MaxWidthWrapper>
        <Heading>
            Great! Let's build your profile to start.
        </Heading>
        <ProfileForm>
            
        </ProfileForm>
    </MaxWidthWrapper>
  )
}

export default Profile