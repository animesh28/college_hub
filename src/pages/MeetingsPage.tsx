import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Video, 
  Plus,
  ArrowRight, 
  Check,
  X
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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

// Sample meetings data
const meetings = {
  upcoming: [
    {
      id: 1,
      title: "Database Systems Study Group",
      date: "Today",
      time: "3:00 PM - 4:30 PM",
      location: "Library, Room 305",
      attendees: [
        { name: "Jane Doe", avatar: "" },
        { name: "John Smith", avatar: "" },
        { name: "Alice Johnson", avatar: "" },
        { name: "Bob Williams", avatar: "" }
      ],
      type: "in-person",
      priority: "high"
    },
    {
      id: 2,
      title: "Research Project Check-in",
      date: "Tomorrow",
      time: "11:00 AM - 12:00 PM",
      location: "https://zoom.us/meeting",
      attendees: [
        { name: "Prof. Johnson", avatar: "" },
        { name: "Jane Doe", avatar: "" }
      ],
      type: "virtual",
      priority: "medium"
    },
    {
      id: 3,
      title: "Algorithm Analysis Office Hours",
      date: "Aug 4",
      time: "2:00 PM - 3:00 PM",
      location: "Engineering Building, Room 210",
      attendees: [
        { name: "Prof. Smith", avatar: "" },
        { name: "Jane Doe", avatar: "" }
      ],
      type: "in-person",
      priority: "medium"
    },
    {
      id: 4,
      title: "Senior Project Team Meeting",
      date: "Aug 5",
      time: "4:00 PM - 5:30 PM",
      location: "https://teams.microsoft.com/meeting",
      attendees: [
        { name: "Jane Doe", avatar: "" },
        { name: "Chris Evans", avatar: "" },
        { name: "Maria Rodriguez", avatar: "" },
        { name: "David Kim", avatar: "" }
      ],
      type: "virtual",
      priority: "high"
    }
  ],
  pending: [
    {
      id: 5,
      title: "CS Department Town Hall",
      date: "Aug 10",
      time: "1:00 PM - 2:30 PM",
      location: "Auditorium",
      organizer: { name: "CS Department", avatar: "" },
      type: "in-person",
      priority: "low"
    },
    {
      id: 6,
      title: "Career Fair Preparation Workshop",
      date: "Aug 15",
      time: "11:00 AM - 12:30 PM",
      location: "Career Center",
      organizer: { name: "Career Services", avatar: "" },
      type: "in-person",
      priority: "medium"
    }
  ],
  past: [
    {
      id: 7,
      title: "Database Systems Lecture",
      date: "Aug 1",
      time: "10:30 AM - 11:45 AM",
      location: "Room 302, Engineering Building",
      attendees: [
        { name: "Prof. Johnson", avatar: "" },
        { name: "Jane Doe", avatar: "" },
        { name: "Class", avatar: "" }
      ],
      type: "in-person",
      priority: "high",
      completed: true
    },
    {
      id: 8,
      title: "Study Group Meeting",
      date: "Aug 1",
      time: "1:00 PM - 3:00 PM",
      location: "Library, Study Room 5",
      attendees: [
        { name: "Jane Doe", avatar: "" },
        { name: "Alice Johnson", avatar: "" },
        { name: "Bob Williams", avatar: "" }
      ],
      type: "in-person",
      priority: "medium",
      completed: true
    },
    {
      id: 9,
      title: "Research Project Meeting",
      date: "Jul 31",
      time: "4:15 PM - 4:45 PM",
      location: "Prof. Johnson's Office",
      attendees: [
        { name: "Prof. Johnson", avatar: "" },
        { name: "Jane Doe", avatar: "" }
      ],
      type: "in-person",
      priority: "medium",
      completed: false
    }
  ]
};

export default function MeetingsPage() {
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
          Meetings
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Track your academic appointments and study sessions
        </motion.p>
      </header>

      {/* Next Meeting Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="overflow-hidden border-none bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 shadow-lg">
          <div className="md:flex">
            <div className="p-6 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 border-none">
                  Upcoming
                </Badge>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 border-none">
                  High Priority
                </Badge>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Database Systems Study Group</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Today, 3:00 PM - 4:30 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Library, Room 305</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>4 participants</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  Start Meeting
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  Reschedule
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block p-6 bg-gradient-to-br from-indigo-100/50 to-violet-100/50 dark:from-indigo-900/20 dark:to-violet-900/20 w-1/3">
              <h3 className="font-medium mb-3">Participants</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Jane Doe (You)</p>
                    <p className="text-xs text-muted-foreground">Organizer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Alice Johnson</p>
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>BW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Bob Williams</p>
                    <p className="text-xs text-muted-foreground">Tentative</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Meeting Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        {/* Upcoming Tab */}
        <TabsContent value="upcoming">
          <div className="flex justify-end mb-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Meeting
            </Button>
          </div>
          
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {meetings.upcoming.slice(1).map((meeting) => (
              <motion.div 
                key={meeting.id}
                variants={itemVariants}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className="p-4 flex flex-row justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {meeting.date}, {meeting.time}
                      </CardDescription>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        {meeting.type === "virtual" ? (
                          <Video className="h-3.5 w-3.5" />
                        ) : (
                          <MapPin className="h-3.5 w-3.5" />
                        )}
                        {meeting.location}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`
                        ${meeting.priority === "high" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : 
                          meeting.priority === "medium" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : 
                          "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"} 
                        border-none
                      `}>
                        {meeting.priority.charAt(0).toUpperCase() + meeting.priority.slice(1)} Priority
                      </Badge>
                      
                      <div className="flex -space-x-2">
                        {meeting.attendees.slice(0, 3).map((attendee, index) => (
                          <Avatar key={index} className="h-6 w-6 border-2 border-background">
                            <AvatarFallback className="text-xs">
                              {attendee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {meeting.attendees.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-background">
                            +{meeting.attendees.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 border-t">
                    <div className="flex divide-x">
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10">
                        View Details
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10">
                        Reschedule
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        {/* Pending Tab */}
        <TabsContent value="pending">
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {meetings.pending.map((meeting) => (
              <motion.div 
                key={meeting.id}
                variants={itemVariants}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className="p-4 flex flex-row justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {meeting.date}, {meeting.time}
                      </CardDescription>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        {meeting.type === "virtual" ? (
                          <Video className="h-3.5 w-3.5" />
                        ) : (
                          <MapPin className="h-3.5 w-3.5" />
                        )}
                        {meeting.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <span className="text-muted-foreground">From:</span>
                        <span className="font-medium">{meeting.organizer.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`
                        ${meeting.priority === "high" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : 
                          meeting.priority === "medium" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : 
                          "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"} 
                        border-none
                      `}>
                        {meeting.priority.charAt(0).toUpperCase() + meeting.priority.slice(1)} Priority
                      </Badge>
                      
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-none">
                        Invitation
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 border-t">
                    <div className="flex divide-x">
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10 text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20">
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        {/* Past Tab */}
        <TabsContent value="past">
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {meetings.past.map((meeting) => (
              <motion.div 
                key={meeting.id}
                variants={itemVariants}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`overflow-hidden hover:shadow-md transition-all ${meeting.completed ? "" : "opacity-70"}`}>
                  <CardHeader className="p-4 flex flex-row justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {meeting.date}, {meeting.time}
                      </CardDescription>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        {meeting.type === "virtual" ? (
                          <Video className="h-3.5 w-3.5" />
                        ) : (
                          <MapPin className="h-3.5 w-3.5" />
                        )}
                        {meeting.location}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {meeting.completed ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-none">
                          Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-none">
                          Missed
                        </Badge>
                      )}
                      
                      <div className="flex -space-x-2">
                        {meeting.attendees.slice(0, 3).map((attendee, index) => (
                          <Avatar key={index} className="h-6 w-6 border-2 border-background">
                            <AvatarFallback className="text-xs">
                              {attendee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {meeting.attendees.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-background">
                            +{meeting.attendees.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 border-t">
                    <div className="flex divide-x">
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10">
                        View Notes
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10">
                        Schedule Follow-up
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}