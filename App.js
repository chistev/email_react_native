import { useState } from "react"; 
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IconButton, Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import mailData from './data/mail.json';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("Inbox"); // Track the selected folder

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: 'white',
    },
  };

  // Find the emails for the selected folder
  const folder = mailData.find(folder => folder.name === selectedFolder);
  const emails = folder ? folder.mail : [];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.container}>
          {/* Navbar */}
          <View style={styles.navbar}>
            <IconButton 
              icon="menu" 
              size={24} 
              color="white" 
              onPress={() => setIsMenuOpen(!isMenuOpen)} 
            />
            <Text style={styles.title}>{`CSE186 Mail - ${selectedFolder}`}</Text>
          </View>

          {/* Sidebar Menu */}
          {isMenuOpen && (
            <View style={styles.sidebar}>
              {/* Sidebar items for different folders */}
              <TouchableOpacity 
                onPress={() => {
                  setSelectedFolder("Inbox"); 
                  setIsMenuOpen(false); 
                }} 
                style={styles.menuItem}>
                <IconButton icon="inbox" size={20} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Inbox</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setSelectedFolder("Important");
                  setIsMenuOpen(false);
                }} 
                style={styles.menuItem}>
                <IconButton icon="star" size={20} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Important</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setSelectedFolder("Trash");
                  setIsMenuOpen(false);
                }} 
                style={styles.menuItem}>
                <IconButton icon="delete" size={20} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Trash</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ScrollView to display all messages based on selected folder */}
          <ScrollView style={styles.messagesContainer}>
            {emails.map((email) => {
              const receivedTime = new Date(email.received).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <View style={styles.messageRow} key={email.id}>
                  <Text style={styles.sender}>{email.from.name}</Text>
                  <Text style={styles.message} numberOfLines={1}>{email.subject}</Text>
                  <Text style={styles.time}>{receivedTime}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

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
});

export default Navbar;
