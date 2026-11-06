import { redirect } from "next/navigation";

export default function Home() {
  redirect("/documentation/services/github/releases")
}