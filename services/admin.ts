import { fetchApi } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { InsertRequest, InsertResponse } from '@/types/api';

export const insertAccept = async (data: InsertRequest): Promise<InsertResponse> => {
  try {
    const response = await fetchApi<InsertResponse>(API_ENDPOINTS.ACCEPT_ADMIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log(data);
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
