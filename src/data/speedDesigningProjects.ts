export type SpeedDesigningProjectStatus = 'published' | 'coming-soon' | 'draft';
export type SpeedDesigningProjectLanguage = 'en' | 'ar' | 'bilingual';

export interface SpeedDesigningProject {
  episodeNumber: number;
  slug: string;
  personName: string;
  personNameArabic?: string;
  profession: string;
  positioning: string;
  coverImage: string;
  accentColor: string;
  websitePath: string;
  blueprintPath: string;
  publishDate: string;
  status: SpeedDesigningProjectStatus;
  language: SpeedDesigningProjectLanguage;
  designStyles: string[];
  featured: boolean;
  showComingSoon?: boolean;
}

export const speedDesigningProjects: SpeedDesigningProject[] = [];

export function getPublicSpeedDesigningProjects(
  projects: readonly SpeedDesigningProject[] = speedDesigningProjects,
) {
  return projects
    .filter((project) => project.status === 'published' || (project.status === 'coming-soon' && project.showComingSoon))
    .sort((a, b) => b.episodeNumber - a.episodeNumber);
}
