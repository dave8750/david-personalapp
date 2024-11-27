// File: src/app/(private)/layout.tsx
import AuthGuard from '../../components/AuthGuard';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="private-layout">
                <main>{children}</main>
            </div>
        </AuthGuard>
    );
}
