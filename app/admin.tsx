
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions, Alert } from "react-native";
import { Stack, router } from "expo-router";
import { Button } from "@/components/button";
import { IconSymbol } from "@/components/IconSymbol";
import { BarChart, LineChart } from "react-native-chart-kit";
import Dropdown from "@/components/Dropdown";
import PendingStudentApprovals from "@/components/PendingStudentApprovals";
import type { Student, User } from "@/types";

const screenWidth = Dimensions.get("window").width;

export default function AdminScreen() {
  const [selectedAudience, setSelectedAudience] = useState("All Parents");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [activeSection, setActiveSection] = useState("Dashboard");

  // Sample data for students and users
  const [allStudents, setAllStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      dob: "2010-05-15",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      status: "pending",
      requestingTeacherId: "teacher1",
      class: "JHS 1 Science"
    },
    {
      id: "2",
      name: "Jane Smith",
      dob: "2011-03-22",
      photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      status: "pending",
      requestingTeacherId: "teacher1",
      class: "JHS 1 Arts"
    },
    {
      id: "3",
      name: "Mike Johnson",
      dob: "2010-08-10",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "approved",
      requestingTeacherId: "teacher1",
      class: "JHS 1 Science"
    }
  ]);

  const [allUsers] = useState<User[]>([
    {
      id: "teacher1",
      name: "Mr. David",
      email: "david@school.com",
      role: "teacher"
    },
    {
      id: "parent1",
      name: "Mrs. Johnson",
      email: "johnson@email.com",
      role: "parent"
    },
    {
      id: "admin1",
      name: "Ms. Grace Nortey",
      email: "grace@school.com",
      role: "admin"
    }
  ]);

  const audienceOptions = ["All Parents", "All Teachers", "All Students", "Specific Class"];

  // Sample data for charts
  const studentsData = {
    labels: ["JHS 1 Science", "JHS 1 Arts"],
    datasets: [
      {
        data: [2, 0],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Blue
      }
    ]
  };

  const classesData = {
    labels: ["Mr. David"],
    datasets: [
      {
        data: [1],
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Green
      }
    ]
  };

  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [120, 145, 140, 135, 160, 110],
        color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, // Orange
        strokeWidth: 3
      }
    ]
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

  const pendingStudentsCount = allStudents.filter(s => s.status === 'pending').length;

  const sidebarItems = [
    { title: "Dashboard", icon: "chart.bar.fill", active: activeSection === "Dashboard" },
    { title: "Pending Approvals", icon: "clock", count: pendingStudentsCount, active: activeSection === "Pending Approvals" },
    { title: "Manage Teachers", icon: "person.2", active: activeSection === "Manage Teachers" },
    { title: "Manage Parents", icon: "person.3", active: activeSection === "Manage Parents" },
    { title: "Manage Students", icon: "graduationcap", active: activeSection === "Manage Students" },
    { title: "Manage Calendar", icon: "calendar", active: activeSection === "Manage Calendar" },
  ];

  const handleSendNotification = () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      Alert.alert("Error", "Please fill in both title and message fields.");
      return;
    }

    console.log("Sending notification:", {
      audience: selectedAudience,
      title: notificationTitle,
      message: notificationMessage
    });

    Alert.alert(
      "Success", 
      `Notification sent to ${selectedAudience}!`,
      [{ text: "OK", onPress: () => {
        setNotificationTitle("");
        setNotificationMessage("");
      }}]
    );
  };

  const handleSidebarItemPress = (title: string) => {
    setActiveSection(title);
    console.log(`Navigate to ${title}`);
  };

  const handleApproveStudent = (studentId: string) => {
    console.log(`Approving student with ID: ${studentId}`);
    setAllStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, status: 'approved' as const }
          : student
      )
    );
    Alert.alert("Success", "Student registration approved!");
  };

  const handleRejectStudent = (studentId: string) => {
    console.log(`Rejecting student with ID: ${studentId}`);
    setAllStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, status: 'rejected' as const }
          : student
      )
    );
    Alert.alert("Success", "Student registration rejected!");
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <>
            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Students</Text>
                <Text style={styles.statValue}>{allStudents.filter(s => s.status === 'approved').length}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Teachers</Text>
                <Text style={styles.statValue}>{allUsers.filter(u => u.role === 'teacher').length}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Parent Accounts</Text>
                <Text style={styles.statValue}>{allUsers.filter(u => u.role === 'parent').length}</Text>
              </View>
            </View>

            {/* Charts Section */}
            <View style={styles.chartsContainer}>
              {/* Students Chart */}
              <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Students by Class</Text>
                <BarChart
                  data={studentsData}
                  width={screenWidth * 0.4}
                  height={200}
                  chartConfig={chartConfig}
                  style={styles.chart}
                  showValuesOnTopOfBars={true}
                />
              </View>

              {/* Classes Chart */}
              <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Classes by Teacher</Text>
                <BarChart
                  data={classesData}
                  width={screenWidth * 0.4}
                  height={200}
                  chartConfig={chartConfig}
                  style={styles.chart}
                  showValuesOnTopOfBars={true}
                />
              </View>
            </View>

            {/* Performance Chart */}
            <View style={styles.performanceCard}>
              <Text style={styles.chartTitle}>Performance Overview</Text>
              <LineChart
                data={performanceData}
                width={screenWidth * 0.85}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                bezier
              />
            </View>

            {/* Notification Panel */}
            <View style={styles.notificationPanel}>
              <View style={styles.notificationHeader}>
                <IconSymbol name="bell" size={24} color="#374151" />
                <Text style={styles.notificationTitle}>Send Notification</Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Audience</Text>
                <Dropdown
                  options={audienceOptions}
                  selectedValue={selectedAudience}
                  onSelect={setSelectedAudience}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Notification Title</Text>
                <TextInput
                  style={styles.textInput}
                  value={notificationTitle}
                  onChangeText={setNotificationTitle}
                  placeholder="Enter notification title"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Message</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={notificationMessage}
                  onChangeText={setNotificationMessage}
                  placeholder="Enter your message"
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <Button
                onPress={handleSendNotification}
                style={styles.sendButton}
              >
                Send Notification
              </Button>
            </View>
          </>
        );
      
      case "Pending Approvals":
        return (
          <PendingStudentApprovals
            allStudents={allStudents}
            allUsers={allUsers}
            onApprove={handleApproveStudent}
            onReject={handleRejectStudent}
          />
        );

      case "Manage Teachers":
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Manage Teachers</Text>
            <View style={styles.teacherCard}>
              <View style={styles.teacherInfo}>
                <IconSymbol name="person.circle.fill" size={40} color="#6b7280" />
                <View style={styles.teacherDetails}>
                  <Text style={styles.teacherName}>Mr. David</Text>
                  <Text style={styles.teacherSubject}>Mathematics & Science</Text>
                  <Text style={styles.teacherClasses}>1 Class Assigned</Text>
                </View>
              </View>
              <View style={styles.teacherActions}>
                <Button style={styles.actionButton}>Edit</Button>
                <Button style={[styles.actionButton, styles.deleteButton]}>Remove</Button>
              </View>
            </View>
          </View>
        );

      case "Manage Parents":
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Manage Parents</Text>
            <Text style={styles.sectionSubtitle}>{allUsers.filter(u => u.role === 'parent').length} Parent Accounts</Text>
            <View style={styles.parentsList}>
              {allUsers.filter(u => u.role === 'parent').map(parent => (
                <View key={parent.id} style={styles.parentCard}>
                  <IconSymbol name="person.circle.fill" size={32} color="#6b7280" />
                  <View style={styles.parentInfo}>
                    <Text style={styles.parentName}>{parent.name}</Text>
                    <Text style={styles.parentEmail}>{parent.email}</Text>
                  </View>
                  <Button style={styles.actionButton}>View</Button>
                </View>
              ))}
            </View>
          </View>
        );

      case "Manage Students":
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Manage Students</Text>
            <Text style={styles.sectionSubtitle}>{allStudents.filter(s => s.status === 'approved').length} Students Enrolled</Text>
            <View style={styles.studentsList}>
              {allStudents.filter(s => s.status === 'approved').map(student => (
                <View key={student.id} style={styles.studentCard}>
                  <IconSymbol name="graduationcap" size={32} color="#3b82f6" />
                  <View style={styles.studentInfo}>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentClass}>{student.class}</Text>
                  </View>
                  <Button style={styles.actionButton}>View Profile</Button>
                </View>
              ))}
            </View>
          </View>
        );

      case "Manage Calendar":
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Manage Calendar</Text>
            <View style={styles.calendarActions}>
              <Button style={styles.calendarButton}>Add Event</Button>
              <Button style={styles.calendarButton}>View Schedule</Button>
              <Button style={styles.calendarButton}>Manage Holidays</Button>
            </View>
            <View style={styles.upcomingEvents}>
              <Text style={styles.eventsTitle}>Upcoming Events</Text>
              <View style={styles.eventCard}>
                <IconSymbol name="calendar" size={24} color="#f59e0b" />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventName}>Parent-Teacher Meeting</Text>
                  <Text style={styles.eventDate}>Next Friday, 2:00 PM</Text>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "EduTec Admin",
          headerStyle: { backgroundColor: '#1f2937' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <Pressable onPress={() => router.back()} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.mainContent}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {sidebarItems.map((item, index) => (
              <Pressable
                key={index}
                style={[styles.sidebarItem, item.active && styles.sidebarItemActive]}
                onPress={() => handleSidebarItemPress(item.title)}
              >
                <IconSymbol 
                  name={item.icon as any} 
                  size={20} 
                  color={item.active ? "#ffffff" : "#9ca3af"} 
                />
                <Text style={[styles.sidebarText, item.active && styles.sidebarTextActive]}>
                  {item.title}
                </Text>
                {item.count !== undefined && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>

          {/* Main Dashboard */}
          <ScrollView style={styles.dashboard} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.dashboardHeader}>
              <View style={styles.welcomeSection}>
                <View style={styles.avatarContainer}>
                  <IconSymbol name="person.circle.fill" size={40} color="#6b7280" />
                </View>
                <View>
                  <Text style={styles.welcomeTitle}>Welcome, Ms.</Text>
                  <Text style={styles.welcomeSubtitle}>Ms. Grace Nortey</Text>
                </View>
              </View>
            </View>

            {/* Dynamic Content */}
            {renderDashboardContent()}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  logoutButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    backgroundColor: '#1f2937',
    paddingVertical: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  sidebarItemActive: {
    backgroundColor: '#374151',
  },
  sidebarText: {
    color: '#9ca3af',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  sidebarTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  countBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  countText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  dashboard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  dashboardHeader: {
    marginBottom: 30,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
  },
  chartsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  chartCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  performanceCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 8,
  },
  notificationPanel: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 10,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#374151',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#1f2937',
    marginTop: 10,
  },
  sectionContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  teacherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 12,
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  teacherDetails: {
    marginLeft: 12,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  teacherSubject: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  teacherClasses: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  teacherActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  parentsList: {
    gap: 12,
  },
  parentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  parentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  parentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  parentEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  studentsList: {
    gap: 12,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  studentClass: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  calendarActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  calendarButton: {
    backgroundColor: '#3b82f6',
    flex: 1,
  },
  upcomingEvents: {
    marginTop: 20,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  eventInfo: {
    marginLeft: 12,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  eventDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});
