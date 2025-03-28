import React from 'react'
import { MaxWidthWrapper } from '../max-width-wrapper'
import { Heading } from '../Heading'
import EducationForm from '@/forms/educationForm/education-form'

type Props = {}

function Education({}: Props) {
  return (
    <MaxWidthWrapper classname={""}>
        <Heading>Add your education</Heading>
        <EducationForm></EducationForm>
    </MaxWidthWrapper>
  )
}

export default Education