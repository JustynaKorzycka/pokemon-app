import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FieldValues } from "react-hook-form";
import { RegisterOptions } from "react-hook-form";
import ControlledAutocomplete from "./ControlledAutocomplete";
import AppProviders from "@/providers/AppProviders";

const ControlledAutocompleteWrapper = ({
  label,
  name,
  rules,
  placeHolder,
  options,
}: {
  label: string;
  name: string;
  rules: RegisterOptions;
  placeHolder?: string;
  options: any;
}) => {
  const { control } = useForm<FieldValues, any>({
    defaultValues: { [name]: "" },
  });
  return (
    <ControlledAutocomplete
      label={label}
      name={name}
      control={control}
      rules={rules}
      placeHolder={placeHolder}
      options={options}
    />
  );
};

beforeEach(() => {
  render(
    <AppProviders>
      <ControlledAutocompleteWrapper
        label="Test Label"
        name="testAutocomplete"
        rules={{
          required: "This field is required",
        }}
        placeHolder="Test placeholder"
        options={["Option 1", "Option 2", "random"]}
      />
    </AppProviders>
  );
});

describe("ControlledAutocomplete Component", () => {
  it("should renders label and placeholder text", () => {
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
  });

  it("should displays options when typing", async () => {
    const autocomplete = screen.getByTestId("autocomplete-search");
    const input = within(autocomplete).getByLabelText(
      "Test Label"
    ) as HTMLInputElement;

    autocomplete.focus();
    await userEvent.type(input, "Option");
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.queryByText("random")).not.toBeInTheDocument();
  });

  it("should update input value on user input", async () => {
    const input = screen.getByLabelText("Test Label") as HTMLInputElement;
    await userEvent.type(input, "Test value");

    expect(input.value).toBe("Test value");
  });
});
