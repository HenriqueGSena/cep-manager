import axios from "axios";
import { apiUrl } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

const findCepByViaCep = async (cep: String) => {
    if (!cep || cep.length !== 8) return null;
    return await axios.get(`${apiUrl}/api/cep/${cep}`);
}

export function useFindAddress(cep: string) {
    return useQuery({
        queryKey: ["cep", cep],
        queryFn: () => findCepByViaCep(cep),
        enabled: cep.length === 8,
    })
}
