export interface Course {
  id: string;
  level: string;
  kannadaTitle: string;
  englishTitle: string;
  description: string;
  outcomes: string[];
}

export const courses: Course[] = [
  {
    id: "beginner",
    level: "Level 01",
    kannadaTitle: "ಆರಂಭಿಕ ಹಂತ",
    englishTitle: "Beginner Course",
    description: "Perfect for those starting their musical journey. Focuses on base notes and rhythm.",
    outcomes: ["Sarali Varisai", "Janti Varisai", "Basic Rhythm", "Simple Bhajans"]
  },
  {
    id: "intermediate",
    level: "Level 02",
    kannadaTitle: "ಮಧ್ಯಮ ಹಂತ",
    englishTitle: "Intermediate Course",
    description: "For students with basic knowledge. Diving deeper into Ragas and Alankaras.",
    outcomes: ["Alankaras", "Geethams", "Intro to Ragas", "Light Classical"]
  },
  {
    id: "advanced",
    level: "Level 03",
    kannadaTitle: "ಪ್ರೌಢ ಹಂತ",
    englishTitle: "Advanced Course",
    description: "Mastery level training including complex compositions and stage preparation.",
    outcomes: ["Varnams", "Kritis", "Manodharma", "Concert Readiness"]
  }
];
