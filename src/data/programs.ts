
export interface Program {
  [x: string]: any;
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
        name: "Desert Longevity Program",
        location: "Tucson - USA",
        details: "Advanced anti-aging therapies in the Sonoran Desert",
        duration: "7 Days / 6 Nights",
        highlights: [
          "Epigenetic testing and analysis",
          "Hyperbaric oxygen therapy",
          "Desert plant-based nutraceuticals",
          "Heat adaptation training",
          "Sleep optimization program"
        ],
        description: "This cutting-edge longevity program combines the latest medical advancements with the unique healing environment of the Arizona desert to optimize your biological age and vitality.",
        benefits: [
          "Reduced biological age markers",
          "Enhanced cellular repair",
          "Improved stress resilience",
          "Optimized metabolic function",
          "Deep restorative sleep"
        ],
        imageGallery: [
          "https://images.pexels.com/photos/4587999/pexels-photo-4587999.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-03-15", "2025-05-20", "2025-10-10"],
          pricePerPerson: "$4,200"
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
        description: "This program targets cellular level detoxification with integrative therapies, restoring balance in your body's vital systems. Ideal for those looking to improve energy, immunity, and overall vitality.",
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
        name: "Sonoran Stem Cell Revival",
        location: "Tucson - USA",
        details: "Desert-enhanced stem cell therapies for regeneration",
        duration: "5 Days / 4 Nights",
        highlights: [
          "Mesenchymal stem cell treatments",
          "Native plant growth factor therapy",
          "Desert mineral IV infusions",
          "Low-level laser therapy",
          "Tissue regeneration protocols"
        ],
        description: "Harness the regenerative power of stem cells in Tucson's unique desert environment, combining advanced medical treatments with natural healing elements for comprehensive rejuvenation.",
        benefits: [
          "Accelerated tissue repair",
          "Reduced joint and muscle pain",
          "Improved skin elasticity",
          "Enhanced energy and vitality",
          "Systemic anti-aging effects"
        ],
        imageGallery: [
          "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg",
          "https://images.pexels.com/photos/3825583/pexels-photo-3825583.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-04-10", "2025-06-15", "2025-09-20"],
          pricePerPerson: "$5,800"
        }
      },
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
        description: "This state-of-the-art regenerative retreat utilizes the latest stem cell technologies to support joint recovery, reduce pain, and boost overall wellness in a luxurious setting.",
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
        name: "Desert Metabolic Reset",
        location: "Tucson - USA",
        details: "High-desert metabolic optimization program",
        duration: "6 Days / 5 Nights",
        highlights: [
          "Comprehensive metabolic testing",
          "Native desert plant nutrition plan",
          "Heat adaptation training",
          "Circadian rhythm optimization",
          "Desert hiking for glucose control",
          "Native American fasting techniques"
        ],
        description: "This unique metabolic program leverages Tucson's desert environment to reset your metabolism, combining cutting-edge science with traditional healing practices for lasting results.",
        benefits: [
          "Improved insulin sensitivity",
          "Enhanced fat metabolism",
          "Stable energy levels",
          "Reduced inflammation",
          "Sustainable weight management"
        ],
        imageGallery: [
          "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-02-15", "2025-04-20", "2025-11-10"],
          pricePerPerson: "$3,900"
        }
      },
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
        description: "Perfect for individuals struggling with weight, low energy, or metabolic issues, this program offers a structured reset to improve health markers and vitality.",
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