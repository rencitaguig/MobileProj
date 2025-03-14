import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  );

  // Sample user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
  };

  // Sample order history
  const orders = [
    { id: "1001", date: "2023-06-15", status: "Delivered", total: 149.97 },
    { id: "1002", date: "2023-05-22", status: "Delivered", total: 89.99 },
    { id: "1003", date: "2023-04-10", status: "Cancelled", total: 59.99 },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const menuItems = [
    { icon: "user", title: "Edit Profile", onPress: () => {} },
    { icon: "map-pin", title: "Shipping Addresses", onPress: () => {} },
    { icon: "credit-card", title: "Payment Methods", onPress: () => {} },
    {
      icon: "heart",
      title: "Wishlist",
      onPress: () => router.push("/wishlist"),
    },
    { icon: "bell", title: "Notifications", onPress: () => {} },
    { icon: "settings", title: "Settings", onPress: () => {} },
    { icon: "help-circle", title: "Help & Support", onPress: () => {} },
    { icon: "log-out", title: "Logout", onPress: () => {}, danger: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "My Profile",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={styles.imageActionButton}
                onPress={takePhoto}
              >
                <Feather name="camera" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageActionButton}
                onPress={pickImage}
              >
                <Feather name="image" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Order History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => router.push("/orders")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderItem}
              onPress={() => router.push(`/order/${order.id}`)}
            >
              <View>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    order.status === "Delivered"
                      ? styles.deliveredBadge
                      : order.status === "Processing"
                        ? styles.processingBadge
                        : styles.cancelledBadge,
                  ]}
                >
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Feather
                  name={item.icon}
                  size={20}
                  color={item.danger ? "#e53e3e" : "#2d3748"}
                  style={styles.menuIcon}
                />
                <Text
                  style={[styles.menuText, item.danger && styles.dangerText]}
                >
                  {item.title}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    marginRight: 10,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageActions: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
  },
  imageActionButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2d3748",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    backgroundColor: "white",
    marginTop: 15,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAllText: {
    color: "#3182ce",
    fontWeight: "600",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderId: {
    fontWeight: "600",
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
  },
  orderRight: {
    alignItems: "flex-end",
  },
  orderTotal: {
    fontWeight: "600",
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  deliveredBadge: {
    backgroundColor: "#c6f6d5",
  },
  processingBadge: {
    backgroundColor: "#bee3f8",
  },
  cancelledBadge: {
    backgroundColor: "#fed7d7",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  menuSection: {
    backgroundColor: "white",
    marginTop: 15,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
  },
  dangerText: {
    color: "#e53e3e",
  },
});

export default Profile;
