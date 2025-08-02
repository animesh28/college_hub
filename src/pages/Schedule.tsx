import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { format, startOfWeek, addDays, isSameDay, parseISO, isToday, isTomorrow, addWeeks } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Download,
  Share,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Mail,
  Phone,
  FileText,
  Video,
  Users,
  Bell,
  Plus,
  X,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Star,
  BookMarked,
  Laptop,
  FlaskConical,
  PresentationChart,
  GraduationCap
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Types
interface Professor {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  office: string;
  rating?: number;
}

interface ClassSession {
  id: number;
  subject: string;
  code: string;
  professor: Professor;
  startTime: string;
  endTime: string;
  room: string;
  building: string;
  type: 'Theory' | 'Lab' | 'Seminar' | 'Exam';
  color: string;
  materials: string[];
  attendanceRequired: boolean;
  isOnline: boolean;
  meetingLink?: string;
  credits: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prerequisites?: string[];
  description?: string;
}

interface DaySchedule {
  date: string;
  classes: ClassSession[];
}

// Enhanced sample data with more professors
const professorsData: Professor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 0123",
    avatar: "/professors/sarah.jpg",
    department: "Computer Science",
    office: "CS Building, Room 301",
    rating: 4.8
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 0124",
    avatar: "/professors/michael.jpg",
    department: "Mathematics",
    office: "Math Building, Room 205",
    rating: 4.6
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@university.edu",
    phone: "+1 (555) 0125",
    avatar: "/professors/emily.jpg",
    department: "Physics",
    office: "Physics Building, Room 401",
    rating: 4.9
  },
  {
    id: 4,
    name: "Prof. David Kumar",
    email: "david.kumar@university.edu",
    phone: "+1 (555) 0126",
    avatar: "/professors/david.jpg",
    department: "Computer Science",
    office: "CS Building, Room 205",
    rating: 4.7
  },
  {
    id: 5,
    name: "Dr. Lisa Wang",
    email: "lisa.wang@university.edu",
    phone: "+1 (555) 0127",
    avatar: "/professors/lisa.jpg",
    department: "Business",
    office: "Business Building, Room 105",
    rating: 4.5
  },
  {
    id: 6,
    name: "Prof. James Anderson",
    email: "james.anderson@university.edu",
    phone: "+1 (555) 0128",
    avatar: "/professors/james.jpg",
    department: "Chemistry",
    office: "Chemistry Building, Room 302",
    rating: 4.4
  },
  {
    id: 7,
    name: "Dr. Maria Garcia",
    email: "maria.garcia@university.edu",
    phone: "+1 (555) 0129",
    avatar: "/professors/maria.jpg",
    department: "Biology",
    office: "Biology Building, Room 201",
    rating: 4.8
  },
  {
    id: 8,
    name: "Prof. Robert Lee",
    email: "robert.lee@university.edu",
    phone: "+1 (555) 0130",
    avatar: "/professors/robert.jpg",
    department: "Economics",
    office: "Economics Building, Room 301",
    rating: 4.3
  }
];

// Generate comprehensive schedule data for multiple weeks
const generateScheduleData = (): DaySchedule[] => {
  const schedules: DaySchedule[] = [];
  const today = new Date('2025-07-20'); // Using the date from your image
  
  const subjects = [
    {
      subject: "Data Structures & Algorithms",
      code: "CS301",
      professor: professorsData[0],
      type: "Theory" as const,
      color: "bg-blue-500",
      materials: ["Lecture Slides", "Assignment 3", "Reading Material", "Practice Problems"],
      credits: 4,
      difficulty: "Hard" as const,
      prerequisites: ["CS201", "MATH101"],
      description: "Advanced data structures and algorithmic techniques"
    },
    {
      subject: "Database Systems",
      code: "CS401",
      professor: professorsData[3],
      type: "Theory" as const,
      color: "bg-red-500",
      materials: ["SQL Tutorial", "Database Design Guide", "ER Diagrams"],
      credits: 3,
      difficulty: "Medium" as const,
      description: "Relational database design and management"
    },
    {
      subject: "Linear Algebra",
      code: "MATH201",
      professor: professorsData[1],
      type: "Theory" as const,
      color: "bg-yellow-600",
      materials: ["Practice Problems", "Solution Guide", "Matrix Calculator"],
      credits: 3,
      difficulty: "Medium" as const,
      description: "Vector spaces and linear transformations"
    },
    {
      subject: "Physics Lab",
      code: "PHY101L",
      professor: professorsData[2],
      type: "Lab" as const,
      color: "bg-purple-500",
      materials: ["Lab Manual", "Safety Guidelines", "Equipment List"],
      credits: 1,
      difficulty: "Easy" as const,
      description: "Hands-on physics experiments and measurements"
    },
    {
      subject: "Software Engineering",
      code: "CS405",
      professor: professorsData[0],
      type: "Theory" as const,
      color: "bg-green-500",
      materials: ["Project Guidelines", "UML Diagrams", "Case Studies"],
      credits: 3,
      difficulty: "Medium" as const,
      description: "Software development lifecycle and project management"
    },
    {
      subject: "Organic Chemistry",
      code: "CHEM301",
      professor: professorsData[5],
      type: "Theory" as const,
      color: "bg-orange-500",
      materials: ["Molecular Models", "Reaction Mechanisms", "Lab Protocols"],
      credits: 4,
      difficulty: "Hard" as const,
      description: "Structure and reactions of organic compounds"
    },
    {
      subject: "Biology Lab",
      code: "BIO201L",
      professor: professorsData[6],
      type: "Lab" as const,
      color: "bg-teal-500",
      materials: ["Microscopy Guide", "Specimen Collection", "Lab Reports"],
      credits: 2,
      difficulty: "Medium" as const,
      description: "Laboratory techniques in biological sciences"
    },
    {
      subject: "Microeconomics",
      code: "ECON201",
      professor: professorsData[7],
      type: "Seminar" as const,
      color: "bg-indigo-500",
      materials: ["Economic Models", "Case Studies", "Market Analysis"],
      credits: 3,
      difficulty: "Medium" as const,
      description: "Individual and firm decision making in markets"
    },
    {
      subject: "Calculus III",
      code: "MATH301",
      professor: professorsData[1],
      type: "Theory" as const,
      color: "bg-pink-500",
      materials: ["Vector Calculus", "3D Visualization", "Problem Sets"],
      credits: 4,
      difficulty: "Hard" as const,
      description: "Multivariable calculus and vector analysis"
    },
    {
      subject: "Computer Networks Lab",
      code: "CS402L",
      professor: professorsData[3],
      type: "Lab" as const,
      color: "bg-cyan-500",
      materials: ["Network Tools", "Protocol Analysis", "Lab Exercises"],
      credits: 2,
      difficulty: "Medium" as const,
      description: "Network protocols and distributed systems lab"
    },
    {
      subject: "Data Structures Exam",
      code: "CS301E",
      professor: professorsData[0],
      type: "Exam" as const,
      color: "bg-red-600",
      materials: ["Study Guide", "Previous Papers", "Formula Sheet"],
      credits: 0,
      difficulty: "Hard" as const,
      description: "Mid-term examination for Data Structures"
    },
    {
      subject: "Research Methodology",
      code: "RES401",
      professor: professorsData[4],
      type: "Seminar" as const,
      color: "bg-slate-500",
      materials: ["Research Papers", "Methodology Guide", "Statistical Tools"],
      credits: 2,
      difficulty: "Medium" as const,
      description: "Research methods and academic writing"
    }
  ];

  // Generate schedule for 4 weeks starting from July 20, 2025
  for (let week = 0; week < 4; week++) {
    for (let day = 0; day < 7; day++) {
      const currentDate = addDays(addWeeks(today, week), day);
      const dateString = format(currentDate, 'yyyy-MM-dd');
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
      
      const dayClasses: ClassSession[] = [];
      
      // Monday (1)
      if (dayOfWeek === 1) {
        dayClasses.push(
          {
            id: Math.random(),
            ...subjects[0], // Data Structures Theory
            startTime: "09:00",
            endTime: "10:30",
            room: "Room 101",
            building: "Computer Science Building",
            attendanceRequired: true,
            isOnline: false
          },
          {
            id: Math.random(),
            ...subjects[4], // Software Engineering Theory
            startTime: "11:00",
            endTime: "12:30",
            room: "Room 205",
            building: "Computer Science Building",
            attendanceRequired: true,
            isOnline: false
          },
          {
            id: Math.random(),
            ...subjects[8], // Calculus III Theory
            startTime: "14:00",
            endTime: "15:30",
            room: "Room 301",
            building: "Mathematics Building",
            attendanceRequired: true,
            isOnline: false
          }
        );
      }
      
      // Tuesday (2)
      if (dayOfWeek === 2) {
        dayClasses.push(
          {
            id: Math.random(),
            ...subjects[1], // Database Systems Theory
            startTime: "10:00",
            endTime: "11:30",
            room: "Online",
            building: "Virtual",
            attendanceRequired: true,
            isOnline: true,
            meetingLink: "https://zoom.us/j/123456789"
          },
          {
            id: Math.random(),
            ...subjects[2], // Linear Algebra Theory
            startTime: "13:00",
            endTime: "14:30",
            room: "Room 205",
            building: "Mathematics Building",
            attendanceRequired: false,
            isOnline: false
          },
          {
            id: Math.random(),
            ...subjects[6], // Biology Lab
            startTime: "15:00",
            endTime: "17:00",
            room: "Lab 2",
            building: "Biology Building",
            attendanceRequired: true,
            isOnline: false
          }
        );
      }
      
      // Wednesday (3)
      if (dayOfWeek === 3) {
        dayClasses.push(
          {
            id: Math.random(),
            ...subjects[0], // Data Structures Theory
            startTime: "09:00",
            endTime: "10:30",
            room: "Room 101",
            building: "Computer Science Building",
            attendanceRequired: true,
            isOnline: false
          },
          {
            id: Math.random(),
            ...subjects[3], // Physics Lab
            startTime: "14:00",
            endTime: "16:00",
            room: "Lab 3",
            building: "Physics Building",
            attendanceRequired: true,
            isOnline: false
          },
          {
            id: Math.random(),
            ...subjects[11], // Research Methodology Seminar
            startTime: "16:30",
            endTime: "18:00",
            room: "Seminar Hall 1",
            building: "Main Building",
            attendanceRequired: true,
            isOnline: false
          }
        );
      }
      
      // Thursday (4)
      if (dayOfWeek === 4) {
        dayClasses.push(
          {
            id: Math.random(),
            ...subjects[1], // Database Systems Theory
            startTime: "10:00",
            endTime: "11:30",
            room: "Online",
            building: "Virtual",
            attendanceRequired: true,
            isOnline: true,
            meetingLink: "https://zoom.us/j/123456789"
          },
          {
            id: Math.random(),
            ...subjects[5], // Organic Chemistry Theory
            startTime: "12:00",
            endTime: "13:30",
            room: "Room 302",
            building: "Chemistry Building",
            attendanceRequired: true,
            isOnline: false
          },
          {
            id: Math.random(),
            ...subjects[7], // Microeconomics Seminar
            startTime: "15:00",
            endTime: "16:30",
            room: "Seminar Hall 2",
            building: "Economics Building",
            attendanceRequired: true,
            isOnline: false
          }
        );
      }
      
      // Friday (5)
      if (dayOfWeek === 5) {
        dayClasses.push(
          {
            id: Math.random(),
            ...subjects[4], // Software Engineering Theory
            startTime: "11:00",
            endTime: "12:30",
            room: "Room 205",
            building: "Computer Science Building",
            attendanceRequired: true,
            isOnline: false
          },
          {
            id: Math.random(),
            ...subjects[9], // Computer Networks Lab
            startTime: "14:00",
            endTime: "16:00",
            room: "Lab 1",
            building: "Computer Science Building",
            attendanceRequired: true,
            isOnline: false
          }
        );
        
        // Add exam on specific Fridays
        if (week === 1) {
          dayClasses.push({
            id: Math.random(),
            ...subjects[10], // Data Structures Exam
            startTime: "16:30",
            endTime: "18:30",
            room: "Exam Hall A",
            building: "Main Building",
            attendanceRequired: true,
            isOnline: false
          });
        }
      }
      
      schedules.push({ date: dateString, classes: dayClasses });
    }
  }
  
  return schedules;
};

const scheduleData = generateScheduleData();

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const WeekView: React.FC<{ 
  currentWeek: Date;
  schedule: DaySchedule[];
  onClassClick: (classSession: ClassSession) => void;
}> = ({ currentWeek, schedule, onClassClick }) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(currentWeek), i));
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] grid grid-cols-8 gap-1">
        {/* Header */}
        <div className="p-2"></div>
        {weekDays.map((day, index) => (
          <div key={index} className={`p-2 text-center border-b ${isToday(day) ? 'bg-blue-50 font-bold' : ''}`}>
            <div className="font-medium">{format(day, 'EEE')}</div>
            <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
          </div>
        ))}

        {/* Time slots and classes */}
        {timeSlots.map((time, timeIndex) => (
          <React.Fragment key={timeIndex}>
            <div className="p-2 text-sm text-muted-foreground border-r font-mono">{time}</div>
            {weekDays.map((day, dayIndex) => {
              const daySchedule = schedule.find(s => isSameDay(parseISO(s.date), day));
              const classInSlot = daySchedule?.classes.find(c => 
                c.startTime <= time && c.endTime > time
              );

              return (
                <div key={dayIndex} className={`p-1 min-h-[60px] border-r border-b ${isToday(day) ? 'bg-blue-50/30' : ''}`}>
                  {classInSlot && (
                    <motion.div
                      className={`p-2 rounded text-white text-xs cursor-pointer ${classInSlot.color} shadow-sm`}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                      onClick={() => onClassClick(classInSlot)}
                    >
                      <div className="font-medium truncate">{classInSlot.subject}</div>
                      <div className="opacity-90 truncate">{classInSlot.room}</div>
                      <div className="opacity-75 text-xs mt-1">{classInSlot.professor.name.split(' ')[1]}</div>
                      <div className="opacity-90 text-xs">{classInSlot.type}</div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

function ClassSchedulePage(): JSX.Element {
  const [currentDate, setCurrentDate] = useState(new Date('2025-07-20'));
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [activeView, setActiveView] = useState<'daily' | 'weekly'>('weekly');
  
  // Remove the GSAP pinning that was causing the overlap
  const headerRef = useRef<HTMLDivElement>(null);

  const currentWeekSchedule = useMemo(() => {
    return scheduleData.filter(day => {
      const dayDate = parseISO(day.date);
      const weekStart = startOfWeek(currentDate);
      const weekEnd = addDays(weekStart, 6);
      return dayDate >= weekStart && dayDate <= weekEnd;
    });
  }, [currentDate]);

  const todaySchedule = useMemo(() => {
    return scheduleData.find(day => isSameDay(parseISO(day.date), currentDate));
  }, [currentDate]);

  const handlePreviousWeek = () => {
    setCurrentDate(prev => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7));
  };

  const handlePreviousDay = () => {
    setCurrentDate(prev => addDays(prev, -1));
  };

  const handleNextDay = () => {
    setCurrentDate(prev => addDays(prev, 1));
  };

  const handleViewDetails = (classSession: ClassSession) => {
    setSelectedClass(classSession);
  };

  const handleDownloadMaterials = (classSession: ClassSession) => {
    console.log('Downloading materials for:', classSession.subject);
  };

  return (
    <div className="space-y-6">
      {/* Fixed Header - Remove pinning and reduce z-index issues */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Class Schedule</h1>
          <p className="text-muted-foreground">Manage your academic timetable and class materials</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={activeView === 'daily' ? handlePreviousDay : handlePreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-lg font-medium">
              {activeView === 'daily' 
                ? format(currentDate, 'EEEE, MMMM d, yyyy')
                : `${format(startOfWeek(currentDate), 'MMM d')} - ${format(addDays(startOfWeek(currentDate), 6), 'MMM d, yyyy')}`
              }
            </div>
            <Button variant="outline" size="sm" onClick={activeView === 'daily' ? handleNextDay : handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'daily' | 'weekly')}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeView} className="w-full">
        <TabsContent value="daily" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {isToday(currentDate) ? "Today's Classes" : `Classes for ${format(currentDate, 'EEEE, MMMM d')}`}
              </h2>
              <Badge variant="outline">
                {todaySchedule?.classes.length || 0} classes
              </Badge>
            </div>

            {todaySchedule?.classes.length ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {todaySchedule.classes.map((classSession) => (
                  <motion.div key={classSession.id} variants={cardVariants}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className={`h-2 ${classSession.color}`}></div>
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{classSession.subject}</CardTitle>
                            <p className="text-sm text-muted-foreground">{classSession.code} • {classSession.type}</p>
                          </div>
                          <Badge variant={classSession.type === 'Lab' ? 'destructive' : classSession.type === 'Exam' ? 'secondary' : 'default'}>
                            {classSession.type}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{classSession.startTime} - {classSession.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{classSession.room}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={classSession.professor.avatar} alt={classSession.professor.name} />
                            <AvatarFallback>{classSession.professor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{classSession.professor.name}</p>
                            <p className="text-xs text-muted-foreground">{classSession.professor.department}</p>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(classSession)}>
                          View Details
                        </Button>
                        {classSession.materials.length > 0 && (
                          <Button size="sm" className="flex-1" onClick={() => handleDownloadMaterials(classSession)}>
                            <Download className="h-4 w-4 mr-1" />
                            Materials
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No classes today</h3>
                <p className="text-muted-foreground">Enjoy your free day!</p>
              </Card>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <WeekView
                currentWeek={currentDate}
                schedule={currentWeekSchedule}
                onClassClick={handleViewDetails}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced Class Details Modal */}
      {selectedClass && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedClass(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedClass.subject}</CardTitle>
                    <p className="text-muted-foreground">{selectedClass.code} • {selectedClass.type}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedClass(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Class Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time:</span>
                          <span>{selectedClass.startTime} - {selectedClass.endTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>{selectedClass.room}, {selectedClass.building}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <Badge variant="outline">{selectedClass.type}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Credits:</span>
                          <span>{selectedClass.credits}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Professor</h3>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedClass.professor.avatar} />
                          <AvatarFallback>{selectedClass.professor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{selectedClass.professor.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedClass.professor.department}</p>
                          <p className="text-xs text-muted-foreground">{selectedClass.professor.office}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Contact</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{selectedClass.professor.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{selectedClass.professor.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedClass.description && (
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedClass.description}</p>
                  </div>
                )}

                {selectedClass.materials.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Course Materials</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedClass.materials.map((material, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">
                    <BookMarked className="h-4 w-4 mr-1" />
                    Add to Favorites
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Download Materials
                  </Button>
                  {selectedClass.isOnline && selectedClass.meetingLink && (
                    <Button variant="outline" onClick={() => window.open(selectedClass.meetingLink, '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Join Meeting
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default ClassSchedulePage;
