import { fetchApi } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { LoginRequest, LoginResponse } from '@/types/api';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetchApi<LoginResponse>(API_ENDPOINTS.LOGIN, {
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
