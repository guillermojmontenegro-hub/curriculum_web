export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type EducationItem = {
  title: string;
  period: string;
  institution: string;
};

export type LanguageItem = {
  name: string;
  level: string;
};

export type ContactData = {
  email: string;
  location: string;
  phone?: string;
  linkedin?: string;
  github?: string;
};

export type Profile = {
  name: string;
  headline: string;
  summary: string;
  skills: string[];
  experience: ExperienceItem[];
  projects: string[];
  education: EducationItem[];
  languages: LanguageItem[];
  contact: ContactData;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  previewImageUrl?: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};
