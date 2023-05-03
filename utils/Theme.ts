import { Appearance } from "react-native";
import { Colors } from "./Colors";

const theme = Appearance.getColorScheme();

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
