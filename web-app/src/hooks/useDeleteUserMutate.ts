import axios from "axios";
import { apiUrl } from "@/service/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteUser = async (id: number) => {
    return await axios.delete(`${apiUrl}/user/delete/${id}`);
}

export function useDeleteUserMutate() {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error, reset } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['itens'] });
        },
        onError: (error) => {
            console.error("Erro ao deletar usuário:", error);
        }
    });

    return { mutate, isPending, isError, error, reset };
}