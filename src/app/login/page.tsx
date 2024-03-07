import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Login = () => {
   

    return (  
    <main>
    <h1> Login Page </h1>

        <LoginLink postLoginRedirectURL="/">Sign in</LoginLink>
        <RegisterLink postLoginRedirectURL="/welcome">Sign up</RegisterLink>
    </main>
    );
}

export default Login;