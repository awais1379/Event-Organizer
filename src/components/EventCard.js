import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventCard = ({
  event,
  onToggleFavorite,
  isFavorite,
  onDelete,
  onEdit,
  currentUserId,
}) => {
  const isCreatedByUser = event.createdBy === currentUserId && !!onDelete;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <TouchableOpacity onPress={() => onToggleFavorite(event)}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color="gold"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.actions}>
        {isCreatedByUser && (
          <TouchableOpacity
            onPress={() => onEdit(event)}
            style={styles.iconButton}
          >
            <Ionicons name="create-outline" size={24} color="blue" />
          </TouchableOpacity>
        )}
        {isCreatedByUser && (
          <TouchableOpacity
            onPress={() => onDelete(event.id)}
            style={styles.iconButton}
          >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 25,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default EventCard;
