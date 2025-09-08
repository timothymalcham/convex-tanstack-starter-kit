import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { c as cn, L as Label, B as Button } from './button-gBaUOD0o.mjs';
import { u as useForm, C as Card, a as CardContent } from './useForm-BERvQLYl.mjs';
import { I as Input } from './input-C0YgRvgz.mjs';
import { a as authClient } from './ssr.mjs';
import { toast } from 'sonner';
import { z } from 'zod';
import { useNavigate, Link } from '@tanstack/react-router';
import '@radix-ui/react-label';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@tanstack/form-core';
import '@tanstack/react-store';
import 'react';
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

const schema = z.object({
  name: z.string(),
  email: z.email("Invalid e-mail address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  ),
  confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"]
    });
  }
});
function FieldInfo({ field }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    field.state.meta.isTouched && !field.state.meta.isValid ? /* @__PURE__ */ jsx("em", { children: field.state.meta.errors.map((err) => err.message).join(",") }) : null,
    field.state.meta.isValidating ? "Validating..." : null
  ] });
}
function SignUpForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validators: {
      onSubmit: schema
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            const { error } = await authClient.emailOtp.sendVerificationOtp({
              email: value.email,
              type: "sign-in"
            });
            if (!error) {
              void navigate({
                to: "/verify-email",
                search: { email: value.email }
              });
            } else {
              toast.error(error.message);
            }
          }
        }
      );
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-6", className), ...props, children: [
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxs(CardContent, { className: "grid p-0 md:grid-cols-2", children: [
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
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Welcome back" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-balance", children: "Login to your Acme Inc account" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: /* @__PURE__ */ jsx(
              form.Field,
              {
                name: "name",
                children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: field.name, children: "Email" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: field.name,
                      name: field.name,
                      value: field.state.value,
                      placeholder: "Jane Smith",
                      onBlur: field.handleBlur,
                      onChange: (e) => field.handleChange(e.target.value),
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(FieldInfo, { field })
                ] })
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: /* @__PURE__ */ jsx(
              form.Field,
              {
                name: "email",
                children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: field.name,
                      name: field.name,
                      value: field.state.value,
                      placeholder: "email@example.com",
                      onBlur: field.handleBlur,
                      onChange: (e) => field.handleChange(e.target.value),
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(FieldInfo, { field })
                ] })
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsx(Input, { id: "password", type: "password", required: true }),
              /* @__PURE__ */ jsx(
                form.Field,
                {
                  name: "password",
                  children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: field.name, children: "Password" }),
                      /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: "#",
                          className: "ml-auto text-sm underline-offset-2 hover:underline",
                          children: "Forgot your password?"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: field.name,
                        type: field.name,
                        name: field.name,
                        value: field.state.value,
                        onBlur: field.handleBlur,
                        onChange: (e) => field.handleChange(e.target.value),
                        required: true
                      }
                    ),
                    /* @__PURE__ */ jsx(FieldInfo, { field })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: /* @__PURE__ */ jsx(
              form.Field,
              {
                name: "confirmPassword",
                children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: field.name, children: "Confirm password" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: field.name,
                      type: "password",
                      name: field.name,
                      value: field.state.value,
                      onBlur: field.handleBlur,
                      onChange: (e) => field.handleChange(e.target.value),
                      required: true
                    }
                  ),
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
            ),
            /* @__PURE__ */ jsxs("div", { className: "text-center text-sm", children: [
              "Don't have an account?",
              " ",
              /* @__PURE__ */ jsx(Link, { to: "/sign-up", className: "underline underline-offset-4", children: "Sign up" })
            ] })
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
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4", children: [
      "By clicking continue, you agree to our ",
      /* @__PURE__ */ jsx("a", { href: "#", children: "Terms of Service" }),
      " ",
      "and ",
      /* @__PURE__ */ jsx("a", { href: "#", children: "Privacy Policy" }),
      "."
    ] })
  ] });
}
const SplitComponent = SignUpForm;

export { SplitComponent as component };
//# sourceMappingURL=sign-up-28X8ZD6i.mjs.map
