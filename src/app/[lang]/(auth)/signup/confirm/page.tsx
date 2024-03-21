import SignupConfirm from "@/components/pages/signup/SignupConfirm";

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
