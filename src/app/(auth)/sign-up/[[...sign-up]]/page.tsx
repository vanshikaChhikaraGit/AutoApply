import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className="w-full flex-1 flex items-center justify-center my-auto">
  <SignUp fallbackRedirectUrl={"/onboarding"}
   />
</div>
}