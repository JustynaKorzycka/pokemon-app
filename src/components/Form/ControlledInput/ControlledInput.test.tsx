import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FieldValues } from "react-hook-form";
import { RegisterOptions } from "react-hook-form";
import ControlledInput from "./ControlledInput";
import AppProviders from "@/providers/AppProviders";

const ControlledInputWrapper = ({
  label,
  name,
  rules,
  placeHolder,
  type = "text",
}: {
  label: string;
  name: string;
  rules: RegisterOptions;
  placeHolder?: string;
  type?: string;
}) => {
  const { control } = useForm<FieldValues, any>({
    defaultValues: { [name]: "" },
  });
  return (
    <ControlledInput
      label={label}
      name={name}
      control={control}
      rules={rules}
      placeHolder={placeHolder}
      type={type}
    />
  );
};

beforeEach(() => {
  render(
    <AppProviders>
      <ControlledInputWrapper
        label="Test Label"
        name="testInput"
        rules={{
          required: "This field is required",
        }}
        placeHolder="Test placeholder"
      />
    </AppProviders>
  );
});

describe("ControlledInput Component", () => {
  it("should renders label and placeholder text", () => {
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
  });

  it("should update input value on user input", async () => {
    const input = screen.getByLabelText("Test Label") as HTMLInputElement;
    await userEvent.type(input, "Test value");

    expect(input.value).toBe("Test value");
  });
});
