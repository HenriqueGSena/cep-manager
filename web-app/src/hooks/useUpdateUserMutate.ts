import axios from "axios";
import { apiUrl } from "@/service/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUser = async ({ id, updateData }: { id: number; updateData: any }) => {
    return await axios.put(`${apiUrl}/user/update/${id}`, updateData);
};

export function useUpdateUserMutate() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, updateData }: { id: number; updateData: any }) => updateUser({ id, updateData }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["itens"] });
        },
        onError: (error: any) => {
            console.error("Erro ao editar o usuário:", error);
        },
    });

    return mutation;
}
