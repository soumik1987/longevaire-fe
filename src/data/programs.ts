// program.ts
export interface ProgramInclude {
  title: string;
  description: string;
}

export interface Program {
  name: string;
  location: string;
  details: string;
  duration?: string;
  includes?: ProgramInclude[];
  description?: string;
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

let allProgramsCache: Program[] | null = null;
let countriesCache: string[] | null = null;
const citiesByCountryCache = new Map<string, string[]>();

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
        includes: [
          { title: "Epigenetic testing and analysis", description: "Personalized longevity planning based on your DNA." },
          { title: "Hyperbaric oxygen therapy", description: "Oxygenate tissues to promote faster cellular repair." },
          { title: "Desert plant-based nutraceuticals", description: "Herbal formulations unique to the Sonoran desert." },
          { title: "Heat adaptation training", description: "Train your body to regulate temperature and improve performance." },
          { title: "Sleep optimization program", description: "Techniques and tools to enhance sleep cycles." }
        ],
        description: "This cutting-edge longevity program combines the latest medical advancements with the unique healing environment of the Arizona desert to optimize your biological age and vitality.",
        imageGallery: [
          "https://images.pexels.com/photos/4587999/pexels-photo-4587999.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg",
          "https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg",
          "https://images.pexels.com/photos/3825575/pexels-photo-3825575.jpeg",
          "https://images.pexels.com/photos/3825579/pexels-photo-3825579.jpeg",
          "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg",
          "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
          "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
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
        includes: [
          { title: "Ozone therapy detox", description: "Revitalize and purify cells using activated oxygen." },
          { title: "Heavy metal chelation", description: "Flush out harmful metals from organs and tissues." },
          { title: "Customized detox meal plan", description: "Cleansing meals tailored to your biology." },
          { title: "Gut microbiome restoration", description: "Repopulate healthy gut flora through probiotics and diet." },
          { title: "Colon hydrotherapy", description: "Gently remove waste to reset digestion." },
          { title: "Therapeutic yoga and mindfulness", description: "Daily sessions to relax and enhance mental clarity." }
        ],
        description: "This program targets cellular level detoxification with integrative therapies, restoring balance in your body's vital systems. Ideal for those looking to improve energy, immunity, and overall vitality.",
        imageGallery: [
          "https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg",
          "https://images.pexels.com/photos/3825575/pexels-photo-3825575.jpeg",
          "https://images.pexels.com/photos/3825579/pexels-photo-3825579.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg",
          "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg",
          "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
          "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
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
        includes: [
          { title: "Mesenchymal stem cell treatments", description: "Promote repair and reduce inflammation systemically." },
          { title: "Native plant growth factor therapy", description: "Plant-derived boosters to aid tissue regeneration." },
          { title: "Desert mineral IV infusions", description: "Infusions rich in healing desert minerals." },
          { title: "Low-level laser therapy", description: "Stimulates repair at the cellular level." },
          { title: "Tissue regeneration protocols", description: "Custom strategies for specific tissue rejuvenation." }
        ],
        description: "Harness the regenerative power of stem cells in Tucson's unique desert environment, combining advanced medical treatments with natural healing elements for comprehensive rejuvenation.",
        imageGallery: [
          "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg",
          "https://images.pexels.com/photos/3825583/pexels-photo-3825583.jpeg",
          "https://images.pexels.com/photos/3825585/pexels-photo-3825585.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg",
          "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg",
          "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
          "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
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
        includes: [
          { title: "Autologous stem cell infusions", description: "Stem cells from your own body for targeted healing." },
          { title: "Joint rejuvenation therapies", description: "Restore mobility and ease joint pain." },
          { title: "Platelet-rich plasma (PRP) sessions", description: "Boost recovery using your own plasma." },
          { title: "Red light therapy for cellular repair", description: "Stimulate collagen and cellular activity." },
          { title: "Personalized physical therapy", description: "Tailored plans to speed recovery and build strength." },
          { title: "Biological age tracking", description: "Track real-time age reversal metrics." }
        ],
        description: "This state-of-the-art regenerative retreat utilizes the latest stem cell technologies to support joint recovery, reduce pain, and boost overall wellness in a luxurious setting.",
        imageGallery: [
          "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg",
          "https://images.pexels.com/photos/3825583/pexels-photo-3825583.jpeg",
          "https://images.pexels.com/photos/3825585/pexels-photo-3825585.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg",
          "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg",
          "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
          "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
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
        includes: [
          { title: "Comprehensive metabolic testing", description: "Get a full picture of your metabolic health." },
          { title: "Desert plant nutrition plan", description: "Anti-inflammatory meals using desert superfoods." },
          { title: "Heat adaptation training", description: "Burn calories and improve metabolism through heat exposure." },
          { title: "Circadian rhythm optimization", description: "Align your biological clock for better energy and sleep." },
          { title: "Desert hiking for glucose control", description: "Daily low-intensity hikes to stabilize blood sugar." },
          { title: "Native American fasting techniques", description: "Intermittent fasting traditions blended with science." }
        ],
        description: "This unique metabolic program leverages Tucson's desert environment to reset your metabolism, combining cutting-edge science with traditional healing practices for lasting results.",
        imageGallery: [
          "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg",
          "https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg",
          "https://images.pexels.com/photos/3825575/pexels-photo-3825575.jpeg",
          "https://images.pexels.com/photos/3825579/pexels-photo-3825579.jpeg",
          "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg",
          "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
          "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
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
        includes: [
          { title: "Metabolic rate testing", description: "Track how efficiently your body burns calories." },
          { title: "Glucose and insulin monitoring", description: "Daily tracking for metabolic clarity." },
          { title: "Nutrition plans for balance", description: "Whole-food diets to stabilize blood sugar." },
          { title: "Intermittent fasting protocols", description: "Guided fasting plans to improve metabolism." },
          { title: "Functional fitness coaching", description: "Low-impact exercises tailored to your profile." },
          { title: "Guided nature walks", description: "Rejuvenating hikes to encourage natural insulin response." }
        ],
        description: "Perfect for individuals struggling with weight, low energy, or metabolic issues, this program offers a structured reset to improve health markers and vitality.",
        imageGallery: [
          "https://images.pexels.com/photos/3825587/pexels-photo-3825587.jpeg",
          "https://images.pexels.com/photos/3825589/pexels-photo-3825589.jpeg",
          "https://images.pexels.com/photos/3825591/pexels-photo-3825591.jpeg",
          "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg",
          "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg",
          "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
          "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
        ],
        bookingOptions: {
          availableDates: ["2025-08-22", "2025-10-18", "2025-12-01"],
          pricePerPerson: "$3,900"
        }
      }
    ]
  }
];

function getLocationParts(location: string): [string, string] {
  const parts = location.split(' - ');
  return [parts[0], parts[1]];
}

export function getAllPrograms(): Program[] {
  if (!allProgramsCache) {
    allProgramsCache = programCategories.flatMap(category => category.programs);
  }
  return allProgramsCache;
}

export function getProgramByName(name: string): Program | undefined {
  return getAllPrograms().find(program => program.name === name);
}

export function getProgramsByLocation(country: string, city?: string): Program[] {
  return getAllPrograms().filter(program => {
    const [programCity, programCountry] = getLocationParts(program.location);
    return programCountry === country && (!city || programCity === city);
  });
}

export function getAllCountries(): string[] {
  if (!countriesCache) {
    const countries = new Set<string>();
    for (const program of getAllPrograms()) {
      const [, country] = getLocationParts(program.location);
      countries.add(country);
    }
    countriesCache = Array.from(countries);
  }
  return countriesCache;
}

export function getCitiesByCountry(country: string): string[] {
  if (citiesByCountryCache.has(country)) {
    return citiesByCountryCache.get(country)!;
  }

  const cities = new Set<string>();
  for (const program of getAllPrograms()) {
    const [city, programCountry] = getLocationParts(program.location);
    if (programCountry === country) {
      cities.add(city);
    }
  }

  const result = Array.from(cities);
  citiesByCountryCache.set(country, result);
  return result;
}