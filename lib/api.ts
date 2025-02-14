import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const fetchApi = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.SERVER}${endpoint}`, options);
    const data: T = await response.json();

    if (!response.ok) {
      throw new Error((data as string) || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Network error');
  }
};
