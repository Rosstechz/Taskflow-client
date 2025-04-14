import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Form = ({
  title,
  formData,
  onChange,
  onSubmit,
  fields,
  buttonText,
  footer,
}) => {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map(({ label, name, type = "text" }) => (
          <div key={name} className="space-y-1">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              name={name}
              type={type}
              value={formData[name] || ""}
              onChange={onChange}
              required
            />
          </div>
        ))}

        <Button
          type="submit"
          className="w-full"
          disabled={buttonText === "Loading..."}
        >
          {buttonText}
        </Button>
      </form>

      {footer && (
        <div className="text-center text-sm text-gray-600">{footer}</div>
      )}
    </div>
  );
};

export default Form;
