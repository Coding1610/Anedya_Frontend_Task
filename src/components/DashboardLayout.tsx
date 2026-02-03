import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Analytics', path: '/analytics', icon: BarChart3, adminOnly: true },
  { label: 'Settings', path: '/settings', icon: Settings, adminOnly: true },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const AppSidebar = () => {
  
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const filteredNavItems = isAdmin
    ? navItems
    : navItems.filter(item => !item.adminOnly);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Sidebar collapsible="icon" className=''>
          
          <SidebarHeader className="h-16 border-b border-sidebar-border flex-row items-center px-4 justify-between group-data-[collapsible=icon]:justify-center">
            <div className="flex overflow-hidden">
              <span className="font-semibold whitespace-nowrap group-data-[collapsible=icon]:hidden">
                Frontend Task
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarMenu>
              {filteredNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "h-10",
                        isActive && "bg-accent text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90"
                        )}
                        >
                      <Link to={item.path}>
                        <item.icon />
                        <span>{item.label}</span>
                        {item.adminOnly && (
                          <span className="ml-auto text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full group-data-[collapsible=icon]:hidden">
                            Admin
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-3 space-y-1">
            <SidebarMenu>

              {/* Theme Toggle */}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleTheme} tooltip="Toggle Theme" className="hover:bg-accent hover:shadow-md">
                  {theme === 'dark' ? <Sun /> : <Moon />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Logout */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout} 
                  tooltip="Logout"
                  className="text-red-600 hover:bg-destructive/30"
                  >
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  
  const { user } = useAuth();
  const location = useLocation();
  const activeLabel = navItems.find(i => i.path === location.pathname)?.label ?? 'Dashboard';

  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-background">  
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            
            {/* Top Header */}
            <header className="flex h-16 items-center border-b border-border px-4 md:px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-lg font-semibold">
                {activeLabel}
              </h1>
              {user && (
                <div className="ml-auto">
                  <span
                    className={cn(
                      'text-xs px-2 py-1 rounded-full font-medium',
                      user.role === 'admin'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground',
                      )}
                      >
                    {user.role === 'admin' ? 'Admin Access' : 'User Access'}
                  </span>
                </div>
              )}
            </header>
            
            {/* Page Content */}
            <div className="pl-7 p-6 flex-1 animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};
