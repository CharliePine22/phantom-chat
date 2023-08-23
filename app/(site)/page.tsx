import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div 
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
      "
      style={{background: 'url(/images/phantom-chat-bg.jpeg)', backgroundSize: '100% 100%'}}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="0"
          width="225"
          className="mx-auto"
          src="/images/logo.png"
          alt="Logo" 
          style={{
            filter: 'drop-shadow(2px 4px 6px red)'
          }}
        />
        <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-white-900
            persona-glyphs
          "
          style={{
            color: 'white',
            textTransform: 'uppercase',
            textShadow: '0 2px 4px black',
            fontSize: '2.175rem'
          }}
          >
            Sign in to your account
        </h2>
      </div>
      <AuthForm />      
  </div>
  )
}

export default Auth;
