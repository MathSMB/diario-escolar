import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Child,
  ClassScheduleItem,
  AcademicAssessment,
  PedagogicalMeeting,
  SchoolCircular,
  ExtracurricularActivity,
  SocialEvent,
  Medication,
  MedicationLog,
  VaccineRecord,
  MedicalAppointment,
  GrowthRecord,
  Note,
  Task,
  MemoryMoment,
  DevelopmentMilestone,
  ArtworkItem,
  DocumentFile,
} from '../types';
import {
  INITIAL_CHILDREN,
  INITIAL_SCHEDULE,
  INITIAL_ASSESSMENTS,
  INITIAL_MEETINGS,
  INITIAL_CIRCULARS,
  INITIAL_ACTIVITIES,
  INITIAL_SOCIAL_EVENTS,
  INITIAL_MEDICATIONS,
  INITIAL_MED_LOGS,
  INITIAL_VACCINES,
  INITIAL_APPOINTMENTS,
  INITIAL_GROWTH,
  INITIAL_NOTES,
  INITIAL_TASKS,
  INITIAL_MEMORIES,
  INITIAL_MILESTONES,
  INITIAL_ARTWORKS,
  INITIAL_DOCUMENTS,
} from '../services/mockData';

interface FamilyContextType {
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  activeChild: Child | undefined;
  children: Child[];
  
  // Schedules & Education
  schedules: ClassScheduleItem[];
  assessments: AcademicAssessment[];
  meetings: PedagogicalMeeting[];
  circulars: SchoolCircular[];
  toggleScheduleMaterial: (scheduleId: string, materialId: string) => void;
  addAssessment: (ass: Omit<AcademicAssessment, 'id'>) => void;

  // Extracurricular
  activities: ExtracurricularActivity[];
  socialEvents: SocialEvent[];
  addActivity: (act: Omit<ExtracurricularActivity, 'id'>) => void;
  toggleSocialEvent: (id: string) => void;

  // Health
  medications: Medication[];
  medicationLogs: MedicationLog[];
  vaccines: VaccineRecord[];
  appointments: MedicalAppointment[];
  growthRecords: GrowthRecord[];
  logMedicationDose: (medicationId: string, caregiver: string, note?: string) => void;
  toggleVaccine: (vaccineId: string) => void;
  addGrowthRecord: (record: Omit<GrowthRecord, 'id'>) => void;
  addAppointment: (app: Omit<MedicalAppointment, 'id'>) => void;

  // Productivity
  notes: Note[];
  tasks: Task[];
  toggleTask: (taskId: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  togglePinNote: (noteId: string) => void;

  // Memories
  memories: MemoryMoment[];
  milestones: DevelopmentMilestone[];
  artworks: ArtworkItem[];
  addMemory: (mem: Omit<MemoryMoment, 'id'>) => void;
  addArtwork: (art: Omit<ArtworkItem, 'id'>) => void;

  // Documents Vault
  documents: DocumentFile[];
  addDocument: (doc: Omit<DocumentFile, 'id' | 'uploadDate'>) => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

const STORAGE_PREFIX = 'diario_infantil_';

function loadOrSeed<T>(key: string, seed: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : seed;
  } catch {
    return seed;
  }
}

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedChildId, setSelectedChildId] = useState<string>('helena');

  const [childrenList] = useState<Child[]>(() =>
    loadOrSeed('children', INITIAL_CHILDREN)
  );
  const [schedules, setSchedules] = useState<ClassScheduleItem[]>(() =>
    loadOrSeed('schedules', INITIAL_SCHEDULE)
  );
  const [assessments, setAssessments] = useState<AcademicAssessment[]>(() =>
    loadOrSeed('assessments', INITIAL_ASSESSMENTS)
  );
  const [meetings] = useState<PedagogicalMeeting[]>(() =>
    loadOrSeed('meetings', INITIAL_MEETINGS)
  );
  const [circulars] = useState<SchoolCircular[]>(() =>
    loadOrSeed('circulars', INITIAL_CIRCULARS)
  );

  const [activities, setActivities] = useState<ExtracurricularActivity[]>(() =>
    loadOrSeed('activities', INITIAL_ACTIVITIES)
  );
  const [socialEvents, setSocialEvents] = useState<SocialEvent[]>(() =>
    loadOrSeed('social_events', INITIAL_SOCIAL_EVENTS)
  );

  const [medications] = useState<Medication[]>(() =>
    loadOrSeed('medications', INITIAL_MEDICATIONS)
  );
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>(() =>
    loadOrSeed('medication_logs', INITIAL_MED_LOGS)
  );
  const [vaccines, setVaccines] = useState<VaccineRecord[]>(() =>
    loadOrSeed('vaccines', INITIAL_VACCINES)
  );
  const [appointments, setAppointments] = useState<MedicalAppointment[]>(() =>
    loadOrSeed('appointments', INITIAL_APPOINTMENTS)
  );
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>(() =>
    loadOrSeed('growth_records', INITIAL_GROWTH)
  );

  const [notes, setNotes] = useState<Note[]>(() =>
    loadOrSeed('notes', INITIAL_NOTES)
  );
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadOrSeed('tasks', INITIAL_TASKS)
  );

  const [memories, setMemories] = useState<MemoryMoment[]>(() =>
    loadOrSeed('memories', INITIAL_MEMORIES)
  );
  const [milestones] = useState<DevelopmentMilestone[]>(() =>
    loadOrSeed('milestones', INITIAL_MILESTONES)
  );
  const [artworks, setArtworks] = useState<ArtworkItem[]>(() =>
    loadOrSeed('artworks', INITIAL_ARTWORKS)
  );

  const [documents, setDocuments] = useState<DocumentFile[]>(() =>
    loadOrSeed('documents', INITIAL_DOCUMENTS)
  );

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'medication_logs', JSON.stringify(medicationLogs));
  }, [medicationLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'growth_records', JSON.stringify(growthRecords));
  }, [growthRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'documents', JSON.stringify(documents));
  }, [documents]);

  const activeChild = childrenList.find((c) => c.id === selectedChildId);

  // Actions
  const toggleScheduleMaterial = (scheduleId: string, materialId: string) => {
    setSchedules((prev) =>
      prev.map((sch) => {
        if (sch.id !== scheduleId) return sch;
        return {
          ...sch,
          materials: sch.materials.map((m) =>
            m.id === materialId ? { ...m, checked: !m.checked } : m
          ),
        };
      })
    );
  };

  const addAssessment = (ass: Omit<AcademicAssessment, 'id'>) => {
    const newItem: AcademicAssessment = {
      ...ass,
      id: 'ass-' + Date.now(),
    };
    setAssessments([newItem, ...assessments]);
  };

  const addActivity = (act: Omit<ExtracurricularActivity, 'id'>) => {
    const newItem: ExtracurricularActivity = {
      ...act,
      id: 'act-' + Date.now(),
    };
    setActivities([newItem, ...activities]);
  };

  const toggleSocialEvent = (id: string) => {
    setSocialEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, confirmed: !ev.confirmed } : ev))
    );
  };

  const logMedicationDose = (medicationId: string, caregiver: string, note?: string) => {
    const med = medications.find((m) => m.id === medicationId);
    const now = new Date();
    const timeStr = `Hoje às ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newLog: MedicationLog = {
      id: 'log-' + Date.now(),
      medicationId,
      childId: med ? med.childId : selectedChildId,
      medicationName: med ? `${med.name} (${med.dosage})` : 'Medicamento',
      caregiver,
      administeredAt: timeStr,
      note: note || 'Dose administrada e registrada com sucesso',
    };
    setMedicationLogs([newLog, ...medicationLogs]);
  };

  const toggleVaccine = (vaccineId: string) => {
    setVaccines((prev) =>
      prev.map((vac) => {
        if (vac.id !== vaccineId) return vac;
        const isApplied = vac.status === 'Aplicada';
        return {
          ...vac,
          status: isApplied ? 'Pendente' : 'Aplicada',
          applicationDate: isApplied ? undefined : new Date().toLocaleDateString('pt-BR'),
        };
      })
    );
  };

  const addGrowthRecord = (record: Omit<GrowthRecord, 'id'>) => {
    const newItem: GrowthRecord = {
      ...record,
      id: 'gr-' + Date.now(),
    };
    setGrowthRecords([newItem, ...growthRecords]);
  };

  const addAppointment = (app: Omit<MedicalAppointment, 'id'>) => {
    const newItem: MedicalAppointment = {
      ...app,
      id: 'app-' + Date.now(),
    };
    setAppointments([newItem, ...appointments]);
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newItem: Task = {
      ...task,
      id: 'tsk-' + Date.now(),
    };
    setTasks([newItem, ...tasks]);
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const now = new Date();
    const newItem: Note = {
      ...note,
      id: 'note-' + Date.now(),
      createdAt: `Hoje às ${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`,
    };
    setNotes([newItem, ...notes]);
  };

  const togglePinNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const addMemory = (mem: Omit<MemoryMoment, 'id'>) => {
    const newItem: MemoryMoment = {
      ...mem,
      id: 'mem-' + Date.now(),
    };
    setMemories([newItem, ...memories]);
  };

  const addArtwork = (art: Omit<ArtworkItem, 'id'>) => {
    const newItem: ArtworkItem = {
      ...art,
      id: 'art-' + Date.now(),
    };
    setArtworks([newItem, ...artworks]);
  };

  const addDocument = (doc: Omit<DocumentFile, 'id' | 'uploadDate'>) => {
    const newItem: DocumentFile = {
      ...doc,
      id: 'doc-' + Date.now(),
      uploadDate: new Date().toLocaleDateString('pt-BR'),
    };
    setDocuments([newItem, ...documents]);
  };

  return (
    <FamilyContext.Provider
      value={{
        selectedChildId,
        setSelectedChildId,
        activeChild,
        children: childrenList,
        schedules,
        assessments,
        meetings,
        circulars,
        toggleScheduleMaterial,
        addAssessment,
        activities,
        socialEvents,
        addActivity,
        toggleSocialEvent,
        medications,
        medicationLogs,
        vaccines,
        appointments,
        growthRecords,
        logMedicationDose,
        toggleVaccine,
        addGrowthRecord,
        addAppointment,
        notes,
        tasks,
        toggleTask,
        addTask,
        addNote,
        togglePinNote,
        memories,
        milestones,
        artworks,
        addMemory,
        addArtwork,
        documents,
        addDocument,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
};
