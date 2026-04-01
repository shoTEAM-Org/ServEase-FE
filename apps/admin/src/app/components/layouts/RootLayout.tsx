import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "../navigation/Sidebar";
import { Header } from "../navigation/Header";
import { DataProvider } from "../../../contexts/DataContext";

export function RootLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <DataProvider>
      <div
        className="flex h-screen overflow-hidden bg-gray-50"
        style={{ "--sidebar-offset": isSidebarCollapsed ? "5rem" : "16rem" } as React.CSSProperties}
      >
        {/* Sidebar - Fixed position, scrollable independently */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          {/* Header - Sticky at top */}
          <Header />

          {/* Page Content - Scrollable */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-6 w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </DataProvider>
  );
}