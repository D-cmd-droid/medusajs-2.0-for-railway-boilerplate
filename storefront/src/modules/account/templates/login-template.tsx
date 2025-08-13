"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div 
      className="w-full flex justify-center items-center min-h-[80vh] px-8 py-8"
      style={{
        background: 'linear-gradient(135deg, var(--seasun-lighter-sand) 0%, var(--seasun-background-white) 50%, var(--seasun-lighter-sand) 100%)'
      }}
    >
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  )
}

export default LoginTemplate
