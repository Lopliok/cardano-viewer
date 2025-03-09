type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiResponse<T> {
    data: T;
    status: number;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async request<T>(
        endpoint: string,
        method: RequestMethod = "GET",
        data?: unknown,
        headers: Record<string, string> = {}
    ): Promise<ApiResponse<T>> {
        const config: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, config);
        const responseData: T = await response.json();

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return { data: responseData, status: response.status };
    }

    get<T>(endpoint: string, headers: Record<string, string> = {}) {
        return this.request<T>(endpoint, "GET", undefined, headers);
    }

    post<T>(endpoint: string, data: unknown, headers: Record<string, string> = {}) {
        return this.request<T>(endpoint, "POST", data, headers);
    }

    put<T>(endpoint: string, data: unknown, headers: Record<string, string> = {}) {
        return this.request<T>(endpoint, "PUT", data, headers);
    }

    patch<T>(endpoint: string, data: unknown, headers: Record<string, string> = {}) {
        return this.request<T>(endpoint, "PATCH", data, headers);
    }

    delete<T>(endpoint: string, headers: Record<string, string> = {}) {
        return this.request<T>(endpoint, "DELETE", undefined, headers);
    }
}


export const apiClient = new ApiClient(import.meta.env.VITE_API_URL)