import { Quote } from '../components/Quote'
import { SignupAuth } from '../components/SignupAuth'

export const Signup = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="">
                <SignupAuth/>
            </div>
            <div className="invisible lg:visible">
                <Quote/>
            </div>
            </div>
        </>
    )
}