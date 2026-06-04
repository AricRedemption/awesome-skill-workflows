export type SkillWikiSection = {
  title: string;
  bullets: string[];
  steps: string[];
  paragraphs: string[];
  raw: string;
};

export type SkillWikiSkill = {
  slug: string;
  title: string;
  sourcePath: string;
  summary: string;
  searchText: string;
  tags: string[];
  riskLevel: string;
  updatedAt: string;
  overview: SkillWikiSection;
  whenToUse: SkillWikiSection;
  whenNotToUse: SkillWikiSection;
  inputs: SkillWikiSection;
  outputs: SkillWikiSection;
  steps: SkillWikiSection;
  failureModes: SkillWikiSection;
  evidenceRefs: SkillWikiSection;
  relatedSkills: SkillWikiSection;
  scope: SkillWikiSection;
  nonScope: SkillWikiSection;
  provenance: SkillWikiSection;
  sections: SkillWikiSection[];
};

export type SkillWikiPayload = {
  generatedAt: string;
  sourceDirectory: string;
  stats: {
    skillCount: number;
    tagCount: number;
    evidenceRefCount: number;
  };
  skills: SkillWikiSkill[];
};
