import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Filter, 
  LineChart, 
  MoreVertical, 
  Plus,
  CheckCircle2,
  UserCheck,
  UserX,
  Clock4,
  UserCog,
  ChevronRight,
  BookOpen,
  User,
  Award
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

// Sample attendance data
const attendanceData = {
  overall: {
    percentage: 87,
    streak: 12,
    totalClasses: 42,
    attended: 36,
    absent: 4,
    late: 2,
    excused: 0
  },
  subjects: [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      percentage: 92,
      classesTotal: 25,
      classesAttended: 23
    },
    {
      id: 2,
      name: "Physics",
      code: "PHYS102",
      percentage: 85,
      classesTotal: 24,
      classesAttended: 20
    },
    {
      id: 3,
      name: "Chemistry",
      code: "CHEM103",
      percentage: 78,
      classesTotal: 22,
      classesAttended: 17
    },
    {
      id: 4,
      name: "English Literature",
      code: "ENG104",
      percentage: 96,
      classesTotal: 20,
      classesAttended: 19
    },
    {
      id: 5,
      name: "Computer Science",
      code: "CS105",
      percentage: 88,
      classesTotal: 26,
      classesAttended: 23
    }
  ],
  recent: [
    {
      id: 1,
      date: "2025-08-05",
      subject: "Mathematics",
      class: "Class 10-A",
      teacher: "Dr. Sharma",
      time: "09:00 AM - 10:30 AM",
      status: "present"
    },
    {
      id: 2,
      date: "2025-08-05",
      subject: "Physics",
      class: "Class 10-A",
      teacher: "Prof. Gupta",
      time: "11:00 AM - 12:30 PM",
      status: "late"
    },
    {
      id: 3,
      date: "2025-08-04",
      subject: "Chemistry",
      class: "Class 10-A",
      teacher: "Dr. Patel",
      time: "09:00 AM - 10:30 AM",
      status: "absent"
    },
    {
      id: 4,
      date: "2025-08-04",
      subject: "English Literature",
      class: "Class 10-A",
      teacher: "Ms. Williams",
      time: "11:00 AM - 12:30 PM",
      status: "present"
    }
  ]
};

// Get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "present": return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-none";
    case "absent": return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-none";
    case "late": return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-none";
    case "excused": return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-none";
    default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300 border-none";
  }
};

// Get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case "present": return <UserCheck className="h-4 w-4" />;
    case "absent": return <UserX className="h-4 w-4" />;
    case "late": return <Clock4 className="h-4 w-4" />;
    case "excused": return <UserCog className="h-4 w-4" />;
    default: return <User className="h-4 w-4" />;
  }
};

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Pie chart data
  const pieData = [
    { name: 'Present', value: attendanceData.overall.attended, color: '#4ade80' },
    { name: 'Absent', value: attendanceData.overall.absent, color: '#f87171' },
    { name: 'Late', value: attendanceData.overall.late, color: '#fbbf24' },
    { name: 'Excused', value: attendanceData.overall.excused, color: '#60a5fa' }
  ];

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
          Attendance
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Track your class attendance and progress
        </motion.p>
      </header>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="overflow-hidden bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl w-16 h-16 flex items-center justify-center text-white text-xl font-bold">
                AJ
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold">Hello, Alex Johnson</h2>
                <p className="text-muted-foreground mt-1">Class 10-A | ID: S123456</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {attendanceData.overall.percentage}%
                  </p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                    {attendanceData.overall.streak} days
                  </p>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              Total Classes
              <LineChart className="h-5 w-5 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.overall.totalClasses}</div>
            <div className="text-xs text-muted-foreground mt-1">
              This semester
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              Present
              <UserCheck className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.overall.attended}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((attendanceData.overall.attended / attendanceData.overall.totalClasses) * 100)}% of classes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              Absent
              <UserX className="h-5 w-5 text-red-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.overall.absent}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((attendanceData.overall.absent / attendanceData.overall.totalClasses) * 100)}% of classes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              Late/Excused
              <Clock4 className="h-5 w-5 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.overall.late + attendanceData.overall.excused}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {attendanceData.overall.late} late, {attendanceData.overall.excused} excused
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts and Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
            <CardDescription>{attendanceData.overall.totalClasses} total classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold">{attendanceData.overall.percentage}%</p>
                  <p className="text-muted-foreground">Overall</p>
                </div>
                <div className="w-full h-full relative">
                  {pieData.map((item, index) => (
                    <div 
                      key={index}
                      className="absolute w-full h-full rounded-full"
                      style={{
                        clipPath: `conic-gradient(from ${index * 90}deg, ${item.color} ${item.value * 2}%, transparent 0)`,
                        transform: `rotate(${index * 90}deg)`
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.value} classes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle Column - By Subject */}
        <Card>
          <CardHeader>
            <CardTitle>By Subject</CardTitle>
            <CardDescription>Attendance percentage per subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceData.subjects.map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.code}</p>
                  </div>
                  <span className={`font-bold ${
                    subject.percentage >= 90 
                      ? "text-green-600" 
                      : subject.percentage >= 75 
                        ? "text-amber-600" 
                        : "text-red-600"
                  }`}>
                    {subject.percentage}%
                  </span>
                </div>
                <Progress 
                  value={subject.percentage} 
                  className={`h-2 ${
                    subject.percentage >= 90 
                      ? "bg-green-500/20 [&>div]:bg-green-500" 
                      : subject.percentage >= 75 
                        ? "bg-amber-500/20 [&>div]:bg-amber-500" 
                        : "bg-red-500/20 [&>div]:bg-red-500"
                  }`}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{subject.classesAttended} attended</span>
                  <span>{subject.classesTotal} total</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Column - Streak Card */}
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-950/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-600" />
              Current Streak
            </CardTitle>
            <CardDescription>Your attendance consistency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-amber-600 dark:text-amber-400">
                {attendanceData.overall.streak}
              </div>
              <p className="text-lg mt-2">days in a row</p>
              <div className="mt-6 w-full max-w-xs">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Start date</span>
                  <span>Today</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="ml-auto text-amber-600 hover:text-amber-700">
              View streak history <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Your latest class attendance records</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-1" />
                Request Leave
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {attendanceData.recent.map((record) => (
              <motion.div
                key={record.id}
                variants={itemVariants}
              >
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 flex gap-4">
                      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-3 h-14 w-14 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{record.subject}</h3>
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                            {record.class}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-y-1 gap-x-3 mt-1.5 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <User className="h-3.5 w-3.5 mr-1" />
                            {record.teacher}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {record.time}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {record.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-4 flex items-center justify-end gap-4">
                      <Badge className={`${getStatusColor(record.status)} flex items-center gap-1`}>
                        {getStatusIcon(record.status)}
                        <span className="capitalize">{record.status}</span>
                      </Badge>
                      
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}