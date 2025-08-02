import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Building,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  ExternalLink,
  Filter,
  GraduationCap,
  HelpCircle,
  ListFilter,
  MapPin,
  PieChart,
  Plus,
  Search,
  Star,
  StarHalf,
  StarsIcon,
  X,
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

// Sample placements data
const placements = [
  {
    id: 1,
    company: "TechNova Inc",
    role: "Software Engineer",
    type: "Full-time",
    status: "Upcoming Interview",
    location: "San Francisco, CA",
    deadline: "2025-08-15T23:59:59",
    salary: "$120,000",
    domain: "Software Development",
    appliedOn: "2025-07-28T10:30:00",
    applicationStage: 2, // 0: Applied, 1: Screening, 2: Interview, 3: Final, 4: Offered, 5: Accepted
    totalStages: 4,
    requirements: ["Bachelor's in Computer Science", "2+ years experience", "React & Node.js"],
    applicationProgress: 50,
    logo: "/images/Job.jpg",
    starred: true,
  },
  {
    id: 2,
    company: "DataViz Analytics",
    role: "Data Scientist",
    type: "Full-time",
    status: "Application Submitted",
    location: "Boston, MA (Remote)",
    deadline: "2025-08-12T23:59:59",
    salary: "$115,000",
    domain: "Data Science",
    appliedOn: "2025-07-30T14:45:00",
    applicationStage: 0,
    totalStages: 4,
    requirements: ["Master's in Data Science", "Python", "Machine Learning"],
    applicationProgress: 25,
    logo: "/images/Job.jpg",
    starred: false,
  },
  {
    id: 3,
    company: "FinTech Solutions",
    role: "Frontend Developer",
    type: "Internship",
    status: "Assessment Task",
    location: "New York, NY",
    deadline: "2025-08-10T23:59:59",
    salary: "$30/hour",
    domain: "Web Development",
    appliedOn: "2025-07-25T09:15:00",
    applicationStage: 1,
    totalStages: 3,
    requirements: ["JavaScript", "React", "UI/UX knowledge"],
    applicationProgress: 33,
    logo: "/images/Job.jpg",
    starred: true,
  },
  {
    id: 4,
    company: "CloudSphere Systems",
    role: "DevOps Engineer",
    type: "Full-time",
    status: "Final Interview",
    location: "Seattle, WA",
    deadline: "2025-08-05T23:59:59",
    salary: "$130,000",
    domain: "Cloud Infrastructure",
    appliedOn: "2025-07-20T11:00:00",
    applicationStage: 3,
    totalStages: 4,
    requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    applicationProgress: 75,
    logo: "/images/Job.jpg",
    starred: false,
  },
  {
    id: 5,
    company: "HealthTech Innovations",
    role: "Mobile App Developer",
    type: "Contract",
    status: "Offer Received",
    location: "Chicago, IL (Hybrid)",
    deadline: "2025-07-31T23:59:59",
    salary: "$50/hour",
    domain: "Mobile Development",
    appliedOn: "2025-07-15T13:20:00",
    applicationStage: 4,
    totalStages: 4,
    requirements: ["iOS", "Android", "Flutter"],
    applicationProgress: 100,
    logo: "/images/Job.jpg",
    starred: true,
  },
  {
    id: 6,
    company: "AeroTech Dynamics",
    role: "Systems Engineer",
    type: "Full-time",
    status: "Application Screening",
    location: "Houston, TX",
    deadline: "2025-08-20T23:59:59",
    salary: "$110,000",
    domain: "Aerospace Engineering",
    appliedOn: "2025-07-29T15:10:00",
    applicationStage: 0,
    totalStages: 4,
    requirements: ["Bachelor's in Engineering", "Systems design", "MATLAB"],
    applicationProgress: 25,
    logo: "/images/Job.jpg",
    starred: false,
  },
  {
    id: 7,
    company: "EduLearn Platforms",
    role: "Product Manager",
    type: "Full-time",
    status: "Interview Scheduled",
    location: "Austin, TX (Remote)",
    deadline: "2025-08-18T23:59:59",
    salary: "$105,000",
    domain: "Product Management",
    appliedOn: "2025-07-26T10:00:00",
    applicationStage: 2,
    totalStages: 4,
    requirements: ["3+ years experience", "Agile methodologies", "EdTech background"],
    applicationProgress: 50,
    logo: "/images/Job.jpg",
    starred: false,
  },
  {
    id: 8,
    company: "GreenEnergy Solutions",
    role: "Sustainability Analyst",
    type: "Part-time",
    status: "Application Submitted",
    location: "Portland, OR",
    deadline: "2025-08-25T23:59:59",
    salary: "$25/hour",
    domain: "Environmental Science",
    appliedOn: "2025-07-31T09:45:00",
    applicationStage: 0,
    totalStages: 3,
    requirements: ["Environmental Science degree", "Data analysis", "Sustainability reporting"],
    applicationProgress: 33,
    logo: "/images/Job.jpg",
    starred: false,
  },
];

// Statistics
const statistics = {
  totalApplications: 8,
  interviewing: 3,
  offered: 1,
  upcomingDeadlines: 2,
  averageSalary: "$115,000",
  topDomains: ["Software Development", "Data Science", "Web Development"]
};

// Resource data
const resources = [
  {
    id: 1,
    title: "Resume Building Workshop",
    description: "Learn how to create an effective resume",
    icon: <GraduationCap className="h-5 w-5" />,
    date: "2025-08-10",
  },
  {
    id: 2,
    title: "Interview Preparation Guide",
    description: "Master technical and behavioral interviews",
    icon: <HelpCircle className="h-5 w-5" />,
    date: "2025-08-15",
  },
  {
    id: 3,
    title: "Salary Negotiation Tips",
    description: "Learn how to negotiate your compensation package",
    icon: <PieChart className="h-5 w-5" />,
    date: "2025-08-22",
  },
];

// Success stories
const successStories = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Software Engineer",
    company: "Google",
    rating: 4.8,
    story: "Secured position through campus placements with 3 competing offers",
    avatar: "AJ",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Data Scientist",
    company: "Meta",
    rating: 4.5,
    story: "Transitioned from mechanical engineering to data science through TPO guidance",
    avatar: "MG",
  },
];

export default function PlacementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newApplication, setNewApplication] = useState({
    company: "",
    role: "",
    type: "Full-time",
    location: "",
    deadline: "",
  });

  const filteredPlacements = 
    activeTab === "all" ? placements :
    activeTab === "starred" ? placements.filter(p => p.starred) :
    activeTab === "interviewing" ? placements.filter(p => p.applicationStage === 2 || p.applicationStage === 3) :
    activeTab === "offered" ? placements.filter(p => p.applicationStage === 4 || p.applicationStage === 5) :
    placements.filter(p => p.domain === activeTab);

  const searchedPlacements = searchTerm 
    ? filteredPlacements.filter(placement => 
        placement.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
        placement.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredPlacements;

  const sortedPlacements = [...searchedPlacements].sort((a, b) => {
    // Sort by starred status first
    if (a.starred && !b.starred) return -1;
    if (!a.starred && b.starred) return 1;
    
    // Then by application stage (higher stages first)
    if (a.applicationStage > b.applicationStage) return -1;
    if (a.applicationStage < b.applicationStage) return 1;
    
    // Then by deadline
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  // Get unique domains
  const domains = [...new Set(placements.map(p => p.domain))];

  const handleAddApplication = () => {
    // In a real app, this would submit to a backend
    alert(`Added application for ${newApplication.role} at ${newApplication.company}`);
    setShowAddDialog(false);
    setNewApplication({
      company: "",
      role: "",
      type: "Full-time",
      location: "",
      deadline: "",
    });
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
          Placements & Opportunities
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Track job applications and career opportunities
        </motion.p>
      </header>

      {/* Statistics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <div className="flex items-center">
              <BriefcaseBusiness className="h-8 w-8 mr-3 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{statistics.totalApplications}</div>
                <div className="text-xs text-muted-foreground">
                  Last application on {format(new Date(placements[0].appliedOn), "MMM d, yyyy")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interview Stage</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 mr-3 text-amber-500" />
              <div>
                <div className="text-2xl font-bold">{statistics.interviewing}</div>
                <div className="text-xs text-muted-foreground">
                  Active interviews in progress
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Offers Received</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <div className="flex items-center">
              <Award className="h-8 w-8 mr-3 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{statistics.offered}</div>
                <div className="text-xs text-muted-foreground">
                  Offers pending decision
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Offered Salary</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 mr-3 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{statistics.averageSalary}</div>
                <div className="text-xs text-muted-foreground">
                  Based on full-time offers
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Actions Bar */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-3 justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies, positions, locations..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Applications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                Full-time positions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                Internships
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                Remote opportunities
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <X className="h-4 w-4 mr-2" />
                Clear filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <AlertDialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <AlertDialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Add Application
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add New Application</AlertDialogTitle>
                <AlertDialogDescription>
                  Track a new job application
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={newApplication.company}
                    onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={newApplication.role}
                    onChange={(e) => setNewApplication({...newApplication, role: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="col-span-3">
                        {newApplication.type || "Select type"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setNewApplication({...newApplication, type: "Full-time"})}>
                        Full-time
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewApplication({...newApplication, type: "Internship"})}>
                        Internship
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewApplication({...newApplication, type: "Contract"})}>
                        Contract
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewApplication({...newApplication, type: "Part-time"})}>
                        Part-time
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newApplication.location}
                    onChange={(e) => setNewApplication({...newApplication, location: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadline" className="text-right">
                    Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newApplication.deadline}
                    onChange={(e) => setNewApplication({...newApplication, deadline: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddApplication}>
                  Add Application
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </motion.div>

      {/* Applications Tabs and Content */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
          <TabsTrigger value="offered">Offers</TabsTrigger>
          {domains.slice(0, 2).map(domain => (
            <TabsTrigger key={domain} value={domain}>
              {domain}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0 space-y-4">
          {sortedPlacements.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-10 text-center">
              <BriefcaseBusiness className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No applications found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm 
                  ? "Try a different search term or clear filters" 
                  : "Add your first job application to get started"}
              </p>
              <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Application
              </Button>
            </Card>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {sortedPlacements.map((placement) => {
                // Determine status badge color
                let statusColor = "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
                if (placement.applicationStage === 4 || placement.applicationStage === 5) {
                  statusColor = "bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300";
                } else if (placement.applicationStage === 2 || placement.applicationStage === 3) {
                  statusColor = "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
                } else if (placement.applicationStage === 0) {
                  statusColor = "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
                }

                return (
                  <motion.div
                    key={placement.id}
                    variants={itemVariants}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
                          {/* Company Logo and Info - Left Section */}
                          <div className="sm:col-span-9 flex gap-4">
                            <div className="hidden sm:block h-12 w-12 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                              {placement.logo ? (
                                <img 
                                  src={placement.logo} 
                                  alt={`${placement.company} logo`}
                                  className="object-contain h-full w-full"
                                />
                              ) : (
                                <Building className="h-6 w-6 m-3 text-muted-foreground" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center flex-wrap gap-2">
                                <h3 className="font-semibold text-lg">{placement.role}</h3>
                                <span className="text-muted-foreground">at</span>
                                <span className="font-medium">{placement.company}</span>
                                {placement.starred && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-y-1 gap-x-3 mt-1.5 text-sm">
                                <Badge variant="outline" className="bg-slate-50 dark:bg-slate-900/50 font-normal">
                                  {placement.type}
                                </Badge>
                                <Badge variant="outline" className="bg-slate-50 dark:bg-slate-900/50 font-normal">
                                  {placement.domain}
                                </Badge>
                                <span className="flex items-center text-muted-foreground">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  {placement.location}
                                </span>
                                <span className="flex items-center text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  Applied {format(new Date(placement.appliedOn), "MMM d, yyyy")}
                                </span>
                              </div>

                              <div className="mt-3">
                                <div className="flex justify-between items-center mb-1 text-sm">
                                  <Badge className={`${statusColor} border-none`}>
                                    {placement.status}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Stage {placement.applicationStage + 1} of {placement.totalStages}
                                  </span>
                                </div>
                                <Progress value={placement.applicationProgress} className="h-1.5" />
                              </div>
                            </div>
                          </div>

                          {/* Salary and Action Buttons - Right Section */}
                          <div className="sm:col-span-3 flex flex-col justify-between items-end gap-2">
                            {placement.salary && (
                              <div className="text-right">
                                <div className="font-medium">{placement.salary}</div>
                                <div className="text-xs text-muted-foreground">Expected Salary</div>
                              </div>
                            )}
                            
                            <div className="flex flex-wrap justify-end gap-2 mt-2 sm:mt-0">
                              <Button variant="outline" size="sm">
                                Update
                              </Button>
                              <Button size="sm">
                                Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Deadline Bar */}
                        {new Date(placement.deadline) > new Date() && (
                          <div className="px-6 py-2 bg-slate-50 dark:bg-slate-900/40 border-t text-sm flex justify-between items-center">
                            <div className="flex items-center text-muted-foreground">
                              <AlertCircle className="h-4 w-4 mr-1.5 text-amber-500" />
                              <span>Deadline: {format(new Date(placement.deadline), "MMMM d, yyyy 'at' h:mm a")}</span>
                            </div>
                            
                            <div className="text-xs">
                              {Math.ceil((new Date(placement.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>

      {/* Resources Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Placement Resources
            </CardTitle>
            <CardDescription>
              Workshops and resources to help you succeed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        {resource.icon}
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(resource.date), "MMM d, yyyy")}
                    </div>
                    <Button variant="outline" size="sm">
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Stories and Statistics */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StarsIcon className="h-5 w-5" />
              Success Stories
            </CardTitle>
            <CardDescription>
              Students who secured placements through our program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {successStories.map((story) => (
                <div key={story.id} className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarFallback>{story.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold">{story.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {story.role} @ {story.company}
                      </Badge>
                      <div className="flex items-center ml-auto">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="ml-1 font-medium">{story.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground">
                      {story.story}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="ml-auto">
              View All Stories <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>

        {/* Placement Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Placement Statistics
            </CardTitle>
            <CardDescription>
              Current year placement performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Placement Rate</span>
                  <span className="text-sm font-bold text-green-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Average Salary</span>
                  <span className="text-sm font-bold">$115,000</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Offer Acceptance</span>
                  <span className="text-sm font-bold text-blue-600">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-sm text-muted-foreground">Offers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">$15.2M</div>
                  <div className="text-sm text-muted-foreground">Total Salary</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Data updated daily from placement records</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="link" size="sm" className="pr-0">
              View Detailed Report <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}