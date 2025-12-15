import { AppSidebar } from '@/app/letters/(editor)/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function LoggedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      className="h-svh overflow-hidden"
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="min-h-svh overflow-hidden flex flex-1" id="editor-content">
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
