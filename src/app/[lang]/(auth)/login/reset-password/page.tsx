import { NewPassPage } from "@/components/pages/forget-pass/NewPassPage";

function Page({
  searchParams,
}: {
  searchParams: { token: string; email: string };
}) {
  return <NewPassPage token={searchParams.token} email={searchParams.email} />;
}

export default Page;
