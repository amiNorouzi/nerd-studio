import Image from "next/image";

import { signIn } from "next-auth/react";
export function GoogleSignInButton() {
  const handleClick = async () => {
    await signIn("google");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="focus:shadow-outline  flex h-14 w-full items-center justify-center rounded-lg border-2  border-black bg-white px-6  text-black transition-colors duration-300 hover:bg-slate-200"
    >
      <Image
        src={"/images/google.png"}
        alt="Google Logo"
        width={20}
        height={20}
      />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}
