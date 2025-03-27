import React from 'react'
import { FlipText } from '@/components/magicui/flip-text'
import { MaxWidthWrapper } from '@/components/max-width-wrapper'
import { Heading } from '@/components/Heading'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { TextAnimate } from '@/components/magicui/text-animate'
import { ShineBorder } from '@/components/magicui/shine-border'
import Image from 'next/image'
import ShinyButton from '@/components/Shiny-button'
import Navbar from '@/components/Navbar'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <MaxWidthWrapper classname={"mt-4"}>
        <Navbar></Navbar>
      <section>
        <div className='flex items-center justify-center mt-[80px] flex-col gap-2'>
          
        <span className="rounded-full border bg-gray-200/50 px-4 py-2">
       
              <AnimatedGradientText speed={2}
      colorFrom="#4ade80"
      colorTo="#06b6d4"
      className="text-sm font-semibold tracking-tight ">
       
                {" "}
                
                One profile, endless applications.{" "}
              </AnimatedGradientText>{" "}
            </span>
            <div className="text-4xl md:text-6xl lg:text-8xl font-bold m-5 items-center tracking-tighter text-pretty "
          >
            <FlipText
              duration={1.0}
                >
              Auto Apply
            </FlipText>
            </div>
            <TextAnimate animation="blurIn" duration={1.0} as="h1" className="text-center text-sm md:text-base lg:text-md mt-4 text-gray-900/50 text-pretty max-w-[500px]">
            Say goodbye to repetitive forms. Store your data securely, and apply faster with our smart Chrome extension.
             </TextAnimate>
             <ShinyButton href='/sign-up'>Get Started</ShinyButton>
             <Image src={"/Demo.png"} alt='demo image' className='border border-none rounded-md mt-1' width={900} height={150}></Image>
        </div>
      </section>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page;