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

/**
 * pass variable and get hsl
 * @param variable color variable from global css
 */
export const getHslColorByVar = (variable: string) => {
  return `hsl(var(${variable}))`;
};

/**
 * get a number and separate by 3 number 000,000
 * @param number
 */
export function separatePrice(number: string) {
  if (number != null) {
    number += "";
    number = number.replace(",", "");
    let x = number.split(".");
    let y = x[0];
    let z = x.length > 1 ? "." + x[1] : "";
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
    return y + z;
  } else {
    return 0;
  }
}
