import React, { useEffect, useState, useContext } from "react";
import { View, Button, StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  deleteDoc,
  addDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthProvider";
import EventCard from "../components/EventCard";

const HomeScreen = () => {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  // Real-time listener for events
  const fetchEventsLive = () => {
    const eventsRef = collection(db, "events");

    const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
      const fetchedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    });

    return unsubscribe; // Clean up the listener
  };

  // Real-time listener for favorites
  const fetchFavoritesLive = () => {
    const favoritesRef = collection(db, "favorites");
    const q = query(favoritesRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favoriteIds = snapshot.docs.map((doc) => doc.data().id);
      setFavorites(favoriteIds);
    });

    return unsubscribe; // Clean up the listener
  };

  const toggleFavorite = async (event) => {
    try {
      const isFavorite = favorites.includes(event.id);

      if (isFavorite) {
        // Find and remove the favorite document
        const favoritesRef = collection(db, "favorites");
        const q = query(
          favoritesRef,
          where("id", "==", event.id),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
      } else {
        // Add to favorites
        await addDoc(collection(db, "favorites"), {
          ...event,
          userId: user.uid,
        });
      }
    } catch (error) {
      Alert.alert("Error toggling favorite: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribeEvents = fetchEventsLive();
    const unsubscribeFavorites = fetchFavoritesLive();
    return () => {
      unsubscribeEvents();
      unsubscribeFavorites();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Add Event"
        onPress={() => navigation.navigate("EventForm")}
      />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(item.id)}
            currentUserId={user.uid}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default HomeScreen;
