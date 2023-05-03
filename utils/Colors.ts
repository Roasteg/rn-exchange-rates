import { Appearance } from "react-native";

const theme = Appearance.getColorScheme();

export const Colors = {
    backgroundDefault: "#fefefe",
    backgroundDark: "#131215",
    exchangeBarDefault: "#ffffff",
    exchangeBarDark: "#1f1f23",
    actionButtonDefault: "#f0f0f0",
    actionButtonDark: "#222126",
    active: "#1129f5",
    inactive: "#bdbcbf",
    textDefault: "#09090b",
    textDark: "#ffffff",
};

export const Theme =
    theme === "light"
        ? {
              text: Colors.textDefault,
              background: Colors.backgroundDefault,
              exchangeBar: Colors.exchangeBarDefault,
              actionButton: Colors.actionButtonDefault,
          }
        : {
              text: Colors.textDark,
              background: Colors.backgroundDark,
              exchangeBar: Colors.exchangeBarDark,
              actionButton: Colors.actionButtonDark,
          };
