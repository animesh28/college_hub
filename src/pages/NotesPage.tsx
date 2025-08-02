import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  BookmarkPlus,
  Clock,
  Edit,
  FileText,
  FolderOpen,
  MoreVertical,
  Plus,
  Search,
  StickyNote,
  Tag,
  Trash2
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

// Sample notes data by subjects
const notes = {
  "Algorithm Analysis": [
    {
      id: 1,
      title: "Time Complexity Fundamentals",
      preview: "O(n), O(n log n), O(n²) - different time complexities and when to use them...",
      lastEdited: "2025-08-01T14:30:00",
      tags: ["important", "exam-prep"],
      color: "blue"
    },
    {
      id: 2,
      title: "Divide and Conquer Strategies",
      preview: "Notes on recursive algorithms, binary search implementation, and merge sort...",
      lastEdited: "2025-07-28T10:15:00",
      tags: ["algorithms"],
      color: "blue"
    }
  ],
  "Database Systems": [
    {
      id: 3,
      title: "Normalization Forms",
      preview: "1NF, 2NF, 3NF, BCNF - understanding database normalization and its importance...",
      lastEdited: "2025-07-30T09:45:00",
      tags: ["important", "exam-prep"],
      color: "green"
    },
    {
      id: 4,
      title: "SQL Joins Explained",
      preview: "Inner joins, left joins, right joins, full outer joins with examples and use cases...",
      lastEdited: "2025-07-25T16:20:00",
      tags: ["sql"],
      color: "green"
    }
  ],
  "Data Structures": [
    {
      id: 5,
      title: "Trees and Graph Implementations",
      preview: "Binary trees, AVL trees, heaps, and graph representation methods...",
      lastEdited: "2025-07-29T13:10:00",
      tags: ["important"],
      color: "purple"
    },
    {
      id: 6,
      title: "Hash Tables Deep Dive",
      preview: "Hash functions, collision resolution, load factor, and rehashing strategies...",
      lastEdited: "2025-07-26T11:05:00",
      tags: ["exam-prep"],
      color: "purple"
    }
  ],
  "Advanced Topics": [
    {
      id: 7,
      title: "Machine Learning Algorithms",
      preview: "Overview of supervised, unsupervised, and reinforcement learning algorithms...",
      lastEdited: "2025-08-01T08:30:00",
      tags: ["research"],
      color: "amber"
    },
    {
      id: 8,
      title: "Neural Network Fundamentals",
      preview: "Perceptrons, activation functions, backpropagation, and gradient descent...",
      lastEdited: "2025-07-27T15:40:00",
      tags: ["research", "important"],
      color: "amber"
    }
  ],
  "Software Engineering": [
    {
      id: 9,
      title: "Design Patterns",
      preview: "Creational, structural, and behavioral patterns with examples and use cases...",
      lastEdited: "2025-07-31T10:00:00",
      tags: ["patterns"],
      color: "red"
    },
    {
      id: 10,
      title: "Agile Development Methods",
      preview: "Scrum, Kanban, XP, and other agile methodologies with comparison...",
      lastEdited: "2025-07-28T14:25:00",
      tags: ["methodologies"],
      color: "red"
    }
  ]
};

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const allNotes = Object.values(notes).flat();
  
  const filteredNotes = activeTab === "all" 
    ? allNotes 
    : Object.entries(notes)
        .filter(([subject]) => subject === activeTab)
        .flatMap(([_, subjectNotes]) => subjectNotes);

  const searchedNotes = searchTerm 
    ? filteredNotes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        note.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredNotes;

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
          Notes
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Organize your study notes by subject
        </motion.p>
      </header>

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
            placeholder="Search notes, tags, content..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            New Note
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Tag className="h-4 w-4 mr-1" />
                Filter Tags
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Badge variant="outline" className="mr-2 bg-slate-100">important</Badge>
                Important
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Badge variant="outline" className="mr-2 bg-slate-100">exam-prep</Badge>
                Exam Prep
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Badge variant="outline" className="mr-2 bg-slate-100">research</Badge>
                Research
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Badge variant="outline" className="mr-2 bg-slate-100">algorithms</Badge>
                Algorithms
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Clear Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Notes Tabs and Content */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4 overflow-x-auto flex w-full justify-start pb-px">
          <TabsTrigger value="all">All Notes</TabsTrigger>
          {Object.keys(notes).map(subject => (
            <TabsTrigger key={subject} value={subject}>
              {subject}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {searchedNotes.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-10 text-center">
              <StickyNote className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No notes found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm ? "Try a different search term or clear filters" : "Create your first note to get started"}
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-1" />
                Create New Note
              </Button>
            </Card>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {searchedNotes.map((note) => {
                const subject = Object.entries(notes).find(([_, subjectNotes]) => 
                  subjectNotes.some(n => n.id === note.id)
                )?.[0] || "";

                const colorMap = {
                  'blue': 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
                  'green': 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300',
                  'amber': 'bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
                  'purple': 'bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
                  'red': 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300',
                };

                return (
                  <motion.div
                    key={note.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className={`mb-2 border-none ${colorMap[note.color]}`}>
                              {subject}
                            </Badge>
                            <CardTitle className="text-lg">{note.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <Clock className="h-3.5 w-3.5" />
                              {format(new Date(note.lastEdited), "MMM d, yyyy 'at' h:mm a")}
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
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Note
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                View Full Note
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BookmarkPlus className="h-4 w-4 mr-2" />
                                Add to Favorites
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Note
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {note.preview}
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-wrap gap-2 pt-4 pb-4">
                        {note.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="bg-slate-50 dark:bg-slate-900"
                          >
                            # {tag}
                          </Badge>
                        ))}
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}