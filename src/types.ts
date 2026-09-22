export type CategoryId = 'science' | 'leadership' | 'justice' | 'devotion' | 'art';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  color: string;
}

export interface Character {
  id: string;
  name: string;
  category: CategoryId;
  tagline: string;
  desc: string;
  iconName: string;
}

export type DimensionId = 'resource' | 'fair' | 'trust' | 'crisis' | 'culture';

export interface DimensionInfo {
  id: DimensionId;
  label: string;
  icon: string;
}

export interface EventAction {
  outcome: string;
  delta: Partial<Record<DimensionId, number>>;
}

export interface GameEvent {
  id: string;
  year: string;
  title: string;
  situation: string;
  reactions: Record<string, string>;
  actions: Record<string, EventAction>;
}

export interface SocietyType {
  icon: string;
  label: string;
  desc: string;
}

export interface RetrospectiveResult {
  type: SocietyType;
  lowDim: DimensionId;
  maxVal: number;
  minVal: number;
}
