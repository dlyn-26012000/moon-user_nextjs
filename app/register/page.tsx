import { redirect } from "next/navigation";

// Registration is now handled via modal in the Header.
// Redirect any direct visits to the home page.
export default function RegisterPage() {
    redirect("/");
}
