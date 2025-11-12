export const getUserCoordinates = async (): Promise<{
  lat: number;
  lon: number;
}> => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported');
  }

  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
};
