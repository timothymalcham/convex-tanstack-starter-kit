import { createFileRoute } from '@tanstack/react-router'
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export const Route = createFileRoute('/signin')({
  component: SignIn,
})

function SignIn() {
    const { signIn } = useAuthActions();
    const [step, setStep] = useState<"signUp" | "signIn">("signIn");
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                void signIn("password", formData);
            }}
        >
            <input name="email" placeholder="Email" type="text" />
            <input name="password" placeholder="Password" type="password" />
            <input name="flow" type="hidden" value={step} />
            <button type="submit">{step === "signIn" ? "Sign in" : "Sign up"}</button>
            <button
                type="button"
                onClick={() => {
                    setStep(step === "signIn" ? "signUp" : "signIn");
                }}
            >
                {step === "signIn" ? "Sign up instead" : "Sign in instead"}
            </button>
        </form>
    );
}
