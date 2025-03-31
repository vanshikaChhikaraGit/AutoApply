import React from 'react'
import { MaxWidthWrapper } from '../max-width-wrapper'
import { Heading } from '../Heading'
import WorkAuthForm from '@/forms/workauth/workAuthForm'

type Props = {}

const WorkAuthComponent = (props: Props) => {
  return (
    <MaxWidthWrapper classname={""}>
        <Heading className='text-center'>Next, some work authorization information</Heading>
        <WorkAuthForm></WorkAuthForm>
    </MaxWidthWrapper>
  )
}

export default WorkAuthComponent