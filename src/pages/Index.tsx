
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Star, Clock, DollarSign, Users, CheckCircle, TrendingUp } from 'lucide-react';
import TaskMap from '../components/TaskMap';
import TaskCard from '../components/TaskCard';
import CategoryFilter from '../components/CategoryFilter';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Animated counter states
  const [activeUsers, setActiveUsers] = useState(8500);
  const [averageEarning, setAverageEarning] = useState(380);
  const [userRating, setUserRating] = useState(4.6);

  // Animate counters
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const target = 10000;
        if (prev < target) {
          return Math.min(prev + Math.floor(Math.random() * 50) + 10, target);
        }
        return target;
      });
      
      setAverageEarning(prev => {
        const target = 450;
        if (prev < target) {
          return Math.min(prev + Math.floor(Math.random() * 5) + 1, target);
        }
        return target;
      });
      
      setUserRating(prev => {
        const target = 4.9;
        if (prev < target) {
          return Math.min(prev + 0.01, target);
        }
        return target;
      });
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Sample task data with Indian context
  const tasks = [
    {
      id: 1,
      title: "Deep clean 2BHK apartment",
      description: "Need professional cleaning service for my 2BHK apartment in Koramangala. Includes bathroom deep cleaning, kitchen chimney cleaning, floor mopping, dusting all furniture, and balcony cleaning. Must bring own cleaning supplies and equipment. Apartment is on 4th floor with lift access. Prefer someone with experience in residential cleaning.",
      price: 800,
      category: "cleaning",
      location: "Koramangala, Bangalore",
      poster: "Priya S.",
      rating: 4.8,
      timeEstimate: "4-5 hours",
      urgency: "Today",
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    {
      id: 2,
      title: "Grocery shopping from Big Bazaar",
      description: "Need someone to pick up monthly groceries from Big Bazaar and deliver to my home in Andheri. Will provide detailed shopping list with brand preferences. Payment for groceries will be done via UPI transfer before shopping. Must have own vehicle for delivery. Total grocery value around ₹3000-4000.",
      price: 250,
      category: "delivery",
      location: "Andheri West, Mumbai",
      poster: "Rajesh K.",
      rating: 4.9,
      timeEstimate: "2-3 hours",
      urgency: "Tomorrow",
      coordinates: { lat: 19.1358, lng: 72.8262 }
    },
    {
      id: 3,
      title: "Dog walking service",
      description: "Daily evening walk for my friendly Golden Retriever 'Bruno' around Lodhi Gardens area. Bruno is well-trained and loves walks. Need someone reliable for 45-60 minutes daily between 6-8 PM. Must be comfortable with large dogs and have experience with pets. Regular weekly payment basis preferred.",
      price: 200,
      category: "pet-care",
      location: "Lodhi Colony, Delhi",
      poster: "Anjali M.",
      rating: 5.0,
      timeEstimate: "1 hour",
      urgency: "This Week",
      coordinates: { lat: 28.5918, lng: 77.2273 }
    },
    {
      id: 4,
      title: "IKEA furniture assembly",
      description: "Help needed to assemble IKEA bedroom furniture set including wardrobe, study table, and bedside tables. All tools will be provided. Must have experience with IKEA assembly and understand instruction manuals. Work location is in Whitefield. Refreshments and lunch will be provided during work.",
      price: 600,
      category: "handyman",
      location: "Whitefield, Bangalore",
      poster: "Vikram T.",
      rating: 4.7,
      timeEstimate: "3-4 hours",
      urgency: "This Weekend",
      coordinates: { lat: 12.9698, lng: 77.7500 }
    },
    {
      id: 5,
      title: "Data entry for small business",
      description: "Enter customer data from physical invoices into Excel spreadsheet for my small textile business. Around 500 entries with customer details, purchase amounts, and dates. Must have good typing speed and accuracy. Work can be done remotely or from shop location in Karol Bagh. Payment on completion.",
      price: 400,
      category: "admin",
      location: "Karol Bagh, Delhi",
      poster: "Suresh L.",
      rating: 4.6,
      timeEstimate: "6-8 hours",
      urgency: "Next Week",
      coordinates: { lat: 28.6519, lng: 77.1909 }
    },
    {
      id: 6,
      title: "House shifting assistance",
      description: "Need 2-3 people to help pack and move household items from old flat to new flat within Pune city. Distance is about 15km. Will provide packing materials and transportation. Need careful handling of electronics and glassware. Work involves packing, loading, unloading and basic arrangement.",
      price: 750,
      category: "moving",
      location: "Pune, Maharashtra",
      poster: "Neha D.",
      rating: 4.8,
      timeEstimate: "5-6 hours",
      urgency: "Today",
      coordinates: { lat: 18.5204, lng: 73.8567 }
    },
    {
      id: 7,
      title: "Home cooking for dinner party",
      description: "Need experienced cook to prepare North Indian dinner for 8 people at my home in Gurgaon. Menu includes dal makhani, paneer butter masala, rotis, rice, and dessert. All ingredients will be provided. Must have experience in party cooking and own transportation. Cooking to be done on-site.",
      price: 900,
      category: "cooking",
      location: "Sector 49, Gurgaon",
      poster: "Meera A.",
      rating: 4.9,
      timeEstimate: "4-5 hours",
      urgency: "This Weekend",
      coordinates: { lat: 28.4089, lng: 77.0424 }
    },
    {
      id: 8,
      title: "AC servicing and cleaning",
      description: "Regular servicing and deep cleaning of 3 split ACs in my 3BHK apartment. Includes filter cleaning, coil cleaning, gas checking, and general maintenance. Must bring necessary tools and cleaning equipment. Previous AC servicing experience mandatory. All ACs are 1.5 ton capacity.",
      price: 950,
      category: "maintenance",
      location: "Bandra East, Mumbai",
      poster: "Karthik R.",
      rating: 4.7,
      timeEstimate: "3-4 hours",
      urgency: "This Week",
      coordinates: { lat: 19.0596, lng: 72.8411 }
    },
    {
      id: 9,
      title: "Plant care and gardening",
      description: "Weekly plant care for my terrace garden with 20+ plants including watering, pruning, fertilizing, and pest control. Must have knowledge of plant care and gardening. Garden includes both flowering plants and vegetables. Regular weekly arrangement preferred for consistent care.",
      price: 300,
      category: "gardening",
      location: "Jayanagar, Bangalore",
      poster: "Lakshmi P.",
      rating: 4.8,
      timeEstimate: "2-3 hours",
      urgency: "This Week",
      coordinates: { lat: 12.9279, lng: 77.5937 }
    },
    {
      id: 10,
      title: "Tuition for Class 10 Math",
      description: "Need experienced tutor for Class 10 CBSE Mathematics for my son. Prefer someone with B.Ed or engineering background. Sessions will be 3 times per week for 1.5 hours each. Must have good communication skills and patience with students. Home tuition preferred in Noida Sector 62.",
      price: 500,
      category: "tutoring",
      location: "Sector 62, Noida",
      poster: "Amit S.",
      rating: 4.9,
      timeEstimate: "1.5 hours",
      urgency: "This Week",
      coordinates: { lat: 28.6273, lng: 77.3714 }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tasks', count: tasks.length },
    { id: 'cleaning', name: 'Cleaning', count: tasks.filter(t => t.category === 'cleaning').length },
    { id: 'delivery', name: 'Delivery', count: tasks.filter(t => t.category === 'delivery').length },
    { id: 'pet-care', name: 'Pet Care', count: tasks.filter(t => t.category === 'pet-care').length },
    { id: 'handyman', name: 'Handyman', count: tasks.filter(t => t.category === 'handyman').length },
    { id: 'admin', name: 'Admin', count: tasks.filter(t => t.category === 'admin').length },
    { id: 'moving', name: 'Moving', count: tasks.filter(t => t.category === 'moving').length },
    { id: 'cooking', name: 'Cooking', count: tasks.filter(t => t.category === 'cooking').length },
    { id: 'maintenance', name: 'Maintenance', count: tasks.filter(t => t.category === 'maintenance').length },
    { id: 'gardening', name: 'Gardening', count: tasks.filter(t => t.category === 'gardening').length },
    { id: 'tutoring', name: 'Tutoring', count: tasks.filter(t => t.category === 'tutoring').length }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskMap
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/post-task">
                <Button variant="outline" className="hidden sm:flex">
                  Post a Task
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Get Paid for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Everyday Tasks
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with people in your area who need help with simple tasks. Earn money doing what you're already good at.
          </p>
          
          {/* Stats with Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {activeUsers.toLocaleString('en-IN')}+
              </div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ₹{averageEarning}
              </div>
              <div className="text-gray-600">Average Earning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {userRating.toFixed(1)}★
              </div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <MapPin className="w-4 h-4 mr-2" />
                Near Me
              </Button>
            </div>
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Task List */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Available Tasks ({filteredTasks.length})
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="text-sm border rounded-lg px-3 py-1">
                    <option>Newest</option>
                    <option>Highest Pay</option>
                    <option>Closest</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Task Locations</h3>
                <TaskMap tasks={filteredTasks} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TaskMap</span>
              </div>
              <p className="text-gray-400">
                Connecting people through simple tasks and meaningful work.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Find Tasks</li>
                <li>How It Works</li>
                <li>Success Stories</li>
                <li>Safety</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Post a Task</li>
                <li>Pricing</li>
                <li>Trust & Safety</li>
                <li>Help Center</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TaskMap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
