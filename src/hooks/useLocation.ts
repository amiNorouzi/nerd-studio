import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";

export function useLocation() {
  const [location, setLocation] = useState<Location>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLocation(window.location);
  }, [pathname, searchParams]);

  return location;
}
