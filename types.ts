export enum UserRole {
  STUDENT = 'STUDENT',
  COMPANY = 'COMPANY'
}

export enum VacancyStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED'
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  location: string;
  glassdoorRating: number;
}

export interface MatchAnalysis {
  positives: string[];
  improvements: string[];
}

export interface Vacancy {
  id: string;
  company: Company;
  title: string;
  workMode: 'Presencial' | 'Híbrido' | 'Remoto';
  mandatoryRequirements: string[];
  desirableRequirements: string[];
  benefits: string[];
  salaryRange: string;
  description: string;
  status: VacancyStatus;
  matchPercentage: number;
  postedDate: string;
  matchAnalysis: MatchAnalysis;
}

export interface UserProfile {
  id: string;
  name: string;
  university: string;
  course: string;
  semester: number;
  skills: string[];
  email: string;
}

export type AppView = 'home' | 'match' | 'detail' | 'dashboard' | 'profile' | 'saved';

export interface GeminiChatMessage {
  role: 'user' | 'model';
  text: string;
}