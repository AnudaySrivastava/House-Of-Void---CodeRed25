import React from "react";
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Image, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App'; // Import the type from App.tsx

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="leaf" size={24} color="#2ecc71" />
            <Text style={styles.headerTitle}>Carbon Grove</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="tree" size={24} color="#2ecc71" />
          </TouchableOpacity>
        </View>

        {/* Carbon Emissions Tracker */}
        <View style={styles.carbonTrackerContainer}>
          <Text style={styles.carbonSectionTitle}>
            Your <Ionicons name="footsteps" size={20} color="#2ecc71" /> Carbon
          </Text>
          
          <View style={styles.carbonGaugeContainer}>
            <View style={styles.carbonGauge}>
              <Ionicons name="leaf" size={50} color="#2ecc71" />
              <Text style={styles.carbonValue}>251 Kg CO₂e</Text>
            </View>
          </View>

          <View style={styles.emissionStatsContainer}>
            <View style={styles.emissionStatItem}>
              <Ionicons name="flash" size={20} color="#f1c40f" />
              <Text style={styles.emissionStatText}>Electricity: 250 Kg CO₂e</Text>
            </View>
            <View style={styles.emissionStatItem}>
              <Ionicons name="trash" size={20} color="#3498db" />
              <Text style={styles.emissionStatText}>Waste: 1 Kg CO₂e</Text>
            </View>
          </View>

          <View style={styles.rewardsContainer}>
            <View style={styles.rewardItem}>
              <Ionicons name="coin" size={20} color="#f39c12" />
              <Text style={styles.rewardText}>111 Coins</Text>
            </View>
            <View style={styles.rewardItem}>
              <Ionicons name="wallet" size={20} color="#2ecc71" />
              <Text style={styles.rewardText}>81 Coins</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          {[
            { icon: 'flash', text: 'Electricity Bill Uploaded', points: 50 },
            { icon: 'trash', text: 'Waste Handed', points: 10 },
            { icon: 'power', text: 'Energy Saved', points: 40 },
            { icon: 'recycle', text: 'Plastic Recycled', points: 25 }
          ].map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <Ionicons name={activity.icon} size={24} color="#000" />
              <View style={styles.activityDetails}>
                <Text style={styles.activityText}>{activity.text}</Text>
                <Text style={styles.activityPoints}>Earned {activity.points} points</Text>
              </View>
            </View>
          ))}

          <View style={styles.scrollIndicator}>
            <Ionicons name="arrow-down" size={24} color="#7f8c8d" />
          </View>
        </View>

        {/* Eco Warriors Leaderboard */}
        <View style={styles.leaderboardContainer}>
          <Text style={styles.sectionTitle}>Eco Warriors Leaderboard</Text>
          
          <View style={styles.leaderboardStatsContainer}>
            {[
              { 
                title: 'Your Rank', 
                value: '#28', 
                icon: 'trophy', 
                gradient: ['#ff6b6b', '#ff9ff3'] 
              },
              { 
                title: 'Your Coins', 
                value: '192', 
                icon: 'wallet', 
                gradient: ['#54a0ff', '#5f27cd'] 
              },
              { 
                title: 'Total Warriors', 
                value: '1,200+', 
                icon: 'people', 
                gradient: ['#48dbfb', '#1abc9c'] 
              },
              { 
                title: 'Your Streak', 
                value: '5 days', 
                icon: 'flame', 
                gradient: ['#ff9ff3', '#6a5495'] 
              }
            ].map((stat, index) => (
              <LinearGradient 
                key={index} 
                colors={stat.gradient} 
                style={styles.leaderboardStatCard}
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}}
              >
                <Ionicons name={stat.icon} size={24} color="#fff" />
                <View>
                  <Text style={styles.leaderboardStatTitle}>{stat.title}</Text>
                  <Text style={styles.leaderboardStatValue}>{stat.value}</Text>
                </View>
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Footer Navigation */}
        <View style={styles.footerNavigation}>
          {[
            { 
              icon: 'cart', 
              text: 'Order', 
              route: 'Orders',
              onPress: () => navigation.navigate('Orders')
            },
            { 
              icon: 'leaf', 
              text: 'Garden', 
              route: 'Garden',
              onPress: () => {} // Add navigation when Garden screen is implemented
            },
            { 
              icon: 'home', 
              text: 'Home', 
              route: 'Home',
              onPress: () => navigation.navigate('Home')
            },
            { 
              icon: 'person', 
              text: 'Profile', 
              active: true, 
              route: 'Profile',
              onPress: () => {} // Current screen, no action needed
            }
          ].map((nav, index) => (
            <TouchableOpacity 
              key={index} 
              style={nav.active ? styles.activeNavItem : styles.navItem}
              onPress={nav.onPress}
            >
              <Ionicons 
                name={nav.icon} 
                size={24} 
                color={nav.active ? '#2ecc71' : '#7f8c8d'} 
              />
              <Text style={nav.active ? styles.activeNavText : styles.navText}>
                {nav.text}
              </Text>
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
    backgroundColor: '#000',
  },
  scrollView: {
    backgroundColor: '#000',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#000',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  carbonTrackerContainer: {
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
  },
  carbonSectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  carbonGaugeContainer: {
    width: width * 0.8,
    alignItems: 'center',
    marginBottom: 15,
  },
  carbonGauge: {
    alignItems: 'center',
  },
  carbonValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emissionStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  emissionStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emissionStatText: {
    color: '#fff',
    marginLeft: 5,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    color: '#fff',
    marginLeft: 5,
  },
  recentActivityContainer: {
    backgroundColor: '#000',
    padding: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  activityDetails: {
    marginLeft: 15,
  },
  activityText: {
    color: '#000',
    fontSize: 16,
  },
  activityPoints: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  scrollIndicator: {
    alignItems: 'center',
    marginTop: 10,
  },
  leaderboardContainer: {
    backgroundColor: '#000',
    padding: 15,
  },
  leaderboardStatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leaderboardStatCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  leaderboardStatTitle: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 10,
  },
  leaderboardStatValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  activeNavText: {
    color: '#2ecc71',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
