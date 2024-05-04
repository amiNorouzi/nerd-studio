import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const SignupConfirm = dynamic(
  () => import("@/components/pages/signup/SignupConfirm"),
  {
    loading: () => <HomeLoading />,
  },
);

function Page({
  searchParams,
}: {
  searchParams: { token: string; email: string };
}) {
  return (
    <SignupConfirm token={searchParams.token} email={searchParams.email} />
  );
}

export default Page;
