
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { Button } from "@/components/button";
import { IconSymbol } from "@/components/IconSymbol";

export default function TeacherScreen() {
  const teacherFeatures = [
    {
      title: 'Attendance Management',
      description: 'Mark and track student attendance efficiently',
      icon: 'checkmark.square'
    },
    {
      title: 'Grade Entry',
      description: 'Enter and manage student scores and assessments',
      icon: 'pencil'
    },
    {
      title: 'Student Progress',
      description: 'Monitor individual student performance trends',
      icon: 'chart.line.uptrend.xyaxis'
    },
    {
      title: 'Class Schedule',
      description: 'View and manage your teaching schedule',
      icon: 'calendar'
    }
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Teacher Portal",
          headerStyle: { backgroundColor: '#10B981' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <IconSymbol name="person.crop.rectangle.stack" size={48} color="#10B981" />
            </View>
            <Text style={styles.title}>Teacher Portal</Text>
            <Text style={styles.subtitle}>Empower your teaching experience</Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {teacherFeatures.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <IconSymbol name={feature.icon as any} size={24} color="#10B981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Back Button */}
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => router.back()}
              style={styles.backButton}
            >
              Back to Home
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#10B981',
    minWidth: 200,
  },
});
