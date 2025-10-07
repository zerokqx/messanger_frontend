import { profileClient } from "@/utils";
import { useEffect } from "react";

/** Hook for fetch user profile data */
export const useMe = () => {
  const mut = profileClient.useMutation("get", "/me", {
    onSuccess: ({ data }) => {},
  });

  useEffect(() => {
    mut.mutate({});
  }, []);
};
