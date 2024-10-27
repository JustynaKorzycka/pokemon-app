export const getCurrentDate = async () => {
  const res = await fetch(
    "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
