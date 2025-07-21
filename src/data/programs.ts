export interface Program {
  name: string;
  location: string;
  details: string;
  duration?: string;
  highlights?: string[];
  description?: string;
  benefits?: string[];
  imageGallery?: string[];
  bookingOptions?: {
    availableDates: string[];
    pricePerPerson: string;
  };
}

export interface ProgramCategory {
  type: string;
  description: string;
  badge: string;
  programs: Program[];
  image: string;
}

export const programCategories: ProgramCategory[] = [
  {
    type: "Medical Wellness",
    description: "Explore transformative medical wellness experiences",
    badge: "Restorative Health",
    image: "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1200",
    programs: [
      {
        name: "Longevity Boost",
        location: "Tucson - USA",
        details: "Customized longevity treatments for vitality and extended healthspan.",
        duration: "7 Days / 6 Nights",
        highlights: [
          "Personalized longevity diagnostics",
          "Anti-aging therapies tailored to your biomarkers",
          "Daily detox treatments with infrared sauna",
          "Anti-inflammatory meal plans curated by nutritionists",
          "Guided fitness sessions with personal trainers",
          "Mindfulness and stress-reduction workshops"
        ],
        description: `The Longevity Boost program is a scientifically crafted wellness journey designed to optimize your biological age and promote long-lasting vitality. Using cutting-edge diagnostics including epigenetic profiling and telomere analysis, this retreat delivers highly personalized care through medically guided therapies.`,
        benefits: [
          "Increase energy levels and reduce fatigue",
          "Enhanced mental clarity and reduced brain fog",
          "Balanced hormones and improved metabolic health",
          "Reduce biological age markers",
          "Comprehensive detoxification"
        ],
        imageGallery: [
          "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg",
          "https://images.pexels.com/photos/3825578/pexels-photo-3825578.jpeg",
          "https://images.pexels.com/photos/3825568/pexels-photo-3825568.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-09-10", "2025-10-05", "2025-11-15"],
          pricePerPerson: "$3,500"
        }
      },
      {
        name: "Advanced Cellular Detox",
        location: "Sedona - USA",
        details: "Deep detoxification to reset cellular health and improve immunity.",
        duration: "10 Days / 9 Nights",
        highlights: [
          "Cellular detox treatments with ozone therapy",
          "Heavy metal chelation sessions",
          "Customized detox meal plans",
          "Gut microbiome restoration",
          "Daily colon hydrotherapy",
          "Therapeutic yoga and mindfulness"
        ],
        description: `This program targets cellular level detoxification with integrative therapies, restoring balance in your body's vital systems. Ideal for those looking to improve energy, immunity, and overall vitality.`,
        benefits: [
          "Removes toxins and heavy metals",
          "Improved gut health and digestion",
          "Boosted immunity and reduced inflammation",
          "Clearer skin and mental clarity",
          "Long-lasting health reset"
        ],
        imageGallery: [
          "https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg",
          "https://images.pexels.com/photos/3825575/pexels-photo-3825575.jpeg",
          "https://images.pexels.com/photos/3825579/pexels-photo-3825579.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-08-15", "2025-10-20", "2025-12-05"],
          pricePerPerson: "$4,200"
        }
      }
    ]
  },
  {
    type: "Regenerative Medicine",
    description: "Rejuvenate your body with cutting-edge regenerative therapies",
    badge: "Youth Reboot",
    image: "https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?auto=compress&cs=tinysrgb&w=1200",
    programs: [
      {
        name: "Stem Cell Revive",
        location: "Palm Springs - USA",
        details: "Harness the power of regenerative stem cell treatments.",
        duration: "5 Days / 4 Nights",
        highlights: [
          "Autologous stem cell infusions",
          "Joint rejuvenation therapies",
          "Platelet-rich plasma (PRP) sessions",
          "Red light therapy for cellular repair",
          "Personalized physical therapy",
          "Biological age tracking"
        ],
        description: `This state-of-the-art regenerative retreat utilizes the latest stem cell technologies to support joint recovery, reduce pain, and boost overall wellness in a luxurious setting.`,
        benefits: [
          "Accelerated tissue repair",
          "Improved joint flexibility",
          "Reduced chronic pain",
          "Enhanced recovery post-injury",
          "Younger biological age"
        ],
        imageGallery: [
          "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg",
          "https://images.pexels.com/photos/3825583/pexels-photo-3825583.jpeg",
          "https://images.pexels.com/photos/3825585/pexels-photo-3825585.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-09-01", "2025-11-10", "2026-01-25"],
          pricePerPerson: "$6,500"
        }
      }
    ]
  },
  {
    type: "Metabolic Health",
    description: "Achieve metabolic balance with science-backed protocols",
    badge: "Balance & Vitality",
    image: "https://images.pexels.com/photos/7588985/pexels-photo-7588985.jpeg?auto=compress&cs=tinysrgb&w=1200",
    programs: [
      {
        name: "Metabolic Reset",
        location: "Aspen - USA",
        details: "Optimize your metabolism and reset your body's natural rhythms.",
        duration: "6 Days / 5 Nights",
        highlights: [
          "Metabolic rate testing",
          "Glucose and insulin monitoring",
          "Nutrition plans for metabolic balance",
          "Intermittent fasting protocols",
          "Functional fitness coaching",
          "Guided nature walks in Aspen"
        ],
        description: `Perfect for individuals struggling with weight, low energy, or metabolic issues, this program offers a structured reset to improve health markers and vitality.`,
        benefits: [
          "Stabilize blood sugar levels",
          "Boost energy and reduce fatigue",
          "Healthier body composition",
          "Reduced risk of chronic diseases",
          "Lasting sustainable habits"
        ],
        imageGallery: [
          "https://images.pexels.com/photos/3825587/pexels-photo-3825587.jpeg",
          "https://images.pexels.com/photos/3825589/pexels-photo-3825589.jpeg",
          "https://images.pexels.com/photos/3825591/pexels-photo-3825591.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-08-22", "2025-10-18", "2025-12-01"],
          pricePerPerson: "$3,900"
        }
      }
    ]
  }
];


export function getProgramByName(name: string): Program | undefined {
  for (const category of programCategories) {
    const foundProgram = category.programs.find(program => program.name === name);
    if (foundProgram) {
      return foundProgram;
    }
  }
  return undefined;
}


export function getProgramsByLocation(country: string, city?: string): Program[] {
  const results: Program[] = [];
  
  for (const category of programCategories) {
    for (const program of category.programs) {
      const locationParts = program.location.split(' - ');
      const programCity = locationParts[0];
      const programCountry = locationParts[1];
      
      if (programCountry === country) {
        if (!city || programCity === city) {
          results.push(program);
        }
      }
    }
  }
  
  return results;
}


export function getAllPrograms(): Program[] {
  return programCategories.flatMap(category => category.programs);
}


export function getAllCountries(): string[] {
  const countries = new Set<string>();
  for (const category of programCategories) {
    for (const program of category.programs) {
      const country = program.location.split(' - ')[1];
      countries.add(country);
    }
  }
  return Array.from(countries);
}


export function getCitiesByCountry(country: string): string[] {
  const cities = new Set<string>();
  for (const category of programCategories) {
    for (const program of category.programs) {
      const [city, programCountry] = program.location.split(' - ');
      if (programCountry === country) {
        cities.add(city);
      }
    }
  }
  return Array.from(cities);
}