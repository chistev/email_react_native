import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { IconButton, Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import mailData from './data/mail.json';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: 'white',
    },
  };

  const inbox = mailData.find(folder => folder.name === "Inbox");
  const emails = inbox ? inbox.mail : [];

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <IconButton 
            icon="menu" 
            size={24} 
            color="white" // Changed to 'color'
            onPress={() => setIsMenuOpen(!isMenuOpen)} 
          />
          <Text style={styles.title}>CSE186 Mail - Inbox</Text>
        </View>

        {/* Sidebar Menu */}
        {isMenuOpen && (
          <View style={styles.sidebar}>
            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.menuItem}>
              <IconButton icon="inbox" size={20} color="black" style={styles.icon} /> {/* Changed to 'color' */}
              <Text style={styles.menuText}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.menuItem}>
              <IconButton icon="star" size={20} color="black" style={styles.icon} /> {/* Changed to 'color' */}
              <Text style={styles.menuText}>Important</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.menuItem}>
              <IconButton icon="delete" size={20} color="black" style={styles.icon} /> {/* Changed to 'color' */}
              <Text style={styles.menuText}>Trash</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ScrollView to display all messages */}
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
    paddingVertical: 15, // Increased padding to make space for the larger icon
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15, // Space between the icon and the text
  },
  icon: {
    marginRight: 1, // Space between icon and text
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
