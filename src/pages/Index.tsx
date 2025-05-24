
import React, { useState } from 'react';
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
  const [mapApiKey, setMapApiKey] = useState('');
  const { toast } = useToast();

  // Sample task data
  const tasks = [
    {
      id: 1,
      title: "Clean my apartment",
      description: "Need someone to deep clean a 2-bedroom apartment",
      price: 80,
      category: "cleaning",
      location: "Downtown",
      poster: "Sarah M.",
      rating: 4.8,
      timeEstimate: "3-4 hours",
      urgency: "Today",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      title: "Grocery shopping and delivery",
      description: "Pick up groceries from the list and deliver to my home",
      price: 25,
      category: "delivery",
      location: "Midtown",
      poster: "John D.",
      rating: 4.9,
      timeEstimate: "1-2 hours",
      urgency: "Tomorrow",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 3,
      title: "Walk my dog",
      description: "30-minute walk for my friendly Golden Retriever",
      price: 20,
      category: "pet-care",
      location: "Central Park Area",
      poster: "Emily R.",
      rating: 5.0,
      timeEstimate: "30 minutes",
      urgency: "This Week",
      coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    {
      id: 4,
      title: "Assemble IKEA furniture",
      description: "Help assemble a bookshelf and desk from IKEA",
      price: 45,
      category: "handyman",
      location: "Brooklyn",
      poster: "Mike T.",
      rating: 4.7,
      timeEstimate: "2-3 hours",
      urgency: "This Weekend",
      coordinates: { lat: 40.6782, lng: -73.9442 }
    },
    {
      id: 5,
      title: "Data entry work",
      description: "Enter customer information into spreadsheet",
      price: 30,
      category: "admin",
      location: "Remote",
      poster: "Lisa K.",
      rating: 4.6,
      timeEstimate: "2 hours",
      urgency: "Next Week",
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 6,
      title: "Move boxes to storage",
      description: "Help move 10 boxes from apartment to storage unit",
      price: 60,
      category: "moving",
      location: "Queens",
      poster: "David L.",
      rating: 4.8,
      timeEstimate: "2-3 hours",
      urgency: "Today",
      coordinates: { lat: 40.7282, lng: -73.7949 }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tasks', count: tasks.length },
    { id: 'cleaning', name: 'Cleaning', count: tasks.filter(t => t.category === 'cleaning').length },
    { id: 'delivery', name: 'Delivery', count: tasks.filter(t => t.category === 'delivery').length },
    { id: 'pet-care', name: 'Pet Care', count: tasks.filter(t => t.category === 'pet-care').length },
    { id: 'handyman', name: 'Handyman', count: tasks.filter(t => t.category === 'handyman').length },
    { id: 'admin', name: 'Admin', count: tasks.filter(t => t.category === 'admin').length },
    { id: 'moving', name: 'Moving', count: tasks.filter(t => t.category === 'moving').length }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApiKeySubmit = () => {
    if (mapApiKey.trim()) {
      toast({
        title: "API Key Set!",
        description: "Google Maps integration is now active.",
      });
    }
  };

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
              <Button variant="outline" className="hidden sm:flex">
                Post a Task
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Sign Up
              </Button>
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
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">$50</div>
              <div className="text-gray-600">Average Earning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps API Key Input */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">Google Maps Integration</CardTitle>
              <CardDescription className="text-yellow-700">
                To enable location features, please enter your Google Maps API key below. You can get one from the Google Cloud Console.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your Google Maps API key..."
                  value={mapApiKey}
                  onChange={(e) => setMapApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApiKeySubmit} disabled={!mapApiKey.trim()}>
                  Set API Key
                </Button>
              </div>
            </CardContent>
          </Card>
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
                <TaskMap tasks={filteredTasks} apiKey={mapApiKey} />
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
