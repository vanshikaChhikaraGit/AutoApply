import { cn } from "@/utils"
import { ReactNode } from "react"

interface MaxWidthWrapperProps{
    classname:String,
    children: ReactNode
}
export const MaxWidthWrapper = ({classname,children}:MaxWidthWrapperProps)=>{
return <div className= {cn("mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20",classname)}>
    {children}
</div>
}