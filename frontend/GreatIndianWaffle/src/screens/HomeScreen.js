import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchFeaturedItems } from '../redux/slices/menuSlice';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { featuredItems, loading } = useSelector(state => state.menu);
  
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: 'Summer Special',
      description: 'Get 20% off on all sweet waffles',
      image: require('../assets/promotion1.jpg'),
      backgroundColor: '#FFD700'
    },
    {
      id: 2,
      title: 'Combo Deal',
      description: 'Buy 2 waffles and get a beverage free',
      image: require('../assets/promotion2.jpg'),
      backgroundColor: '#FF6B6B'
    },
    {
      id: 3,
      title: 'Happy Hours',
      description: '15% off between 3-6 PM daily',
      image: require('../assets/promotion3.jpg'),
      backgroundColor: '#4CAF50'
    }
  ]);
  
  // Placeholder featured items if API call is not implemented
  const placeholderFeaturedItems = [
    {
      id: 1,
      name: 'Classic Masala Waffle',
      description: 'Traditional Indian spices infused waffle',
      price: 149,
      image: require('../assets/classic_masala_waffle.jpg'),
      rating: 4.8
    },
    {
      id: 2,
      name: 'Chocolate Chai Waffle',
      description: 'Rich chocolate waffle with chai spice blend',
      price: 179,
      image: require('../assets/chocolate_chai_waffle.jpg'),
      rating: 4.5
    }
  ];
  
  useEffect(() => {
    // Fetch featured items from API
    dispatch(fetchFeaturedItems());
  }, [dispatch]);
  
  const displayedFeaturedItems = featuredItems.length > 0 ? featuredItems : placeholderFeaturedItems;
  
  const handleViewMenu = () => {
    navigation.navigate('Menu');
  };
  
  const handleOrderNow = () => {
    navigation.navigate('Order');
  };
  
  const handlePromotionPress = (promotion) => {
    // Handle promotion press
    console.log('Promotion pressed:', promotion);
  };
  
  const handleFeaturedItemPress = (item) => {
    // Navigate to item detail or add to cart
    console.log('Featured item pressed:', item);
  };
  
  const renderPromotion = (promotion, index) => (
    <TouchableOpacity 
      key={promotion.id}
      style={[styles.promotionItem, { backgroundColor: promotion.backgroundColor }]}
      onPress={() => handlePromotionPress(promotion)}
      activeOpacity={0.8}
    >
      <View style={styles.promotionContent}>
        <Text style={styles.promotionTitle}>{promotion.title}</Text>
        <Text style={styles.promotionDescription}>{promotion.description}</Text>
        <Text style={styles.promotionCta}>Tap to view</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderFeaturedItem = (item, index) => (
    <Card 
      key={item.id}
      style={styles.featuredItem}
      onPress={() => handleFeaturedItemPress(item)}
    >
      <Image source={item.image} style={styles.featuredItemImage} />
      <View style={styles.featuredItemContent}>
        <Text style={styles.featuredItemName}>{item.name}</Text>
        <View style={styles.featuredItemDetails}>
          <Text style={styles.featuredItemPrice}>₹{item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.ratingIcon}>★</Text>
          </View>
        </View>
      </View>
    </Card>
  );
  
  return (
    <View style={styles.container}>
      <Header title="Great Indian Waffle" transparent />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <ImageBackground
          source={require('../assets/hero_background.jpg')}
          style={styles.heroSection}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Great Indian Waffle</Text>
            <Text style={styles.heroSubtitle}>Delicious Waffles, Authentic Flavors</Text>
            <View style={styles.heroButtons}>
              <Button 
                title="View Menu" 
                onPress={handleViewMenu} 
                type="secondary"
                style={styles.heroButton}
              />
              <Button 
                title="Order Now" 
                onPress={handleOrderNow} 
                style={styles.heroButton}
              />
            </View>
          </View>
        </ImageBackground>
        
        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            {user ? `Welcome back, ${user.displayName || 'Valued Customer'}!` : 'Welcome to Great Indian Waffle'}
          </Text>
          <Text style={styles.welcomeText}>
            Experience the fusion of traditional Indian flavors with modern waffle recipes. 
            Our waffles are made with premium ingredients and authentic spices to give you 
            a unique culinary experience.
          </Text>
        </View>
        
        {/* Promotions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promotionsContainer}
          >
            {promotions.map(renderPromotion)}
          </ScrollView>
        </View>
        
        {/* Featured Items Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <View style={styles.featuredItemsContainer}>
            {displayedFeaturedItems.map(renderFeaturedItem)}
          </View>
        </View>
        
        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Our Story</Text>
          <Text style={styles.aboutText}>
            Great Indian Waffle was founded with a passion for bringing innovative 
            fusion cuisine to waffle lovers. We combine traditional Indian flavors 
            with modern waffle recipes to create a unique dining experience.
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2018</Text>
              <Text style={styles.statLabel}>Established</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15+</Text>
              <Text style={styles.statLabel}>Waffle Varieties</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Locations</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  heroSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  heroButton: {
    width: 130,
    marginHorizontal: 10,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  promotionsContainer: {
    paddingRight: 20,
  },
  promotionItem: {
    width: width * 0.8,
    height: 120,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 15,
    justifyContent: 'center',
  },
  promotionContent: {
    flex: 1,
    justifyContent: 'center',
  },
  promotionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  promotionCta: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  featuredItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featuredItem: {
    width: '48%',
    marginBottom: 15,
    overflow: 'hidden',
  },
  featuredItemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  featuredItemContent: {
    padding: 10,
  },
  featuredItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  featuredItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF8F00',
    marginRight: 2,
  },
  ratingIcon: {
    fontSize: 12,
    color: '#FF8F00',
  },
  aboutSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
