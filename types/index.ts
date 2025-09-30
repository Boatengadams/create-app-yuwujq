
export interface Student {
  id: string;
  name: string;
  dob: string;
  photoUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  requestingTeacherId?: string;
  class?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'parent';
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  classes: string[];
}

export interface Parent extends User {
  role: 'parent';
  children: string[]; // Student IDs
}

export interface Admin extends User {
  role: 'admin';
}
