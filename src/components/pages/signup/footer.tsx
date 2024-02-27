import Link from "next/link";

export function Footer() {
  return (
    <footer className="opacity-0">
      <span className="text-xs text-white">
        This site is protected by reCAPTCHA and the Google{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>
        and{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        apply.
      </span>
    </footer>
  );
}
