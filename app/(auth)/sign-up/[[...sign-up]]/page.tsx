import {  SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        <main className='auth-page h-[100vh] flex items-center justify-center'>
            <SignUp/>
        </main>
    )
}

export default SignUpPage
