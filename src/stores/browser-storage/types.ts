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
  | "theme-light-brown"
  | "theme-dark"
  | "theme-grey"
  | "theme-darkblue";

export interface IThemeConfig {
  primaryColor: PrimaryColor;
  theme: Theme;
}
