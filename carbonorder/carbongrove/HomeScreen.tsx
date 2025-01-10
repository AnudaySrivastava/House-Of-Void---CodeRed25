import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  WastePickup: undefined;
  Orders: undefined;
  Profile: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [currentCommunityPost, setCurrentCommunityPost] = useState(0);
  const [activeEarnPointsTab, setActiveEarnPointsTab] = useState('watchAds');

  const communityPosts = [
    {
      id: 1,
      username: '@orange_72',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      caption: 'Marathon Miles for Green Cause',
      description: 'Ran 10km to raise awareness for local tree planting initiative'
    },
    {
      id: 2,
      username: '@eco_warrior_23',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      caption: 'Beach Cleanup Champion',
      description: 'Collected 50kg of plastic waste from local beach'
    }
  ];

  const earnPointsTabs = [
    { key: 'watchAds', label: 'Watch Ads', points: 50 },
    { key: 'promotions', label: 'Promotions', points: 100 },
    { key: 'supportNGOs', label: 'Support NGOs', points: 150 }
  ];

  const renderEarnPointsContent = () => {
    switch(activeEarnPointsTab) {
      case 'watchAds':
        return (
          <View style={styles.earnPointsContent}>
            <Text>Watch short ads and earn points instantly!</Text>
          </View>
        );
      case 'promotions':
        return (
          <View style={styles.earnPointsContent}>
            <Text>Check out our latest promotional offers.</Text>
          </View>
        );
      case 'supportNGOs':
        return (
          <View style={styles.earnPointsContent}>
            <Text>Support environmental NGOs and make a difference.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header Section with Tree Background */}
      <LinearGradient
        colors={['rgba(230,243,230,0.8)', 'rgba(230,243,230,0.9)']}
        style={styles.headerBackground}
      >
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1448375240586-882707f1c698?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJlZXxlbnwwfHwwfHx8MA%3D%3D' }}
          style={styles.headerBackgroundImage}
          blurRadius={2}
        />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.leafIcon}>🍃</Text>
            <Text style={styles.headerTitle}>Carbon Grove</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>192 🌳</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView>
        {/* Main Banner Section */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1448375240586-882707f1c698?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJlZXxlbnwwfHwwfHx8MA%3D%3D' }}
            style={styles.bannerBackgroundImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>
              WELCOME TO <Text style={styles.brandName}>CARBON GROVE</Text>
            </Text>
            <Text style={styles.bannerSubtitle}>
              <Text style={styles.italicText}>Join us in reducing carbon and building a greener tomorrow.</Text>
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient 
                  colors={['#FFFFFF', '#E6F2FF']} 
                  style={styles.actionButtonGradient}
                >
                  <Text style={styles.actionButtonText}>📍 Upload Bill</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('WastePickup')}
              >
                <LinearGradient 
                  colors={['#FFFFFF', '#E6F2FF']} 
                  style={styles.actionButtonGradient}
                >
                  <Text style={styles.actionButtonText}>♻️ Waste Pickup</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient 
                  colors={['#FFFFFF', '#E6F2FF']} 
                  style={styles.actionButtonGradient}
                >
                  <Text style={styles.actionButtonText}>🔄 Recycle Items</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient 
                  colors={['#FFFFFF', '#E6F2FF']} 
                  style={styles.actionButtonGradient}
                >
                  <Text style={styles.actionButtonText}>💳 Wallet</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Earn Points Section */}
          <View style={styles.earnPointsSection}>
            <View style={styles.earnPointsHeader}>
              <Text style={styles.sectionTitle}>Earn Points</Text>
            </View>
            
            <View style={styles.earnPointsTabContainer}>
              {earnPointsTabs.map((tab) => (
                <TouchableOpacity 
                  key={tab.key}
                  style={[
                    styles.earnPointsTab, 
                    activeEarnPointsTab === tab.key && styles.activeEarnPointsTab
                  ]}
                  onPress={() => setActiveEarnPointsTab(tab.key)}
                >
                  <Text 
                    style={[
                      styles.earnPointsTabText, 
                      activeEarnPointsTab === tab.key && styles.activeEarnPointsTabText
                    ]}
                  >
                    {tab.label} ({tab.points} pts)
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {renderEarnPointsContent()}
          </View>

          {/* Community Section */}
          <View style={styles.communitySection}>
            <Text style={styles.sectionTitle}>Community Highlights</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.communityPostsContainer}
            >
              {communityPosts.map((post, index) => (
                <View key={post.id} style={styles.communityPostCard}>
                  <Image 
                    source={{ uri: post.image }}
                    style={styles.communityPostImage}
                  />
                  <View style={styles.communityPostDetails}>
                    <Text style={styles.communityPostUsername}>{post.username}</Text>
                    <Text style={styles.communityPostCaption}>{post.caption}</Text>
                    <Text style={styles.communityPostDescription}>{post.description}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomNav}>
        {[
          { icon: '🛒', text: 'Order', route: 'Orders' },
          { icon: '🌱', text: 'Garden', route: 'Garden' },
          { icon: '🍃', text: 'Home', active: true, route: 'Home' },
          { icon: '👤', text: 'Profile', route: 'Profile' }
        ].map((nav, index) => (
          <TouchableOpacity 
            key={index} 
            style={nav.active ? styles.activeNavItem : styles.navItem}
            onPress={() => {
              if (nav.route !== 'Home') {
                navigation.navigate(nav.route);
              }
            }}
          >
            <Text style={nav.active ? styles.activeNavText : styles.navText}>{nav.icon}</Text>
            <Text style={nav.active ? styles.activeNavText : styles.navText}>{nav.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  headerBackground: {
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leafIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsContainer: {
    backgroundColor: '#E6F3E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  pointsText: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  bannerContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 15,
  },
  bannerBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brandName: {
    color: '#2ecc71',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  italicText: {
    fontStyle: 'italic',
  },
  content: {
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    marginBottom: 15,
  },
  actionButtonGradient: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  communitySection: {
    marginBottom: 20,
  },
  communityPostsContainer: {
    paddingVertical: 10,
  },
  communityPostCard: {
    width: width * 0.7,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  communityPostImage: {
    width: '100%',
    height: 150,
  },
  communityPostDetails: {
    padding: 10,
  },
  communityPostUsername: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  communityPostCaption: {
    fontSize: 16,
    color: '#2ecc71',
    marginVertical: 5,
  },
  communityPostDescription: {
    color: '#7f8c8d',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  earnPointsSection: {
    marginBottom: 20,
  },
  earnPointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  earnPointsTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  earnPointsTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  activeEarnPointsTab: {
    backgroundColor: '#2ecc71',
  },
  earnPointsTabText: {
    color: '#2c3e50',
    fontSize: 12,
    fontWeight: '500',
  },
  activeEarnPointsTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  earnPointsContent: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  }
});

export default HomeScreen;
