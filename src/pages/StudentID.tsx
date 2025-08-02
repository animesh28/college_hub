import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  CreditCard,
  QrCode,
  Wallet,
  History,
  Plus,
  Minus,
  DollarSign,
  Coffee,
  Book,
  Utensils,
  Car,
  Smartphone,
  Shield,
  Eye,
  EyeOff,
  Download,
  Upload,
  Settings,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Calendar,
  Building,
  GraduationCap,
  Hash
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Types
interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studentId: string;
  university: string;
  program: string;
  year: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive';
  emergencyContact: string;
}

interface WalletBalance {
  total: number;
  dining: number;
  library: number;
  parking: number;
  laundry: number;
}

interface Transaction {
  id: number;
  type: 'purchase' | 'refund' | 'deposit';
  category: 'Dining' | 'Library' | 'Parking' | 'Laundry' | 'Store' | 'Deposit';
  amount: number;
  description: string;
  location: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Failed';
  balanceAfter: number;
}

interface AccessLog {
  id: number;
  location: string;
  accessType: 'Entry' | 'Exit' | 'Payment' | 'Library Check-out';
  timestamp: string;
  status: 'Success' | 'Denied';
}

// Sample data
const studentProfile: StudentProfile = {
  id: "STU2025001234",
  name: "Alexandra Johnson",
  email: "alexandra.johnson@university.edu",
  avatar: "/student/alexandra.jpg",
  studentId: "CS2021-0892",
  university: "University of Technology",
  program: "Computer Science",
  year: "Senior (4th Year)",
  enrollmentDate: "2021-08-15",
  status: "Active",
  emergencyContact: "+1 (555) 0123"
};

const walletBalance: WalletBalance = {
  total: 245.75,
  dining: 125.50,
  library: 15.25,
  parking: 85.00,
  laundry: 20.00
};

const transactions: Transaction[] = [
  {
    id: 1,
    type: "purchase",
    category: "Dining",
    amount: -12.50,
    description: "Lunch - Student Cafeteria",
    location: "Main Dining Hall",
    timestamp: "2025-08-02T12:30:00",
    status: "Completed",
    balanceAfter: 245.75
  },
  {
    id: 2,
    type: "purchase",
    category: "Library",
    amount: -2.00,
    description: "Printing Services",
    location: "Central Library",
    timestamp: "2025-08-02T09:15:00",
    status: "Completed",
    balanceAfter: 258.25
  },
  {
    id: 3,
    type: "deposit",
    category: "Deposit",
    amount: 50.00,
    description: "Account Top-up",
    location: "Online Payment",
    timestamp: "2025-08-01T16:20:00",
    status: "Completed",
    balanceAfter: 260.25
  },
  {
    id: 4,
    type: "purchase",
    category: "Parking",
    amount: -5.00,
    description: "Daily Parking",
    location: "Parking Lot A",
    timestamp: "2025-08-01T08:45:00",
    status: "Completed",
    balanceAfter: 210.25
  }
];

const accessLogs: AccessLog[] = [
  {
    id: 1,
    location: "Computer Science Building",
    accessType: "Entry",
    timestamp: "2025-08-02T08:30:00",
    status: "Success"
  },
  {
    id: 2,
    location: "Central Library",
    accessType: "Library Check-out",
    timestamp: "2025-08-02T09:15:00",
    status: "Success"
  },
  {
    id: 3,
    location: "Student Recreation Center",
    accessType: "Entry",
    timestamp: "2025-08-01T17:00:00",
    status: "Success"
  },
  {
    id: 4,
    location: "Dormitory Block B",
    accessType: "Entry",
    timestamp: "2025-08-01T22:15:00",
    status: "Success"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const StudentIDCard: React.FC<{ 
  profile: StudentProfile; 
  showDetails: boolean;
  onToggleDetails: () => void;
}> = ({ profile, showDetails, onToggleDetails }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { rotationY: -90, opacity: 0 },
        { 
          rotationY: 0, 
          opacity: 1, 
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative perspective-1000"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-full max-w-sm mx-auto">
        {/* Card Front */}
        <Card className="overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-4 right-4">
            <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
              <Smartphone className="h-5 w-5" />
            </div>
          </div>
          
          <CardContent className="p-6 space-y-4 relative z-10">
            {/* University Header */}
            <div className="text-center border-b border-white/20 pb-3">
              <h2 className="text-lg font-bold">{profile.university}</h2>
              <p className="text-sm opacity-90">Official Student ID</p>
            </div>

            {/* Student Photo and Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-2 border-white/30">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-white/20 text-white text-lg">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-lg">{profile.name}</h3>
                <p className="text-sm opacity-90">{profile.program}</p>
                <p className="text-xs opacity-75">{profile.year}</p>
                <Badge className="bg-green-500/20 text-green-100 border-green-400/30">
                  {profile.status}
                </Badge>
              </div>
            </div>

            {/* Student Details */}
            {showDetails ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 pt-3 border-t border-white/20"
              >
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Student ID:</span>
                  <span className="font-mono">{profile.studentId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Email:</span>
                  <span className="font-mono text-xs">{profile.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Enrolled:</span>
                  <span>{format(new Date(profile.enrollmentDate), 'MMM yyyy')}</span>
                </div>
              </motion.div>
            ) : (
              <div className="pt-3 border-t border-white/20">
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">ID:</span>
                  <span className="font-mono">{profile.studentId}</span>
                </div>
              </div>
            )}

            {/* QR Code */}
            <div className="flex justify-center pt-2">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <QrCode className="h-12 w-12 text-blue-900" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Controls */}
        <div className="mt-4 flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={onToggleDetails}>
            {showDetails ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Save to Phone
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const WalletSummary: React.FC<{ 
  balance: WalletBalance;
  onAddFunds: () => void;
}> = ({ balance, onAddFunds }) => {
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (summaryRef.current) {
      const elements = summaryRef.current.querySelectorAll('.balance-item');
      gsap.fromTo(elements,
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: summaryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const balanceCategories = [
    { name: 'Dining', amount: balance.dining, icon: Utensils, color: 'text-orange-600' },
    { name: 'Library', amount: balance.library, icon: Book, color: 'text-blue-600' },
    { name: 'Parking', amount: balance.parking, icon: Car, color: 'text-purple-600' },
    { name: 'Laundry', amount: balance.laundry, icon: Settings, color: 'text-green-600' }
  ];

  return (
    <div ref={summaryRef} className="space-y-4">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-3xl font-bold text-green-600">
                ${balance.total.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={onAddFunds}>
                <Plus className="h-4 w-4 mr-1" />
                Add Funds
              </Button>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {balanceCategories.map((category) => (
              <div key={category.name} className="balance-item flex items-center gap-3 p-3 bg-white rounded-lg">
                <category.icon className={`h-5 w-5 ${category.color}`} />
                <div>
                  <p className="text-sm font-medium">{category.name}</p>
                  <p className={`font-bold ${category.color}`}>${category.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const getTransactionIcon = (category: string) => {
    switch (category) {
      case 'Dining': return Utensils;
      case 'Library': return Book;
      case 'Parking': return Car;
      case 'Laundry': return Settings;
      case 'Store': return CreditCard;
      case 'Deposit': return Upload;
      default: return DollarSign;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-red-600';
      case 'refund': return 'text-blue-600';
      case 'deposit': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const Icon = getTransactionIcon(transaction.category);

  return (
    <motion.div variants={itemVariants}>
      <Card className="hover:shadow-sm transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-gray-100">
              <Icon className="h-5 w-5 text-gray-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{transaction.description}</h3>
                <span className={`font-bold ${getTransactionColor(transaction.type)}`}>
                  {transaction.type === 'deposit' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
                <span>{transaction.location}</span>
                <span>{format(new Date(transaction.timestamp), 'MMM d, h:mm a')}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'}>
                  {transaction.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Balance: ${transaction.balanceAfter.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function StudentIDWalletPage(): JSX.Element {
  const [showIDDetails, setShowIDDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const handleAddFunds = () => {
    console.log('Adding funds to wallet');
  };

  const handleToggleIDDetails = () => {
    setShowIDDetails(!showIDDetails);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header ref={headerRef} className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Student ID & Digital Wallet</h1>
        <p className="text-muted-foreground">Your digital identity and campus payment solution</p>
      </header>

      {/* Main Content Tabs */}
      <Tabs defaultValue="id-card" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="id-card">
            <User className="h-4 w-4 mr-1" />
            Student ID
          </TabsTrigger>
          <TabsTrigger value="wallet">
            <Wallet className="h-4 w-4 mr-1" />
            Digital Wallet
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <History className="h-4 w-4 mr-1" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="access">
            <Shield className="h-4 w-4 mr-1" />
            Access Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="id-card" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <StudentIDCard
                profile={studentProfile}
                showDetails={showIDDetails}
                onToggleDetails={handleToggleIDDetails}
              />
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <QrCode className="h-4 w-4 mr-2" />
                    Show QR Code for Access
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Digital ID
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Profile Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{studentProfile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Student ID</p>
                      <p className="font-medium font-mono">{studentProfile.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Program</p>
                      <p className="font-medium">{studentProfile.program}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wallet" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WalletSummary balance={walletBalance} onAddFunds={handleAddFunds} />
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Top-up</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[10, 25, 50, 100].map((amount) => (
                    <Button key={amount} variant="outline" className="w-full">
                      Add ${amount}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">•••• 1234</p>
                      <p className="text-sm text-muted-foreground">Primary Card</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="access" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Access History</h2>
              <Badge variant="outline">{accessLogs.length} recent entries</Badge>
            </div>

            <div className="space-y-3">
              {accessLogs.map((log) => (
                <motion.div key={log.id} variants={itemVariants}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${log.status === 'Success' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <Shield className={`h-5 w-5 ${log.status === 'Success' ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <div>
                            <p className="font-medium">{log.location}</p>
                            <p className="text-sm text-muted-foreground">{log.accessType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>
                            {log.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {format(new Date(log.timestamp), 'MMM d, h:mm a')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StudentIDWalletPage;
