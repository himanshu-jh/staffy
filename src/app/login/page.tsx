import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


const Login = () => {
   
    console.log(process.env.ENV_CHECK)
   
    return (  
    <main>
        {process.env.ENV_CHECK}
        {process.env.KINDE_CLIENT_SECRET}
        {process.env.KINDE_CLIENT_ID}
    <h1> Login Page </h1>

        <LoginLink postLoginRedirectURL="/">Sign in</LoginLink>
        <RegisterLink postLoginRedirectURL="/welcome">Sign up</RegisterLink>
    </main>
   
    );
}

export default Login;

