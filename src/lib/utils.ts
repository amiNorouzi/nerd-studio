import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * for get first letter of name and lastname
 * @param word
 * @return char first char of word passed to uppercase
 */
export const getFirstLetter = (word: string) => {
  if (word) {
    return word.substring(0, 1).toUpperCase();
  }
  return "A";
};

/**
 * check array and objects are empty or not
 * @param iterable arr or object
 */
export const isEmpty = (iterable: any) => {
  //for array
  if (Array.isArray(iterable)) {
    return iterable.length === 0;
  }
  //for objects
  if (typeof iterable === "object") {
    return Object.keys(iterable).length === 0;
  }

  //other types return isEmpty = true
  return true;
};

export function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}
