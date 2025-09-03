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
        fontSize: 'clamp(1.25rem, 1.5vw + 0.25rem, 2rem)',
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
      <div className="text-center mt-8">
        <div className="relative overflow-hidden group" style={{
          background: 'var(--seasun-white)',
          borderRadius: '8px',
          transform: 'translateY(0)',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.04)', // Neo drop shadow - subtle with two layers
          border: '1px solid rgba(0, 0, 0, 0.06)', // Very subtle border
        }}>
          <div className="py-6 px-8 relative z-10">
            <span className="block mb-3" style={{ 
              color: 'var(--seasun-deep-black)', 
              fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1rem)',
              fontWeight: '500'
            }}>
              New to SEASUN?
            </span>
            <span style={{ 
              color: 'var(--seasun-deep-black)', 
              opacity: 0.8,
              fontSize: 'clamp(0.75rem, 0.25vw + 0.7rem, 0.875rem)',
              display: 'block',
              marginBottom: '1.5rem'
            }}>
              Create an account for exclusive benefits and a personalized shopping experience.
            </span>
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="inline-block px-5 py-2 rounded-md transition-all duration-200 font-medium"
              style={{
                backgroundColor: 'var(--seasun-golden-tan)',
                color: 'var(--seasun-white)',
              }}
              data-testid="register-button"
            >
              Join now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
