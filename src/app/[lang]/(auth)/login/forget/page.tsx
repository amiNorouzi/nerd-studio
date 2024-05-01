import dynamic from "next/dynamic";
import ForgetPassLoading from "@/app/[lang]/(auth)/login/forget/loading";

const ForgetPassPage = dynamic(() => import("@/components/pages/forget-pass"), {
  loading: () => <ForgetPassLoading />,
});

export default function ForgetPass() {
  return <ForgetPassPage />;
}
