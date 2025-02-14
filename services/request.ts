import { fetchApi } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { ListSendRequestRequest, ListSendRequestResponse, SendImageRequest, SendImageResponse, SendRequestRequest, SendRequestResponse } from '@/types/api';

export const sendRequest = async (data: SendRequestRequest): Promise<SendRequestResponse> => {
  try {
    const response = await fetchApi<SendRequestResponse>(API_ENDPOINTS.SEND_REQUEST, {
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
      data: [],
    };
  }
};

export const listSendRequestEmployee = async (data: ListSendRequestRequest): Promise<ListSendRequestResponse> => {
  try {
    const response = await fetchApi<ListSendRequestResponse>(API_ENDPOINTS.ALL_REQUEST_EMPLOYEE, {
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
      data: [],
    };
  }
};

export const listSendRequestAdmin = async (): Promise<ListSendRequestResponse> => {
  try {
    const response = await fetchApi<ListSendRequestResponse>(API_ENDPOINTS.ALL_REQUEST_ADMIN, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    };
  }
};

export const sendImage = async (data: SendImageRequest): Promise<SendImageResponse> => {
  try {
    const response = await fetchApi<SendImageResponse>(API_ENDPOINTS.SEND_IMAGE, {
      method: 'POST',
      body: data,
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
