import { Form } from "@/components/organisms/Form";
import { RegisterForm } from "@/components/organisms/Form/RegisterForm";
import {
  createFileRoute,
  getRouteApi,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/auth/$mode")({
  component: RouteComponent,
});

function RouteComponent() {
  const {mode} = Route.useParams();
  console.log(mode);
  return mode === "login" ? <Form /> : <RegisterForm />;
}
