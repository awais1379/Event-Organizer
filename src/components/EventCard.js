import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventCard = ({ event, onToggleFavorite, isFavorite, currentUserId }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggleFavorite(event)}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color="gold"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  title: { fontWeight: "bold", fontSize: 18 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default EventCard;
