import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  QrCode, 
  ScanLine, 
  Zap, 
  BookOpen, 
  MapPin, 
  Users, 
  Wifi, 
  Camera, 
  AlertCircle,
  CheckCircle2,
  Search,
  Star,
  ExternalLink,
  DollarSign,
  Clock,
  Smartphone,
  Radio,
  Target,
  Upload,
  Image as ImageIcon
} from "lucide-react";

// Import real libraries (install these first)
// import { Html5QrcodeScanner } from "html5-qrcode";
// import Webcam from "react-webcam";

// Mock data for demonstrations
const MOCK_QR_RESULTS = {
  'ROOM_301': {
    type: 'room',
    title: 'Engineering Building - Room 301',
    description: 'Computer Science Lab',
    details: {
      capacity: '30 students',
      equipment: 'High-end workstations, projector, whiteboard',
      availability: 'Available until 3:00 PM',
      nextClass: 'Data Structures Lab - 3:00 PM'
    }
  },
  'LIBRARY_MAIN': {
    type: 'facility',
    title: 'Main Library',
    description: 'Central Campus Library',
    details: {
      hours: '24/7 during finals week',
      floors: '5 floors',
      studyRooms: '12 group study rooms available',
      resources: 'Books, journals, computers, printing'
    }
  },
  'CAMPUS_WIFI': {
    type: 'wifi',
    title: 'Campus WiFi Access',
    description: 'ConnectEDU Network',
    details: {
      network: 'ConnectEDU-Students',
      password: 'TempPass2024',  
      speed: 'Up to 1Gbps',
      coverage: 'Campus-wide'
    }
  }
};

const MOCK_BOOK_RESULTS = {
  '9780134685991': {
    title: 'Effective Java',
    author: 'Joshua Bloch',
    isbn: '9780134685991',
    prices: [
      { store: 'Amazon', price: 45.99, condition: 'New', link: '#', savings: 0 },
      { store: 'Chegg', price: 12.99, condition: 'Rental', link: '#', savings: 72 },
      { store: 'VitalSource', price: 35.99, condition: 'Digital', link: '#', savings: 22 },
      { store: 'Campus Store', price: 52.00, condition: 'New', link: '#', savings: -13 }
    ].sort((a, b) => a.price - b.price),
    cover: '/api/placeholder/120/160',
    rating: 4.6,
    reviews: 1204
  },
  '9780321563842': {
    title: 'The C Programming Language',
    author: 'Brian Kernighan, Dennis Ritchie',
    isbn: '9780321563842',
    prices: [
      { store: 'Amazon', price: 38.99, condition: 'New', link: '#', savings: 0 },
      { store: 'Chegg', price: 8.99, condition: 'Rental', link: '#', savings: 77 },
      { store: 'AbeBooks', price: 15.50, condition: 'Used', link: '#', savings: 60 }
    ].sort((a, b) => a.price - b.price),
    cover: '/api/placeholder/120/160',
    rating: 4.8,
    reviews: 892
  }
};

const MOCK_NFC_CONTACTS = [
  {
    id: 1,
    name: 'Sarah Chen',
    course: 'Computer Science',
    year: 'Junior',
    interests: ['React', 'Machine Learning', 'Web Dev'],
    avatar: '/api/placeholder/40/40',
    lastSeen: '2 min ago',
    mutual: 3,
    status: 'online'
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    course: 'Software Engineering', 
    year: 'Senior',
    interests: ['Backend Dev', 'DevOps', 'Cloud'],
    avatar: '/api/placeholder/40/40',
    lastSeen: '5 min ago',
    mutual: 7,
    status: 'away'
  },
  {
    id: 3,
    name: 'Emily Watson',
    course: 'Data Science',
    year: 'Sophomore',
    interests: ['Python', 'Analytics', 'AI'],
    avatar: '/api/placeholder/40/40',
    lastSeen: '1 min ago',
    mutual: 2,
    status: 'online'
  }
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.02, y: -2 }
};

interface ScanResult {
  type: string;
  data: any;
  timestamp: Date;
}

const MiscPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'qr' | 'barcode' | 'nfc'>('qr');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState(MOCK_NFC_CONTACTS);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for Web NFC API support (Chrome Android only)
  const [nfcSupported, setNfcSupported] = useState(false);

  useEffect(() => {
    // Check for NFC support
    if ('NDEFReader' in window) {
      setNfcSupported(true);
    }
  }, []);

  // Simulate QR Code scanning
  const simulateQRScan = (code: string) => {
    setIsScanning(true);
    setTimeout(() => {
      const result = MOCK_QR_RESULTS[code as keyof typeof MOCK_QR_RESULTS];
      if (result) {
        setScanResult({
          type: 'qr',
          data: result,
          timestamp: new Date()
        });
      } else {
        setScanResult({
          type: 'qr',
          data: { 
            type: 'unknown', 
            title: 'QR Code Scanned', 
            description: `Content: ${code}`,
            details: { rawData: code }
          },
          timestamp: new Date()
        });
      }
      setIsScanning(false);
      setShowCamera(false);
    }, 2000);
  };

  // Simulate Barcode scanning
  const simulateBarcodeScan = (isbn: string) => {
    setIsScanning(true);
    setTimeout(() => {
      const result = MOCK_BOOK_RESULTS[isbn as keyof typeof MOCK_BOOK_RESULTS];
      if (result) {
        setScanResult({
          type: 'barcode',
          data: result,
          timestamp: new Date()
        });
      } else {
        setScanResult({
          type: 'barcode',
          data: { 
            title: 'Unknown Book', 
            isbn, 
            prices: [],
            message: 'Book not found in our database. Try searching manually.'
          },
          timestamp: new Date()
        });
      }
      setIsScanning(false);
      setShowCamera(false);
    }, 2000);
  };

  // Handle file upload for QR/Barcode scanning
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In real implementation, you would process the image file here
      // For demo, we'll simulate finding a QR code
      simulateQRScan('ROOM_301');
    }
  };

  // Real NFC function (for Chrome Android)
  const startNFCReader = async () => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new (window as any).NDEFReader();
        await ndef.scan();
        setNfcEnabled(true);
        
        ndef.addEventListener("reading", ({ message, serialNumber }: any) => {
          console.log(`NFC tag read with serial number ${serialNumber}`);
          // Process NFC data
          setScanResult({
            type: 'nfc',
            data: { 
              serialNumber,
              message: 'NFC tag detected',
              timestamp: new Date()
            },
            timestamp: new Date()
          });
        });
      } catch (error) {
        console.error("NFC reading failed:", error);
        // Fall back to simulation
        simulateNFCConnect(MOCK_NFC_CONTACTS[0]);
      }
    } else {
      // Simulate for browsers without NFC support
      simulateNFCConnect(MOCK_NFC_CONTACTS[0]);
    }
  };

  // Simulate NFC connection
  const simulateNFCConnect = (contact: any) => {
    setNfcEnabled(true);
    setTimeout(() => {
      setScanResult({
        type: 'nfc',
        data: contact,
        timestamp: new Date()
      });
    }, 1000);
  };

  const QRScanner = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.div
          className="mx-auto w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center border-4 border-dashed border-indigo-300 dark:border-indigo-700 relative overflow-hidden"
          animate={isScanning ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: isScanning ? Infinity : 0, duration: 1 }}
        >
          {showCamera ? (
            <div className="absolute inset-4 bg-black rounded-xl flex items-center justify-center">
              <div className="text-white text-center">
                <Camera className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Camera View</p>
                {/* In real implementation, Webcam component would go here */}
              </div>
            </div>
          ) : isScanning ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <ScanLine className="h-16 w-16 text-indigo-600" />
            </motion.div>
          ) : (
            <QrCode className="h-16 w-16 text-indigo-600" />
          )}
          
          {isScanning && (
            <motion.div
              className="absolute inset-0 border-4 border-indigo-400 rounded-2xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">QR Code Scanner</h3>
          <p className="text-muted-foreground text-sm">
            Scan QR codes for instant access to campus resources, room information, and more
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => {
              setShowCamera(true);
              simulateQRScan('ROOM_301');
            }}
            disabled={isScanning}
            className="gap-2"
          >
            <Camera className="h-4 w-4" />
            {isScanning ? 'Scanning...' : 'Open Camera'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Quick test codes:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => simulateQRScan('ROOM_301')}
              disabled={isScanning}
            >
              Room 301
            </Button>
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => simulateQRScan('LIBRARY_MAIN')}
              disabled={isScanning}
            >
              Library
            </Button>
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => simulateQRScan('CAMPUS_WIFI')}
              disabled={isScanning}
            >
              WiFi Info
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Or enter code manually:</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <Input
              placeholder="Enter QR code"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
            />
            <Button 
              onClick={() => simulateQRScan(manualInput)}
              disabled={!manualInput || isScanning}
              size="sm"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {scanResult && scanResult.type === 'qr' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">{scanResult.data.title}</CardTitle>
              </div>
              <p className="text-muted-foreground">{scanResult.data.description}</p>
            </CardHeader>
            {scanResult.data.details && (
              <CardContent className="space-y-2">
                {Object.entries(scanResult.data.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm py-1 border-b border-green-200/50 dark:border-green-800/50 last:border-0">
                    <span className="font-medium capitalize text-green-800 dark:text-green-200">
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="text-muted-foreground max-w-48 text-right">{value as string}</span>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );

  const BarcodeScanner = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.div
          className="mx-auto w-64 h-40 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl flex items-center justify-center border-4 border-dashed border-emerald-300 dark:border-emerald-700 relative overflow-hidden"
          animate={isScanning ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: isScanning ? Infinity : 0, duration: 1 }}
        >
          {showCamera ? (
            <div className="absolute inset-4 bg-black rounded-xl flex items-center justify-center">
              <div className="text-white text-center">
                <Camera className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Camera View</p>
              </div>
            </div>
          ) : isScanning ? (
            <motion.div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-1 bg-emerald-600 rounded-full w-32"
              />
              <ScanLine className="h-12 w-12 text-emerald-600" />
            </motion.div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center space-x-1 mb-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-emerald-600 rounded-sm"
                    style={{ height: `${Math.random() * 20 + 20}px` }}
                  />
                ))}
              </div>
              <BookOpen className="h-8 w-8 text-emerald-600 mx-auto" />
            </div>
          )}
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Barcode Scanner</h3>
          <p className="text-muted-foreground text-sm">
            Scan textbook barcodes to instantly compare prices across multiple platforms
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => {
              setShowCamera(true);
              simulateBarcodeScan('9780134685991');
            }}
            disabled={isScanning}
            className="gap-2"
          >
            <Camera className="h-4 w-4" />
            {isScanning ? 'Scanning...' : 'Scan Barcode'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            className="gap-2"
          >
            <ImageIcon className="h-4 w-4" />
            Upload Image
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Try these sample books:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => simulateBarcodeScan('9780134685991')}
              disabled={isScanning}
            >
              Effective Java
            </Button>
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => simulateBarcodeScan('9780321563842')}
              disabled={isScanning}
            >
              C Programming
            </Button>
          </div>
        </div>
      </div>

      {scanResult && scanResult.type === 'barcode' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-20 h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{scanResult.data.title}</CardTitle>
                  <p className="text-muted-foreground">{scanResult.data.author}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">ISBN: {scanResult.data.isbn}</p>
                    {scanResult.data.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{scanResult.data.rating}</span>
                        <span className="text-xs text-muted-foreground">({scanResult.data.reviews})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            {scanResult.data.prices?.length > 0 ? (
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price Comparison
                    <Badge variant="secondary" className="ml-auto">
                      Save up to ${Math.max(...scanResult.data.prices.map((p: any) => p.price)) - Math.min(...scanResult.data.prices.map((p: any) => p.price))}
                    </Badge>
                  </h4>
                  {scanResult.data.prices.map((price: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <div className="font-medium">{price.store}</div>
                          <div className="text-xs text-muted-foreground">{price.condition}</div>
                        </div>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Best Deal
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <span className="font-bold text-lg">${price.price}</span>
                          {price.savings > 0 && (
                            <div className="text-xs text-green-600">Save {price.savings}%</div>
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Buy
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="text-center py-4">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">{scanResult.data.message}</p>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );

  const NFCConnector = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.div
          className="mx-auto w-48 h-48 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full flex items-center justify-center relative overflow-hidden"
          animate={nfcEnabled ? { 
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.4)",
              "0 0 0 20px rgba(59, 130, 246, 0)",
              "0 0 0 0 rgba(59, 130, 246, 0)"
            ]
          } : {}}
          transition={{ repeat: nfcEnabled ? Infinity : 0, duration: 2 }}
        >
          <motion.div
            animate={nfcEnabled ? { rotate: [0, 360] } : {}}
            transition={{ repeat: nfcEnabled ? Infinity : 0, duration: 3, ease: "linear" }}
          >
            <Radio className="h-16 w-16 text-amber-600" />
          </motion.div>
          {nfcEnabled && (
            <>
              <motion.div
                className="absolute inset-0 border-4 border-blue-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div
                className="absolute inset-0 border-4 border-blue-400 rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
            </>
          )}
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">NFC Quick Connect</h3>
          <p className="text-muted-foreground text-sm">
            {nfcSupported 
              ? "Tap phones with classmates to instantly exchange contact info" 
              : "NFC simulation mode - tap to connect with nearby students"
            }
          </p>
          {!nfcSupported && (
            <p className="text-xs text-amber-600">
              ⚠️ Full NFC support requires Chrome on Android
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <Button 
            onClick={() => nfcSupported ? startNFCReader() : setNfcEnabled(!nfcEnabled)}
            variant={nfcEnabled ? "destructive" : "default"}
            className="gap-2"
          >
            <Wifi className="h-4 w-4" />
            {nfcEnabled ? 'Disable NFC' : (nfcSupported ? 'Start NFC Reader' : 'Enable Discovery')}
          </Button>
          {nfcEnabled && (
            <motion.p 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {nfcSupported 
                ? "NFC reader is active. Bring devices close together."
                : "Discovery mode active. Tap a student below to connect."
              }
            </motion.p>
          )}
        </div>
      </div>

      {nfcEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Nearby Students
                <Badge variant="secondary" className="ml-auto">
                  {nearbyDevices.filter(d => d.status === 'online').length} online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nearbyDevices.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => simulateNFCConnect(contact)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {contact.course} • {contact.year}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {contact.mutual} mutual connections
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1 flex-wrap justify-end">
                      {contact.interests.slice(0, 2).map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {contact.interests.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{contact.interests.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{contact.lastSeen}</div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {scanResult && scanResult.type === 'nfc' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Alert className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>Connected successfully!</strong> Contact info exchanged with {scanResult.data.name}. 
              Check your contacts app for the new entry.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      {/* Header */}
      <div className="space-y-2">
        <motion.h1 
          className="text-3xl font-bold tracking-tight flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <Zap className="h-6 w-6 text-white" />
          </div>
          Emerging Technologies
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Next-generation tools for seamless campus integration
        </motion.p>
      </div>

      {/* Feature Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/30 border-none shadow-lg">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger value="qr" className="gap-2">
                  <QrCode className="h-4 w-4" />
                  QR Scanner
                </TabsTrigger>
                <TabsTrigger value="barcode" className="gap-2">
                  <ScanLine className="h-4 w-4" />
                  Barcode
                </TabsTrigger>
                <TabsTrigger value="nfc" className="gap-2">
                  <Radio className="h-4 w-4" />
                  NFC Connect
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="p-8">
              <TabsContent value="qr" className="mt-0">
                <QRScanner />
              </TabsContent>
              
              <TabsContent value="barcode" className="mt-0">
                <BarcodeScanner />
              </TabsContent>
              
              <TabsContent value="nfc" className="mt-0">
                <NFCConnector />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>

      {/* Feature Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Card className="text-center p-6 border-none bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold mb-2">Instant Room Info</h3>
            <p className="text-sm text-muted-foreground">
              Get real-time room availability, equipment details, and class schedules with QR codes
            </p>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ delay: 0.1 }}
        >
          <Card className="text-center p-6 border-none bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">Smart Price Comparison</h3>
            <p className="text-sm text-muted-foreground">
              Scan textbook barcodes to instantly compare prices and find the best deals
            </p>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center p-6 border-none bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-semibold mb-2">Instant Networking</h3>
            <p className="text-sm text-muted-foreground">
              Connect with classmates and exchange contact info using modern proximity technology
            </p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MiscPage;
