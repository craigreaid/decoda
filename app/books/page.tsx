import { BooksComingSoonView } from "@/components/home/BooksComingSoonView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physical books",
  description:
    "Bound early readers are on the way. This site is an early preview of the reading experience while we get stories and print ready.",
};

export default function BooksPage() {
  return <BooksComingSoonView />;
}
