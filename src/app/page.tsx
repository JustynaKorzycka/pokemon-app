import { Skeleton, Stack } from "@mui/material";
import CurrentDate from "@/components/CurrentDate/CurrentDate";
import Form from "@/components/Form/Form";
import CustomCard from "@/components/CustomCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh;",
      }}
    >
      <CustomCard>
        <Suspense fallback={<Skeleton width="150px" height="20px" />}>
          <CurrentDate />
        </Suspense>
        <Form />
      </CustomCard>
    </Stack>
  );
}
