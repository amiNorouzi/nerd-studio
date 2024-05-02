import LoginLoading from "@/app/[lang]/(auth)/login/loading";
import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("@/components/pages/login"), {
  loading: () => <LoginLoading />,
});

export default function Login() {
  return <LoginPage />;
}
