import { redirect } from "next/navigation";

// Root redirects to the default locale (/vi)
export default function RootPage() {
  redirect("/vi");
}
