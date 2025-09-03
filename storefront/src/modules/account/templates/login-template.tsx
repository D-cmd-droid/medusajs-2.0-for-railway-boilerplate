"use client"

import React, { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  // Default view can be controlled with state
  const [currentView, setCurrentView] = useState("sign-in")
  
  // Track if this is the initial render to trigger subtle animation
  const [initialRender, setInitialRender] = useState(true)
  
  // After initial render, set flag to false
  React.useEffect(() => {
    if (initialRender) {
      const timer = setTimeout(() => setInitialRender(false), 100)
      return () => clearTimeout(timer)
    }
  }, [])
  
  return (
    <div 
      className="w-full min-h-[85vh] flex justify-center items-center py-12"
      style={{
        background: 'var(--seasun-background-white)'
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
