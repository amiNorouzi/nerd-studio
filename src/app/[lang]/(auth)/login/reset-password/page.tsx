import dynamic from "next/dynamic";
import NewPassLoading from "@/app/[lang]/(auth)/login/reset-password/loading";

const NewPassPage = dynamic(
  () => import("@/components/pages//forget-pass/NewPassPage"),
  {
    loading: () => <NewPassLoading />,
  },
);

function Page({
  searchParams,
}: {
  searchParams: { token: string; email: string };
}) {
  return <NewPassPage token={searchParams.token} email={searchParams.email} />;
}

export default Page;
