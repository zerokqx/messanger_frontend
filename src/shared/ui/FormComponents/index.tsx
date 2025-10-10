import { notifications } from "@mantine/notifications";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useEffect } from "react";
export function FieldInfo({
  field,
  label,
}: {
  field: AnyFieldApi;
  label: string;
}) {
  useEffect(() => {
    if (field.state.meta.errors.length > 0) {
      const error = field.state.meta.errors.at(-1);

      notifications.show({
        title: label,
        message: typeof error === "string" ? error : error.message,
        color: "red",
        style: { borderRadius: "1rem" },
        position: "top-right",
      });
    }
    notifications.cleanQueue();
  }, [field.state.meta.errors]);
  return null;
}
