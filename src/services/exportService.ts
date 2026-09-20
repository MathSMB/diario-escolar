import * as XLSX from 'xlsx';
import {
  Child,
  ClassScheduleItem,
  AcademicAssessment,
  PedagogicalMeeting,
  SchoolCircular,
  ExtracurricularActivity,
  SocialEvent,
  Medication,
  MedicalPrescription,
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

export interface FullFamilyData {
  children: Child[];
  schedules: ClassScheduleItem[];
  assessments: AcademicAssessment[];
  meetings: PedagogicalMeeting[];
  circulars: SchoolCircular[];
  activities: ExtracurricularActivity[];
  socialEvents: SocialEvent[];
  medications: Medication[];
  prescriptions: MedicalPrescription[];
  medicationLogs: MedicationLog[];
  vaccines: VaccineRecord[];
  appointments: MedicalAppointment[];
  growthRecords: GrowthRecord[];
  notes: Note[];
  tasks: Task[];
  memories: MemoryMoment[];
  milestones: DevelopmentMilestone[];
  artworks: ArtworkItem[];
  documents: DocumentFile[];
}

export type ExportSpreadsheetFormat = 'ods' | 'xlsx' | 'csv';

/**
 * Mapeia o ID da criança para o nome legível
 */
const getChildName = (childId: string | undefined, children: Child[]): string => {
  if (!childId) return 'Toda a Família';
  const found = children.find((c) => c.id === childId);
  return found ? found.name : childId;
};

/**
 * Gera a planilha no formato aberto (.ods), (.xlsx) ou (.csv) com múltiplas abas estruturadas
 */
export const exportToOpenSpreadsheet = (
  data: FullFamilyData,
  format: ExportSpreadsheetFormat = 'ods'
) => {
  const wb = XLSX.utils.book_new();

  // 1. Aba: Perfis dos Filhos & Ficha SOS
  const childrenRows = data.children.map((c) => ({
    Nome: c.name,
    Idade: c.age,
    'Data de Nascimento': c.birthDate,
    Escola: c.schoolName,
    Série: c.grade,
    'Tipo Sanguíneo': c.bloodType,
    Alergias: c.allergies.join(', '),
    Pediatra: c.pediatricianName,
    'CRM Pediatra': c.pediatricianCrm,
    'Telefone Pediatra': c.pediatricianPhone,
    'Hospital de Referência': c.referenceHospital,
    'Telefone Hospital': c.referenceHospitalPhone,
    'Plano de Saúde': c.healthInsurance,
  }));
  const wsChildren = XLSX.utils.json_to_sheet(childrenRows);
  XLSX.utils.book_append_sheet(wb, wsChildren, '1. Ficha SOS & Perfis');

  // 2. Aba: Grade de Horários Escolares
  const scheduleRows = data.schedules.map((s) => ({
    Filho: getChildName(s.childId, data.children),
    'Dia da Semana': s.dayOfWeek,
    'Horário Início': s.startTime,
    'Horário Término': s.endTime,
    Duração: s.duration,
    Matéria: s.subject,
    Professor: s.teacher,
    'Sala/Local': s.room,
    'Materiais da Mochila': s.materials.map((m) => m.name).join(', '),
  }));
  const wsSchedule = XLSX.utils.json_to_sheet(scheduleRows);
  XLSX.utils.book_append_sheet(wb, wsSchedule, '2. Horários Escolares');

  // 3. Aba: Avaliações Acadêmicas
  const assessmentRows = data.assessments.map((a) => ({
    Filho: getChildName(a.childId, data.children),
    Matéria: a.subject,
    'Título da Avaliação': a.title,
    Tipo: a.type,
    Data: a.date,
    Peso: a.weight,
    Nota: a.grade ?? 'Pendente',
    'Média da Turma': a.classAverage ?? 'N/D',
    Status: a.status,
    Observações: a.notes ?? '',
  }));
  const wsAssessments = XLSX.utils.json_to_sheet(assessmentRows);
  XLSX.utils.book_append_sheet(wb, wsAssessments, '3. Avaliações Escolares');

  // 4. Aba: Medicamentos & Tratamentos
  const medicationRows = data.medications.map((m) => ({
    Filho: getChildName(m.childId, data.children),
    Medicamento: m.name,
    Dosagem: m.dosage,
    'Intervalo (Horas)': m.intervalHours,
    'Data Início': m.startDate,
    'Data Fim': m.endDate,
    'Próxima Dose': m.nextDoseTime,
    'Em Andamento': m.isActive ? 'Sim' : 'Concluído',
    Instruções: m.instructions,
  }));
  const wsMedications = XLSX.utils.json_to_sheet(medicationRows);
  XLSX.utils.book_append_sheet(wb, wsMedications, '4. Medicamentos');

  // 5. Aba: Registro de Doses Ministradas
  const medLogsRows = data.medicationLogs.map((l) => ({
    Filho: getChildName(l.childId, data.children),
    Medicamento: l.medicationName,
    'Data e Hora': l.administeredAt,
    'Responsável / Cuidador': l.caregiver,
    Observações: l.note ?? '',
  }));
  const wsMedLogs = XLSX.utils.json_to_sheet(medLogsRows);
  XLSX.utils.book_append_sheet(wb, wsMedLogs, '5. Doses Ministradas');

  // 6. Aba: Receitas Médicas
  const prescriptionRows = data.prescriptions.map((p) => ({
    Filho: getChildName(p.childId, data.children),
    Título: p.title,
    Data: p.date,
    Médico: p.doctorName ?? '',
    CRM: p.doctorCrm ?? '',
    'Clínica / Hospital': p.clinic ?? '',
    'Resumo dos Medicamentos': p.medicationsSummary,
    Posologia: p.dosageInstructions ?? '',
    Observações: p.notes ?? '',
    'Possui Imagem Anexa': p.imageUrl ? 'Sim' : 'Não',
  }));
  const wsPrescriptions = XLSX.utils.json_to_sheet(prescriptionRows);
  XLSX.utils.book_append_sheet(wb, wsPrescriptions, '6. Receitas Médicas');

  // 7. Aba: Carteira de Vacinas
  const vaccineRows = data.vaccines.map((v) => ({
    Filho: getChildName(v.childId, data.children),
    Vacina: v.vaccineName,
    Dose: v.dose,
    'Idade Recomendada': v.recommendedAge,
    Status: v.status,
    'Data Aplicação': v.applicationDate ?? 'Pendente',
    'Lote / Unidade': v.batchLocation ?? '',
  }));
  const wsVaccines = XLSX.utils.json_to_sheet(vaccineRows);
  XLSX.utils.book_append_sheet(wb, wsVaccines, '7. Vacinas');

  // 8. Aba: Consultas Médicas
  const appointmentRows = data.appointments.map((ap) => ({
    Filho: getChildName(ap.childId, data.children),
    Especialidade: ap.specialty,
    'Médico(a)': ap.doctorName,
    Clínica: ap.clinic,
    Data: ap.date,
    Horário: ap.time,
    Sintomas: ap.symptoms ?? '',
    Diagnóstico: ap.diagnosis,
    'Prescrições / Encaminhamentos': ap.prescriptions.join(', '),
    'Data de Retorno': ap.returnDate ?? 'Sem retorno',
  }));
  const wsAppointments = XLSX.utils.json_to_sheet(appointmentRows);
  XLSX.utils.book_append_sheet(wb, wsAppointments, '8. Consultas Médicas');

  // 9. Aba: Curva de Crescimento
  const growthRows = data.growthRecords.map((g) => ({
    Filho: getChildName(g.childId, data.children),
    Data: g.date,
    Idade: g.ageDisplay,
    'Altura (cm)': g.heightCm,
    'Peso (kg)': g.weightKg,
    'Perímetro Cefálico (cm)': g.headCircumferenceCm ?? 'N/D',
    Percentil: g.percentileText,
    Notas: g.notes ?? '',
  }));
  const wsGrowth = XLSX.utils.json_to_sheet(growthRows);
  XLSX.utils.book_append_sheet(wb, wsGrowth, '9. Crescimento');

  // 10. Aba: Tarefas & Checklists
  const taskRows = data.tasks.map((t) => ({
    Filho: getChildName(t.childId, data.children),
    Tarefa: t.title,
    Responsável: t.category === 'child' ? 'Criança' : 'Pais/Família',
    Prioridade: t.priority,
    'Horário Limite': t.dueTime,
    Concluída: t.completed ? 'Sim' : 'Não',
    'Estrelas de Recompensa': t.rewardStars ?? 0,
  }));
  const wsTasks = XLSX.utils.json_to_sheet(taskRows);
  XLSX.utils.book_append_sheet(wb, wsTasks, '10. Tarefas & Rotina');

  // 11. Aba: Atividades Extracurriculares
  const activityRows = data.activities.map((ac) => ({
    Filho: getChildName(ac.childId, data.children),
    Atividade: ac.title,
    Categoria: ac.category,
    'Dias da Semana': ac.daysOfWeek.join(', '),
    Horário: `${ac.startTime} às ${ac.endTime}`,
    Instrutor: ac.instructorName,
    Contato: ac.instructorContact,
    Instituição: ac.institution,
    Endereço: ac.address,
    'Checklist de Materiais': ac.equipmentChecklist.join(', '),
  }));
  const wsActivities = XLSX.utils.json_to_sheet(activityRows);
  XLSX.utils.book_append_sheet(wb, wsActivities, '11. Extracurriculares');

  // 12. Aba: Eventos Sociais & Festas
  const eventRows = data.socialEvents.map((e) => ({
    Filho: getChildName(e.childId, data.children),
    Evento: e.title,
    Tipo: e.eventType,
    Data: e.date,
    Horário: e.time,
    Local: e.location,
    'Sugestão de Presente': e.giftSuggestion ?? '',
    'Presença Confirmada': e.confirmed ? 'Sim' : 'Não',
    Observações: e.notes ?? '',
  }));
  const wsEvents = XLSX.utils.json_to_sheet(eventRows);
  XLSX.utils.book_append_sheet(wb, wsEvents, '12. Eventos Sociais');

  // 13. Aba: Memórias & Marcos do Desenvolvimento
  const memoryRows = data.memories.map((m) => ({
    Filho: getChildName(m.childId, data.children),
    Título: m.title,
    Data: m.date,
    Categoria: m.category,
    Narrativa: m.narrative,
    Local: m.location ?? '',
  }));
  const wsMemories = XLSX.utils.json_to_sheet(memoryRows);
  XLSX.utils.book_append_sheet(wb, wsMemories, '13. Memórias');

  // 14. Aba: Marcos de Desenvolvimento
  const milestoneRows = data.milestones.map((ms) => ({
    Filho: getChildName(ms.childId, data.children),
    Marco: ms.title,
    Categoria: ms.category,
    'Idade Alcançada': ms.ageAchieved,
    'Data de Conquista': ms.dateAchieved,
    Descrição: ms.description,
  }));
  const wsMilestones = XLSX.utils.json_to_sheet(milestoneRows);
  XLSX.utils.book_append_sheet(wb, wsMilestones, '14. Marcos de Crescimento');

  // 15. Aba: Cofre de Documentos
  const documentRows = data.documents.map((d) => ({
    Filho: getChildName(d.childId, data.children),
    'Nome do Documento': d.name,
    Categoria: d.folderCategory,
    'Tipo de Arquivo': d.fileType,
    Tamanho: d.size,
    'Data de Envio': d.uploadDate,
    Descrição: d.description ?? '',
  }));
  const wsDocuments = XLSX.utils.json_to_sheet(documentRows);
  XLSX.utils.book_append_sheet(wb, wsDocuments, '15. Cofre de Documentos');

  // 16. Aba: Notas & Recados do Lar
  const noteRows = data.notes.map((n) => ({
    Filho: getChildName(n.childId, data.children),
    Título: n.title,
    Conteúdo: n.content,
    Tags: n.tags.join(', '),
    Fixada: n.isPinned ? 'Sim' : 'Não',
    'Criada em': n.createdAt,
  }));
  const wsNotes = XLSX.utils.json_to_sheet(noteRows);
  XLSX.utils.book_append_sheet(wb, wsNotes, '16. Notas & Recados');

  const todayStr = new Date().toISOString().split('T')[0];
  const filename = `Refugio_Familiar_Dados_Completos_${todayStr}.${format}`;

  if (format === 'ods') {
    XLSX.writeFile(wb, filename, { bookType: 'ods' });
  } else if (format === 'csv') {
    // Para CSV exportamos a primeira aba com BOM UTF-8
    XLSX.writeFile(wb, filename, { bookType: 'csv' });
  } else {
    XLSX.writeFile(wb, filename, { bookType: 'xlsx' });
  }
};

/**
 * Gera e baixa o backup completo em arquivo JSON estruturado
 */
export const exportFullBackupJSON = (data: FullFamilyData) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const filename = `Refugio_Familiar_Backup_Geral_${todayStr}.json`;
  const jsonString = JSON.stringify(
    {
      app: 'Refúgio Familiar',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      data,
    },
    null,
    2
  );

  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
