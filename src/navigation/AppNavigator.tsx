import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import { COLORS, SPACING } from '../constants/theme';
import { NavigationParams } from '../types';

// Screen imports
import {
  HomeScreen,
  TransactionsScreen,
  AddTransactionScreen,
  BudgetScreen,
  GoalsScreen,
  InsightsScreen,
  EducationScreen,
  ProfileScreen,
} from '../screens';

const Tab = createBottomTabNavigator<NavigationParams>();
const Stack = createStackNavigator<NavigationParams>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Transactions':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Budget':
              iconName = focused ? 'pie-chart' : 'pie-chart-outline';
              break;
            case 'Goals':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'Education':
              iconName = focused ? 'school' : 'school-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return (
            <View style={[styles.tabIconContainer, focused && styles.tabIconFocused]}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{ title: 'Transactions' }}
      />
      <Tab.Screen 
        name="Budget" 
        component={BudgetScreen}
        options={{ title: 'Budget' }}
      />
      <Tab.Screen 
        name="Goals" 
        component={GoalsScreen}
        options={{ title: 'Goals' }}
      />
      <Tab.Screen 
        name="Education" 
        component={EducationScreen}
        options={{ title: 'Learn' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={{
      dark: true,
      colors: {
        primary: COLORS.primary,
        background: COLORS.background,
        card: COLORS.card,
        text: COLORS.textPrimary,
        border: COLORS.cardBorder,
        notification: COLORS.primary,
      },
      fonts: {
        regular: {
          fontFamily: 'System',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'System',
          fontWeight: '500',
        },
        bold: {
          fontFamily: 'System',
          fontWeight: 'bold',
        },
        heavy: {
          fontFamily: 'System',
          fontWeight: '700',
        },
      },
    }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen 
          name="AddTransaction" 
          component={AddTransactionScreen}
          options={{
            headerShown: true,
            title: 'Add Transaction',
            headerStyle: {
              backgroundColor: COLORS.background,
            },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: {
              color: COLORS.textPrimary,
            },
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="Insights" 
          component={InsightsScreen}
          options={{
            headerShown: true,
            title: 'Financial Insights',
            headerStyle: {
              backgroundColor: COLORS.background,
            },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: {
              color: COLORS.textPrimary,
            },
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            headerShown: true,
            title: 'Profile',
            headerStyle: {
              backgroundColor: COLORS.background,
            },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: {
              color: COLORS.textPrimary,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.backgroundSecondary,
    borderTopColor: COLORS.cardBorder,
    borderTopWidth: 1,
    paddingBottom: SPACING.sm,
    paddingTop: SPACING.sm,
    height: 80,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tabIconFocused: {
    backgroundColor: `${COLORS.primary}20`,
  },
});

export default AppNavigator;
