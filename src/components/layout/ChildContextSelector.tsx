import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Heart,
  Plus,
  Settings,
  Edit2,
} from 'lucide-react';
import { useFamily } from '../../context/FamilyContext';
import { Child } from '../../types';
import { ChildProfileModal } from '../modules/ChildProfileModal';
import { FamilyManagerModal } from '../modules/FamilyManagerModal';

interface Props {
  selectedChildId: string;
  onSelectChild: (id: string) => void;
}

export const ChildContextSelector: React.FC<Props> = ({
  selectedChildId,
  onSelectChild,
}) => {
  const { children, addChild, updateChild, deleteChild } = useFamily();

  // Modal States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedChildForEdit, setSelectedChildForEdit] = useState<Child | null>(
    null
  );
  const [isFamilyManagerOpen, setIsFamilyManagerOpen] = useState(false);

  const handleOpenCreate = () => {
    setSelectedChildForEdit(null);
    setIsProfileModalOpen(true);
  };

  const handleOpenEdit = (child: Child, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedChildForEdit(child);
    setIsProfileModalOpen(true);
  };

  const handleSaveChild = (childData: Omit<Child, 'id'> | Child) => {
    if ('id' in childData && childData.id) {
      updateChild(childData as Child);
    } else {
      addChild(childData);
    }
  };

  const handleDeleteChild = (childId: string) => {
    deleteChild(childId);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 p-2 bg-canvas-sand/90 border border-border-linen rounded-3xl p-2.5 backdrop-blur-sm shadow-warm-sm">
        {/* Children Pills Scrollable Row */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1.5 lg:pb-0 scrollbar-none">
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-muted px-3 flex items-center gap-1.5 shrink-0">
            <Heart className="w-3.5 h-3.5 text-warm-terracotta" />
            Perfil Ativo:
          </span>

          {children.map((child) => {
            const isSelected = selectedChildId === child.id;
            return (
              <div
                key={child.id}
                className={`group relative flex items-center rounded-2xl transition-all duration-300 shrink-0 ${
                  isSelected
                    ? 'bg-surface text-ink shadow-warm-md border border-border-linen scale-[1.02]'
                    : 'bg-transparent text-ink-muted hover:bg-surface/60 hover:text-ink border border-transparent'
                }`}
              >
                {/* Main Select Child Button */}
                <button
                  type="button"
                  onClick={() => onSelectChild(child.id)}
                  className="flex items-center gap-3 px-3.5 py-2 text-left"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm transition-transform duration-300 ${
                      child.avatarColor
                    } ${isSelected ? 'ring-2 ring-warm-terracotta/40' : ''}`}
                  >
                    {child.initials || child.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm font-sans tracking-tight">
                        {child.name}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-warm-terracotta animate-pulse" />
                      )}
                    </div>
                    <span className="text-[11px] text-ink-muted font-normal block max-w-[130px] truncate">
                      {child.age} {child.grade ? `• ${child.grade}` : ''}
                    </span>
                  </div>
                </button>

                {/* Edit Button for this Child */}
                <button
                  type="button"
                  onClick={(e) => handleOpenEdit(child, e)}
                  title={`Editar perfil de ${child.name}`}
                  className={`p-1.5 mr-2 rounded-xl text-ink-light hover:text-warm-terracotta hover:bg-warm-peach/30 transition-all opacity-70 group-hover:opacity-100 ${
                    isSelected ? 'opacity-90' : ''
                  }`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {/* Unified Family Button */}
          <button
            type="button"
            onClick={() => onSelectChild('all')}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl transition-all duration-300 shrink-0 ${
              selectedChildId === 'all'
                ? 'bg-surface text-ink shadow-warm-md border border-border-linen scale-[1.02]'
                : 'bg-transparent text-ink-muted hover:bg-surface/60 hover:text-ink border border-transparent'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center bg-calm-slate/20 text-calm-slate-dark ${
                selectedChildId === 'all' ? 'ring-2 ring-calm-slate/40' : ''
              }`}
            >
              <Users className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-semibold text-sm font-sans tracking-tight block">
                Família Unificada
              </span>
              <span className="text-[11px] text-ink-muted font-normal block">
                Todos os filhos
              </span>
            </div>
          </button>

          {/* Quick Add Child Button */}
          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-dashed border-warm-peach text-warm-terracotta-dark bg-warm-peach/20 hover:bg-warm-peach/50 transition-all text-xs font-semibold shrink-0 shadow-warm-sm"
            title="Cadastrar novo filho(a)"
          >
            <Plus className="w-4 h-4 text-warm-terracotta" />
            <span>+ Adicionar Filho(a)</span>
          </button>
        </div>

        {/* Right Side Actions: Manage Family Hub */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end pt-1 lg:pt-0 border-t lg:border-t-0 border-border-linen">
          <button
            type="button"
            onClick={() => setIsFamilyManagerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface/70 hover:bg-surface border border-border-linen text-ink-muted hover:text-ink text-xs font-medium transition-all shadow-warm-sm"
          >
            <Settings className="w-3.5 h-3.5 text-warm-terracotta" />
            <span>Gerenciar Família</span>
          </button>

          <div className="hidden xl:flex items-center gap-1.5 text-xs text-ink-muted font-serif italic pl-2 border-l border-border-linen">
            <Sparkles className="w-3.5 h-3.5 text-warm-terracotta" />
            <span>Filtro Instantâneo</span>
          </div>
        </div>
      </div>

      {/* Child Profile Create / Edit Modal */}
      <ChildProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialChild={selectedChildForEdit}
        onSave={handleSaveChild}
        onDelete={handleDeleteChild}
      />

      {/* Family Manager Overview Modal */}
      <FamilyManagerModal
        isOpen={isFamilyManagerOpen}
        onClose={() => setIsFamilyManagerOpen(false)}
        childrenList={children}
        selectedChildId={selectedChildId}
        onSelectChild={onSelectChild}
        onOpenCreateChild={handleOpenCreate}
        onOpenEditChild={(child) => {
          setSelectedChildForEdit(child);
          setIsProfileModalOpen(true);
        }}
        onDeleteChild={handleDeleteChild}
      />
    </>
  );
};
