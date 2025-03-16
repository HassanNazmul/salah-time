import { type Mosque } from '@/types/mosque';

export const filterMosquesByQuery = (mosques: Mosque[], searchQuery: string): Mosque[] => {
  if (!searchQuery) return mosques;
  
  const searchLower = searchQuery.toLowerCase();
  return mosques.filter((mosque) => (
    mosque.name.toLowerCase().includes(searchLower) ||
    mosque.address.street.toLowerCase().includes(searchLower) ||
    mosque.address.city.toLowerCase().includes(searchLower) ||
    mosque.address.postcode.toLowerCase().includes(searchLower) ||
    mosque.facilities?.some((facility: string) =>
      facility.toLowerCase().includes(searchLower)
    )
  ));
};

export const addDistancesToMosques = async (
  mosques: Mosque[],
  userPostcode: string,
  calculateDistance: (postcode1: string, postcode2: string) => Promise<number | null>
): Promise<Mosque[]> => {
  const mosquesWithDistances = await Promise.all(
    mosques.map(async (mosque) => {
      const distance = await calculateDistance(
        userPostcode,
        mosque.address.postcode
      );
      return {
        ...mosque,
        distance: distance
      };
    })
  );

  return mosquesWithDistances
    .filter(mosque => mosque.distance !== null)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
};