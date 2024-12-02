import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthProvider";
import EventCard from "../components/EventCard";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  // Real-time listener for favorites
  const fetchFavoritesLive = () => {
    const favoritesRef = collection(db, "favorites");
    const q = query(favoritesRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favoriteEvents = snapshot.docs.map((doc) => ({
        id: doc.data().id, // Original event ID
        docId: doc.id, // Firestore document ID for favorites
        ...doc.data(),
      }));
      setFavorites(favoriteEvents);
    });

    return unsubscribe; // Clean up the listener
  };

  const toggleFavorite = async (event) => {
    try {
      const favorite = favorites.find((fav) => fav.id === event.id);

      if (favorite) {
        // Remove from favorites using the Firestore document ID
        await deleteDoc(doc(db, "favorites", favorite.docId));
        Alert.alert("Removed from favorites!");
      }
    } catch (error) {
      Alert.alert("Error toggling favorite: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribeFavorites = fetchFavoritesLive();
    return () => unsubscribeFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.docId} // Use Firestore document ID as the key
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onToggleFavorite={toggleFavorite}
            isFavorite={true} // All items in the favorites list are favorites
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

export default FavoritesScreen;
