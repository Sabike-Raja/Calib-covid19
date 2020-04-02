import axios from 'axios';
export async function fetchStarsCountApi(): Promise<number> {
  // perform your API Calls here
  const url = `https://demo9145300.mockable.io/stars`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = await axios.get(url);
  return 50;
}
