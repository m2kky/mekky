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

export const speedDesigningProjects: SpeedDesigningProject[] = [
  {
    episodeNumber: 1,
    slug: 'ehsan-elsayed',
    personName: 'Ehsan El Sayed',
    profession: 'Operator-Teacher · Sales · Business Development · Practical AI',
    positioning: 'A working system for turning knowledge into useful work.',
    coverImage: '/speeddesigning/ehsan-elsayed/cover.svg',
    accentColor: '#1D4ED8',
    websitePath: '/speeddesigning/ehsan-elsayed',
    blueprintPath: '/speeddesigning/ehsan-elsayed/blueprint',
    publishDate: '2026-08-30',
    status: 'published',
    language: 'bilingual',
    designStyles: ['Editorial', 'Bauhaus', 'Interactive Storytelling'],
    featured: true,
  },
];

export function getPublicSpeedDesigningProjects(
  projects: readonly SpeedDesigningProject[] = speedDesigningProjects,
) {
  return projects
    .filter((project) => project.status === 'published' || (project.status === 'coming-soon' && project.showComingSoon))
    .sort((a, b) => b.episodeNumber - a.episodeNumber);
}
