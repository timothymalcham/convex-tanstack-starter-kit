import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { c as cn, L as Label, B as Button } from './button-gBaUOD0o.mjs';
import { u as useForm, C as Card, a as CardContent } from './useForm-BERvQLYl.mjs';
import { R as Route$2, a as authClient } from './ssr.mjs';
import { toast } from 'sonner';
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import '@radix-ui/react-label';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@tanstack/form-core';
import '@tanstack/react-store';
import '@tanstack/react-query';
import '@tanstack/router-ssr-query-core';
import '@convex-dev/react-query';
import 'convex/react';
import '@tanstack/react-query-devtools/production';
import '@convex-dev/better-auth/react';
import 'better-auth/react';
import '@convex-dev/better-auth/client/plugins';
import 'better-auth/client/plugins';
import '@convex-dev/better-auth';
import '@convex-dev/better-auth/plugins';
import '@convex-dev/better-auth/utils';
import 'better-auth';
import 'better-auth/plugins';
import 'convex/server';
import '@convex-dev/resend';
import '@react-email/components';
import '@convex-dev/better-auth/react-start';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    OTPInput,
    {
      "data-slot": "input-otp",
      containerClassName: cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      ),
      className: cn("disabled:cursor-not-allowed", className),
      ...props
    }
  );
}
function InputOTPGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "input-otp-group",
      className: cn("flex items-center", className),
      ...props
    }
  );
}
function InputOTPSlot({
  index,
  className,
  ...props
}) {
  var _a;
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = (_a = inputOTPContext == null ? void 0 : inputOTPContext.slots[index]) != null ? _a : {};
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "input-otp-slot",
      "data-active": isActive,
      className: cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "animate-caret-blink bg-foreground h-4 w-px duration-1000" }) })
      ]
    }
  );
}
const schema = z.object({
  code: z.string()
});
function FieldInfo({ field }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    field.state.meta.isTouched && !field.state.meta.isValid ? /* @__PURE__ */ jsx("em", { children: field.state.meta.errors.map((err) => err.message).join(",") }) : null,
    field.state.meta.isValidating ? "Validating..." : null
  ] });
}
function VerifyEmailForm({
  email,
  className,
  ...props
}) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      code: ""
    },
    validators: {
      onSubmit: schema
    },
    onSubmit: async ({ value }) => {
      const { error: validCodeError } = await authClient.emailOtp.checkVerificationOtp({
        email,
        type: "sign-in",
        otp: value.code
      });
      if (validCodeError) {
        console.error(validCodeError);
        toast.error("Invalid code");
        return;
      }
      const { error: verificationError } = await authClient.emailOtp.verifyEmail({
        email,
        otp: value.code
      });
      if (verificationError) {
        console.error(verificationError);
        toast.error("Your email could not be verified at this time");
        return;
      }
      const { error: signInError } = await authClient.signIn.emailOtp({
        email,
        otp: value.code
      });
      if (signInError) {
        console.error(signInError);
        toast.error("Authentication failed");
        return;
      }
      void navigate({ to: "/" });
    }
  });
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-6", className), ...props, children: /* @__PURE__ */ jsx(Card, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxs(CardContent, { className: "grid p-0 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx(
      "form",
      {
        className: "p-6 md:p-8",
        onSubmit: (e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        },
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Verify your email" }) }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "code",
              children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: field.name, children: "Code" }),
                /* @__PURE__ */ jsx(InputOTP, { maxLength: 6, children: /* @__PURE__ */ jsxs(InputOTPGroup, { children: [
                  /* @__PURE__ */ jsx(InputOTPSlot, { index: 0 }),
                  /* @__PURE__ */ jsx(InputOTPSlot, { index: 1 }),
                  /* @__PURE__ */ jsx(InputOTPSlot, { index: 2 }),
                  /* @__PURE__ */ jsx(InputOTPSlot, { index: 3 }),
                  /* @__PURE__ */ jsx(InputOTPSlot, { index: 4 }),
                  /* @__PURE__ */ jsx(InputOTPSlot, { index: 5 })
                ] }) }),
                /* @__PURE__ */ jsx(FieldInfo, { field })
              ] })
            }
          ) }),
          /* @__PURE__ */ jsx(
            form.Subscribe,
            {
              selector: (state) => [state.canSubmit, state.isSubmitting],
              children: ([canSubmit, isSubmitting]) => /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !canSubmit, className: "w-full", children: isSubmitting ? "..." : "Submit" })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "bg-muted relative hidden md:block", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/placeholder.svg",
        alt: "Image",
        className: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      }
    ) })
  ] }) }) });
}
const SplitComponent = function VerifyEmailComponent() {
  const {
    email
  } = Route$2.useSearch();
  return /* @__PURE__ */ jsx(VerifyEmailForm, { email });
};

export { SplitComponent as component };
//# sourceMappingURL=verify-email-ByWoo0aI.mjs.map
