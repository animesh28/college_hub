import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  MessageCircle,
  Send,
  Plus,
  Search,
  Filter,
  Star,
  Clock,
  Calendar,
  MapPin,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  Camera,
  Music,
  PenTool,
  Zap,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  User,
  Settings,
  Bell,
  X
} from "lucide-react";

// Types
interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

interface Student {
  id: number;
  name: string;
  avatar?: string;
  university: string;
  year: string;
  location: string;
  bio: string;
  skills: Skill[];
  lookingFor: string[];
  rating: number;
  projectsCompleted: number;
  responseTime: string;
  lastSeen: string;
  isOnline: boolean;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  email: string;
  phone?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  skillsNeeded: string[];
  duration: string;
  teamSize: number;
  currentMembers: number;
  deadline: string;
  createdBy: Student;
  status: 'Open' | 'In Progress' | 'Completed';
  budget?: string;
  isRemote: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

interface ProjectRequest {
  id: number;
  project: Project;
  requestedBy: Student;
  message: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  requestedAt: string;
  requestedRole: string;
}

interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface ChatConversation {
  id: number;
  participant: Student;
  lastMessage: ChatMessage;
  unreadCount: number;
  messages: ChatMessage[];
}

// Sample data
const skillsData: Skill[] = [
  { name: "JavaScript", level: "Advanced", icon: Code, category: "Programming" },
  { name: "React", level: "Intermediate", icon: Code, category: "Frontend" },
  { name: "Node.js", level: "Intermediate", icon: Database, category: "Backend" },
  { name: "Python", level: "Advanced", icon: Code, category: "Programming" },
  { name: "UI/UX Design", level: "Expert", icon: Palette, category: "Design" },
  { name: "Mobile Dev", level: "Beginner", icon: Smartphone, category: "Mobile" },
  { name: "Photography", level: "Intermediate", icon: Camera, category: "Creative" },
  { name: "Machine Learning", level: "Advanced", icon: Zap, category: "AI/ML" },
];

const studentsData: Student[] = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/avatars/alex.jpg",
    university: "MIT",
    year: "3rd Year",
    location: "Boston, MA",
    bio: "Full-stack developer passionate about creating innovative web applications. Love working on challenging projects that make a real impact.",
    skills: [
      { name: "React", level: "Advanced", icon: Code, category: "Frontend" },
      { name: "Node.js", level: "Intermediate", icon: Database, category: "Backend" },
      { name: "Python", level: "Advanced", icon: Code, category: "Programming" }
    ],
    lookingFor: ["UI/UX Designer", "Mobile Developer", "DevOps Engineer"],
    rating: 4.8,
    projectsCompleted: 12,
    responseTime: "2 hours",
    lastSeen: "2 minutes ago",
    isOnline: true,
    portfolio: "https://alexjohnson.dev",
    github: "https://github.com/alexj",
    linkedin: "https://linkedin.com/in/alexjohnson",
    email: "alex@example.com",
    phone: "+1 (555) 0123"
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    university: "Stanford",
    year: "4th Year",
    location: "Palo Alto, CA",
    bio: "UX Designer with a passion for creating intuitive and beautiful user experiences. Experienced in user research and prototyping.",
    skills: [
      { name: "UI/UX Design", level: "Expert", icon: Palette, category: "Design" },
      { name: "Figma", level: "Advanced", icon: PenTool, category: "Design" },
      { name: "User Research", level: "Advanced", icon: Users, category: "Research" }
    ],
    lookingFor: ["Frontend Developer", "Full-stack Developer", "Product Manager"],
    rating: 4.9,
    projectsCompleted: 18,
    responseTime: "1 hour",
    lastSeen: "5 minutes ago",
    isOnline: true,
    portfolio: "https://sarahchen.design",
    linkedin: "https://linkedin.com/in/sarahchen",
    email: "sarah@example.com"
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    avatar: "/avatars/marcus.jpg",
    university: "UC Berkeley",
    year: "2nd Year",
    location: "Berkeley, CA",
    bio: "Data science enthusiast working on ML projects. Always eager to learn new technologies and collaborate on innovative solutions.",
    skills: [
      { name: "Python", level: "Advanced", icon: Code, category: "Programming" },
      { name: "Machine Learning", level: "Intermediate", icon: Zap, category: "AI/ML" },
      { name: "Data Analysis", level: "Advanced", icon: TrendingUp, category: "Analytics" }
    ],
    lookingFor: ["Backend Developer", "DevOps Engineer", "Data Engineer"],
    rating: 4.6,
    projectsCompleted: 8,
    responseTime: "3 hours",
    lastSeen: "1 hour ago",
    isOnline: false,
    github: "https://github.com/marcusr",
    linkedin: "https://linkedin.com/in/marcusrodriguez",
    email: "marcus@example.com"
  },
  {
    id: 4,
    name: "Emily Wang",
    avatar: "/avatars/emily.jpg",
    university: "Carnegie Mellon",
    year: "3rd Year",
    location: "Pittsburgh, PA",
    bio: "Mobile app developer specializing in React Native and Flutter. Love creating apps that solve real-world problems.",
    skills: [
      { name: "React Native", level: "Advanced", icon: Smartphone, category: "Mobile" },
      { name: "Flutter", level: "Intermediate", icon: Smartphone, category: "Mobile" },
      { name: "JavaScript", level: "Advanced", icon: Code, category: "Programming" }
    ],
    lookingFor: ["UI/UX Designer", "Backend Developer", "Product Manager"],
    rating: 4.7,
    projectsCompleted: 15,
    responseTime: "4 hours",
    lastSeen: "30 minutes ago",
    isOnline: false,
    portfolio: "https://emilywang.dev",
    github: "https://github.com/emilyw",
    email: "emily@example.com"
  }
];

const projectsData: Project[] = [
  {
    id: 1,
    title: "EcoTracker - Sustainability App",
    description: "A mobile app to help users track their carbon footprint, set sustainability goals, and connect with like-minded individuals. Features include carbon calculator, eco-challenges, and community forums.",
    category: "Mobile App",
    skillsNeeded: ["React Native", "UI/UX Design", "Backend Development", "Database Design"],
    duration: "3 months",
    teamSize: 5,
    currentMembers: 2,
    deadline: "2025-11-15",
    createdBy: studentsData[0],
    status: "Open",
    budget: "$2,000",
    isRemote: true,
    priority: "High"
  },
  {
    id: 2,
    title: "StudyBuddy - AI-Powered Learning Platform",
    description: "An intelligent study platform that uses AI to create personalized learning paths, generate quizzes, and match study partners based on learning styles and subjects.",
    category: "Web Application",
    skillsNeeded: ["Machine Learning", "React", "Python", "Natural Language Processing"],
    duration: "4 months",
    teamSize: 6,
    currentMembers: 3,
    deadline: "2025-12-20",
    createdBy: studentsData[2],
    status: "Open",
    budget: "$3,500",
    isRemote: false,
    priority: "Medium"
  },
  {
    id: 3,
    title: "Campus Navigator - AR Wayfinding",
    description: "Augmented reality mobile app to help new students navigate campus buildings, find classrooms, and discover campus amenities with interactive AR overlays.",
    category: "AR/VR",
    skillsNeeded: ["Unity", "C#", "Mobile Development", "3D Modeling", "UI/UX Design"],
    duration: "5 months",
    teamSize: 4,
    currentMembers: 1,
    deadline: "2026-01-30",
    createdBy: studentsData[3],
    status: "Open",
    isRemote: true,
    priority: "High"
  }
];

const projectRequestsData: ProjectRequest[] = [
  {
    id: 1,
    project: projectsData[0],
    requestedBy: studentsData[1],
    message: "I'd love to join as the UI/UX designer for EcoTracker. I have experience with sustainability apps and can bring fresh design ideas to make the user experience intuitive and engaging.",
    status: "Pending",
    requestedAt: "2025-08-01T14:30:00",
    requestedRole: "UI/UX Designer"
  },
  {
    id: 2,
    project: projectsData[1],
    requestedBy: studentsData[3],
    message: "Hi! I'm interested in contributing to StudyBuddy as a mobile developer. I can help create the mobile version of the platform using React Native.",
    status: "Pending",
    requestedAt: "2025-08-01T10:15:00",
    requestedRole: "Mobile Developer"
  },
  {
    id: 3,
    project: projectsData[2],
    requestedBy: studentsData[0],
    message: "I'd like to join the Campus Navigator project as a backend developer. I have experience with location-based services and can handle the server-side architecture.",
    status: "Accepted",
    requestedAt: "2025-07-30T16:45:00",
    requestedRole: "Backend Developer"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// Components
const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
  const getSkillColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge className={`${getSkillColor(skill.level)} border-none text-xs`}>
      <skill.icon className="h-3 w-3 mr-1" />
      {skill.name} ({skill.level})
    </Badge>
  );
};

const StudentCard: React.FC<{ student: Student; onMessage: (student: Student) => void; onViewProfile: (student: Student) => void }> = ({ 
  student, 
  onMessage, 
  onViewProfile 
}) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {student.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.university} • {student.year}</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{student.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{student.rating}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{student.bio}</p>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Skills</p>
              <div className="flex flex-wrap gap-1">
                {student.skills.slice(0, 3).map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
                {student.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{student.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Looking for</p>
              <div className="flex flex-wrap gap-1">
                {student.lookingFor.slice(0, 2).map((role, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-amber-50 text-amber-700">
                    {role}
                  </Badge>
                ))}
                {student.lookingFor.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{student.lookingFor.length - 2}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>{student.projectsCompleted} projects</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Responds in {student.responseTime}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewProfile(student)}>
            <Eye className="h-4 w-4 mr-1" />
            View Profile
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onMessage(student)}>
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: Project; onJoinRequest: (project: Project) => void }> = ({ project, onJoinRequest }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <Badge className={`${getPriorityColor(project.priority)} border-none text-xs`}>
                  {project.priority} Priority
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {project.currentMembers}/{project.teamSize} members
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Due {format(new Date(project.deadline), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Skills Needed</p>
              <div className="flex flex-wrap gap-1">
                {project.skillsNeeded.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={project.createdBy.avatar} alt={project.createdBy.name} />
                  <AvatarFallback className="text-xs">{project.createdBy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">by {project.createdBy.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {project.isRemote && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                    Remote
                  </Badge>
                )}
                {project.budget && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                    {project.budget}
                  </Badge>
                )}
              </div>
            </div>

            <Progress value={(project.currentMembers / project.teamSize) * 100} className="h-2" />
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button className="w-full" onClick={() => onJoinRequest(project)}>
            <Plus className="h-4 w-4 mr-1" />
            Request to Join
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const RequestCard: React.FC<{ request: ProjectRequest; onAccept?: (id: number) => void; onReject?: (id: number) => void }> = ({ 
  request, 
  onAccept, 
  onReject 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold">{request.project.title}</h3>
              <p className="text-sm text-muted-foreground">Role: {request.requestedRole}</p>
            </div>
            <Badge className={`${getStatusColor(request.status)} border-none`}>
              {request.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={request.requestedBy.avatar} alt={request.requestedBy.name} />
              <AvatarFallback>{request.requestedBy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{request.requestedBy.name}</p>
              <p className="text-xs text-muted-foreground">{request.requestedBy.university}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
          
          <p className="text-xs text-muted-foreground">
            Requested {format(new Date(request.requestedAt), "MMM d, yyyy 'at' h:mm a")}
          </p>
        </CardContent>

        {request.status === 'Pending' && onAccept && onReject && (
          <CardFooter className="pt-0 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onReject(request.id)}>
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button size="sm" className="flex-1" onClick={() => onAccept(request.id)}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Accept
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

const ChatWindow: React.FC<{ 
  conversation: ChatConversation | null; 
  onClose: () => void; 
  onSendMessage: (message: string) => void 
}> = ({ conversation, onClose, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  if (!conversation) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-xl z-50">
      <CardHeader className="py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
              <AvatarFallback>{conversation.participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{conversation.participant.name}</p>
              <p className="text-xs text-muted-foreground">
                {conversation.participant.isOnline ? 'Online' : `Last seen ${conversation.participant.lastSeen}`}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-64 overflow-y-auto">
        <div className="p-3 space-y-3">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-lg text-sm ${
                  message.senderId === 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.message}
                <p className={`text-xs mt-1 ${
                  message.senderId === 1 ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {format(new Date(message.timestamp), "h:mm a")}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="p-3 border-t">
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

function SocialCollaborationHub(): JSX.Element {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [chatConversation, setChatConversation] = useState<ChatConversation | null>(null);
  const [projectRequests, setProjectRequests] = useState(projectRequestsData);

  const handleMessage = (student: Student) => {
    // Create or open chat conversation
    const newConversation: ChatConversation = {
      id: student.id,
      participant: student,
      lastMessage: {
        id: 1,
        senderId: student.id,
        senderName: student.name,
        senderAvatar: student.avatar,
        message: "Hi! I'd love to discuss potential collaboration opportunities.",
        timestamp: new Date().toISOString(),
        isRead: false
      },
      unreadCount: 0,
      messages: [
        {
          id: 1,
          senderId: student.id,
          senderName: student.name,
          senderAvatar: student.avatar,
          message: "Hi! I'd love to discuss potential collaboration opportunities.",
          timestamp: new Date().toISOString(),
          isRead: false
        }
      ]
    };
    setChatConversation(newConversation);
  };

  const handleSendMessage = (message: string) => {
    if (!chatConversation) return;

    const newMessage: ChatMessage = {
      id: chatConversation.messages.length + 1,
      senderId: 1, // Current user
      senderName: "You",
      message,
      timestamp: new Date().toISOString(),
      isRead: true
    };

    setChatConversation({
      ...chatConversation,
      messages: [...chatConversation.messages, newMessage],
      lastMessage: newMessage
    });
  };

  const handleAcceptRequest = (requestId: number) => {
    setProjectRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'Accepted' as const }
          : req
      )
    );
  };

  const handleRejectRequest = (requestId: number) => {
    setProjectRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'Rejected' as const }
          : req
      )
    );
  };

  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    student.lookingFor.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredProjects = projectsData.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.skillsNeeded.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Collaboration Hub
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Connect with talented students, find complementary skills, and build amazing projects together
        </motion.p>
      </header>

      {/* Search Bar */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students, skills, or projects..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </Button>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="students">
            <Users className="h-4 w-4 mr-1" />
            Find Students
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Code className="h-4 w-4 mr-1" />
            Open Projects
          </TabsTrigger>
          <TabsTrigger value="requests">
            <Bell className="h-4 w-4 mr-1" />
            Requests ({projectRequests.filter(r => r.status === 'Pending').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onMessage={handleMessage}
                onViewProfile={setSelectedStudent}
              />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onJoinRequest={() => console.log('Join request sent')}
              />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="requests" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {projectRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Chat Window */}
      {chatConversation && (
        <ChatWindow
          conversation={chatConversation}
          onClose={() => setChatConversation(null)}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default SocialCollaborationHub;
