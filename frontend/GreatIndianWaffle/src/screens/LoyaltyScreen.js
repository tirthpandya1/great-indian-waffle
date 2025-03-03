import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function LoyaltyScreen() {
  // Placeholder loyalty points
  const loyaltyPoints = 150;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loyalty Program</Text>
      
      <View style={styles.pointsCard}>
        <Image 
          source={require('../assets/loyalty_icon.png')} 
          style={styles.loyaltyIcon}
          resizeMode="contain"
        />
        <Text style={styles.pointsTitle}>Your Points</Text>
        <Text style={styles.pointsValue}>{loyaltyPoints}</Text>
        <Text style={styles.pointsInfo}>Earn 10 points for every ₹100 spent</Text>
      </View>
      
      <View style={styles.rewardsSection}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        
        <View style={styles.rewardItem}>
          <Text style={styles.rewardTitle}>Free Waffle</Text>
          <Text style={styles.rewardPoints}>200 points</Text>
        </View>
        
        <View style={styles.rewardItem}>
          <Text style={styles.rewardTitle}>20% Off Your Order</Text>
          <Text style={styles.rewardPoints}>150 points</Text>
        </View>
        
        <View style={styles.rewardItem}>
          <Text style={styles.rewardTitle}>Free Beverage</Text>
          <Text style={styles.rewardPoints}>100 points</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pointsCard: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loyaltyIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  pointsTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  pointsInfo: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  rewardsSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rewardTitle: {
    fontSize: 16,
  },
  rewardPoints: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});
