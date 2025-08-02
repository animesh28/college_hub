import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Filter, 
  MoreVertical, 
  Plus 
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

// Sample assignments data
const assignments = {
  active: [
    {
      id: 1,
      title: "Algorithm Analysis Assignment",
      course: "CS 401: Algorithm Analysis",
      dueDate: "Aug 2, 2025",
      dueTime: "3:00 PM",
      progress: 65,
      priority: "high",
      status: "in-progress",
      type: "assignment"
    },
    {
      id: 2,
      title: "Research Literature Review",
      course: "CS 505: Advanced Topics",
      dueDate: "Aug 5, 2025",
      dueTime: "11:59 PM",
      progress: 30,
      priority: "medium",
      status: "in-progress",
      type: "research"
    },
    {
      id: 3,
      title: "Database Design Project",
      course: "CS 310: Database Systems",
      dueDate: "Aug 10, 2025",
      dueTime: "11:59 PM",
      progress: 20,
      priority: "high",
      status: "not-started",
      type: "project"
    },
    {
      id: 4,
      title: "Study for Midterm Exam",
      course: "CS 210: Data Structures",
      dueDate: "Aug 15, 2025",
      dueTime: "10:00 AM",
      progress: 0,
      priority: "medium",
      status: "not-started",
      type: "exam"
    },
  ],
  completed: [
    {
      id: 5,
      title: "Programming Exercise 3",
      course: "CS 210: Data Structures",
      completedDate: "Jul 30, 2025",
      grade: "A",
      feedback: true,
      type: "assignment"
    },
    {
      id: 6,
      title: "SQL Lab",
      course: "CS 310: Database Systems",
      completedDate: "Jul 28, 2025",
      grade: "A-",
      feedback: true,
      type: "lab"
    },
    {
      id: 7,
      title: "Research Proposal",
      course: "CS 505: Advanced Topics",
      completedDate: "Jul 25, 2025",
      grade: "B+",
      feedback: true,
      type: "research"
    },
  ]
};

export default function AssignmentsPage() {
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
          Assignments
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Track your academic tasks and progress
        </motion.p>
      </header>

      {/* Next Due Assignment Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="overflow-hidden border-none bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-950/30 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between">
              <div>
                <Badge className="mb-2 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 border-none">
                  Due Today
                </Badge>
                <CardTitle className="text-xl">Algorithm Analysis Assignment</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  CS 401: Algorithm Analysis
                </CardDescription>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400">
                  <Clock className="h-4 w-4" />
                  3 hours left
                </div>
                <div className="text-xs text-muted-foreground mt-1">Due at 3:00 PM</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <p className="text-sm text-muted-foreground">
                Complete the time complexity analysis for sorting algorithms and submit your report.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Continue Working
            </Button>
            <Button variant="outline">View Requirements</Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Assignment Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-1" />
              New Task
            </Button>
          </div>
        </div>
        
        {/* Active Tab */}
        <TabsContent value="active">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {assignments.active.slice(1).map((assignment) => (
              <motion.div
                key={assignment.id}
                variants={itemVariants}
                className="col-span-1"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        {assignment.type === "assignment" && (
                          <Badge className="mb-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-none">
                            Assignment
                          </Badge>
                        )}
                        {assignment.type === "project" && (
                          <Badge className="mb-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 border-none">
                            Project
                          </Badge>
                        )}
                        {assignment.type === "exam" && (
                          <Badge className="mb-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-none">
                            Exam
                          </Badge>
                        )}
                        {assignment.type === "research" && (
                          <Badge className="mb-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-none">
                            Research
                          </Badge>
                        )}
                        <CardTitle className="text-base">{assignment.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {assignment.course}
                        </CardDescription>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Start Working</DropdownMenuItem>
                          <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                          <DropdownMenuItem>View Requirements</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500 hover:text-red-600">
                            Mark as Complete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Due {assignment.dueDate}, {assignment.dueTime}</span>
                        </div>
                        <div>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${assignment.priority === 'high' 
                                ? 'text-amber-600 border-amber-300 dark:border-amber-800' 
                                : assignment.priority === 'medium' 
                                  ? 'text-blue-600 border-blue-300 dark:border-blue-800' 
                                  : 'text-slate-600 border-slate-300 dark:border-slate-800'}
                            `}
                          >
                            {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)} Priority
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-1.5" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      variant={assignment.status === "not-started" ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                    >
                      {assignment.status === "not-started" ? "Start Working" : "Continue Working"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        {/* Completed Tab */}
        <TabsContent value="completed">
          <motion.div 
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {assignments.completed.map((assignment) => (
              <motion.div
                key={assignment.id}
                variants={itemVariants}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-md transition-all">
                  <CardHeader className="p-4 flex flex-row justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <CardTitle className="text-base">{assignment.title}</CardTitle>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {assignment.course}
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <Badge className={`
                        ${assignment.grade === 'A' || assignment.grade === 'A-'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                          : assignment.grade.startsWith('B') 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'}
                        border-none
                      `}>
                        Grade: {assignment.grade}
                      </Badge>
                      <span className="text-xs text-muted-foreground mt-1">
                        Completed {assignment.completedDate}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 border-t">
                    <div className="flex divide-x">
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10">
                        <FileText className="h-4 w-4 mr-1" />
                        {assignment.feedback ? "View Feedback" : "No Feedback"}
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none text-xs h-10">
                        View Submission
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