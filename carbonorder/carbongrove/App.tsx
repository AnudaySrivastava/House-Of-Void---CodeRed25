import React, { useState } from "react";
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Image, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

// Color Palette
const COLORS = {
  primary: '#2ecc71',      // Eco-friendly green
  secondary: '#3498db',    // Clean blue
  background: '#f4f4f4',   // Light gray background
  text: '#2c3e50',         // Dark gray for text
  accent: '#e74c3c',       // Vibrant red for actions
  lightGreen: '#90EE90',   // Light green for progress
  gray: '#bdc3c7'          // Gray for inactive states
};

export type RootStackParamList = {
  Orders: undefined;
  Home: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Mock Data (replace with actual data source later)
const PRODUCTS = [
  {
    id: 1,
    name: 'Tomato Local',
    price: 25,
    image: 'https://i.imgur.com/1tMFzp8.png', // Reverted to original image
    quantity: ['500g', '1kg']
  },
  {
    id: 2,
    name: 'Onion',
    price: 65,
    image: 'https://i.imgur.com/1tMFzp8.png',
    quantity: ['1kg', '2kg']
  },
  {
    id: 3,
    name: 'Carrot',
    price: 43,
    image: 'https://i.imgur.com/1tMFzp8.png',
    quantity: ['500g', '1kg']
  },
  {
    id: 4,
    name: 'Cucumber',
    price: 90,
    image: 'https://i.imgur.com/1tMFzp8.png',
    quantity: ['500g', '1kg']
  }
];

function OrderScreen({ navigation }) {
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const quantity = selectedQuantity[product.id] || product.quantity[0];
    const newCartItem = { ...product, selectedQuantity: quantity };
    setCartItems([...cartItems, newCartItem]);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Ionicons name="leaf-outline" size={24} color={COLORS.primary} />
        <Text style={styles.titleText}>Carbon Grove</Text>
        <View style={styles.headerRight}>
          <View style={styles.pointsContainer}>
            <Ionicons name="trophy-outline" size={16} color={COLORS.lightGreen} />
            <Text style={styles.pointsText}>192</Text>
            <Ionicons name="tree-outline" size={16} color={COLORS.primary} style={styles.pointsTreeIcon} />
          </View>
          <Ionicons name="tree-outline" size={24} color={COLORS.primary} />
        </View>
      </View>
    </View>
  );

  const renderOrderCard = (type, time) => (
    <LinearGradient 
      colors={type === 'Garden' ? ['#C6F4D6', '#F7F7F7'] : ['#C9E4CA', '#F7F7F7']}
      style={styles.orderCard}
    >
      <View style={styles.orderCardHeader}>
        <Ionicons 
          name={type === 'Garden' ? "leaf" : "trending-up"} 
          size={24} 
          color={COLORS.primary} 
        />
        <LinearGradient 
          colors={[COLORS.lightGreen, COLORS.gray]} 
          start={{x:0, y:0}} 
          end={{x:1, y:0}} 
          style={styles.progressBar}
        >
          <View style={styles.progressIndicator}></View>
        </LinearGradient>
      </View>
      <View style={styles.orderCardDetails}>
        <View style={styles.orderDetailsLeft}>
          <Text style={styles.orderType}>{type}</Text>
          <TouchableOpacity style={styles.orderDetailsButton}>
            <Text style={styles.orderDetailsButtonText}>Order Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderDetailsRight}>
          <Text style={styles.deliveryTime}>{time}</Text>
          <Text style={styles.deliveryLocation}>Doorstep</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderProductCard = (product) => {
    const [selectedQty, setSelectedQty] = useState(product.quantity[0]);

    return (
      <LinearGradient 
        colors={['#F0FFF0', '#E6F3E6']} 
        style={styles.productCard}
      >
        <Image 
          source={{uri: product.image}} 
          style={styles.productImage} 
          resizeMode="cover" 
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>₹{product.price}</Text>
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Qty</Text>
            <TouchableOpacity 
              style={styles.quantityDropdown}
              onPress={() => {
                const currentIndex = product.quantity.indexOf(selectedQty);
                const nextIndex = (currentIndex + 1) % product.quantity.length;
                setSelectedQty(product.quantity[nextIndex]);
              }}
            >
              <Text style={styles.quantityText}>{selectedQty}</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={() => addToCart({...product, selectedQty})}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  const renderFooterNavigation = () => (
    <View style={styles.footerContainer}>
      <View style={styles.footerIcons}>
        <TouchableOpacity style={styles.footerIconItem}>
          <Ionicons name="cart" size={24} color={COLORS.primary} />
          <Text style={styles.footerIconText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconItem}>
          <Ionicons name="leaf" size={24} color={COLORS.text} />
          <Text style={styles.footerIconText}>Garden</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerIconItem} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={24} color={COLORS.text} />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerIconItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person" size={24} color={COLORS.text} />
          <Text style={styles.footerIconText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderHeader()}
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Orders</Text>
          {renderOrderCard('Garden', 'Tomorrow, 10 AM - 2 PM')}
          {renderOrderCard('Farm', 'Tuesday, 2 PM - 6 PM')}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order Now</Text>
          <View style={styles.productGrid}>
            <View style={styles.productColumn}>
              {renderProductCard(PRODUCTS[0])}
              {renderProductCard(PRODUCTS[2])}
            </View>
            <View style={styles.productColumn}>
              {renderProductCard(PRODUCTS[1])}
              {renderProductCard(PRODUCTS[3])}
            </View>
          </View>
        </View>
      </ScrollView>
      
      {renderFooterNavigation()}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Orders"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Orders" component={OrderScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F3E6',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  pointsText: {
    marginLeft: 5,
    marginRight: 5,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  pointsTreeIcon: {
    marginLeft: 5,
  },
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  orderCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
    width: '92%',
    alignSelf: 'center',
  },
  orderCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  progressBar: {
    flex: 1,
    height: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  progressIndicator: {
    width: '60%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  orderCardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: '100%',
  },
  orderDetailsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  orderDetailsRight: {
    alignItems: 'flex-end',
    maxWidth: '40%',
  },
  orderType: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 15,
  },
  orderDetailsButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  orderDetailsButtonText: {
    color: 'white',
    fontSize: 12,
  },
  deliveryTime: {
    color: COLORS.gray,
    fontSize: 12,
    marginBottom: 5,
    flexShrink: 1,
  },
  deliveryLocation: {
    color: COLORS.text,
    fontSize: 12,
    flexShrink: 1,
  },
  productGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productColumn: {
    width: '48%',
  },
  productCard: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productDetails: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityLabel: {
    fontSize: 12,
    color: COLORS.text,
    marginRight: 10,
  },
  quantityDropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityText: {
    fontSize: 12,
    color: COLORS.text,
  },
  addToCartButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  addToCartButtonText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: 'bold',
  },
  footerContainer: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  footerIconItem: {
    alignItems: 'center',
  },
  footerIconText: {
    fontSize: 10,
    color: COLORS.text,
    marginTop: 5,
  }
});
