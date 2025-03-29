import axios from "axios";
import { apiUrl } from "@/service/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Usuarios } from "@/utlis/Ususarios";

type CreateUserPayload = Omit<Usuarios, "id">;

const createUser = async (data: CreateUserPayload) => {
    return await axios.post(`${apiUrl}/user/create`, data);
}

export function useCreateUserMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['itens'] });
        },
    });

    return mutate;
}