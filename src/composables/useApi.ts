import axios from 'axios'

export function useApi() {
    const API_POST_METHOD = async <T>(url: string, formData: object): Promise<T> => {
        try {
            const response = await axios.post(url, formData);
            return response.data;
        } catch (e: any) {
            throw new Error(e.response?.data?.message || "Erro desconhecido..");
        }
    }

    const API_GET_METHOD = async <T>(url: string): Promise<T> => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (e: any) {
            throw new Error(e.response?.data?.message || "Erro desconhecido..");
        }
    }

    return {
        API_GET_METHOD,
        API_POST_METHOD
    }
}