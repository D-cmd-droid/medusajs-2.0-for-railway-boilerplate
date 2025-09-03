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
          className="group relative seasun-body text-white w-full overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-4 focus:ring-offset-transparent rounded-xl font-medium mt-[clamp(2.5rem,8vh,4rem)] bg-[var(--seasun-deep-black)]"
        >
          <span className="relative z-10 seasun-body tracking-wide">Sign in</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </SubmitButton>
      </form>
      <div className="text-center mt-8">
        <div className="relative overflow-hidden group" style={{
          background: 'var(--seasun-background-white)',
          borderRadius: '16px',
          padding: '2px', // Creates space for the inner div
          boxShadow: '8px 8px 16px rgba(200, 200, 200, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.8)', // Neomorphic outer shadow
          transition: 'all 0.3s ease',
        }}>
          {/* Inner neomorphic container */}
          <div className="relative w-full h-full rounded-[14px] overflow-hidden" style={{
            background: 'var(--seasun-background-white)',
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
              className="group relative seasun-body px-5 py-2 text-base font-medium overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-4 focus:ring-offset-transparent rounded-xl"
              style={{ 
                backgroundColor: 'var(--seasun-golden-tan)',
                color: 'var(--seasun-white)',
                boxShadow: '0 4px 16px rgba(247, 138, 21, 0.2), 0 2px 6px rgba(247, 138, 21, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 138, 21, 0.3), 0 3px 8px rgba(247, 138, 21, 0.2)';
                e.currentTarget.style.backgroundColor = '#fa9322';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(247, 138, 21, 0.2), 0 2px 6px rgba(247, 138, 21, 0.1)';
                e.currentTarget.style.backgroundColor = 'var(--seasun-golden-tan)';
              }}
              data-testid="register-button"
            >
              <span className="relative z-10">Join now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
