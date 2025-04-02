import React from 'react'
import { MaxWidthWrapper } from '../max-width-wrapper'
import { Heading } from '../Heading'
import EeoFormComp from '@/forms/eeo/eeoForm'

type Props = {}

const EEOcomponent = (props: Props) => {
  return (
    <div>
<MaxWidthWrapper classname={""}>
        <Heading className='text-center m-4'>
        Next, add your equal employment information.
        </Heading>
        <EeoFormComp></EeoFormComp>
    </MaxWidthWrapper>
    </div>
    
  )
}

export default EEOcomponent