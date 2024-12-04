// src/components/AuthKeeper.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthKeeper = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return; 
    }

    if (!session) {
      router.push("/auth/prihlasenie");
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthKeeper;