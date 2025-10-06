import { profileClient } from "@/utils";
import { useEffect } from "react";

export const useMe = () => {
  const mut = profileClient.useMutation("get", "/me", {
    onSuccess: ({ data }) => {
      console.log(data);
    },
  });

  useEffect(() => {
    mut.mutate({});
  }, []);
};
