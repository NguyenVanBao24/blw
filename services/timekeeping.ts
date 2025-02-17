import { fetchApi } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { TimekeepingRequest, TimekeepingResponse } from '@/types/api';

export const timekeepingInsert = async (data: TimekeepingRequest): Promise<TimekeepingResponse> => {
  try {
    const response = await fetchApi<TimekeepingResponse>(API_ENDPOINTS.TIMEKEEPING_INSERT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      data: null,
    };
  }
};
