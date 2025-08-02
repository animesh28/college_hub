import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Star,
  Trophy,
  Target,
  Calendar,
  BookOpen,
  Download,
  Share
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SubjectResult = {
  name: string;
  code: string;
  credits: number;
  marks: number;
  grade: string;
  pass: boolean;
};

type SemesterResult = {
  id: number;
  name: string;
  sgpa: number;
  subjects: SubjectResult[];
};

const SEMESTER_RESULTS: SemesterResult[] = [
  {
    id: 1,
    name: "Semester 1",
    sgpa: 8.2,
    subjects: [
      { name: "Math I", code: "MATH101", credits: 4, marks: 82, grade: "A", pass: true },
      { name: "Physics", code: "PHY101", credits: 3, marks: 75, grade: "B+", pass: true },
      { name: "Chemistry", code: "CHEM101", credits: 3, marks: 67, grade: "B", pass: true },
      { name: "Programming", code: "CS101", credits: 4, marks: 88, grade: "A+", pass: true },
      { name: "English", code: "ENG101", credits: 2, marks: 80, grade: "A", pass: true },
    ],
  },
  {
    id: 2,
    name: "Semester 2",
    sgpa: 8.6,
    subjects: [
      { name: "Math II", code: "MATH102", credits: 4, marks: 78, grade: "A", pass: true },
      { name: "Physics II", code: "PHY102", credits: 3, marks: 81, grade: "A", pass: true },
      { name: "Data Structures", code: "CS102", credits: 4, marks: 90, grade: "A+", pass: true },
      { name: "Electronics", code: "EL101", credits: 3, marks: 79, grade: "A", pass: true },
      { name: "Economics", code: "ECN101", credits: 2, marks: 70, grade: "B+", pass: true },
    ],
  },
  {
    id: 3,
    name: "Semester 3",
    sgpa: 8.8,
    subjects: [
      { name: "Discrete Math", code: "MATH201", credits: 4, marks: 84, grade: "A", pass: true },
      { name: "Digital Logic", code: "CS201", credits: 3, marks: 91, grade: "A+", pass: true },
      { name: "OOP", code: "CS202", credits: 3, marks: 89, grade: "A+", pass: true },
      { name: "Electromagnetics", code: "EE201", credits: 3, marks: 65, grade: "B", pass: true },
      { name: "Environmental Studies", code: "ES201", credits: 2, marks: 82, grade: "A", pass: true },
    ],
  },
  {
    id: 4,
    name: "Semester 4",
    sgpa: 8.4,
    subjects: [
      { name: "Probability", code: "MATH202", credits: 3, marks: 76, grade: "B+", pass: true },
      { name: "Algorithms", code: "CS203", credits: 4, marks: 86, grade: "A+", pass: true },
      { name: "DBMS", code: "CS204", credits: 4, marks: 79, grade: "A", pass: true },
      { name: "Signals", code: "EE202", credits: 3, marks: 71, grade: "B+", pass: true },
      { name: "Management", code: "MGMT201", credits: 2, marks: 83, grade: "A", pass: true },
    ],
  },
  {
    id: 5,
    name: "Semester 5",
    sgpa: 9.1,
    subjects: [
      { name: "Operating Systems", code: "CS301", credits: 4, marks: 91, grade: "A+", pass: true },
      { name: "Comp. Networks", code: "CS302", credits: 4, marks: 89, grade: "A+", pass: true },
      { name: "AI & ML", code: "CS303", credits: 3, marks: 77, grade: "A", pass: true },
      { name: "Elective I", code: "ELX301", credits: 3, marks: 81, grade: "A", pass: true },
      { name: "Compiler Design", code: "CS304", credits: 3, marks: 70, grade: "B+", pass: true },
    ],
  },
  {
    id: 6,
    name: "Semester 6",
    sgpa: 8.9,
    subjects: [
      { name: "Distributed Sys", code: "CS401", credits: 3, marks: 80, grade: "A", pass: true },
      { name: "Software Engg.", code: "CS402", credits: 4, marks: 84, grade: "A", pass: true },
      { name: "Cryptography", code: "CS403", credits: 3, marks: 77, grade: "A", pass: true },
      { name: "Elective II", code: "ELX401", credits: 3, marks: 82, grade: "A", pass: true },
      { name: "Research Proj.", code: "PROJ401", credits: 2, marks: 88, grade: "A+", pass: true },
    ],
  },
  {
    id: 7,
    name: "Semester 7",
    sgpa: 9.0,
    subjects: [
      { name: "Cloud Computing", code: "CS501", credits: 3, marks: 87, grade: "A+", pass: true },
      { name: "Mobile Apps", code: "CS502", credits: 4, marks: 92, grade: "A+", pass: true },
      { name: "Big Data", code: "CS503", credits: 3, marks: 85, grade: "A", pass: true },
      { name: "Elective III", code: "ELX501", credits: 3, marks: 88, grade: "A+", pass: true },
      { name: "Capstone I", code: "PROJ501", credits: 2, marks: 93, grade: "A+", pass: true },
    ],
  },
  {
    id: 8,
    name: "Semester 8",
    sgpa: 9.4,
    subjects: [
      { name: "IoT", code: "CS601", credits: 3, marks: 89, grade: "A+", pass: true },
      { name: "Elective IV", code: "ELX601", credits: 3, marks: 95, grade: "O", pass: true },
      { name: "Professional Ethics", code: "HSS601", credits: 2, marks: 82, grade: "A", pass: true },
      { name: "Capstone II", code: "PROJ601", credits: 8, marks: 97, grade: "O", pass: true },
    ],
  },
];

// FIXED CGPA CALCULATION FUNCTION
function calculateCGPA(semesterIndex: number): number {
  if (semesterIndex < 0) return 0;
  
  let totalCredits = 0;
  let totalPoints = 0;
  
  // Calculate CGPA up to the specified semester (inclusive)
  const maxIndex = Math.min(semesterIndex, SEMESTER_RESULTS.length - 1);
  
  for (let i = 0; i <= maxIndex; i++) {
    const semester = SEMESTER_RESULTS[i];
    if (!semester) continue;
    
    const semesterCredits = semester.subjects.reduce((sum, subject) => sum + subject.credits, 0);
    totalCredits += semesterCredits;
    totalPoints += semester.sgpa * semesterCredits;
  }
  
  if (totalCredits === 0) return 0;
  
  return Number((totalPoints / totalCredits).toFixed(2));
}

function getGradeColor(grade: string): string {
  switch (grade) {
    case "O":
      return "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg";
    case "A+":
      return "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg";
    case "A":
      return "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg";
    case "B+":
      return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg";
    case "B":
      return "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg";
    default:
      return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg";
  }
}

function getSGPAColor(sgpa: number): string {
  if (sgpa >= 9.0) return "text-purple-600";
  if (sgpa >= 8.5) return "text-green-600";
  if (sgpa >= 8.0) return "text-blue-600";
  if (sgpa >= 7.0) return "text-yellow-600";
  return "text-red-600";
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

const tableRowVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

const ResultTable: React.FC<{ semester: SemesterResult }> = ({ semester }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="overflow-x-auto"
  >
    <div className="rounded-xl border border-border/50 overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50">
            <th className="px-4 py-3 text-left font-semibold">Subject</th>
            <th className="px-4 py-3 text-left font-semibold">Code</th>
            <th className="px-4 py-3 text-center font-semibold">Credits</th>
            <th className="px-4 py-3 text-center font-semibold">Marks</th>
            <th className="px-4 py-3 text-center font-semibold">Grade</th>
            <th className="px-4 py-3 text-center font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {semester.subjects.map((subject, index) => (
              <motion.tr
                key={subject.code}
                variants={tableRowVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: index * 0.05 }}
                className={`border-b border-border/30 hover:bg-accent/50 transition-colors ${
                  index % 2 === 0 ? 'bg-muted/20' : 'bg-background'
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary/60" />
                    <span className="font-medium">{subject.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {subject.code}
                  </code>
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant="outline" className="font-medium">
                    {subject.credits}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-center font-semibold">
                  {subject.marks}
                </td>
                <td className="px-4 py-3 text-center">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(subject.grade)}`}
                  >
                    {subject.grade}
                  </motion.span>
                </td>
                <td className="px-4 py-3 text-center">
                  {subject.pass ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      <CheckCircle className="inline h-5 w-5 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      <AlertCircle className="inline h-5 w-5 text-red-600" />
                    </motion.div>
                  )}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  </motion.div>
);

const StatsCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  description?: string;
}> = ({ title, value, icon, color, description }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={`text-3xl font-bold ${color} mt-1`}>{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className={`p-3 rounded-full bg-gradient-to-br ${color.replace('text-', 'from-').replace('-600', '-100')} ${color.replace('text-', 'to-').replace('-600', '-200')}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

function ResultsPage(): JSX.Element {
  const [selectedSemester, setSelectedSemester] = useState(SEMESTER_RESULTS.length);

  const currentSemester = SEMESTER_RESULTS[selectedSemester - 1];
  const currentCGPA = calculateCGPA(selectedSemester - 1);
  const totalSubjects = SEMESTER_RESULTS.slice(0, selectedSemester).reduce((sum, sem) => sum + sem.subjects.length, 0);
  const averageSGPA = SEMESTER_RESULTS.slice(0, selectedSemester).reduce((sum, sem) => sum + sem.sgpa, 0) / selectedSemester;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30"
    >
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Academic Results
            </h1>
            <Trophy className="h-6 w-6 text-amber-500" />
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your academic performance across all semesters with detailed insights and analytics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatsCard
            title="Current CGPA"
            value={currentCGPA}
            icon={<TrendingUp className="h-6 w-6" />}
            color={getSGPAColor(currentCGPA)}
            description={`Up to Semester ${selectedSemester}`}
          />
          <StatsCard
            title="Current SGPA"
            value={currentSemester?.sgpa.toFixed(2) || "0.0"}
            icon={<Star className="h-6 w-6" />}
            color={getSGPAColor(currentSemester?.sgpa || 0)}
            description={currentSemester?.name}
          />
          <StatsCard
            title="Total Subjects"
            value={totalSubjects}
            icon={<BookOpen className="h-6 w-6" />}
            color="text-blue-600"
            description="Completed courses"
          />
          <StatsCard
            title="Average SGPA"
            value={averageSGPA.toFixed(2)}
            icon={<Target className="h-6 w-6" />}
            color="text-purple-600"
            description="Overall performance"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-background to-muted/10">
            <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  Semester Results
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs value={`${selectedSemester}`} onValueChange={(v) => setSelectedSemester(Number(v))}>
                <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-2 bg-muted/50">
                  {SEMESTER_RESULTS.map((semester, index) => (
                    <TabsTrigger
                      key={semester.id}
                      value={`${index + 1}`}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="font-semibold">Sem {semester.id}</div>
                        <div className="text-xs opacity-70">{semester.sgpa}</div>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <AnimatePresence mode="wait">
                  {SEMESTER_RESULTS.map((semester, index) => (
                    <TabsContent
                      key={semester.id}
                      value={`${index + 1}`}
                      className="mt-6 space-y-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Semester Header */}
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                          <div>
                            <h3 className="text-2xl font-bold">{semester.name}</h3>
                            <p className="text-muted-foreground">
                              {semester.subjects.length} subjects • {semester.subjects.reduce((sum, s) => sum + s.credits, 0)} credits
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">SGPA</div>
                            <div className={`text-3xl font-bold ${getSGPAColor(semester.sgpa)}`}>
                              {semester.sgpa.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Results Table */}
                        <ResultTable semester={semester} />

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>SGPA Progress</span>
                            <span className="font-medium">{semester.sgpa.toFixed(2)}/10.0</span>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          >
                            <Progress
                              value={(semester.sgpa / 10) * 100}
                              className="h-3 bg-muted/50"
                            />
                          </motion.div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-6">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedSemester(Math.max(1, selectedSemester - 1))}
                            disabled={selectedSemester === 1}
                            className="hover:scale-105 transition-transform"
                          >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Previous
                          </Button>

                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Cumulative CGPA</div>
                            <div className={`text-2xl font-bold ${getSGPAColor(currentCGPA)}`}>
                              {currentCGPA}
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            onClick={() => setSelectedSemester(Math.min(SEMESTER_RESULTS.length, selectedSemester + 1))}
                            disabled={selectedSemester === SEMESTER_RESULTS.length}
                            className="hover:scale-105 transition-transform"
                          >
                            Next
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    </TabsContent>
                  ))}
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final CGPA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
                className="inline-flex items-center gap-4"
              >
                <Trophy className="h-12 w-12 text-amber-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Final CGPA</div>
                  <div className={`text-5xl font-bold ${getSGPAColor(calculateCGPA(SEMESTER_RESULTS.length - 1))}`}>
                    {calculateCGPA(SEMESTER_RESULTS.length - 1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Across all 8 semesters</div>
                </div>
                <Award className="h-12 w-12 text-primary" />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ResultsPage;
