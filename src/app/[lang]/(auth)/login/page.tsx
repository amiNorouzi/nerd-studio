import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const LoginPage = dynamic(() => import("@/components/pages/login"), {
  loading: () => <HomeLoading />,
});

export default function Login() {
  return <LoginPage />;
}
