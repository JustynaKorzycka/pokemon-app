import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { useForm, FieldValues } from "react-hook-form";
import { RegisterOptions } from "react-hook-form";
import PokemonAutocomplete from "./PokemonAutocomplete";
import AppProviders from "@/providers/AppProviders";

const PokemonAutocompleteWrapper = ({
  label,
  name,
  rules,
  placeHolder,
}: {
  label: string;
  name: string;
  rules: RegisterOptions;
  placeHolder?: string;
}) => {
  const { control } = useForm<FieldValues, any>({
    defaultValues: { pokemon: "" },
  });
  return (
    <PokemonAutocomplete
      label={label}
      name={name}
      control={control}
      rules={rules}
      placeHolder={placeHolder}
    />
  );
};

beforeEach(() => {
  fetchMock.enableMocks();
  render(
    <AppProviders>
      <PokemonAutocompleteWrapper
        label="Pokemon label"
        name="pokemon"
        rules={{
          required: "This field is required",
        }}
        placeHolder="Search for a Pokemon"
      />
    </AppProviders>
  );
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("PokemonAutocomplete Component", () => {
  it("should renders label and placeholder text", () => {
    expect(screen.getByLabelText("Pokemon label")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for a Pokemon")
    ).toBeInTheDocument();
  });

  it("should fetches and display options based on user input", async () => {
    const mockPokemonOptions = [
      { id: 1, name: "Bulbasaur" },
      { id: 2, name: "Charizard" },
      { id: 3, name: "Pikachu" },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonOptions));

    const input = screen.getByPlaceholderText(
      "Search for a Pokemon"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "cha" } });

    await waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Charizard")).toBeInTheDocument();
      expect(screen.getByText("Pikachu")).toBeInTheDocument();
    });
  });
});
