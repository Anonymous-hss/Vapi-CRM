import { toast } from "@/components/ui/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// If you're using ngrok, you would set NEXT_PUBLIC_API_URL to your ngrok URL
// e.g., "https://a1b2c3d4.ngrok.io/api"

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

// Helper function to handle API errors
const handleError = (error: any) => {
  console.error("API Error:", error);
  toast({
    title: "Error",
    description: error.message || "Something went wrong",
    variant: "destructive",
  });
  throw error;
};

// Auth API
export const authApi = {
  register: async (data: any) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  login: async (data: any) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getMe: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

// Customer API
export const customerApi = {
  getCustomers: async (token: string, params: any = {}) => {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value as string);
        }
      });

      const response = await fetch(`${API_URL}/customers?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getCustomerById: async (token: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  createCustomer: async (token: string, data: any) => {
    try {
      const response = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateCustomer: async (token: string, id: string, data: any) => {
    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  deleteCustomer: async (token: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

// Appointment API
export const appointmentApi = {
  getAppointments: async (token: string, params: any = {}) => {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value as string);
        }
      });

      const response = await fetch(`${API_URL}/appointments?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getAppointmentById: async (token: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  createAppointment: async (token: string, data: any) => {
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateAppointment: async (token: string, id: string, data: any) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  deleteAppointment: async (token: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

// Google Sheet API
export const googleSheetApi = {
  syncGoogleSheet: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/google-sheet/sync`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getSyncStatus: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/google-sheet/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};
