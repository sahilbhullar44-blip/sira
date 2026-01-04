import AdminSidebar from "@/components/admin/AdminSidebar";
import QueryProvider from "@/components/admin/QueryProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="flex bg-gray-50 min-h-screen font-sans text-gray-900 selection:bg-yellow-500/30 selection:text-yellow-900">
        <div className="relative z-10 flex w-full">
          <AdminSidebar />
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </QueryProvider>
  );
}
