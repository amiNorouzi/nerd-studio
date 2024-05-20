/**
 * ! Warning
 * @deprecated don't use this type directly. All types must be in the types directory'
 */
type PrimaryColor =
  | "default"
  | "primary-blue"
  | "primary-azure"
  | "primary-brown"
  | "primary-skyblue"
  | "primary-green"
  | "primary-orange"
  | "primary-pink"
  | "primary-cerise"
  | "primary-desert-sand";

type AppTheme =
  | "default"
  | "theme-brown-light"
  | "theme-dark"
  | "theme--dark"
  | "theme-blue-dark";

interface IThemeConfig {
  primaryColor: PrimaryColor;
  theme: Theme;
}

interface DirType {
  dir: "ltr" | "rtl";
}
