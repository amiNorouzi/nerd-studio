"use client";

import { useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useCustomSearchParams(
  initialKey?: string,
  initialValue?: string,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // now you got a read/write object
  const current = useMemo(()=> new URLSearchParams(searchParams), [searchParams]);

  /**
   * this function used to set/delete value in url query param
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
    [current, pathname, router]
  );

  // this use effect used for initial setSearchParam
  useEffect(() => {
    if (!initialKey) return;
    if (!initialValue) {
      setSearchParams(initialKey);
    } else {
      setSearchParams(initialKey, initialValue);
    }
  }, [initialValue, initialKey, setSearchParams]);

  return [searchParams, setSearchParams] as const;
}
