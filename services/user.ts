import { fetchApi } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { RestInfoRequest, RestInfoResponse, SalaryInfoRequest, SalaryInfoResponse } from '@/types/api';

export const salaryInfo = async (data: SalaryInfoRequest): Promise<SalaryInfoResponse> => {
  try {
    const response = await fetchApi<SalaryInfoResponse>(API_ENDPOINTS.SALARY_INFO, {
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

export const restInfo = async (data: RestInfoRequest): Promise<RestInfoResponse> => {
  try {
    const response = await fetchApi<RestInfoResponse>(API_ENDPOINTS.REST_INFO, {
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
