import { useState, useRef } from "react"; 
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IconButton, Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import mailData from './data/mail.json';
import styles from "./styles";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [selectedEmail, setSelectedEmail] = useState(null); // Track selected email
  const sidebarRef = useRef(null);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: 'white',
    },
  };

  const folder = mailData.find(folder => folder.name === selectedFolder);
  const emails = folder ? folder.mail : [];

  const closeMenu = () => setIsMenuOpen(false);
  const closeEmail = () => setSelectedEmail(null); // Close email

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>

        {/* Navbar */}
        <View style={styles.navbar}>
          <IconButton 
            icon="menu" 
            size={24} 
            color="white" 
            onPress={() => setIsMenuOpen(!isMenuOpen)} 
          />
          <Text style={styles.title}>CSE186 Mail - {selectedFolder}</Text>
          {selectedEmail && (
            <IconButton 
              icon="close" 
              size={24} 
              color="white" 
              onPress={closeEmail} 
              style={styles.closeButton} 
            />
          )}
        </View>

        {/* Sidebar Menu */}
        {isMenuOpen && (
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}

        {isMenuOpen && (
          <View ref={sidebarRef} style={styles.sidebar}>
            {["Inbox", "Important", "Trash"].map((folderName) => (
              <TouchableOpacity 
                key={folderName}
                onPress={() => { setSelectedFolder(folderName); setIsMenuOpen(false); }} 
                style={styles.menuItem}
              >
                <IconButton 
                  icon={folderName === "Inbox" ? "inbox" : folderName === "Important" ? "star" : "delete"} 
                  size={20} 
                  color="black" 
                  style={styles.icon} 
                />
                <Text style={styles.menuText}>{folderName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Email List */}
        <ScrollView style={styles.messagesContainer} keyboardShouldPersistTaps="handled">
          {emails.map((email) => (
            <TouchableOpacity 
              key={email.id} 
              style={styles.messageRow} 
              onPress={() => setSelectedEmail(email)}
            >
              <Text style={styles.sender}>{email.from.name}</Text>
              <Text style={styles.message} numberOfLines={1}>{email.subject}</Text>
              <Text style={styles.time}>
                {new Date(email.received).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    </PaperProvider>
  );
};

export default Navbar;
