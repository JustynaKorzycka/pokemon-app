import { Stack, Typography } from "@mui/material";
import { getCurrentDate } from "@/lib/api/dateApi/dateApi";

const CurrentDate = async () => {
  const dateNow = await getCurrentDate();

  return (
    <Stack alignItems="end">
      <Typography>
        {`${dateNow.dayOfWeek}, ${dateNow.date}`.replaceAll("/", ".")}
      </Typography>
    </Stack>
  );
};

export default CurrentDate;
