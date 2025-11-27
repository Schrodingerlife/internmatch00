import { UserProfile, Vacancy } from '../types';
import { generateVacanciesForProfile } from './geminiService';

export const fetchVacancies = async (userProfile: UserProfile): Promise<Vacancy[]> => {
    // In a real app, this might check a cache or database first.
    // For now, it delegates to the AI service to generate relevant vacancies.
    return generateVacanciesForProfile(userProfile);
};
