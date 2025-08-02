import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowRight, CheckCircle2, Clock, BookOpen, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
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

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <header className="space-y-2">
        <motion.h1 
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Good morning, Jane
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Here's what's happening today, August 2nd
        </motion.p>
      </header>

      {/* Focus Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="overflow-hidden border-none bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-950/30 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex justify-between items-center">
              <span>Your next task</span>
              <Clock className="h-5 w-5 text-indigo-500" />
            </CardTitle>
            <CardDescription>Due in 3 hours</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <h3 className="text-xl font-semibold mb-2">Algorithm Analysis Assignment</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete the time complexity analysis for sorting algorithms and submit your report.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 border-none">
                CS 401
              </Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-none">
                High Priority
              </Badge>
            </div>
            <Progress value={65} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
            <p className="text-xs text-muted-foreground mt-2">65% completed</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
              Continue working
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Today's Overview Tabs */}
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>
        
        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <motion.div 
            className="space-y-4 mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Database Systems Lecture</CardTitle>
                    <CardDescription>Room 302, Engineering Building</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">10:30 AM</span>
                    <span className="text-xs text-muted-foreground">45 mins</span>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Study Group Meeting</CardTitle>
                    <CardDescription>Library, Study Room 5</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">1:00 PM</span>
                    <span className="text-xs text-muted-foreground">2 hours</span>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Research Project Meeting</CardTitle>
                    <CardDescription>Prof. Johnson's Office</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">4:15 PM</span>
                    <span className="text-xs text-muted-foreground">30 mins</span>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <motion.div 
            className="space-y-4 mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all border-l-4 border-l-amber-500">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Algorithm Analysis Assignment</CardTitle>
                    <CardDescription>CS 401</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-amber-500">Due today</span>
                    <span className="text-xs text-muted-foreground">3:00 PM</span>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all border-l-4 border-l-green-500">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Research Literature Review</CardTitle>
                    <CardDescription>Advanced Topics</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-green-500">In progress</span>
                    <span className="text-xs text-muted-foreground">Due in 3 days</span>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all border-l-4 border-l-blue-500">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Study for Midterm Exam</CardTitle>
                    <CardDescription>Data Structures</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-blue-500">Not started</span>
                    <span className="text-xs text-muted-foreground">Due in 1 week</span>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
        
        {/* Classes Tab */}
        <TabsContent value="classes">
          <motion.div 
            className="space-y-4 mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <CardTitle className="text-base">CS 401: Algorithm Analysis</CardTitle>
                      <CardDescription>Prof. Smith • 10:30 AM</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400 border-none">
                    Today
                  </Badge>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="text-base">CS 310: Database Systems</CardTitle>
                      <CardDescription>Prof. Johnson • 1:30 PM</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400 border-none">
                    Today
                  </Badge>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-all opacity-70">
                <CardHeader className="py-3 px-4 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-base">CS 210: Data Structures</CardTitle>
                      <CardDescription>Prof. Williams • 11:00 AM</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 border-none">
                    Tomorrow
                  </Badge>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Emails Card */}
        <motion.div 
          className="col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Emails</CardTitle>
              <CardDescription>3 new messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/Avatar.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">Prof. Smith</h4>
                    <Badge className="h-5 text-[10px]" variant="secondary">NEW</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Assignment Feedback: Algorithm Analysis</p>
                  <p className="text-xs mt-1 line-clamp-1">I've reviewed your submission and have some suggestions...</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/Avatar.jpg" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">Computer Science Dept.</h4>
                    <Badge className="h-5 text-[10px]" variant="secondary">NEW</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Upcoming Workshop Announcement</p>
                  <p className="text-xs mt-1 line-clamp-1">Join us for a workshop on advanced machine learning...</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/Avatar.jpg" />
                  <AvatarFallback>LT</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">Library Team</h4>
                    <Badge className="h-5 text-[10px]" variant="secondary">NEW</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Book Reservation Confirmation</p>
                  <p className="text-xs mt-1 line-clamp-1">Your requested books are ready for pickup at the counter...</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-xs" size="sm">
                View all emails
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Quick Stats Card */}
        <motion.div 
          className="col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
              <CardDescription>Your academic progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Attendance Rate</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-1.5" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Assignment Completion</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-1.5" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Current GPA</span>
                  <span className="text-sm font-medium">3.8/4.0</span>
                </div>
                <Progress value={95} className="h-1.5" />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />
                  <span className="text-xs">12 credits completed</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-1.5" />
                  <span className="text-xs">1 deadline upcoming</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-xs" size="sm">
                View detailed performance
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">August 2025</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
              <div className="text-muted-foreground">Sun</div>
              <div className="text-muted-foreground">Mon</div>
              <div className="text-muted-foreground">Tue</div>
              <div className="text-muted-foreground">Wed</div>
              <div className="text-muted-foreground">Thu</div>
              <div className="text-muted-foreground">Fri</div>
              <div className="text-muted-foreground">Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isToday = day === 2;
                const hasEvent = [5, 10, 15, 22, 28].includes(day);
                
                return (
                  <div 
                    key={i} 
                    className={`
                      aspect-square flex items-center justify-center rounded-full text-xs
                      ${isToday ? 'bg-primary text-primary-foreground' : hasEvent ? 'bg-secondary/50' : 'hover:bg-secondary/30'}
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}