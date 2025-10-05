import { authClient } from "@/utils";
import { notifications } from "@mantine/notifications";
import { useNavigate, useSearch } from "@tanstack/react-router";

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useRegister = (search: ReturnType<typeof useSearch>) => {
  const navigate = useNavigate();

  const mutate = authClient.useMutation(
    "post",
    "/register",

    {
      onSuccess: ({ data }) => {
        console.log(data);
        navigate({
          to: "/auth",
          search,
        });
      },
      onError: () => {
        notifications.show({
          title: "Опа ошибка!",
          message:
            "Не пережевайте - это на нашей стороне скоро все будет исправлено",
          color: "red",
        });
      },
    },
  );
  return { ...mutate };
};
