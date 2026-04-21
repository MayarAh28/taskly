import { Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ControllerComponent({
  form,
  name,
  label,
  placeholder,
  type,
}: {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <FieldLabel className="pl-1 label-sm">
            {label}
          </FieldLabel>
          <Input
            {...field}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            type={type}
            className="bg-surface-highest shadow-none py-[18px] px-4 h-[56px] w-[342px] border-none focus-visible:ring-primary-container focus-visible:ring-1 aria-invalid:bg-invalid-input "
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
