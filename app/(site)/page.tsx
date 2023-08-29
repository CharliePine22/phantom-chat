"use client"
import {useState} from 'react'
import Image from "next/image";
import AuthForm from "./components/AuthForm";
import {BsSun, BsMoon} from 'react-icons/bs'
// import {changeTheme} from "./components/ThemeChange";

let currentTheme = 'day';
const useChangeTheme = () => {
  const [theme, setTheme] = useState(currentTheme);
  const toggleTheme = (): void => {
    if(theme == 'day') setTheme('night');
    else setTheme('day');
  }
  return {theme, toggleTheme};
}

const Auth = () => {
  const {theme, toggleTheme} = useChangeTheme();
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
      style={{backgroundImage: theme == 'night' ? 'url(/images/phantom-chat-bg.jpeg)' : 'url(/images/p5-light-bg.webp)', backgroundSize: '100% 100%' }}
    >
     {theme == 'day' ? <BsMoon className='absolute top-5 right-5 text-3xl text-slate-50 cursor-pointer' onClick={() => toggleTheme()} />
      : <BsSun className='absolute top-5 right-5 text-3xl text-slate-50 cursor-pointer' onClick={() => toggleTheme()} />}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <Image
          height="0"
          width="200"
          className="mx-auto"
          src="/images/logo.png"
          alt="Logo" 
          style={{
            filter: 'drop-shadow(2px 4px 6px red)',
            userSelect: 'none',
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
