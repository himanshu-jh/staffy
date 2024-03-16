import React from 'react';
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

const Login = () => {
    return (  
        <main className="flex justify-center items-center h-screen">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 text-center">
                        <img src="/zamy_logo.png" alt="Logo" className="mb-4 mx-auto" style={{ maxWidth: '200px' }} />
                        <h1 className="text-3xl font-bold mb-6">Welcome</h1>
                        <p className="text-lg font-semibold mb-6">Please sign in or register to continue</p>
                        <div className="mb-4">
                            <LoginLink postLoginRedirectURL="/">
                                <Button className="mb-3" style={{ maxWidth: '300px', width: '100%', display: 'block', margin: '0 auto 10px' }}>Sign In</Button>
                            </LoginLink>
                            <RegisterLink postLoginRedirectURL="/welcome">
                                <Button style={{ maxWidth: '300px', width: '100%', display: 'block', margin: '0 auto' }}>Register</Button>
                            </RegisterLink>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;
