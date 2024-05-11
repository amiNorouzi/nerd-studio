import Navbar from "@/components/pages/Landing/layout/Navbar";
import { PropsWithChildren } from "react";

export default async function CotactUsLayout({
  children,
}: PropsWithChildren) {

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
