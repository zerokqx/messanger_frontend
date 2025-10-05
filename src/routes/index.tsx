import { Button } from "@/components";
import { useUserStore } from "@/store";
import { notifications } from "@mantine/notifications";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { clearStore } = useUserStore();
  return (
    <>
      <Button onClick={clearStore}>Clear access</Button>
      <Button
        onClick={() =>
          notifications.show({
            title: "Test",
            message: "Test",
          })
        }
      >
        Get Notify
      </Button>
    </>
  );
}
