import Loading from "@/components/shared/Loading";
import React from "react";

export default function HomeLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loading rootClass="-ms-1 me-1" svgClass="w-8 h-8" />
    </div>
  );
}
