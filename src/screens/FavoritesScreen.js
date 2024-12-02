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

  const fetchFavoritesLive = () => {
    const favoritesRef = collection(db, "favorites");
    const q = query(favoritesRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favoriteEvents = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        docId: doc.id,
        ...doc.data(),
      }));
      setFavorites(favoriteEvents);
    });

    return unsubscribe;
  };

  const toggleFavorite = async (event) => {
    try {
      const favorite = favorites.find((fav) => fav.id === event.id);

      if (favorite) {
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
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onToggleFavorite={toggleFavorite}
            isFavorite={true}
            currentUserId={user?.uid}
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
