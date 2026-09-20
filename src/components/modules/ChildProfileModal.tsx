import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Calendar,
  School,
  ShieldAlert,
  Phone,
  Building2,
  FileCheck,
  Trash2,
  Check,
  Plus,
  AlertTriangle,
} from 'lucide-react';
import { Child } from '../../types';

export interface ChildThemeOption {
  id: string;
  name: string;
  avatarColor: string;
  accentColor: string;
  themeBadge: string;
  previewBg: string;
  dotColor: string;
}

export const CHILD_THEME_OPTIONS: ChildThemeOption[] = [
  {
    id: 'peach',
    name: 'Pêssego Aveludado',
    avatarColor: 'bg-warm-peach/60 text-warm-terracotta-dark',
    accentColor: 'border-warm-peach',
    themeBadge: 'badge-peach',
    previewBg: '#F8ECE4',
    dotColor: '#BC7C67',
  },
  {
    id: 'sage',
    name: 'Verde Sálvia',
    avatarColor: 'bg-calm-sage/30 text-calm-sage-dark',
    accentColor: 'border-calm-sage',
    themeBadge: 'badge-sage',
    previewBg: '#EAF0EB',
    dotColor: '#6D7E6F',
  },
  {
    id: 'slate',
    name: 'Azul Ardósia',
    avatarColor: 'bg-calm-slate/30 text-calm-slate-dark',
    accentColor: 'border-calm-slate',
    themeBadge: 'badge-slate',
    previewBg: '#E9EFF4',
    dotColor: '#5D6E7E',
  },
  {
    id: 'terracotta',
    name: 'Terracota Queimado',
    avatarColor: 'bg-warm-terracotta/20 text-warm-terracotta-dark',
    accentColor: 'border-warm-terracotta',
    themeBadge: 'badge-terracotta',
    previewBg: '#F6EAE6',
    dotColor: '#9F5F4B',
  },
  {
    id: 'lavender',
    name: 'Lavanda Calmante',
    avatarColor: 'bg-purple-100 text-purple-800',
    accentColor: 'border-purple-200',
    themeBadge: 'badge-lavender',
    previewBg: '#F3E8FF',
    dotColor: '#7E22CE',
  },
  {
    id: 'amber',
    name: 'Âmbar Solar',
    avatarColor: 'bg-amber-100 text-amber-800',
    accentColor: 'border-amber-200',
    themeBadge: 'badge-amber',
    previewBg: '#FEF3C7',
    dotColor: '#B45309',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialChild?: Child | null;
  onSave: (childData: Omit<Child, 'id'> | Child) => void;
  onDelete?: (childId: string) => void;
}

export const ChildProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialChild,
  onSave,
  onDelete,
}) => {
  const isEditing = !!initialChild;

  // Form State
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [grade, setGrade] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState('peach');
  const [bloodType, setBloodType] = useState('A +');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [newAllergyInput, setNewAllergyInput] = useState('');
  const [pediatricianName, setPediatricianName] = useState('');
  const [pediatricianPhone, setPediatricianPhone] = useState('');
  const [pediatricianCrm, setPediatricianCrm] = useState('');
  const [referenceHospital, setReferenceHospital] = useState('');
  const [referenceHospitalPhone, setReferenceHospitalPhone] = useState('');
  const [healthInsurance, setHealthInsurance] = useState('');

  // UI tabs & delete confirmation state
  const [activeTab, setActiveTab] = useState<'general' | 'health'>('general');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill on open or change
  useEffect(() => {
    if (initialChild) {
      setName(initialChild.name || '');
      setBirthDate(initialChild.birthDate || '');
      setAge(initialChild.age || '');
      setSchoolName(initialChild.schoolName || '');
      setGrade(initialChild.grade || '');
      setBloodType(initialChild.bloodType || 'A +');
      setAllergies(initialChild.allergies || []);
      setPediatricianName(initialChild.pediatricianName || '');
      setPediatricianPhone(initialChild.pediatricianPhone || '');
      setPediatricianCrm(initialChild.pediatricianCrm || '');
      setReferenceHospital(initialChild.referenceHospital || '');
      setReferenceHospitalPhone(initialChild.referenceHospitalPhone || '');
      setHealthInsurance(initialChild.healthInsurance || '');

      // Identify theme
      const matchedTheme = CHILD_THEME_OPTIONS.find(
        (t) =>
          t.avatarColor === initialChild.avatarColor ||
          t.themeBadge === initialChild.themeBadge
      );
      setSelectedThemeId(matchedTheme ? matchedTheme.id : 'peach');
    } else {
      // Reset defaults for new child
      setName('');
      setBirthDate('');
      setAge('');
      setSchoolName('');
      setGrade('');
      setSelectedThemeId('peach');
      setBloodType('A +');
      setAllergies([]);
      setPediatricianName('');
      setPediatricianPhone('');
      setPediatricianCrm('');
      setReferenceHospital('');
      setReferenceHospitalPhone('');
      setHealthInsurance('');
    }
    setShowDeleteConfirm(false);
    setErrorMsg('');
    setActiveTab('general');
  }, [initialChild, isOpen]);

  if (!isOpen) return null;

  // Selected Theme Data
  const currentTheme =
    CHILD_THEME_OPTIONS.find((t) => t.id === selectedThemeId) ||
    CHILD_THEME_OPTIONS[0];

  const initials = name.trim() ? name.trim().charAt(0).toUpperCase() : 'C';

  // Handle Birth Date change and auto calculate friendly age
  const handleBirthDateChange = (val: string) => {
    setBirthDate(val);
    if (!val) return;

    try {
      const birth = new Date(val);
      const today = new Date();
      let calculatedAgeYears = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        calculatedAgeYears--;
      }

      if (calculatedAgeYears >= 1) {
        setAge(`${calculatedAgeYears} ano${calculatedAgeYears > 1 ? 's' : ''}`);
      } else {
        const totalMonths =
          (today.getFullYear() - birth.getFullYear()) * 12 +
          (today.getMonth() - birth.getMonth());
        setAge(`${Math.max(1, totalMonths)} mês${totalMonths > 1 ? 'es' : ''}`);
      }
    } catch {
      // Keep manual age
    }
  };

  const handleAddAllergy = () => {
    const trimmed = newAllergyInput.trim();
    if (!trimmed) return;
    if (!allergies.includes(trimmed)) {
      setAllergies([...allergies, trimmed]);
    }
    setNewAllergyInput('');
  };

  const handleRemoveAllergy = (indexToRemove: number) => {
    setAllergies(allergies.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Por favor, informe o nome do filho(a).');
      setActiveTab('general');
      return;
    }

    const payload: Omit<Child, 'id'> = {
      name: name.trim(),
      birthDate: birthDate.trim(),
      age: age.trim() || 'Idade não informada',
      schoolName: schoolName.trim() || 'Escola não informada',
      grade: grade.trim() || 'Série não informada',
      avatarColor: currentTheme.avatarColor,
      accentColor: currentTheme.accentColor,
      initials,
      themeBadge: currentTheme.themeBadge,
      bloodType: bloodType.trim(),
      allergies,
      pediatricianName: pediatricianName.trim() || 'Não cadastrado',
      pediatricianPhone: pediatricianPhone.trim() || '',
      pediatricianCrm: pediatricianCrm.trim() || '',
      referenceHospital: referenceHospital.trim() || 'Não cadastrado',
      referenceHospitalPhone: referenceHospitalPhone.trim() || '',
      healthInsurance: healthInsurance.trim() || 'Não informado',
    };

    if (isEditing && initialChild) {
      onSave({
        ...payload,
        id: initialChild.id,
      });
    } else {
      onSave(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm transition-all duration-300">
      <div
        className="w-full max-w-2xl bg-surface border border-border-linen rounded-3xl p-5 sm:p-7 shadow-warm-hover relative overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Warm Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-warm-peach via-warm-terracotta to-calm-sage" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border-linen">
          <div className="flex items-center gap-3.5">
            {/* Dynamic Avatar Preview */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif font-bold text-xl shadow-warm-sm border border-border-linen transition-all duration-300 ${currentTheme.avatarColor}`}
            >
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-peach/60 text-warm-terracotta-dark">
                  {isEditing ? 'Editar Perfil' : 'Novo Membro da Família'}
                </span>
                <span className="text-xs text-ink-muted">Gestão Integral</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-0.5">
                {isEditing ? `Perfil de ${initialChild.name}` : 'Cadastrar Filho(a)'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-canvas-sand border border-border-linen hover:bg-surface text-ink-muted hover:text-ink flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mt-4 mb-2 p-1 bg-canvas-sand rounded-2xl border border-border-linen">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'general'
                ? 'bg-surface text-ink shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Dados Gerais & Escola</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'health'
                ? 'bg-surface text-ink shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Saúde, Alergias & SOS</span>
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 py-3 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                  Nome do Filho(a) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Helena Albuquerque"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                  />
                </div>
              </div>

              {/* Data de Nascimento & Idade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Data de Nascimento
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => handleBirthDateChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Idade Exibida
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 7 anos ou 4 anos"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                  />
                </div>
              </div>

              {/* Escola & Série */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Escola / Colégio
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: Colégio Santa Teresa"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Ano Escolar / Turma
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 2º Ano Fundamental"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                  />
                </div>
              </div>

              {/* Tema Visual / Paleta de Cores */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                  Paleta de Cor & Tema do Perfil
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CHILD_THEME_OPTIONS.map((theme) => {
                    const isSelected = selectedThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-surface border-warm-terracotta ring-2 ring-warm-terracotta/30 shadow-warm-sm'
                            : 'bg-canvas-sand/60 border-border-linen hover:bg-surface/80 text-ink-muted'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full shrink-0 border border-border-linen"
                          style={{ backgroundColor: theme.dotColor }}
                        />
                        <span className="text-xs font-medium text-ink truncate">
                          {theme.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-4">
              {/* Tipo Sanguíneo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Tipo Sanguíneo
                  </label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                  >
                    <option value="A +">A +</option>
                    <option value="A -">A -</option>
                    <option value="B +">B +</option>
                    <option value="B -">B -</option>
                    <option value="AB +">AB +</option>
                    <option value="AB -">AB -</option>
                    <option value="O +">O +</option>
                    <option value="O -">O -</option>
                    <option value="Não informado">Não informado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Plano de Saúde & Carteirinha
                  </label>
                  <div className="relative">
                    <FileCheck className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: SulAmérica Especial (849204-01)"
                      value={healthInsurance}
                      onChange={(e) => setHealthInsurance(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Alergias Dinâmicas */}
              <div className="p-4 rounded-2xl bg-canvas-sand/60 border border-border-linen space-y-2.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Alergias & Cuidados Especiais (Atenção Médica)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Adicionar alergia ou restrição (Ex: Amendoim, Penicilina)"
                    value={newAllergyInput}
                    onChange={(e) => setNewAllergyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddAllergy();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-surface border border-border-linen text-ink text-xs focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30"
                  />
                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="px-3 py-2 rounded-xl bg-warm-terracotta text-white text-xs font-semibold flex items-center gap-1 hover:bg-warm-terracotta-dark transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                </div>

                {allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {allergies.map((allergy, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-warm-peach text-warm-terracotta-dark text-xs font-medium shadow-warm-sm"
                      >
                        <span>⚠️ {allergy}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(idx)}
                          className="hover:text-red-700 transition-colors ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-ink-muted italic">
                    Nenhuma alergia ou restrição cadastrada.
                  </p>
                )}
              </div>

              {/* Pediatra Responsável */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Pediatra Responsável
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Dra. Beatriz Albuquerque"
                    value={pediatricianName}
                    onChange={(e) => setPediatricianName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    CRM
                  </label>
                  <input
                    type="text"
                    placeholder="CRM 142.890-SP"
                    value={pediatricianCrm}
                    onChange={(e) => setPediatricianCrm(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                  />
                </div>
              </div>

              {/* Telefone Pediatra */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Telefone do Pediatra
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="(11) 99988-7766"
                      value={pediatricianPhone}
                      onChange={(e) => setPediatricianPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Hospital de Referência
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: Hospital Infantil Sabará"
                      value={referenceHospital}
                      onChange={(e) => setReferenceHospital(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                  Telefone de Emergência do Hospital
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="(11) 3155-2800"
                    value={referenceHospitalPhone}
                    onChange={(e) => setReferenceHospitalPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Box */}
          {isEditing && showDeleteConfirm && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-red-800 font-semibold text-sm mb-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Excluir perfil de {initialChild?.name}?</span>
              </div>
              <p className="text-xs text-red-700 mb-3">
                Esta ação removerá este membro da família do painel. Tem certeza de que deseja continuar?
              </p>
              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-red-200 text-xs text-ink hover:bg-red-50/50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (initialChild && onDelete) {
                      onDelete(initialChild.id);
                      onClose();
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-sm"
                >
                  Sim, Excluir Perfil
                </button>
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-border-linen flex flex-wrap items-center justify-between gap-3">
            <div>
              {isEditing && onDelete && !showDeleteConfirm && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 text-xs font-semibold transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir Perfil</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-2xl bg-canvas-sand hover:bg-surface border border-border-linen text-ink font-sans text-xs font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white font-sans text-xs font-semibold shadow-warm-md flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
              >
                <Check className="w-4 h-4" />
                <span>{isEditing ? 'Salvar Alterações' : 'Cadastrar Filho(a)'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
