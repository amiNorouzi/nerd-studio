import { useEffect, useState } from "react";

import { themeConfigStorage } from "@/stores/browser-storage";
import type { Theme, PrimaryColor } from "@/stores/browser-storage/types";
import { checkWindowValidity } from "@/lib/auth-storage";

interface IChangeThemeInput {
  themeClass?: Theme;
  primaryColorClass?: PrimaryColor;
}

/**
 * This is a custom React Hook that manages the theme and primary color of the application.
 * It uses the useState hook to store the current theme and primary color, and the useEffect hook to initialize these values.
 * On initialization, it checks if the application is running on the client side and if there are any previously selected theme and primary color stored in the local storage.
 * If there are, it applies these settings by calling the changeTheme function.
 * The changeTheme function accepts an object with optional themeClass and primaryColorClass properties.
 * It first removes any existing theme and primary color classes from the body element.
 * Then, it applies the new theme and primary color classes, if they are not 'default'.
 * Finally, it stores the new theme and primary color in the local storage and updates the state variables.
 *
 * @returns {Object} An object containing the current theme, the current primary color, and the function to change the theme.
 * @hook
 * @example
 * const { activeTheme, activePrimaryColor, changeTheme } = useTheme();
 */
export function useTheme() {
  //current selected primary color
  const [activePrimaryColor, setActivePrimaryColor] =
    useState<PrimaryColor>("default");
  //current selected theme
  const [activeTheme, setActiveTheme] = useState<Theme>("default");

  //first get user prev selected on page load to set
  useEffect(() => {
    //check is on client
    if (checkWindowValidity()) {
      //get prev selected config from storage
      const themeConfig = themeConfigStorage.get();

      if (themeConfig) {
        const { theme = "default", primaryColor = "default" } = themeConfig;
        //change theme after get from storage
        changeTheme({
          themeClass: theme,
          primaryColorClass: primaryColor,
        });
      }
    }
  }, []);

  /**
   * This function changes the theme and primary color of the application.
   * It first removes any existing theme and primary color classes from the body element.
   * Then, it applies the new theme and primary color classes, if they are not 'default'.
   * Finally, it stores the new theme and primary color in the local storage and updates the state variables.
   *
   * @param {IChangeThemeInput} themeClass - The class that will be added to the body class list to apply the color variant.
   * @param {IChangeThemeInput} primaryColorClass - The class that will be added to the body class list to apply the primary color variant.
   */
  const changeTheme = ({
    themeClass,
    primaryColorClass,
  }: IChangeThemeInput) => {
    const body = document.body;
    //first remove prev selected class from body
    //both primary color and theme
    body.classList.forEach(clasName => {
      if (clasName.startsWith("theme-") || clasName.startsWith("primary-")) {
        body.classList.remove(clasName);
      }
    });

    //if theme not pass select current theme
    const theme = themeClass || activeTheme;
    //if primaryColor not pass select current primaryColor
    const primaryColor = primaryColorClass || activePrimaryColor;

    //default theme and primary color don't need to add to body class list
    if (theme !== "default") {
      body.classList.add(theme);
    }
    if (primaryColor !== "default") {
      body.classList.add(primaryColor);
    }

    //set theme and primaryColor to localstorage to use on page reload
    themeConfigStorage.set({
      theme,
      primaryColor,
    });
    //set theme and primaryColor to stage to change ui style like primary color check and theme border color
    setActiveTheme(theme);
    setActivePrimaryColor(primaryColor);
  };

  return { activeTheme, activePrimaryColor, changeTheme };
}
