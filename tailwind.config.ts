/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1366px",
        "3xl": "1440px",
        "4xl": "",
      },
    },

    extend: {
      fontSize: {
        sm: ["12px", "18px"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "main-background": "hsl(var(--bg-main))",
        foreground: "hsl(var(--foreground))",
        active: "var(--active-bg)",
        hover: "var(--hover)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          dark: "hsl(var(--muted-dark))",
          foreground: "hsl(var(--muted-foreground))",
          "foreground-light": "hsl(var(--muted-foreground-light))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        popup: "0 16px 56px rgba(16,24,40,0.16)",
        "card-hover":
          "0px 0px 4px rgba(40,41,61,0.02),0px 2px 24px rgba(40,41,61,0.08)",
        "dashboard-card": "0px 12px 12px 0px rgba(79, 73, 85, 0.08);",
        mic: "0px 0px 1px rgba(40,41,61,0.02),0px 1px 8px rgba(40,41,61,0.08)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        loading: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        loading: 'loading 3s linear infinite',
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      spacing: {
        "4.5": "18px",
        "label-space": "var(--spacing-form-label)",
        "form-padding": "var(--spacing-form-padding)",
        "form-gap": "var(--spacing-form-gap)",
        element: "var(--spacing-element-height)",
      },
    },
  },
  plugins: [
    require("tailwindcss-rtl"),
    require("tailwindcss-animate"),
    //@ts-ignore
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
