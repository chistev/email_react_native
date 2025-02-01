import { View, Text, StyleSheet, Platform } from "react-native";
import { IconButton, Provider as PaperProvider, DefaultTheme } from "react-native-paper";

const Navbar = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: 'white',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <View>
        <View style={styles.navbar}>
          <IconButton icon="menu" size={24} iconColor="white" />
          <Text style={styles.title}>CSE186 Mail - Inbox</Text>
        </View>
        
        {/* Message Row */}
        <View style={styles.messageRow}>
          <Text style={styles.sender}>Bob Dylan</Text>
          <Text style={styles.message} numberOfLines={1}>Fancy a brew toni...</Text>
          <Text style={styles.time}>10:32</Text>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0078D4", // Blue color
    height: 50,
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 40 : 40,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sender: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 10,
  },
  message: {
    flex: 1,
    color: "gray",
  },
  time: {
    color: "gray",
    fontSize: 12,
  },
});

export default Navbar;
