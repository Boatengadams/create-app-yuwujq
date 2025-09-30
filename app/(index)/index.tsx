
import React from "react";
import { Stack, router } from "expo-router";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";

export default function HomeScreen() {
  const roleCards = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Oversee analytics, manage users, and approve reports.',
      icon: 'graduationcap',
      color: '#4F46E5',
      route: '/admin'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Manage attendance, enter scores, and track student performance.',
      icon: 'person.crop.rectangle.stack',
      color: '#10B981',
      route: '/teacher'
    },
    {
      id: 'parent',
      title: 'Parent',
      description: 'View your child\'s progress, attendance, and reports.',
      icon: 'person.2',
      color: '#F59E0B',
      route: '/parent'
    }
  ];

  const handleRolePress = (route: string) => {
    console.log(`Navigating to ${route}`);
    router.push(route as any);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.welcomeText}>Welcome to <Text style={styles.brandText}>EduTec</Text></Text>
            <Text style={styles.subtitleText}>Your AI-Powered School Assistant</Text>
          </View>

          {/* Role Cards */}
          <View style={styles.cardsContainer}>
            {roleCards.map((card) => (
              <Pressable
                key={card.id}
                style={[styles.roleCard, { backgroundColor: card.color }]}
                onPress={() => handleRolePress(card.route)}
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <IconSymbol 
                      name={card.icon as any} 
                      size={40} 
                      color="white" 
                    />
                  </View>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E34',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  brandText: {
    color: '#60A5FA',
  },
  subtitleText: {
    fontSize: 18,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
  },
  cardsContainer: {
    gap: 20,
  },
  roleCard: {
    borderRadius: 16,
    padding: 24,
    minHeight: 160,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
});
