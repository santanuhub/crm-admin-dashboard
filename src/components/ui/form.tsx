import * as React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type UseFormReturn,
  useFormContext,
} from "react-hook-form";

const FormFieldContext = React.createContext<{ name: string }>({ name: "" });
const FormItemContext = React.createContext<{ id: string }>({ id: "" });

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);
  const controlId = itemContext.id || `${fieldContext.name}-field`;

  return {
    id: controlId,
    name: fieldContext.name,
    formMessageId: `${controlId}-message`,
    fieldState,
  };
}

type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<TFieldValues>;
};

function Form<TFieldValues extends FieldValues = FieldValues>({
  children,
  methods,
}: FormProps<TFieldValues>) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & Omit<ControllerProps<TFieldValues, TName>, "name">;

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, ...props }: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: String(name) }}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
}

function FormItem({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId();

  return (
    <div {...props}>
      <FormItemContext.Provider value={{ id }}>
        {children}
      </FormItemContext.Provider>
    </div>
  );
}

function FormLabel({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { fieldState } = useFormField();

  return (
    <label {...props} data-error={Boolean(fieldState.error)}>
      {children}
    </label>
  );
}

function FormControl({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

function FormMessage({
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { fieldState, formMessageId } = useFormField();

  if (!fieldState.error && !children) {
    return null;
  }

  return (
    <p {...props} id={formMessageId} className={props.className}>
      {children ?? fieldState.error?.message}
    </p>
  );
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };
export type { FormProps };
