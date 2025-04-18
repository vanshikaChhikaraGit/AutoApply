//phone number
// country
//state
//address
//dob
import React from 'react'
import { MaxWidthWrapper } from '../max-width-wrapper'
import { Heading } from '../Heading'
import PersonalInfoForm from '@/forms/personal/personalInfoForm'

type Props = {}

const PersonalInfoComponent = (props: Props) => {
  return (
    <MaxWidthWrapper classname={""}>
        <Heading className='text-center'>Almost there! A few last questions</Heading>
        <PersonalInfoForm></PersonalInfoForm>
    </MaxWidthWrapper>
  )
}

export default PersonalInfoComponent