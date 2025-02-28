import { useState, useRef } from "react"; 
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IconButton, Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import mailData from './data/mail.json';
import styles from "./styles";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("Inbox");

  // Create a ref for the sidebar to detect taps outside
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleTouchOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      closeMenu();
    }
  };

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
          <Text style={styles.title}>{`CSE186 Mail - ${selectedFolder}`}</Text>
        </View>

        {/* Sidebar Menu */}
        {isMenuOpen && (
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}
        
        {isMenuOpen && (
          <View 
            ref={sidebarRef} 
            style={styles.sidebar}>
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
        <ScrollView style={styles.messagesContainer} keyboardShouldPersistTaps="handled">
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

export default Navbar;
