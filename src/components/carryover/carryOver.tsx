import React from 'react'
import { MaxWidthWrapper } from '../max-width-wrapper'
import CarryOverForm from '@/forms/carryover/carryover'
import { Heading } from '../Heading'

type Props = {}

const CarryOver = (props: Props) => {
  return (
    <MaxWidthWrapper classname={"m-4"}>
     <Heading className='text-center'> Mind telling us about your backlog?</Heading>
     <p className='text-center text-gray-600 font-semibold text-lg'>(if any😉)</p>
      <CarryOverForm></CarryOverForm>
    </MaxWidthWrapper>
  )
}

export default CarryOver