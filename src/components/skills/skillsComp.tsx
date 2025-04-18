import React from 'react'
import { MaxWidthWrapper } from '../max-width-wrapper'
import { Heading } from '../Heading'
import SkillsForm from '@/forms/skills/skillsForm'

type Props = {}

const SkillsComponent = (props: Props) => {
  return (
  <MaxWidthWrapper classname={""}>
    <Heading className='text-center m-5'>Don't forget to show off your skills too😎</Heading>
    <SkillsForm></SkillsForm>
  </MaxWidthWrapper>
  )
}

export default SkillsComponent