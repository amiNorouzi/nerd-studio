import { Header } from "./header";
import { Form } from "./form";
import { Footer } from "./footer";

export function SignUpPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <Header />
      <Form />
      <Footer />
    </div>
  );
}
