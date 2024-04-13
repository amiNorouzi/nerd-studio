export type PrimaryColor =
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

export type Theme =
  | "default"
  | "theme-brown-light"
  | "theme-dark"
  | "theme--dark"
  | "theme-blue-dark";

export interface IThemeConfig {
  primaryColor: PrimaryColor;
  theme: Theme;
}

export interface DirType {
  dir: "ltr" | "rtl";
}
