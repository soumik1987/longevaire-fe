import { getProgramByName, getProgramsByLocation, programCategories } from '../data/programs';
import type { Program, ProgramCategory } from '../data/programs';

export const fetchProgramByName = async (programName: string): Promise<Program> => {
  try {
    const program = getProgramByName(programName);
    if (!program) {
      throw new Error('Program not found');
    }
    return program;
  } catch (error) {
    console.error('Error fetching program:', error);
    throw error;
  }
};

export const fetchRelatedPrograms = async (currentProgram: Program): Promise<Program[]> => {
  try {
    const [city, country] = currentProgram.location.split(' - ');
    const relatedByLocation = getProgramsByLocation(country, city)
      .filter(p => p.name !== currentProgram.name)
      .slice(0, 3);
    
    // If we don't have enough by location, get some random active programs
    if (relatedByLocation.length < 3) {
      const allActive = getProgramsByStatus('active');
      const additional = allActive
        .filter(p => p.name !== currentProgram.name && !relatedByLocation.some(r => r.name === p.name))
        .slice(0, 3 - relatedByLocation.length);
      return [...relatedByLocation, ...additional];
    }
    
    return relatedByLocation;
  } catch (error) {
    console.error('Error fetching related programs:', error);
    return [];
  }
};

// Helper function to get active programs
function getProgramsByStatus(status: 'active' | 'inactive' | 'pending' | 'draft'): Program[] {
  return programCategories
    .flatMap((category: ProgramCategory) => category.programs)
    .filter((program: Program) => program.status === status);
}