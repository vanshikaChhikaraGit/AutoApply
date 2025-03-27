import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnchorHTMLAttributes, HTMLAttributes } from "react";

interface ShinyButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement>{}

const ShinyButton = ({href,children,...props}:ShinyButtonProps)=>{
    return <Link 
    href={href??"#"}
     className="group relative flex h-14 mt-6 py-4 shadow-lg hover:shadow-xl transform items-center justify-center overflow-hidden whitespace-nowrap rounded-md border border-white bg-brand-500 px-8 text-base/7 font-medium text-white transition-all duration-300 hover:ring-2 hover:ring-brand-700 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
     {...props}>
        <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]"></ArrowRight>
        </span>
        <div className="ease-[cubic-bezier(0.19,1,0.22,1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]"/>
    </Link>

}

export default ShinyButton;