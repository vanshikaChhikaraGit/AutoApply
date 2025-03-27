import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode } from "react"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
   children?:ReactNode
}

export const Heading = ({ className,children,...props }:HeadingProps)=>{
    return <h1 className={cn("text-pretty font-semibold tracking-tight text-4xl sm:text-5xl font-heading text-zinc-800",className)} {...props}>
        {children}
    </h1>
}