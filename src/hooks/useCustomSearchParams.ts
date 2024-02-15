import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCustomSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // now you got a read/write object
  const current = new URLSearchParams(searchParams);

  /**
   *
   * @param key for key of query param
   * @param value for set to key param in url - if value is not exist delete key from url
   * @param replace for replace url or push if it is false
   */
  const setSearchParams = useCallback(
    (key: string, value?: string, replace: boolean = true) => {
      if (!value) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
      // cast to string
      const search = current.toString();
      // or const query = `${'?'.repeat(search.length && 1)}${search}`;
      const query = search ? `?${search}` : "";

      if (replace) {
        router.replace(`${pathname}${query}`);
      } else {
        router.push(`${pathname}${query}`);
      }
    },
    [searchParams],
  );

  return [searchParams, setSearchParams] as const;
}
