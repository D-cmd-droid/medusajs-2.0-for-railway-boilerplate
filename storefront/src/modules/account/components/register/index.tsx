"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signup, null)

  return (
    <div
      className="flex flex-col items-center max-w-md w-full mx-auto"
      data-testid="register-page"
    >
      <h1 className="font-light uppercase leading-tight" style={{ 
        fontFamily: 'var(--seasun-font-heading)', 
        color: 'var(--seasun-deep-black)', 
        fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2.5rem)',
        marginBottom: 'clamp(0.75rem, 3vh, 1.5rem)'
      }}>
        Become a SEASUN Member
      </h1>
      <p className="text-center leading-relaxed font-light" style={{ 
        fontFamily: 'var(--seasun-font-body)', 
        color: 'var(--seasun-deep-black)', 
        fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
        lineHeight: '1.6',
        marginBottom: 'clamp(1.5rem, 4vh, 2rem)',
        opacity: 0.85
      }}>
        Create your SEASUN Member profile, and get access to an enhanced
        shopping experience.
      </p>
      <form className="w-full flex flex-col" style={{ maxWidth: 'min(100%, 400px)' }} action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
            className="rounded-xl border-gray-200 focus:border-black focus:ring-0"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
            className="rounded-xl border-gray-200 focus:border-black focus:ring-0"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
            className="rounded-xl border-gray-200 focus:border-black focus:ring-0"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
            className="rounded-xl border-gray-200 focus:border-black focus:ring-0"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
            className="rounded-xl border-gray-200 focus:border-black focus:ring-0"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center mt-6" style={{ 
          color: 'var(--seasun-deep-black)', 
          fontSize: 'clamp(0.75rem, 0.25vw + 0.7rem, 0.875rem)',
          opacity: 0.7
        }}>
          By creating an account, you agree to SEASUN&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline font-medium hover:opacity-80 transition-opacity duration-200" 
            style={{ color: 'var(--seasun-golden-tan)' }}
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline font-medium hover:opacity-80 transition-opacity duration-200" 
            style={{ color: 'var(--seasun-golden-tan)' }}
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton 
          data-testid="register-button" 
          className="group relative seasun-body text-white w-full overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-4 focus:ring-offset-transparent rounded-xl font-medium"
          style={{ 
            backgroundColor: 'var(--seasun-deep-black)',
            boxShadow: '0 6px 24px rgba(26, 26, 26, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            marginTop: 'clamp(1.5rem, 5vh, 2.5rem)',
            padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
            fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)'
          }}
        >
          <span className="relative z-10 seasun-body tracking-wide">Join</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </SubmitButton>
      </form>
      <span className="text-center mt-6" style={{ 
        color: 'var(--seasun-deep-black)', 
        fontSize: 'clamp(0.75rem, 0.25vw + 0.7rem, 0.875rem)',
        opacity: 0.7
      }}>
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline font-medium hover:opacity-80 transition-opacity duration-200"
          style={{ color: 'var(--seasun-golden-tan)' }}
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
