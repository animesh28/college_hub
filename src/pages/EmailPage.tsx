import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Inbox, Send, Archive, Trash2, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample email data
const emails = [
  {
    id: 1,
    from: {
      name: "Prof. Smith",
      email: "smith@university.edu",
      avatar: "/images/avatar.jpg"
    },
    subject: "Assignment Feedback: Algorithm Analysis",
    preview: "I've reviewed your submission and have some suggestions for improvement regarding the time complexity analysis section...",
    date: "Today, 9:42 AM",
    read: false,
    starred: true,
    category: "academic",
    important: true,
    attachments: true
  },
  {
    id: 2,
    from: {
      name: "Computer Science Dept.",
      email: "cs-department@university.edu",
      avatar: ""
    },
    subject: "Upcoming Workshop Announcement",
    preview: "Join us for a workshop on advanced machine learning techniques this Friday at 3 PM in the Innovation Lab. Please register...",
    date: "Today, 8:15 AM",
    read: false,
    starred: false,
    category: "announcement",
    important: true,
    attachments: false
  },
  {
    id: 3,
    from: {
      name: "Library Team",
      email: "library@university.edu",
      avatar: ""
    },
    subject: "Book Reservation Confirmation",
    preview: "Your requested books (Advanced Algorithms, Machine Learning Fundamentals) are ready for pickup at the counter...",
    date: "Yesterday",
    read: true,
    starred: false,
    category: "service",
    important: false,
    attachments: false
  },
  {
    id: 4,
    from: {
      name: "Student Council",
      email: "student-council@university.edu",
      avatar: ""
    },
    subject: "Campus Event: Tech Symposium",
    preview: "We're excited to announce this year's Tech Symposium featuring guest speakers from leading tech companies...",
    date: "Yesterday",
    read: true,
    starred: true,
    category: "event",
    important: false,
    attachments: true
  },
  {
    id: 5,
    from: {
      name: "Career Services",
      email: "careers@university.edu",
      avatar: ""
    },
    subject: "Internship Opportunity - TechCorp",
    preview: "A new internship opportunity has been posted that matches your profile. TechCorp is looking for software engineering interns...",
    date: "Aug 1",
    read: true,
    starred: false,
    category: "opportunity",
    important: true,
    attachments: false
  },
  {
    id: 6,
    from: {
      name: "Dr. Johnson",
      email: "johnson@university.edu",
      avatar: ""
    },
    subject: "Research Project Update",
    preview: "Based on our meeting yesterday, I've updated the research timeline. Please review the attached document and provide feedback...",
    date: "Jul 31",
    read: true,
    starred: false,
    category: "academic",
    important: true,
    attachments: true
  },
  {
    id: 7,
    from: {
      name: "IT Department",
      email: "it-support@university.edu",
      avatar: ""
    },
    subject: "Password Reset Required",
    preview: "Your university account password will expire in 3 days. Please log in to the student portal to set a new password...",
    date: "Jul 30",
    read: true,
    starred: false,
    category: "service",
    important: false,
    attachments: false
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function EmailPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter emails based on active filter and search term
  const filteredEmails = emails.filter(email => {
    // First apply the category filter
    if (activeFilter === "starred" && !email.starred) return false;
    if (activeFilter === "important" && !email.important) return false;
    if (activeFilter === "unread" && email.read) return false;
    if (activeFilter !== "all" && activeFilter !== "starred" && 
        activeFilter !== "important" && activeFilter !== "unread" && 
        email.category !== activeFilter) return false;
    
    // Then apply the search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        email.from.name.toLowerCase().includes(searchLower) ||
        email.subject.toLowerCase().includes(searchLower) ||
        email.preview.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const getCategoryBadge = (category) => {
    switch(category) {
      case "academic":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-none">Academic</Badge>;
      case "announcement":
        return <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-none">Announcement</Badge>;
      case "service":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-none">Service</Badge>;
      case "event":
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-none">Event</Badge>;
      case "opportunity":
        return <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-none">Opportunity</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <motion.h1 
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Inbox
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Manage your communications
        </motion.p>
      </header>

      {/* Email Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        {/* Sidebar */}
        <div className="col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search emails..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Email Categories */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "all" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("all")}
              >
                <Inbox className="h-4 w-4" />
                <span>All Emails</span>
              </div>
              
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "starred" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("starred")}
              >
                <Star className="h-4 w-4" />
                <span>Starred</span>
              </div>
              
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "important" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("important")}
              >
                <AlertCircle className="h-4 w-4" />
                <span>Important</span>
              </div>
              
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "unread" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("unread")}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Unread</span>
              </div>

              <div className="pt-2 pb-1">
                <h3 className="text-xs font-medium text-muted-foreground pl-3">CATEGORIES</h3>
              </div>
              
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "academic" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("academic")}
              >
                <Tag className="h-4 w-4" />
                <span>Academic</span>
              </div>
              
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "announcement" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("announcement")}
              >
                <Tag className="h-4 w-4" />
                <span>Announcements</span>
              </div>
              
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "event" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("event")}
              >
                <Tag className="h-4 w-4" />
                <span>Events</span>
              </div>
              
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "opportunity" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("opportunity")}
              >
                <Tag className="h-4 w-4" />
                <span>Opportunities</span>
              </div>
              
              <div 
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${activeFilter === "service" ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"}`}
                onClick={() => handleFilterChange("service")}
              >
                <Tag className="h-4 w-4" />
                <span>Services</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email List */}
        <div className="col-span-1 lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="px-4 py-3 border-b flex-row justify-between items-center">
              <div>
                <CardTitle className="text-lg">
                  {activeFilter === "all" ? "All Emails" : 
                   activeFilter === "starred" ? "Starred" : 
                   activeFilter === "important" ? "Important" : 
                   activeFilter === "unread" ? "Unread" : 
                   `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
                </CardTitle>
                <CardDescription>{filteredEmails.length} email{filteredEmails.length !== 1 ? 's' : ''}</CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">Actions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      <span>Mark all as read</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      <span>Archive all</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete selected</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <motion.div 
                className="divide-y"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email) => (
                    <motion.div 
                      key={email.id}
                      className={`p-4 hover:bg-accent transition-colors cursor-pointer flex items-start gap-3 ${!email.read ? 'bg-primary/5' : ''}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.005 }}
                      transition={{ duration: 0.2 }}
                      layoutId={`email-${email.id}`}
                    >
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={email.from.avatar} />
                        <AvatarFallback>
                          {email.from.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-medium truncate ${!email.read ? 'font-semibold' : ''}`}>
                            {email.from.name}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {email.date}
                          </span>
                        </div>
                        
                        <h4 className={`text-sm truncate mb-1 ${!email.read ? 'font-medium' : ''}`}>
                          {email.subject}
                        </h4>
                        
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {email.preview}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          {getCategoryBadge(email.category)}
                          
                          {email.important && (
                            <Badge variant="outline" className="bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400 border-none h-5 text-[10px]">
                              Important
                            </Badge>
                          )}
                          
                          {email.attachments && (
                            <Badge variant="outline" className="h-5 text-[10px]">
                              Attachment
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-full ${email.starred ? 'text-amber-500' : 'text-muted-foreground'}`}
                      >
                        <Star className="h-4 w-4" fill={email.starred ? "currentColor" : "none"} />
                      </Button>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-muted-foreground">No emails match your filters</p>
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}