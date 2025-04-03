import SavedPostsView from "@/views/private/SavedPostsView";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Uložené príspevky | ZoškaGram",
  description: "Vaše uložené príspevky na ZoškaGram."
};

export default function SavedPostsPage() {
  return <SavedPostsView />;
} 