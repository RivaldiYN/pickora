import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin Dashboard | Pickora",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminNav userEmail={session.user.email} />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}

