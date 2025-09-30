
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import type { Student, User } from '../types';
import Card from './Card';
import { Button } from './button';

interface PendingStudentApprovalsProps {
  allStudents: Student[];
  allUsers: User[];
  onApprove: (studentId: string) => void;
  onReject: (studentId: string) => void;
}

const PendingStudentApprovals: React.FC<PendingStudentApprovalsProps> = ({ 
  allStudents, 
  allUsers, 
  onApprove, 
  onReject 
}) => {
  const pendingStudents = allStudents.filter(s => s.status === 'pending');

  return (
    <Card>
      {/* Header with pending count */}
      <View style={styles.header}>
        <Text style={styles.title}>Pending Student Registrations</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{pendingStudents.length}</Text>
        </View>
      </View>

      {pendingStudents.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>There are no student registrations awaiting approval.</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.nameColumn]}>Name</Text>
            <Text style={[styles.headerCell, styles.dobColumn]}>Date of Birth</Text>
            <Text style={[styles.headerCell, styles.teacherColumn]}>Requested By</Text>
            <Text style={[styles.headerCell, styles.actionsColumn]}>Actions</Text>
          </View>

          {/* Table Body */}
          {pendingStudents.map(student => {
            const teacher = allUsers.find(u => u.id === student.requestingTeacherId);
            return (
              <View key={student.id} style={styles.tableRow}>
                {/* Name Column */}
                <View style={[styles.cell, styles.nameColumn]}>
                  <View style={styles.nameContainer}>
                    <Image 
                      source={{ uri: student.photoUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }} 
                      style={styles.avatar} 
                    />
                    <Text style={styles.studentName}>{student.name}</Text>
                  </View>
                </View>

                {/* DOB Column */}
                <View style={[styles.cell, styles.dobColumn]}>
                  <Text style={styles.cellText}>{student.dob}</Text>
                </View>

                {/* Teacher Column */}
                <View style={[styles.cell, styles.teacherColumn]}>
                  <Text style={styles.cellText}>
                    {teacher ? teacher.name : student.requestingTeacherId || 'N/A'}
                  </Text>
                </View>

                {/* Actions Column */}
                <View style={[styles.cell, styles.actionsColumn]}>
                  <View style={styles.actionButtons}>
                    <Button 
                      onPress={() => onApprove(student.id)}
                      style={styles.approveButton}
                      textStyle={styles.buttonText}
                      size="sm"
                    >
                      Approve
                    </Button>
                    <Button 
                      onPress={() => onReject(student.id)}
                      style={styles.rejectButton}
                      textStyle={styles.buttonText}
                      size="sm"
                    >
                      Reject
                    </Button>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  countBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    color: '#6b7280',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollContainer: {
    maxHeight: 400,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    alignItems: 'center',
  },
  cell: {
    paddingVertical: 4,
  },
  nameColumn: {
    flex: 2,
  },
  dobColumn: {
    flex: 1.2,
  },
  teacherColumn: {
    flex: 1.5,
  },
  actionsColumn: {
    flex: 1.8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  cellText: {
    fontSize: 14,
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  approveButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 70,
  },
  rejectButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 70,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default PendingStudentApprovals;
