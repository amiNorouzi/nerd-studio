import dynamic from "next/dynamic";
import SignupConfirmLoading from "@/app/[lang]/(auth)/signup/confirm/loading";

const SignupConfirm = dynamic(
  () => import("@/components/pages/signup/SignupConfirm"),
  {
    loading: () => <SignupConfirmLoading />,
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
