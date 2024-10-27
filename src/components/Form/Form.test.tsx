import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import AppProviders from "@/providers/AppProviders";
import ErrorMessage from "@/utils/form/errorMessages";

describe("Form Component", () => {
  beforeEach(() => {
    render(
      <AppProviders>
        <Form />
      </AppProviders>
    );
  });
  it("should render name, age and pokemon fields", () => {
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /age/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Pokemon name/i)).toBeInTheDocument();
  });

  it("should return error for name, age and pokemon fields if empty form was submitted", async () => {
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText(ErrorMessage.requiredName));
      expect(screen.getByText(ErrorMessage.requiredAge));
      expect(screen.getByText(ErrorMessage.requiredPokemon));
    });
  });

  it("should return error for name field if the value given is shorter than 2", async () => {
    const nameInput = screen.getByRole("textbox", { name: /name/i });

    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText(ErrorMessage.minName));
    });
  });

  it("should return error for name field if the value given is too long than 20", async () => {
    const nameInput = screen.getByRole("textbox", { name: /name/i });

    fireEvent.change(nameInput, {
      target: { value: "Lorem ipsum dolor sit amet, consectetur adipiscin" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText(ErrorMessage.maxName));
    });
  });

  it("should return error for age field if the value given is smaller than 16", async () => {
    const ageInput = screen.getByRole("spinbutton", { name: /age/i });

    fireEvent.change(ageInput, {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText(ErrorMessage.minAge));
    });
  });

  it("should return error for age field if the value given is bigger than 99", async () => {
    const ageInput = screen.getByRole("spinbutton", { name: /age/i });

    fireEvent.change(ageInput, {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText(ErrorMessage.maxAge));
    });
  });
});
