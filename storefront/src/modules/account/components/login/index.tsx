import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)

  return (
    <div
      className="flex flex-col items-center max-w-md w-full mx-auto"
      data-testid="login-page"
    >
      <h1 className="font-light uppercase leading-tight" style={{ 
        fontFamily: 'var(--seasun-font-heading)', 
        color: 'var(--seasun-deep-black)', 
        fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2.5rem)',
        marginBottom: 'clamp(0.75rem, 3vh, 1.5rem)'
      }}>
        Welcome Back
      </h1>
      <p className="text-center leading-relaxed font-light" style={{ 
        fontFamily: 'var(--seasun-font-body)', 
        color: 'var(--seasun-deep-black)', 
        fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
        lineHeight: '1.6',
        marginBottom: 'clamp(1.5rem, 4vh, 2rem)',
        opacity: 0.85
      }}>
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" style={{ maxWidth: 'min(100%, 400px)' }} action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
            className="rounded-xl border-gray-200 focus:border-black focus:ring-0"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
            className="rounded-xl border-gray-200 focus:border-black focus:ring-0"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <div style={{ height: 'clamp(1rem, 3vh, 1.5rem)' }}></div>
        <SubmitButton 
          data-testid="sign-in-button" 
          className="group relative seasun-body text-white w-full overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-4 focus:ring-offset-transparent rounded-xl font-medium"
          style={{ 
            backgroundColor: 'var(--seasun-deep-black)',
            boxShadow: '0 6px 24px rgba(26, 26, 26, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            marginTop: 'clamp(2.5rem, 8vh, 4rem)',
            padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
            fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)'
          }}
        >
          <span className="relative z-10 seasun-body tracking-wide">Sign in</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </SubmitButton>
      </form>
      <span className="text-center mt-6" style={{ 
        color: 'var(--seasun-deep-black)', 
        fontSize: 'clamp(0.75rem, 0.25vw + 0.7rem, 0.875rem)',
        opacity: 0.7
      }}>
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline font-medium hover:opacity-80 transition-opacity duration-200"
          style={{ color: 'var(--seasun-golden-tan)' }}
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
