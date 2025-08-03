import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Laptop,
  Mail,
  Calendar,
  BookText,
  Users,
  BarChart2,
  Award,
  Briefcase,
  BellRing,
  LineChart,
  Menu,
  X,
  NotebookPen,
  CreditCard,
  MapPin,
  QrCode,
  Clock,
  Aperture
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../theme-provider";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const currentTheme = theme;
  
  const navItems = [
    // Dashboard
    {
      name: "Dashboard",
      href: "/",
      icon: <Laptop className="h-5 w-5" />,
      category: "main"
    },
    
    // Communication
    {
      name: "Emails",
      href: "/emails",
      icon: <Mail className="h-5 w-5" />,
      category: "communication"
    },
    {
      name: "Meetings",
      href: "/meetings",
      icon: <Calendar className="h-5 w-5" />,
      category: "communication"
    },
    {
      name: "Study Partners",
      href: "/partners",
      icon: <Users className="h-5 w-5" />,
      category: "communication"
    },
    
    // Academic
    {
      name: "Class Schedule",
      href: "/schedule",
      icon: <Clock className="h-5 w-5" />,
      category: "academic"
    },
    {
      name: "Notes",
      href: "/notes",
      icon: <BookText className="h-5 w-5" />,
      category: "academic"
    },
    {
      name: "Assignments",
      href: "/assignments",
      icon: <NotebookPen className="h-5 w-5" />,
      category: "academic"
    },
    {
      name: "Attendance",
      href: "/attendance",
      icon: <LineChart className="h-5 w-5" />,
      category: "academic"
    },
    {
      name: "Results",
      href: "/results",
      icon: <BarChart2 className="h-5 w-5" />,
      category: "academic"
    },
    // Campus Services
    {
      name: "Fee Management",
      href: "/fee",
      icon: <CreditCard className="h-5 w-5" />,
      category: "services"
    },
    {
      name: "Student ID & Wallet",
      href: "/id",
      icon: <QrCode className="h-5 w-5" />,
      category: "services"
    },
    {
      name: "Campus Navigator",
      href: "/campus",
      icon: <MapPin className="h-5 w-5" />,
      category: "services"
    },
    
    // Activities
    {
      name: "Clubs",
      href: "/clubs",
      icon: <Award className="h-5 w-5" />,
      category: "activities"
    },
    {
      name: "Placements",
      href: "/placements",
      icon: <Briefcase className="h-5 w-5" />,
      category: "activities"
    },
    {
      name: "Miscellaneous",
      href: "/misc",
      icon: <Aperture className="h-5 w-5" />,
      category: "updates"
    },
    
    // Updates
    {
      name: "Updates",
      href: "/updates",
      icon: <BellRing className="h-5 w-5" />,
      category: "updates"
    }
  ];

  // Group navigation items by category
  const groupedNavItems = {
    main: navItems.filter(item => item.category === "main"),
    communication: navItems.filter(item => item.category === "communication"),
    academic: navItems.filter(item => item.category === "academic"),
    services: navItems.filter(item => item.category === "services"),
    activities: navItems.filter(item => item.category === "activities"),
    updates: navItems.filter(item => item.category === "updates")
  };

  const categoryLabels = {
    main: "Dashboard",
    communication: "Communication",
    academic: "Academic",
    services: "Campus Services",
    activities: "Activities",
    updates: "Updates"
  };

  const mainContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Theme Toggle - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || typeof window !== "undefined" && window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-72 bg-background/80 backdrop-blur-md border-r",
              "flex flex-col p-6 overflow-y-auto",
              "lg:relative lg:block",
              sidebarOpen ? "block" : "hidden lg:block"
            )}
          >
            {/* Logo */}
            {/* Logo - PRESERVING EXACT ORIGINAL STYLING */}
            <div className="flex items-center justify-center mb-8 sticky top-0 bg-background/80 backdrop-blur-md py-2">
                <div className="w-full p-3 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg">
                    <div className="relative">
                        {/* Light mode logo */}
                        <img 
                            src="/images/Logo_Light.png" 
                            alt="CollegeHub Logo" 
                            className={`w-full h-16 rounded-xl object-cover transition-opacity duration-300 ${
                                currentTheme === "dark" ? "opacity-0 absolute inset-0" : "opacity-100"
                            }`}
                        />
                        
                        {/* Dark mode logo */}
                        <img 
                            src="/images/Logo_Dark.png" 
                            alt="CollegeHub Logo" 
                            className={`w-full h-16 rounded-xl object-cover transition-opacity duration-300 ${
                                currentTheme === "dark" ? "opacity-100" : "opacity-0 absolute inset-0"
                            }`}
                        />
                    </div>
                </div>
            </div>


            
            {/* Navigation */}
            <nav className="space-y-6 flex-1 pb-6">
              {Object.entries(groupedNavItems).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => {
    setSidebarOpen(false);
    // Scroll the main content area to top
    // If you want viewport scroll: window.scrollTo(0, 0);
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                          "hover:bg-accent/50 hover:text-accent-foreground",
                          location.pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* User Profile */}
            <div className="mt-auto pt-6 border-t sticky bottom-0 bg-background/80 backdrop-blur-md">
              <div className="flex items-center gap-3 py-3">
                <Avatar>
                  <AvatarImage src="/images/ProfilePicture.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">Computer Science</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 relative overflow-auto p-4 lg:p-6">
        <Outlet />
      </div>
    </div>
  );
}
