import { StyleSheet, StatusBar } from "react-native";
import { COLORS } from "../../../constant/theme";

const statusBarHeight = StatusBar.currentHeight || 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataCont: { marginVertical: 10 },
  item: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default styles;
