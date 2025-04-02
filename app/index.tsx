import { redirect } from "next/navigation";

export default function IndexPage() {
  // Redirect to the landing page by default
  redirect("/landing");
}
