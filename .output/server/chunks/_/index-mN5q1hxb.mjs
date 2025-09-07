import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useSuspenseQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { useMutation } from 'convex/react';
import { anyApi } from 'convex/server';
import { z } from 'zod';
import { FormApi, functionalUpdate, FieldApi } from '@tanstack/form-core';
import { useStore } from '@tanstack/react-store';
import { useState, useEffect, useMemo } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const api = anyApi;
const useIsomorphicLayoutEffect = useEffect;
function useField(opts) {
  const [fieldApi] = useState(() => {
    const api2 = new FieldApi({
      ...opts,
      form: opts.form,
      name: opts.name
    });
    const extendedApi = api2;
    extendedApi.Field = Field;
    return extendedApi;
  });
  useIsomorphicLayoutEffect(fieldApi.mount, [fieldApi]);
  useIsomorphicLayoutEffect(() => {
    fieldApi.update(opts);
  });
  useStore(
    fieldApi.store,
    opts.mode === "array" ? (state) => {
      var _a;
      return [
        state.meta,
        Object.keys((_a = state.value) != null ? _a : []).length
      ];
    } : void 0
  );
  return fieldApi;
}
const Field = ({
  children,
  ...fieldOptions
}) => {
  const fieldApi = useField(fieldOptions);
  const jsxToDisplay = useMemo(
    () => functionalUpdate(children, fieldApi),
    /**
     * The reason this exists is to fix an issue with the React Compiler.
     * Namely, functionalUpdate is memoized where it checks for `fieldApi`, which is a static type.
     * This means that when `state.value` changes, it does not trigger a re-render. The useMemo explicitly fixes this problem
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, fieldApi, fieldApi.state.value, fieldApi.state.meta]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: jsxToDisplay });
};
function LocalSubscribe({
  form,
  selector,
  children
}) {
  const data = useStore(form.store, selector);
  return functionalUpdate(children, data);
}
function useForm(opts) {
  const [formApi] = useState(() => {
    const api2 = new FormApi(opts);
    const extendedApi = api2;
    extendedApi.Field = function APIField(props) {
      return /* @__PURE__ */ jsx(Field, { ...props, form: api2 });
    };
    extendedApi.Subscribe = function Subscribe(props) {
      return /* @__PURE__ */ jsx(
        LocalSubscribe,
        {
          form: api2,
          selector: props.selector,
          children: props.children
        }
      );
    };
    return extendedApi;
  });
  useIsomorphicLayoutEffect(formApi.mount, []);
  useIsomorphicLayoutEffect(() => {
    formApi.update(opts);
  });
  return formApi;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Input({
  inputContainerClassName,
  className,
  type,
  leadingIcon,
  trailingIcon,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative w-full", inputContainerClassName),
      "data-slot": "input-container",
      children: [
        leadingIcon && /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "input-leading-icon",
            className: "text-muted-foreground absolute top-1/2 left-3 shrink-0 -translate-y-1/2 [&_svg]:shrink-0 [&_svg:not([class*='pointer-events-'])]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
            children: leadingIcon
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type,
            "data-slot": "input",
            className: cn(
              "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/50 aria-invalid:border-destructive",
              leadingIcon && "pl-10",
              trailingIcon && "pr-10",
              className
            ),
            ...props
          }
        ),
        trailingIcon && /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "input-trailing-icon",
            className: "text-muted-foreground absolute top-1/2 right-3 shrink-0 -translate-y-1/2 [&_svg]:shrink-0 [&_svg:not([class*='pointer-events-'])]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
            children: trailingIcon
          }
        )
      ]
    }
  );
}
const SplitComponent = function Home() {
  const todosQuery = useSuspenseQuery(convexQuery(api.todos.getAll, {}));
  const createTodoItem = useMutation(api.todos.create);
  const form = useForm({
    defaultValues: {
      title: ""
    },
    validators: {
      // Pass a schema or function to validate
      onSubmit: z.object({
        title: z.string()
      })
    },
    onSubmit: async ({
      value
    }) => {
      console.log("creating todo item: ", JSON.stringify(value));
      await createTodoItem({
        title: value.title
      });
    }
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { children: "Add a todo item:" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      e.stopPropagation();
      void form.handleSubmit();
    }, children: [
      /* @__PURE__ */ jsx(form.Subscribe, { selector: (state) => [state.errorMap], children: ([errorMap]) => errorMap.onSubmit ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("em", { children: [
        "There was an error on the form: ",
        errorMap.onSubmit.toString()
      ] }) }) : null }),
      /* @__PURE__ */ jsx(form.Field, { name: "title", children: (field) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Input, { name: "title", value: field.state.value, onChange: (e) => field.handleChange(e.target.value) }),
        field.state.meta.errors.map((error) => error && /* @__PURE__ */ jsx("p", { children: error.message }, error))
      ] }) }),
      /* @__PURE__ */ jsx(form.Subscribe, { selector: (formState) => [formState.canSubmit, formState.isSubmitting], children: ([canSubmit, isSubmitting]) => /* @__PURE__ */ jsx("button", { type: "submit", disabled: !canSubmit, children: isSubmitting ? "..." : "Submit" }) })
    ] }),
    /* @__PURE__ */ jsx("h2", { children: "Todo items:" }),
    /* @__PURE__ */ jsx("ul", { children: todosQuery.data.map((t) => /* @__PURE__ */ jsx("li", { children: t.title }, t._id)) })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=index-mN5q1hxb.mjs.map
