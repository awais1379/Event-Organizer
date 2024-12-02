import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const EventFormScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addEvent = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "events"), { title, description });
      alert("Event added successfully!");
      navigation.goBack();
    } catch (error) {
      alert("Error adding event: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Button title="Add Event" onPress={addEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});

export default EventFormScreen;
