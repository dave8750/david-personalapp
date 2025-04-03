import CreatePostView from "@/views/private/CreatePostView";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Vytvoriť príspevok | ZoškaGram",
  description: "Vytvorte nový príspevok a zdieľajte ho s ostatnými."
};

export default function CreatePostPage() {
  return <CreatePostView />;
} 