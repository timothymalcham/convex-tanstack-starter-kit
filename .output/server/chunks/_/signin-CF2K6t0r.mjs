import { jsxs, jsx } from 'react/jsx-runtime';
import { useAuthActions } from '@convex-dev/auth/react';
import { useState } from 'react';

const SplitComponent = function SignIn() {
  const {
    signIn
  } = useAuthActions();
  const [step, setStep] = useState("signIn");
  return /* @__PURE__ */ jsxs("form", { onSubmit: (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    void signIn("password", formData);
  }, children: [
    /* @__PURE__ */ jsx("input", { name: "email", placeholder: "Email", type: "text" }),
    /* @__PURE__ */ jsx("input", { name: "password", placeholder: "Password", type: "password" }),
    /* @__PURE__ */ jsx("input", { name: "flow", type: "hidden", value: step }),
    /* @__PURE__ */ jsx("button", { type: "submit", children: step === "signIn" ? "Sign in" : "Sign up" }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
      setStep(step === "signIn" ? "signUp" : "signIn");
    }, children: step === "signIn" ? "Sign up instead" : "Sign in instead" })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=signin-CF2K6t0r.mjs.map
