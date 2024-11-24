import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../components/mode-toggle";

export function TeacherLayout({ children, breadcrumb }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 pr-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumb}
          </div>
          <ModeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/20 px-3 py-4 md:min-h-min">
            {children}
          </div> */}
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
