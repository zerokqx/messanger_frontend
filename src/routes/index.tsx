import { authMiddleware } from "@/midlewares";
import { authClient } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const auth = authClient;
  authClient.use(authMiddleware);
  // useAsync(async () => {
  //   const a = await authClient.POST("/login", {
  //     body: {
  //       login: "d",
  //       password: "d",
  //     },
  //   });
  //   console.log(a);
  // }, []);
  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("access_token");
        }}
      >
        Clear access
      </button>

      <button
        onClick={() => {
          localStorage.setItem(
            "access_token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NzU2MDAwLCJleHAiOjE2OTg4NDI0MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          );
        }}
      >
        Add access
      </button>
    </>
  );
}
