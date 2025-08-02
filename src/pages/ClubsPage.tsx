import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Bell,
  Calendar,
  CalendarClock,
  CircleUser,
  Clock,
  Globe,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Users,
  Trophy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

// Sample clubs data
const clubs = [
  {
    id: 1,
    name: "Coding Club",
    category: "Technology",
    description: "Join fellow coders to build projects, participate in hackathons, and learn new technologies.",
    memberCount: 87,
    logo: "/assets/clubs/coding-club.jpg",
    events: 3,
    nextEvent: "2025-08-05T18:00:00",
    nextEventName: "Algorithm Design Workshop",
    location: "Computer Science Building, Room 305",
    joined: true,
    role: "Member",
    achievements: ["2nd Place in National Hackathon", "Best Mobile App 2025"],
    color: "blue"
  },
  {
    id: 2,
    name: "Robotics Society",
    category: "Technology",
    description: "Design, build, and program robots for competitions and exhibitions.",
    memberCount: 45,
    logo: "/assets/clubs/robotics-society.jpg",
    events: 2,
    nextEvent: "2025-08-10T15:00:00",
    nextEventName: "Bot Battle Competition",
    location: "Engineering Hall, Room 110",
    joined: true,
    role: "Vice President",
    achievements: ["Regional Champions 2025", "Innovation Award"],
    color: "cyan"
  },
  {
    id: 3,
    name: "Chess Club",
    category: "Recreation",
    description: "Weekly meetings for chess enthusiasts of all skill levels.",
    memberCount: 32,
    logo: "/assets/clubs/chess-club.jpg",
    events: 1,
    nextEvent: "2025-08-03T16:00:00",
    nextEventName: "Open Tournament",
    location: "Student Center, Room 203",
    joined: false,
    color: "slate"
  },
  {
    id: 4,
    name: "Photography Club",
    category: "Arts",
    description: "Capture stunning images, learn photography techniques, and participate in exhibitions.",
    memberCount: 64,
    logo: "/images/Photography.jpg",
    events: 2,
    nextEvent: "2025-08-09T10:00:00",
    nextEventName: "City Photo Walk",
    location: "Meeting at University Main Gate",
    joined: false,
    color: "amber"
  },
  {
    id: 5,
    name: "Entrepreneurship Club",
    category: "Business",
    description: "Connect with fellow entrepreneurs, develop business plans, and pitch to potential investors.",
    memberCount: 53,
    logo: "/assets/clubs/entrepreneurship-club.jpg",
    events: 4,
    nextEvent: "2025-08-04T17:30:00",
    nextEventName: "Startup Pitch Night",
    location: "Business School, Auditorium B",
    joined: true,
    role: "Member",
    achievements: ["Best Startup Idea 2025"],
    color: "green"
  },
  {
    id: 6,
    name: "Debate Society",
    category: "Academic",
    description: "Sharpen your critical thinking and public speaking skills through formal debates.",
    memberCount: 29,
    logo: "/images/Debate.jpg",
    events: 1,
    nextEvent: "2025-08-12T18:00:00",
    nextEventName: "Public Policy Debate",
    location: "Humanities Building, Hall A",
    joined: false,
    color: "red"
  },
  {
    id: 7,
    name: "Film Club",
    category: "Arts",
    description: "Watch and discuss classic and contemporary films, and create short films.",
    memberCount: 38,
    logo: "/assets/clubs/film-club.jpg",
    events: 2,
    nextEvent: "2025-08-07T19:00:00",
    nextEventName: "Documentary Night",
    location: "Arts Center, Theater 2",
    joined: true,
    role: "Member",
    achievements: [],
    color: "purple"
  },
  {
    id: 8,
    name: "Environmental Club",
    category: "Service",
    description: "Work on sustainability initiatives and environmental awareness campaigns.",
    memberCount: 42,
    logo: "/assets/clubs/environmental-club.jpg",
    events: 3,
    nextEvent: "2025-08-06T09:00:00",
    nextEventName: "Campus Cleanup Drive",
    location: "Meeting at Central Quad",
    joined: false,
    color: "green"
  }
];

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredClubs = activeTab === "all" 
    ? clubs 
    : activeTab === "myClubs" 
      ? clubs.filter(club => club.joined) 
      : clubs.filter(club => club.category.toLowerCase() === activeTab.toLowerCase());

  const searchedClubs = searchTerm 
    ? filteredClubs.filter(club => 
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredClubs;

  const colorMap = {
    'blue': 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'green': 'bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    'amber': 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    'purple': 'bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'red': 'bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    'cyan': 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    'slate': 'bg-slate-50 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300',
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
          Clubs & Activities
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover and join student organizations
        </motion.p>
      </header>

      {/* Featured Club Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-lg">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 border-none">
                  Featured Club
                </Badge>
                <Badge variant="outline" className="bg-white/50 dark:bg-black/20">
                  Technology
                </Badge>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Coding Club</h3>
              <p className="text-muted-foreground mb-4">
                Join fellow coders to build projects, participate in hackathons, and learn new technologies.
                Our next meeting features a workshop on advanced algorithm design techniques.
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">87 members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">2 achievements</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">3 upcoming events</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button>
                  View Club Details
                </Button>
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-1" />
                  Get Notifications
                </Button>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/30" />
              <div className="h-full w-full bg-[url('/assets/clubs/coding-club-banner.jpg')] bg-cover bg-center" />
            </div>
          </div>
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
            placeholder="Search clubs by name or category..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Create Club
          </Button>
        </div>
      </motion.div>

      {/* Clubs Tabs and Content */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Clubs</TabsTrigger>
          <TabsTrigger value="myClubs">My Clubs</TabsTrigger>
          <TabsTrigger value="Technology">Technology</TabsTrigger>
          <TabsTrigger value="Arts">Arts</TabsTrigger>
          <TabsTrigger value="Academic">Academic</TabsTrigger>
          <TabsTrigger value="Service">Service</TabsTrigger>
          <TabsTrigger value="Recreation">Recreation</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {searchedClubs.map((club) => (
              <motion.div
                key={club.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-32 bg-slate-100 dark:bg-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <h3 className="font-semibold text-white text-lg">{club.name}</h3>
                      <Badge className={`${colorMap[club.color]} border-none`}>
                        {club.category}
                      </Badge>
                    </div>
                    <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${club.logo || '/assets/clubs/default-club.jpg'})` }} />
                  </div>

                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {club.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{club.memberCount} members</span>
                      </div>
                      {club.events > 0 && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{club.events} event{club.events !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>

                    {club.nextEvent && (
                      <Card className="bg-slate-50 dark:bg-slate-900/40 border-none mb-3 p-2">
                        <div className="flex gap-2">
                          <div className="flex-shrink-0 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded p-1.5 w-12">
                            <span className="text-xs font-medium">
                              {format(new Date(club.nextEvent), "MMM")}
                            </span>
                            <span className="text-lg font-bold">
                              {format(new Date(club.nextEvent), "d")}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{club.nextEventName}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{club.location}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </CardContent>

                  <CardFooter className="pt-0 flex justify-between items-center">
                    {club.joined ? (
                      <div className="flex items-center text-sm">
                        <CircleUser className="h-4 w-4 text-blue-500 mr-1" />
                        <span>{club.role || "Member"}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not joined</span>
                    )}
                    
                    <Button variant={club.joined ? "outline" : "default"} size="sm">
                      {club.joined ? "View" : "Join Club"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}