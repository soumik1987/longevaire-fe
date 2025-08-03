// Data transformation utilities to convert backend API responses to frontend format

import type { BackendProgram, Country, City, ProgramStyle } from '../types/api';
import type { Program, ProgramCategory, ProgramInclude } from '../data/programs';
import type { Destination } from '../data/destinations';

// Transform backend program to frontend program format
export const transformBackendProgram = (backendProgram: BackendProgram): Program => {
  // Calculate duration from start and end dates
  const duration = backendProgram.duration 
    ? `${backendProgram.duration} Days`
    : calculateDuration(backendProgram.startDate, backendProgram.endDate);

  // Transform amenities to includes format
  const includes: ProgramInclude[] = backendProgram.amenities?.map(amenity => ({
    title: amenity.name,
    description: amenity.description
  })) || backendProgram.programAmenities?.map(amenity => ({
    title: amenity.name,
    description: amenity.description
  })) || [];

  // Create location string from facility data
  const location = backendProgram.facility 
    ? `${backendProgram.facility.city} - ${backendProgram.facility.country}`
    : backendProgram.location || 'Location TBD';

  return {
    name: backendProgram.name,
    location,
    details: backendProgram.description,
    duration,
    includes,
    description: backendProgram.description,
    imageGallery: backendProgram.images.length > 0 ? backendProgram.images : undefined,
    bookingOptions: {
      availableDates: [formatDate(backendProgram.startDate)],
      pricePerPerson: backendProgram.price ? `$${backendProgram.price.toLocaleString()}` : 'Contact for pricing'
    },
    status: backendProgram.status as 'active' | 'inactive' | 'pending' | 'draft',
    highlights: backendProgram.programStyle ? [backendProgram.programStyle.name] : [],
    price: backendProgram.price ? `$${backendProgram.price.toLocaleString()}` : undefined,
    terms: [], // Backend doesn't provide terms, keeping empty for compatibility
    // Add backend-specific fields for reference
    code: backendProgram.code,
    id: backendProgram.id,
    startDate: backendProgram.startDate,
    endDate: backendProgram.endDate,
    programStyleCode: backendProgram.programStyleCode,
    facilityCode: backendProgram.primaryFacilityCode
  } as Program & {
    code: string;
    id: number;
    startDate: string;
    endDate: string;
    programStyleCode: string;
    facilityCode: string;
  };
};

// Transform backend program styles to frontend program categories
export const transformProgramStyles = (
  programStyles: ProgramStyle[],
  programsByStyle: Record<string, BackendProgram[]>
): ProgramCategory[] => {
  return programStyles.map(style => ({
    type: style.name,
    description: style.description,
    badge: style.name,
    programs: (programsByStyle[style.code] || []).map(transformBackendProgram),
    image: getDefaultCategoryImage(style.name) // Fallback image logic
  }));
};

// Transform backend countries to frontend destinations
export const transformCountriesToDestinations = (countries: Country[]): Destination[] => {
  return countries.map(country => ({
    country: country.name,
    cities: country.cities?.map(city => city.name) || [],
    image: country.images[0] || getDefaultDestinationImage(country.name)
  }));
};

// Helper function to calculate duration between dates
const calculateDuration = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 Day';
  if (diffDays <= 7) return `${diffDays} Days`;
  
  const nights = diffDays - 1;
  return `${diffDays} Days / ${nights} Nights`;
};

// Helper function to format date for frontend display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Default images for categories when backend doesn't provide them
const getDefaultCategoryImage = (categoryName: string): string => {
  const imageMap: Record<string, string> = {
    'Medical Wellness': 'https://pranissa-media.s3.us-east-1.amazonaws.com/images/pexels-lucaspezeta-2035066.jpg',
    'Couples Longevity Retreat': 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg',
    'Executive Biohacking Reset': 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    'Wellness': 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg'
  };
  
  return imageMap[categoryName] || 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg';
};

// Default images for destinations when backend doesn't provide them
const getDefaultDestinationImage = (countryName: string): string => {
  const imageMap: Record<string, string> = {
    'USA': 'https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg',
    'Italy': 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
    'Switzerland': 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg',
    'Indonesia': 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
    'Thailand': 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg',
    'Greece': 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    'Japan': 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    'Germany': 'https://images.pexels.com/photos/1119972/pexels-photo-1119972.jpeg',
    'Costa Rica': 'https://images.pexels.com/photos/1619302/pexels-photo-1619302.jpeg',
    'India': 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg'
  };
  
  return imageMap[countryName] || 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg';
};

// Transform program for program lists page (adds additional UI fields)
export const transformProgramForList = (program: Program & { code?: string; id?: number }): any => {
  return {
    ...program,
    id: program.code || program.name.replace(/\s+/g, '-').toLowerCase(),
    specialOffer: program.includes?.[0]?.title || 'Featured Program',
    nights: program.duration || 'Custom Duration',
    pricing: program.bookingOptions?.pricePerPerson || 'Contact for pricing',
    bookingDate: program.bookingOptions?.availableDates?.[0]?.split('-').reverse().join('/') || 'Available Soon',
    stayDate: program.bookingOptions?.availableDates?.[0]?.split('-').reverse().join('/') || 'Available Soon',
    imageUrl: program.imageGallery?.[0] || 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    highlights: program.includes?.map(include => include.title) || program.highlights || []
  };
};

// Search result transformation for ExplorePage
export const createSearchResults = (
  programs: Program[],
  destinations: Destination[],
  searchTerm: string
): any[] => {
  const results: any[] = [];
  
  // Add matching programs
  programs.forEach(program => {
    if (program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push({
        type: 'program',
        title: program.name,
        subtitle: program.location,
        programData: program
      });
    }
  });
  
  // Add matching destinations
  destinations.forEach(destination => {
    if (destination.country.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push({
        type: 'destination',
        title: destination.country,
        subtitle: `${destination.cities.length} cities available`,
        country: destination.country
      });
    }
    
    // Add matching cities
    destination.cities.forEach(city => {
      if (city.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({
          type: 'city',
          title: city,
          subtitle: destination.country,
          country: destination.country,
          city: city
        });
      }
    });
  });
  
  return results;
};