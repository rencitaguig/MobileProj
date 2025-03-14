import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { products } from "../src/backend/models/Product";

const Home = () => {
  const router = useRouter();
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.filter((product) => product.isNew).slice(0, 4);

  const categories = [
    { id: "1", name: "Men's Clothing", icon: "👔", itemCount: 120 },
    { id: "2", name: "Women's Clothing", icon: "👗", itemCount: 150 },
    { id: "3", name: "Accessories", icon: "👜", itemCount: 85 },
    { id: "4", name: "Footwear", icon: "👟", itemCount: 95 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          headerTitle: "FASHION STORE",
          headerTitleStyle: styles.headerTitle,
          headerRight: () => (
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => router.push("/search")}>
                <Feather
                  name="search"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/cart")}>
                <Feather
                  name="shopping-cart"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <Feather name="user" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80",
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Summer Collection 2024</Text>
            <Text style={styles.heroSubtitle}>
              Discover the latest trends in fashion with our exclusive summer
              collection.
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/products")}
              >
                <Feather
                  name="shopping-bag"
                  size={18}
                  color="black"
                  style={styles.buttonIcon}
                />
                <Text style={styles.primaryButtonText}>Shop Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/lookbook")}
              >
                <Text style={styles.secondaryButtonText}>View Lookbook</Text>
                <Feather
                  name="arrow-right"
                  size={18}
                  color="white"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.saleBadge}>
            <Text style={styles.saleBadgeText}>Sale Up to 50% Off</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => router.push(`/category/${category.id}`)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>
                  {category.itemCount} items
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => router.push("/products")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <View style={styles.productImageContainer}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                  {product.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.badgeText}>New</Text>
                    </View>
                  )}
                  {product.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.badgeText}>
                        {product.discount}% OFF
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    {product.discount > 0 ? (
                      <>
                        <Text style={styles.discountedPrice}>
                          $
                          {(
                            product.price *
                            (1 - product.discount / 100)
                          ).toFixed(2)}
                        </Text>
                        <Text style={styles.originalPrice}>
                          ${product.price.toFixed(2)}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.price}>
                        ${product.price.toFixed(2)}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* New Arrivals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity onPress={() => router.push("/new-arrivals")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {newArrivals.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <View style={styles.productImageContainer}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                  {product.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.badgeText}>New</Text>
                    </View>
                  )}
                  {product.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.badgeText}>
                        {product.discount}% OFF
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    {product.discount > 0 ? (
                      <>
                        <Text style={styles.discountedPrice}>
                          $
                          {(
                            product.price *
                            (1 - product.discount / 100)
                          ).toFixed(2)}
                        </Text>
                        <Text style={styles.originalPrice}>
                          ${product.price.toFixed(2)}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.price}>
                        ${product.price.toFixed(2)}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promotional Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoTitle}>Summer Sale - Up to 50% Off</Text>
          <Text style={styles.promoSubtitle}>
            Enjoy exclusive discounts on our summer collection. Limited time
            offer available online and in stores.
          </Text>
          <TouchableOpacity
            style={styles.promoButton}
            onPress={() => router.push("/sale")}
          >
            <Text style={styles.promoButtonText}>Shop the Sale</Text>
            <Feather
              name="arrow-right"
              size={18}
              color="black"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
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
  headerTitle: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  heroBanner: {
    height: 400,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  heroContent: {
    padding: 20,
    height: "100%",
    justifyContent: "center",
    maxWidth: 400,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 20,
  },
  heroButtons: {
    flexDirection: "column",
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonIcon: {
    marginHorizontal: 5,
  },
  saleBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#e53e3e",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  saleBadgeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  sectionContainer: {
    padding: 15,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#3182ce",
    fontWeight: "600",
  },
  categoriesContainer: {
    marginTop: 10,
  },
  categoryCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  categoryName: {
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  categoryCount: {
    fontSize: 12,
    color: "#666",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    width: "48%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImageContainer: {
    height: 150,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  newBadge: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#3182ce",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  discountBadge: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#e53e3e",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontWeight: "600",
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
  discountedPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#e53e3e",
  },
  originalPrice: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
  promoBanner: {
    backgroundColor: "#2d3748",
    padding: 20,
    marginVertical: 15,
    alignItems: "center",
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  promoSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 15,
    textAlign: "center",
  },
  promoButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  promoButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "black",
  },
});

export default Home;
