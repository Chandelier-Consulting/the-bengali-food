import type { Metadata } from "next";
import DashboardAccess from "./DashboardAccess";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "Tomy's Kitchen site manager for menu items and photos.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardAccess />;
}
