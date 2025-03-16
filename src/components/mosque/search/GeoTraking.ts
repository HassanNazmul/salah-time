export const getCoordinatesFromPostcode = async (postcode: string) => {
  try {
    const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    const data = await response.json();
    
    if (data.status === 200) {
      return {
        lat: data.result.latitude,
        lng: data.result.longitude
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching postcode data:', error);
    return null;
  }
};

export const calculateDistanceFromPostcodes = async (postcode1: string, postcode2: string) => {
  try {
    const [coords1, coords2] = await Promise.all([
      getCoordinatesFromPostcode(postcode1),
      getCoordinatesFromPostcode(postcode2)
    ]);

    if (!coords1 || !coords2) return null;

    const R = 6371; // Earth's radius in km
    const dLat = (coords2.lat - coords1.lat) * Math.PI / 180;
    const dLon = (coords2.lng - coords1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  } catch (error) {
    console.error('Error calculating distance:', error);
    return null;
  }
};

export const getUserLocation = async (): Promise<{ postcode: string } | null> => {
  try {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by your browser');
    }

    // Get position with timeout
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        (error: GeolocationPositionError) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Please allow location access to find nearby mosques'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information is unavailable'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out'));
              break;
            default:
              reject(error);
          }
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });

    const response = await fetch(
      `https://api.postcodes.io/postcodes?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch postcode from coordinates');
    }

    const data = await response.json();

    if (data.status === 200 && data.result && data.result.length > 0) {
      const postcode = data.result[0].postcode.replace(/\s/g, '');
      const coordinates = await getCoordinatesFromPostcode(postcode);
      
      if (coordinates) {
        return { postcode };
      }
      throw new Error('Invalid postcode received from coordinates');
    }
    throw new Error('No postcode found for this location');
  } catch (error) {
    console.error('Error detecting location:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};