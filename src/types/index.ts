export type TabType = 
  | 'today' 
  | 'education' 
  | 'activities' 
  | 'health' 
  | 'productivity' 
  | 'memories' 
  | 'documents';

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  age: string;
  schoolName: string;
  grade: string;
  avatarColor: string;
  accentColor: string;
  initials: string;
  themeBadge: string;
  bloodType: string;
  allergies: string[];
  pediatricianName: string;
  pediatricianPhone: string;
  pediatricianCrm: string;
  referenceHospital: string;
  referenceHospitalPhone: string;
  healthInsurance: string;
}

export interface ClassScheduleItem {
  id: string;
  childId: string;
  dayOfWeek: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
  subject: string;
  startTime: string;
  endTime: string;
  duration: string;
  teacher: string;
  room: string;
  colorTag: string;
  materials: {
    id: string;
    name: string;
    checked: boolean;
  }[];
}

export interface AcademicAssessment {
  id: string;
  childId: string;
  subject: string;
  title: string;
  type: 'Prova' | 'Trabalho' | 'Feira de Ciências' | 'Apresentação';
  date: string;
  weight: number;
  grade?: number;
  classAverage?: number;
  status: 'Agendado' | 'Entregue' | 'Avaliado';
  notes?: string;
}

export interface PedagogicalMeeting {
  id: string;
  childId: string;
  date: string;
  teacherOrCoordinator: string;
  topics: string[];
  feedbacks: string;
  actionPoints: string[];
}

export interface SchoolCircular {
  id: string;
  childId: string;
  title: string;
  category: 'Circular' | 'Calendário Oficial' | 'Contrato' | 'Cardápio';
  date: string;
  description: string;
  fileSize: string;
  fileUrl?: string;
}

export interface ExtracurricularActivity {
  id: string;
  childId: string;
  title: string;
  category: 'Esporte' | 'Idiomas' | 'Artes' | 'Música' | 'Reforço';
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  instructorName: string;
  instructorContact: string;
  institution: string;
  address: string;
  routeUrl?: string;
  equipmentChecklist: string[];
  badgeColor: string;
}

export interface SocialEvent {
  id: string;
  childId: string;
  title: string;
  eventType: 'Aniversário' | 'Passeio' | 'Excursão' | 'Apresentação';
  date: string;
  time: string;
  location: string;
  giftSuggestion?: string;
  confirmed: boolean;
  notes?: string;
}

export interface Medication {
  id: string;
  childId: string;
  name: string;
  dosage: string;
  intervalHours: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  instructions: string;
  nextDoseTime: string;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  childId: string;
  medicationName: string;
  caregiver: string;
  administeredAt: string;
  note?: string;
}

export interface VaccineRecord {
  id: string;
  childId: string;
  vaccineName: string;
  dose: string;
  recommendedAge: string;
  applicationDate?: string;
  status: 'Aplicada' | 'Pendente' | 'Atrasada';
  batchLocation?: string;
}

export interface MedicalAppointment {
  id: string;
  childId: string;
  specialty: string;
  doctorName: string;
  clinic: string;
  date: string;
  time: string;
  symptoms?: string;
  diagnosis: string;
  prescriptions: string[];
  returnDate?: string;
}

export interface GrowthRecord {
  id: string;
  childId: string;
  date: string;
  ageMonths: number;
  ageDisplay: string;
  heightCm: number;
  weightKg: number;
  headCircumferenceCm?: number;
  percentileText: string;
  notes?: string;
}

export interface Note {
  id: string;
  childId?: string; // opcional se for da família toda
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  tagColorClass: string;
}

export interface Task {
  id: string;
  childId: string;
  title: string;
  category: 'child' | 'parent';
  priority: 'alta' | 'media' | 'baixa';
  dueTime: string;
  completed: boolean;
  rewardStars?: number;
}

export interface MemoryMoment {
  id: string;
  childId: string;
  title: string;
  date: string;
  narrative: string;
  category: 'Escola' | 'Férias' | 'Conquistas' | 'Família' | 'Artes';
  imageUrl?: string;
  location?: string;
}

export interface DevelopmentMilestone {
  id: string;
  childId: string;
  title: string;
  category: 'Motor' | 'Linguagem' | 'Social' | 'Cognitivo' | 'Autonomia';
  ageAchieved: string;
  dateAchieved: string;
  description: string;
}

export interface ArtworkItem {
  id: string;
  childId: string;
  title: string;
  date: string;
  technique: string;
  description: string;
  imageUrl?: string;
}

export interface DocumentFile {
  id: string;
  childId: string;
  name: string;
  folderCategory: 'Oficiais' | 'Saúde' | 'Educação' | 'Outros';
  fileType: 'pdf' | 'image';
  size: string;
  uploadDate: string;
  description?: string;
}
