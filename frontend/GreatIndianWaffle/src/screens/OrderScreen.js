import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart, placeOrder } from '../redux/slices/orderSlice';

import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

export default function OrderScreen({ navigation }) {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector(state => state.order);
  const { user } = useSelector(state => state.user);
  
  const [orderType, setOrderType] = useState('pickup'); // pickup or delivery
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash, card, or upi
  
  // Calculate total amount
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? 30 : 0;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryFee + tax;
  
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    } else {
      handleRemoveItem(itemId);
    }
  };
  
  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => dispatch(clearCart()) }
      ]
    );
  };
  
  const handlePlaceOrder = () => {
    if (!user) {
      Alert.alert(
        'Sign In Required',
        'Please sign in to place an order',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => navigation.navigate('SignIn') }
        ]
      );
      return;
    }
    
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before placing an order');
      return;
    }
    
    const orderData = {
      items: cart,
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : '',
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      total,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    dispatch(placeOrder(orderData));
    
    // Navigate to order confirmation
    // navigation.navigate('OrderConfirmation', { orderId: 'new-order-id' });
    
    // For now, just show an alert
    Alert.alert(
      'Order Placed',
      'Your order has been placed successfully!',
      [{ text: 'OK', onPress: () => dispatch(clearCart()) }]
    );
  };
  
  const renderCartItem = ({ item }) => (
    <Card style={styles.cartItem}>
      <View style={styles.cartItemContent}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
        </View>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemTotal}>
        <Text style={styles.itemTotalText}>₹{item.price * item.quantity}</Text>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
  
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
      <Button 
        title="Browse Menu" 
        onPress={() => navigation.navigate('Menu')} 
        type="primary"
        style={styles.browseButton}
      />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Header title="Your Order" />
      
      <View style={styles.orderTypeContainer}>
        <TouchableOpacity 
          style={[styles.orderTypeButton, orderType === 'pickup' && styles.selectedOrderType]}
          onPress={() => setOrderType('pickup')}
        >
          <Text style={[styles.orderTypeText, orderType === 'pickup' && styles.selectedOrderTypeText]}>Pickup</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.orderTypeButton, orderType === 'delivery' && styles.selectedOrderType]}
          onPress={() => setOrderType('delivery')}
        >
          <Text style={[styles.orderTypeText, orderType === 'delivery' && styles.selectedOrderTypeText]}>Delivery</Text>
        </TouchableOpacity>
      </View>
      
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
            style={styles.cartContainer}
          />
          
          <Card style={styles.orderSummary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{subtotal}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>₹{deliveryFee}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (5%)</Text>
              <Text style={styles.summaryValue}>₹{tax}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total}</Text>
            </View>
            
            <View style={styles.paymentMethodContainer}>
              <Text style={styles.paymentTitle}>Payment Method</Text>
              
              <View style={styles.paymentOptions}>
                <TouchableOpacity 
                  style={[styles.paymentOption, paymentMethod === 'cash' && styles.selectedPayment]}
                  onPress={() => setPaymentMethod('cash')}
                >
                  <Text style={[styles.paymentText, paymentMethod === 'cash' && styles.selectedPaymentText]}>Cash</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.paymentOption, paymentMethod === 'card' && styles.selectedPayment]}
                  onPress={() => setPaymentMethod('card')}
                >
                  <Text style={[styles.paymentText, paymentMethod === 'card' && styles.selectedPaymentText]}>Card</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.paymentOption, paymentMethod === 'upi' && styles.selectedPayment]}
                  onPress={() => setPaymentMethod('upi')}
                >
                  <Text style={[styles.paymentText, paymentMethod === 'upi' && styles.selectedPaymentText]}>UPI</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <Button 
                title="Clear Cart" 
                onPress={handleClearCart} 
                type="secondary"
                style={styles.clearButton}
              />
              
              <Button 
                title="Place Order" 
                onPress={handlePlaceOrder} 
                loading={loading}
                style={styles.placeOrderButton}
              />
            </View>
          </Card>
        </>
      ) : renderEmptyCart()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  orderTypeContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  orderTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedOrderType: {
    backgroundColor: '#FF6B6B',
  },
  orderTypeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B6B',
  },
  selectedOrderTypeText: {
    color: '#FFFFFF',
  },
  cartContainer: {
    flex: 1,
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    marginBottom: 12,
  },
  cartItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  itemTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
    marginTop: 4,
  },
  itemTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    fontSize: 14,
    color: '#E53935',
  },
  orderSummary: {
    margin: 16,
    marginTop: 0,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  paymentMethodContainer: {
    marginTop: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  selectedPayment: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF0F0',
  },
  paymentText: {
    fontSize: 14,
    color: '#666',
  },
  selectedPaymentText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
  },
  placeOrderButton: {
    flex: 2,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  browseButton: {
    width: 200,
  },
});
