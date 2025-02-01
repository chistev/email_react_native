import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { IconButton, Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import mailData from './data/mail.json';

const Navbar = () => {
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
      <View>
        <View style={styles.navbar}>
          <IconButton icon="menu" size={24} iconColor="white" />
          <Text style={styles.title}>CSE186 Mail - Inbox</Text>
        </View>
        
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
