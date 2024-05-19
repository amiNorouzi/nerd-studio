import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton() {
  const handleClick = async () => {
    await signIn("google");
  };

  return (
    <Button onClick={handleClick} variant="outline" size="lg">
      {/*<FcGoogle size={25} />*/}
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
}
