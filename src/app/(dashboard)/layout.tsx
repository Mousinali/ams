import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SharedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
