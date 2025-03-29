import axios from "axios";

export const apiUrl = 'http://localhost:8080';

export const findListUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/user/list`);
        return response.data
    } catch (error) {
        console.error('Erro na busca a lista de usuarios', error)
        throw error;
    }
};