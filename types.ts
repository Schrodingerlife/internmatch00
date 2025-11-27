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
  id?: string;
  name: string;
  logoUrl: string;
  description: string;
  location?: string;
  website?: string;
  glassdoorRating?: number;
}

export interface MatchAnalysis {
  score?: number;
  positives: string[];
  improvements: string[];
}

export interface Vacancy {
  id: string;
  title: string;
  company: Company;
  workMode?: string;
  location?: string;
  salary?: string;
  salaryRange?: string;
  description: string;
  requirements?: string[];
  mandatoryRequirements: string[];
  desirableRequirements: string[];
  benefits: string[];
  status?: VacancyStatus;
  matchPercentage?: number;
  postedDate?: string;
  postedAt?: string;
  applyLink?: string;
  matchAnalysis?: MatchAnalysis;
}

export interface UserProfile {
  id: string;
  name: string;
  university: string;
  course: string;
  semester: number;
  skills: string[];
  email: string;
  bio?: string; // Added for better matching context
}

export type AppView = 'home' | 'match' | 'detail' | 'dashboard' | 'saved' | 'profile';

export interface GeminiChatMessage {
  role: 'user' | 'model';
  text: string;
}