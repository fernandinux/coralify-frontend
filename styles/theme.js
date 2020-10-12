import { theme } from "@chakra-ui/core";
const newTheme = {
  ...theme,
  colors: {
    //without variantColor and variant buttons
    white: "#fff",
    green: {
      100: "#8DE0EB",
      200: "#4BC0D0",
    },
    blue: {
      300: "#7498FF",
      400: "#4299E1",
      500: "#285FFF",
      600: "#0852C2",
      900: "#2D3748",
    },
    gray: {
      100: "rgba(66, 153, 225, 0.08)",
      200: "#CBD5E0",
      300: "#718096",
      400: "#69707F",
    },
    red: {
      100: "#FF9082",
      200: "#F8746B",
      600: "#E15463",
    },
    violet: "#9166EB",
  },
};

export default newTheme;
