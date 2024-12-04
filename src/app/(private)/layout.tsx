// src/app/(private)/layout.tsx
import AuthKeeper from "../../components/AuthKeeper";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthKeeper>
      <div>{children}</div>
    </AuthKeeper>
  );
}