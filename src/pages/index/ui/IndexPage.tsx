import { useUserStore } from "@/entities/user";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export const IndexPage = () => {
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
};
