import { getCurrentDate } from "./dateApi";

describe("getCurrentDate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the current date from API response", async () => {
    const mockData = { dateTime: "2024-10-25T12:34:56" };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    );

    const result = await getCurrentDate();
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw"
    );
  });

  it("throws an error if fetch fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(getCurrentDate()).rejects.toThrow("Failed to fetch data");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
