import { useEffect, useState } from "react";

import { themeConfigStorage } from "@/stores/browser-storage";
import type { Theme, PrimaryColor } from "@/stores/browser-storage/types";
import { checkWindowValidity } from "@/lib/auth-storage";

//hook for change theme and primary color

interface IChangeThemeInput {
  themeClass?: Theme;
  primaryColorClass?: PrimaryColor;
}

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
   *
   * @param themeClass class will add to body class list to suitable color variant
   * @param primaryColorClass class will add to body class list to suitable primary color variant
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
