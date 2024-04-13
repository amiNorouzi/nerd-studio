import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {languages} from '@/components/shared/run-tab-for-app/form-section-components/contants';

/**
 * This function generates a range of numbers from the start value to the end value (inclusive).
 * It uses the Array from method to create an array with a length equal to the difference between the end and start values plus 1.
 * The second argument to Array from is a map function that returns the current index, effectively filling the array with numbers from 0 to the length of the array.
 * The result is an array of numbers from the start value to the end value.
 *
 * @param {number} start - The start value of the range.
 * @param {number} end - The end value of the range.
 * @returns {number[]} An array of numbers from the start value to the end value.
 */
export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i);
}

/**
 * This function merges a list of class names into a single string.
 * It uses the clsx library to combine the class names, and then uses the tailwind-merge library to merge the resulting class names.
 * The function takes a rest parameter, allowing for any number of arguments to be passed.
 *
 * @param {...ClassValue[]} inputs - The class names to be merged.
 * @returns {string} The merged class names as a single string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * for get first letter of name and lastname
 * @param word
 * @return char first char of word passed to uppercase
 */
export const getFirstLetter = (word: string) => {
  return word ? word[0].toUpperCase() : "A";
};

/**
 * This function checks if the provided iterable is empty.
 * It supports arrays and objects. For arrays, it checks if the length is 0.
 * For objects, it checks if the number of keys is 0.
 * For all other types, it returns true, indicating that they are "empty".
 *
 * @param {any} iterable - The iterable to be checked for emptiness.
 * @returns {boolean} True if the iterable is empty, false otherwise.
 */
export const isEmpty = (iterable: any) => {
  // Check if the iterable is an array and if so, return true if its length is 0.
  if (Array.isArray(iterable)) {
    return iterable.length === 0;
  }
  // Check if the iterable is an object and if so, return true if it has no keys.
  if (typeof iterable === "object") {
    return Object.keys(iterable).length === 0;
  }

  // For all other types, return true indicating that they are "empty".
  return true;
};

/**
 * This function formats a number into a compact format.
 * It uses the Intl.NumberFormat object to create a number formatter with the "en" locale and "compact" notation.
 * The function then returns the formatted number as a string.
 *
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number as a string in compact format.
 */
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
 * This function separates a number by commas for every three digits from the right.
 * It takes a string as an input, removes any existing commas, and splits the string at the decimal point.
 * The integer part of the number is then separated by commas for every three digits from the right.
 * The function then returns the formatted number as a string.
 * If the input is null, the function returns 0.
 *
 * @param {string} number - The number to be formatted, represented as a string.
 * @returns {string | number} The formatted number as a string, or 0 if the input is null.
 */
export function separateNumber(number: string) {
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

export const getLangById = (id: string) =>
    languages.find(
        item => item.id.toLowerCase() === id.toLowerCase(),
    );

export const isBrowser = () => typeof window !== 'undefined';
