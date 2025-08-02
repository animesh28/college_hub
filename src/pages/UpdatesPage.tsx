import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Calendar,
  Download,
  FileText,
  Paperclip,
  Plus,
  Search,
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  AlertTriangle,
  Building,
} from "lucide-react";

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

// Types
interface Notice {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  author: string;
  department: string;
  priority: "urgent" | "normal" | "low";
  hasAttachment: boolean;
  color: string;
}

interface FeaturedNotice extends Notice {
  stats: {
    departments: number;
    students: number;
    subjects: number;
  };
}

// Sample data
const notices: Notice[] = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule Released",
    category: "Examinations",
    description:
      "The mid-term examination schedule for all undergraduate and postgraduate courses has been published. Students are advised to check their respective department portals for detailed timetables.",
    date: "2025-08-02",
    author: "Examination Department",
    department: "Academic Affairs",
    priority: "urgent",
    hasAttachment: true,
    color: "red",
  },
  {
    id: 2,
    title: "Annual Tech Fest 2025 - Registration Open",
    category: "Events",
    description:
      "TechVision 2025, our annual technical festival, is scheduled for September 15-17. Registration for various competitions including coding marathons, robotics, and innovation challenges is now open.",
    date: "2025-08-01",
    author: "Student Affairs",
    department: "Events Committee",
    priority: "normal",
    hasAttachment: false,
    color: "blue",
  },
  {
    id: 3,
    title: "Library Extended Hours During Exam Period",
    category: "Academic",
    description:
      "The central library will remain open 24/7 starting August 10th through August 30th to support students during the examination period. Additional study spaces have been arranged.",
    date: "2025-07-31",
    author: "Library Administration",
    department: "Library Services",
    priority: "normal",
    hasAttachment: false,
    color: "green",
  },
  {
    id: 4,
    title: "Google Campus Recruitment Drive",
    category: "Placements",
    description:
      "Google will be conducting an on-campus recruitment drive for final year students. Eligible students from CS, IT, and Electronics departments can register through the placement portal.",
    date: "2025-07-30",
    author: "Placement Cell",
    department: "Career Services",
    priority: "urgent",
    hasAttachment: true,
    color: "amber",
  },
  {
    id: 5,
    title: "Fee Payment Deadline Extended",
    category: "General",
    description:
      "Due to technical issues with the payment gateway, the semester fee payment deadline has been extended to August 15th. No late fee will be charged until this date.",
    date: "2025-07-29",
    author: "Finance Department",
    department: "Administration",
    priority: "urgent",
    hasAttachment: false,
    color: "orange",
  },
  {
    id: 6,
    title: "New Course Offerings for Spring 2025",
    category: "Academic",
    description:
      "The academic committee has approved several new elective courses for the Spring 2025 semester including AI Ethics, Sustainable Engineering, and Digital Marketing Analytics.",
    date: "2025-07-28",
    author: "Academic Committee",
    department: "Academic Affairs",
    priority: "normal",
    hasAttachment: true,
    color: "purple",
  },
  {
    id: 7,
    title: "Independence Day Celebration - College Closed",
    category: "General",
    description:
      "The college will remain closed on August 15th in observance of Independence Day. All classes and administrative offices will resume on August 16th.",
    date: "2025-07-27",
    author: "Administration",
    department: "General Administration",
    priority: "normal",
    hasAttachment: false,
    color: "green",
  },
  {
    id: 8,
    title: "Research Paper Submission Deadline",
    category: "Academic",
    description:
      "Final year students working on research projects must submit their papers to respective department heads by August 20th. Late submissions will not be accepted.",
    date: "2025-07-26",
    author: "Research Committee",
    department: "Academic Affairs",
    priority: "urgent",
    hasAttachment: true,
    color: "red",
  },
];

const featuredNotice: FeaturedNotice = {
  id: 1,
  title: "Mid-Term Examination Schedule Released",
  category: "Examinations",
  description:
    "The mid-term examination schedule for all undergraduate and postgraduate courses has been officially published. Students are strongly advised to check their respective department portals for detailed timetables and examination guidelines. The examination period will commence from August 25th and conclude on September 5th. All students must ensure they have their admit cards ready and review the examination rules and regulations.",
  date: "2025-08-02",
  author: "Examination Department",
  department: "Academic Affairs",
  priority: "urgent",
  hasAttachment: true,
  color: "red",
  stats: {
    departments: 12,
    students: 3500,
    subjects: 150,
  },
};

const categories = [
  { name: "All Notices", value: "all" },
  { name: "Academic", value: "Academic" },
  { name: "Examinations", value: "Examinations" },
  { name: "Events", value: "Events" },
  { name: "Admissions", value: "Admissions" },
  { name: "Placements", value: "Placements" },
  { name: "General", value: "General" },
  { name: "Urgent", value: "urgent" },
];

const CollegeNoticesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredNotices =
    activeTab === "all"
      ? notices
      : activeTab === "urgent"
      ? notices.filter((notice) => notice.priority === "urgent")
      : notices.filter((notice) => notice.category === activeTab);

  const searchedNotices = searchTerm
    ? filteredNotices.filter(
        (notice) =>
          notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredNotices;

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    green: "bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    red: "bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    orange: "bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    slate: "bg-slate-50 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300",
  };

  const priorityConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    urgent: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <AlertTriangle className="h-3 w-3" />,
    },
    normal: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Bell className="h-3 w-3" />,
    },
    low: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: null },
  };

  const getCategoryIcon = (category: string): React.ReactNode => {
    switch (category) {
      case "Academic":
        return <BookOpen className="h-4 w-4" />;
      case "Examinations":
        return <GraduationCap className="h-4 w-4" />;
      case "Events":
        return <Calendar className="h-4 w-4" />;
      case "Placements":
        return <Briefcase className="h-4 w-4" />;
      case "Admissions":
        return <Users className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
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
          College Notices & Updates
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Stay informed with the latest announcements and important information
        </motion.p>
      </header>

      {/* Featured Notice Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <Card className="overflow-hidden border-none bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 shadow-lg">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300 border-none">
                  Featured Notice
                </Badge>
                <Badge variant="outline" className="bg-white/50 dark:bg-black/20">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {featuredNotice.category}
                </Badge>
                <Badge className={`${priorityConfig[featuredNotice.priority].color} border`}>
                  {priorityConfig[featuredNotice.priority].icon}
                  <span className="ml-1 capitalize">{featuredNotice.priority}</span>
                </Badge>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">{featuredNotice.title}</h3>
              <p className="text-muted-foreground mb-4">{featuredNotice.description}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{featuredNotice.stats.departments} departments</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{featuredNotice.stats.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{featuredNotice.stats.subjects} subjects</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(new Date(featuredNotice.date), "MMM d, yyyy")}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button>
                  <FileText className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                {featuredNotice.hasAttachment && (
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download Schedule
                  </Button>
                )}
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-1" />
                  Get Notifications
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent dark:from-red-950/30" />
              <div className="h-full w-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <GraduationCap className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <div className="text-sm text-muted-foreground">Exam Period</div>
                  <div className="text-lg font-semibold">Aug 25 - Sep 5</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Search and Actions Bar */}
      <motion.div className="flex flex-col sm:flex-row gap-3 justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search notices by title, content, or department..." className="pl-9 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-1" />
            Subscribe
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Post Notice
          </Button>
        </div>
      </motion.div>

      {/* Notices Tabs and Content */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {getCategoryIcon(category.name)}
              <span className="ml-1">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" variants={containerVariants} initial="hidden" animate="visible">
            {searchedNotices.map((notice) => (
              <motion.div key={notice.id} variants={itemVariants} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        <Badge className={`${colorMap[notice.color]} border-none text-xs`}>
                          {getCategoryIcon(notice.category)}
                          <span className="ml-1">{notice.category}</span>
                        </Badge>
                        <Badge className={`${priorityConfig[notice.priority].color} border text-xs`}>
                          {priorityConfig[notice.priority].icon}
                          <span className="ml-1 capitalize">{notice.priority}</span>
                        </Badge>
                      </div>
                      {notice.hasAttachment && <Paperclip className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{notice.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{notice.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building className="h-3 w-3" />
                        <span>{notice.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(notice.date), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>By {notice.author}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 flex justify-between items-center">
                    {notice.priority === "urgent" && (
                      <div className="flex items-center text-red-600 text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>Urgent</span>
                      </div>
                    )}

                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {notice.hasAttachment && (
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          {searchedNotices.length === 0 && (
            <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No notices found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms or filters." : "No notices available in this category."}
              </p>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CollegeNoticesPage;