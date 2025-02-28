import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0078D4",
    height: 50,
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 40 : 40,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  sidebar: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 90 : 90,
    left: 0,
    width: 170,
    height: "100%",
    backgroundColor: "#F1F1F1",
    padding: 20,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    marginRight: 1,
  },
  messagesContainer: {
    padding: 10,
    zIndex: 5,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  sender: {
    fontSize: 14,
    marginRight: 10,
  },
  message: {
    flex: 1,
  },
  time: {
    color: "gray",
    fontSize: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 5,
  },
});

export default styles;
