import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const NewPassPage = dynamic(
  () => import("@/components/pages//forget-pass/NewPassPage"),
  {
    loading: () => <HomeLoading />,
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
