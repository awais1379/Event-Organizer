import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthProvider";

const EventForm = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(AuthContext);

  const { event } = route.params || {};

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
    }
  }, [event]);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      if (event) {
        const eventRef = doc(db, "events", event.id);
        await updateDoc(eventRef, { title, description });
        Alert.alert("Success", "Event updated successfully!");
      } else {
        await addDoc(collection(db, "events"), {
          title,
          description,
          createdBy: user.uid,
          createdAt: new Date(),
        });
        Alert.alert("Success", "Event created successfully!");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save event: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Button
        title={event ? "Update Event" : "Create Event"}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default EventForm;
