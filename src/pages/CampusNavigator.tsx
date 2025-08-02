import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    MapPin,
    Navigation,
    Search,
    Phone,
    Clock,
    Coffee,
    Utensils,
    CreditCard,
    Cross,
    Car,
    Wifi,
    BookOpen,
    Users,
    Accessibility,
    Shield,
    Camera,
    Route,
    Compass,
    Building,
    TreePine,
    ParkingMeter as Parking
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Types
interface Location {
  id: number;
  name: string;
  type: 'Building' | 'Amenity' | 'Emergency' | 'Parking' | 'Dining' | 'Recreation';
  coordinates: { x: number; y: number };
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isAccessible: boolean;
  openHours?: string;
  contact?: string;
  services?: string[];
}

interface Route {
  id: number;
  from: Location;
  to: Location;
  distance: string;
  estimatedTime: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  isAccessible: boolean;
  waypoints: Array<{ x: number; y: number; instruction: string }>;
}

// Sample data
const campusLocations: Location[] = [
  {
    id: 1,
    name: "Main Library",
    type: "Building",
    coordinates: { x: 300, y: 200 },
    description: "Central academic library with study spaces and computer labs",
    icon: BookOpen,
    isAccessible: true,
    openHours: "6:00 AM - 12:00 AM",
    contact: "+1 (555) 0100",
    services: ["Study Rooms", "Computer Labs", "Printing", "WiFi"]
  },
  {
    id: 2,
    name: "Student Center",
    type: "Building",
    coordinates: { x: 400, y: 300 },
    description: "Hub for student activities, dining, and services",
    icon: Users,
    isAccessible: true,
    openHours: "7:00 AM - 11:00 PM",
    contact: "+1 (555) 0101",
    services: ["Dining", "Student Services", "ATM", "WiFi"]
  },
  {
    id: 3,
    name: "Campus Café",
    type: "Dining",
    coordinates: { x: 350, y: 250 },
    description: "Coffee shop and light meals",
    icon: Coffee,
    isAccessible: true,
    openHours: "7:00 AM - 6:00 PM",
    services: ["Coffee", "Pastries", "Light Meals", "WiFi"]
  },
  {
    id: 4,
    name: "ATM",
    type: "Amenity",
    coordinates: { x: 420, y: 320 },
    description: "24/7 ATM services",
    icon: CreditCard,
    isAccessible: true,
    openHours: "24/7"
  },
  {
    id: 5,
    name: "Medical Center",
    type: "Emergency",
    coordinates: { x: 500, y: 150 },
    description: "Campus health services and emergency care",
    icon: Cross,
    isAccessible: true,
    openHours: "8:00 AM - 5:00 PM",
    contact: "+1 (555) 0911",
    services: ["Emergency Care", "Health Services", "Pharmacy"]
  },
  {
    id: 6,
    name: "Parking Lot A",
    type: "Parking",
    coordinates: { x: 200, y: 400 },
    description: "Main student parking area",
    icon: Car,
    isAccessible: true,
    openHours: "24/7",
    services: ["Student Parking", "Accessible Spaces", "Security"]
  },
  {
    id: 7,
    name: "Sports Complex",
    type: "Recreation",
    coordinates: { x: 600, y: 300 },
    description: "Gymnasium, pool, and fitness facilities",
    icon: Users,
    isAccessible: true,
    openHours: "5:00 AM - 11:00 PM",
    contact: "+1 (555) 0102",
    services: ["Gym", "Pool", "Tennis Courts", "Locker Rooms"]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

const CampusMap: React.FC<{ 
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  searchTerm: string;
}> = ({ locations, selectedLocation, onLocationSelect, searchTerm }) => {
  const mapRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const pins = mapRef.current.querySelectorAll('.location-pin');
      
      gsap.fromTo(pins, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [locations]);

  const filteredLocations = searchTerm 
    ? locations.filter(loc => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : locations;

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'Building': return '#3B82F6';
      case 'Dining': return '#F59E0B';
      case 'Amenity': return '#10B981';
      case 'Emergency': return '#EF4444';
      case 'Parking': return '#8B5CF6';
      case 'Recreation': return '#EC4899';
      default: return '#6B7280';
    }
  };

  return (
    <div className="relative w-full h-96 bg-green-50 rounded-lg border overflow-hidden">
      <svg
        ref={mapRef}
        width="100%"
        height="100%"
        viewBox="0 0 800 500"
        className="w-full h-full"
      >
        {/* Campus Background Elements */}
        <rect width="800" height="500" fill="#f0fdf4" />
        
        {/* Paths/Roads */}
        <path
          d="M 0 250 Q 200 200 400 250 Q 600 300 800 250"
          stroke="#d1d5db"
          strokeWidth="20"
          fill="none"
        />
        <path
          d="M 400 0 Q 400 200 400 500"
          stroke="#d1d5db"
          strokeWidth="15"
          fill="none"
        />

        {/* Green Areas */}
        <circle cx="150" cy="150" r="80" fill="#86efac" opacity="0.3" />
        <circle cx="650" cy="400" r="100" fill="#86efac" opacity="0.3" />
        
        {/* Location Pins */}
        {filteredLocations.map((location) => (
          <g key={location.id} className="location-pin">
            <motion.circle
              cx={location.coordinates.x}
              cy={location.coordinates.y}
              r={selectedLocation?.id === location.id ? "20" : "15"}
              fill={getLocationColor(location.type)}
              stroke="white"
              strokeWidth="3"
              className="cursor-pointer drop-shadow-lg"
              whileHover={{ scale: 1.2 }}
              onClick={() => onLocationSelect(location)}
            />
            <motion.circle
              cx={location.coordinates.x}
              cy={location.coordinates.y}
              r="8"
              fill="white"
              className="cursor-pointer"
              onClick={() => onLocationSelect(location)}
            />
            
            {/* Location Label */}
            <text
              x={location.coordinates.x}
              y={location.coordinates.y - 25}
              textAnchor="middle"
              className="text-xs font-medium fill-gray-700 pointer-events-none"
            >
              {location.name}
            </text>
          </g>
        ))}

        {/* Route Line (if showing route) */}
        {selectedLocation && (
          <motion.path
            d={`M 400 250 Q ${selectedLocation.coordinates.x} ${selectedLocation.coordinates.y - 50} ${selectedLocation.coordinates.x} ${selectedLocation.coordinates.y}`}
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <h4 className="font-medium text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Buildings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Dining</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Emergency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Parking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LocationCard: React.FC<{ 
  location: Location; 
  onGetDirections: (location: Location) => void;
}> = ({ location, onGetDirections }) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <location.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">{location.name}</CardTitle>
                <Badge variant="outline">{location.type}</Badge>
              </div>
            </div>
            {location.isAccessible && (
              <Accessibility className="h-5 w-5 text-green-600" />
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{location.description}</p>
          
          {location.openHours && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{location.openHours}</span>
            </div>
          )}

          {location.contact && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{location.contact}</span>
            </div>
          )}

          {location.services && location.services.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Services</p>
              <div className="flex flex-wrap gap-1">
                {location.services.map((service, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 pt-0 flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onGetDirections(location)}>
            <Navigation className="h-4 w-4 mr-1" />
            Get Directions
          </Button>
          <Button variant="outline" size="sm">
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

function CampusNavigatorPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const filteredLocations = activeCategory === "all" 
    ? campusLocations 
    : campusLocations.filter(loc => loc.type === activeCategory);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleGetDirections = (location: Location) => {
    console.log('Getting directions to:', location.name);
    setSelectedLocation(location);
  };

  const categories = [
    { name: "All", value: "all", icon: Compass },
    { name: "Buildings", value: "Building", icon: Building },
    { name: "Dining", value: "Dining", icon: Utensils },
    { name: "Amenities", value: "Amenity", icon: Wifi },
    { name: "Emergency", value: "Emergency", icon: Cross },
    { name: "Parking", value: "Parking", icon: Parking },
    { name: "Recreation", value: "Recreation", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header ref={headerRef} className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Campus Navigator</h1>
        <p className="text-muted-foreground">Explore campus locations and find your way around with ease</p>
      </header>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations, buildings, amenities..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={activeCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.value)}
              className="flex-shrink-0"
            >
              <category.icon className="h-4 w-4 mr-1" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Campus Map
                {selectedLocation && (
                  <Badge variant="outline" className="ml-2">
                    Selected: {selectedLocation.name}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CampusMap
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
                searchTerm={searchTerm}
              />
            </CardContent>
          </Card>
        </div>

        {/* Location Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {selectedLocation ? 'Location Details' : 'Campus Locations'}
          </h2>
          
          {selectedLocation ? (
            <LocationCard
              location={selectedLocation}
              onGetDirections={handleGetDirections}
            />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3 max-h-96 overflow-y-auto"
            >
              {filteredLocations
                .filter(loc => 
                  !searchTerm || loc.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((location) => (
                  <motion.div
                    key={location.id}
                    variants={itemVariants}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className="flex items-center gap-3">
                      <location.icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-muted-foreground">{location.type}</p>
                      </div>
                      {location.isAccessible && (
                        <Accessibility className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="text-center p-4 cursor-pointer hover:shadow-md transition-shadow">
            <Cross className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <p className="font-medium">Emergency</p>
            <p className="text-sm text-muted-foreground">Call 911</p>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="text-center p-4 cursor-pointer hover:shadow-md transition-shadow">
            <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="font-medium">Campus Security</p>
            <p className="text-sm text-muted-foreground">(555) 0199</p>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="text-center p-4 cursor-pointer hover:shadow-md transition-shadow">
            <Parking className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="font-medium">Parking Info</p>
            <p className="text-sm text-muted-foreground">View availability</p>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="text-center p-4 cursor-pointer hover:shadow-md transition-shadow">
            <Route className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="font-medium">Plan Route</p>
            <p className="text-sm text-muted-foreground">Custom directions</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default CampusNavigatorPage;
