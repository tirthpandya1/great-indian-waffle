import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../redux/slices/menuSlice';

import Header from '../components/Header';
import MenuItem from '../components/MenuItem';
import Card from '../components/Card';

export default function MenuScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, categories, loading, error } = useSelector(state => state.menu);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from API
  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  // Set up placeholder menu items if API call is not implemented
  useEffect(() => {
    if (items.length === 0 && !loading) {
      // Placeholder menu items
      const placeholderItems = [
        {
          id: 1,
          name: 'Classic Masala Waffle',
          description: 'Traditional Indian spices infused waffle with a blend of aromatic spices',
          price: 149,
          category: 'Savory Waffles',
          image: require('../assets/classic_masala_waffle.jpg')
        },
        {
          id: 2,
          name: 'Chocolate Chai Waffle',
          description: 'Rich chocolate waffle with chai spice blend and whipped cream',
          price: 179,
          category: 'Sweet Waffles',
          image: require('../assets/chocolate_chai_waffle.jpg')
        },
        {
          id: 3,
          name: 'Paneer Tikka Waffle',
          description: 'Savory waffle topped with spicy paneer tikka and mint chutney',
          price: 199,
          category: 'Savory Waffles',
          image: require('../assets/classic_masala_waffle.jpg')
        },
        {
          id: 4,
          name: 'Mango Delight Waffle',
          description: 'Sweet waffle with fresh mango slices and mango cream',
          price: 189,
          category: 'Sweet Waffles',
          image: require('../assets/chocolate_chai_waffle.jpg')
        },
      ];
      setMenuItems(placeholderItems);
    } else {
      setMenuItems(items);
    }
  }, [items, loading]);

  // Get unique categories from menu items
  const allCategories = ['All', ...new Set(menuItems.map(item => item.category))];

  // Filter menu items by selected category
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleItemPress = (item) => {
    // Navigate to item detail screen
    // navigation.navigate('ItemDetail', { item });
    console.log('Item pressed:', item);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem
      ]}
      onPress={() => handleCategorySelect(item)}
    >
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <MenuItem item={item} onPress={handleItemPress} />
  );

  return (
    <View style={styles.container}>
      <Header title="Our Menu" />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      ) : error ? (
        <Card style={styles.errorCard}>
          <Text style={styles.errorText}>Failed to load menu. Please try again.</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => dispatch(fetchMenuItems())}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </Card>
      ) : (
        <>
          <FlatList
            horizontal
            data={allCategories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item}
            style={styles.categoriesList}
            showsHorizontalScrollIndicator={false}
          />
          
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.menuList}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorCard: {
    margin: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#E53935',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  categoriesList: {
    maxHeight: 50,
    marginVertical: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  selectedCategoryItem: {
    backgroundColor: '#FF6B6B',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  menuList: {
    padding: 16,
  },
});
