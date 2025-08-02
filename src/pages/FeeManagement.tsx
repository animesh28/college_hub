import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  Download,
  FileText,
  TrendingUp,
  Calculator,
  Gift,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  Receipt,
  Wallet,
  PieChart,
  BarChart3
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Types
interface FeeItem {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  category: string;
  description?: string;
}

interface PaymentHistory {
  id: number;
  description: string;
  amount: number;
  date: string;
  method: string;
  status: 'Completed' | 'Pending' | 'Failed';
  receiptUrl?: string;
}

interface Scholarship {
  id: number;
  name: string;
  amount: number;
  type: 'Merit' | 'Need-based' | 'Sports' | 'Academic';
  status: 'Active' | 'Applied' | 'Expired';
  validUntil: string;
}

// Sample data
const currentSemesterFees: FeeItem[] = [
  {
    id: 1,
    name: "Tuition Fee",
    amount: 8500,
    dueDate: "2025-08-15",
    status: "Paid",
    category: "Academic",
    description: "Semester tuition for Fall 2025"
  },
  {
    id: 2,
    name: "Library Fee",
    amount: 150,
    dueDate: "2025-08-20",
    status: "Pending",
    category: "Academic"
  },
  {
    id: 3,
    name: "Lab Fee",
    amount: 300,
    dueDate: "2025-08-25",
    status: "Pending",
    category: "Academic"
  },
  {
    id: 4,
    name: "Sports Fee",
    amount: 200,
    dueDate: "2025-08-30",
    status: "Overdue",
    category: "Activities"
  },
  {
    id: 5,
    name: "Hostel Fee",
    amount: 2500,
    dueDate: "2025-08-10",
    status: "Paid",
    category: "Accommodation"
  }
];

const paymentHistory: PaymentHistory[] = [
  {
    id: 1,
    description: "Tuition Fee - Fall 2025",
    amount: 8500,
    date: "2025-08-01",
    method: "Credit Card",
    status: "Completed",
    receiptUrl: "/receipts/receipt-001.pdf"
  },
  {
    id: 2,
    description: "Hostel Fee - Fall 2025",
    amount: 2500,
    date: "2025-08-01",
    method: "Bank Transfer",
    status: "Completed",
    receiptUrl: "/receipts/receipt-002.pdf"
  },
  {
    id: 3,
    description: "Application Fee",
    amount: 100,
    date: "2025-07-15",
    method: "Online Payment",
    status: "Completed"
  }
];

const scholarships: Scholarship[] = [
  {
    id: 1,
    name: "Academic Excellence Scholarship",
    amount: 2000,
    type: "Merit",
    status: "Active",
    validUntil: "2026-05-31"
  },
  {
    id: 2,
    name: "Sports Achievement Award",
    amount: 1500,
    type: "Sports",
    status: "Active",
    validUntil: "2025-12-31"
  },
  {
    id: 3,
    name: "Need-based Grant",
    amount: 3000,
    type: "Need-based",
    status: "Applied",
    validUntil: "2025-09-30"
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

// GSAP Counter Component
const AnimatedCounter: React.FC<{ value: number; prefix?: string; suffix?: string; duration?: number }> = ({ 
  value, 
  prefix = "", 
  suffix = "", 
  duration = 2 
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (counterRef.current) {
      const obj = { value: 0 };
      
      gsap.to(obj, {
        value: value,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayValue(Math.round(obj.value));
        }
      });
    }
  }, [value, duration]);

  return (
    <span ref={counterRef}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const StatCard: React.FC<{ 
  title: string; 
  value: number; 
  icon: React.ComponentType<{ className?: string }>; 
  color: string;
  prefix?: string;
  suffix?: string;
}> = ({ title, value, icon: Icon, color, prefix, suffix }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <motion.div ref={cardRef} variants={itemVariants}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className={`text-2xl font-bold ${color}`}>
                <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
              </p>
            </div>
            <Icon className={`h-8 w-8 ${color.replace('text-', 'text-').replace('-600', '-500')}`} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeeCard: React.FC<{ 
  fee: FeeItem; 
  onPay: (fee: FeeItem) => void;
  onViewDetails: (fee: FeeItem) => void;
}> = ({ fee, onPay, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Overdue': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{fee.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{fee.category}</p>
            </div>
            <Badge className={`${getStatusColor(fee.status)} border-none`}>
              {getStatusIcon(fee.status)}
              <span className="ml-1">{fee.status}</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-lg font-bold">${fee.amount.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Due Date</span>
            <span className="text-sm">{format(new Date(fee.dueDate), 'MMM d, yyyy')}</span>
          </div>

          {fee.description && (
            <p className="text-sm text-muted-foreground">{fee.description}</p>
          )}
        </CardContent>

        <CardFooter className="pt-0 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewDetails(fee)}>
            View Details
          </Button>
          {fee.status !== 'Paid' && (
            <Button size="sm" className="flex-1" onClick={() => onPay(fee)}>
              <CreditCard className="h-4 w-4 mr-1" />
              Pay Now
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const PaymentHistoryCard: React.FC<{ payment: PaymentHistory }> = ({ payment }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'Pending': return 'text-yellow-600';
      case 'Failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">{payment.description}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span>{format(new Date(payment.date), 'MMM d, yyyy')}</span>
                <span>{payment.method}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">${payment.amount.toLocaleString()}</p>
              <p className={`text-sm ${getStatusColor(payment.status)}`}>{payment.status}</p>
            </div>
            {payment.receiptUrl && (
              <Button variant="ghost" size="sm" className="ml-2">
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function FeeManagementPage(): JSX.Element {
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const totalFees = currentSemesterFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = currentSemesterFees.filter(fee => fee.status === 'Paid').reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = currentSemesterFees.filter(fee => fee.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0);
  const overdueAmount = currentSemesterFees.filter(fee => fee.status === 'Overdue').reduce((sum, fee) => sum + fee.amount, 0);
  const scholarshipAmount = scholarships.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.amount, 0);

  const handlePayFee = (fee: FeeItem) => {
    console.log('Processing payment for:', fee.name);
  };

  const handleViewDetails = (fee: FeeItem) => {
    setSelectedFee(fee);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header ref={headerRef} className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
        <p className="text-muted-foreground">Track payments, manage finances, and monitor scholarships</p>
      </header>

      {/* Statistics Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Total Fees"
          value={totalFees}
          icon={Wallet}
          color="text-blue-600"
          prefix="$"
        />
        <StatCard
          title="Paid Amount"
          value={paidFees}
          icon={CheckCircle}
          color="text-green-600"
          prefix="$"
        />
        <StatCard
          title="Pending Fees"
          value={pendingFees}
          icon={Clock}
          color="text-yellow-600"
          prefix="$"
        />
        <StatCard
          title="Scholarships"
          value={scholarshipAmount}
          icon={Gift}
          color="text-purple-600"
          prefix="$"
        />
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Payment Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Paid: ${paidFees.toLocaleString()}</span>
                <span>Total: ${totalFees.toLocaleString()}</span>
              </div>
              <Progress value={(paidFees / totalFees) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {Math.round((paidFees / totalFees) * 100)}% of fees paid for this semester
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Fees</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="calculator">Fee Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Current Semester Fees</h2>
              <Badge variant="outline">
                {currentSemesterFees.length} fee items
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSemesterFees.map((fee) => (
                <FeeCard
                  key={fee.id}
                  fee={fee}
                  onPay={handlePayFee}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Payment History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <PaymentHistoryCard key={payment.id} payment={payment} />
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="scholarships" className="mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Scholarships & Financial Aid</h2>
              <Button>Apply for New Scholarship</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scholarships.map((scholarship) => (
                <motion.div key={scholarship.id} variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{scholarship.name}</span>
                        <Badge variant={scholarship.status === 'Active' ? 'default' : 'outline'}>
                          {scholarship.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <span className="font-bold">${scholarship.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Type</span>
                        <span className="text-sm">{scholarship.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Valid Until</span>
                        <span className="text-sm">{format(new Date(scholarship.validUntil), 'MMM d, yyyy')}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="calculator" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Fee Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Calculate estimated fees for upcoming semesters based on your course selection and preferences.</p>
              <div className="mt-4">
                <Button>Open Calculator</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FeeManagementPage;
