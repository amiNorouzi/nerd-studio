import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const ForgetPassPage = dynamic(() => import("@/components/pages/forget-pass"), {
  loading: () => <HomeLoading />,
});

export default function ForgetPass() {
  return <ForgetPassPage />;
}
