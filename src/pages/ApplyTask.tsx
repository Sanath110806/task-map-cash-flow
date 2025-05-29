import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, User, ArrowLeft, CheckCircle, Navigation } from 'lucide-react';
import TaskMap from '../components/TaskMap';
import { useToast } from "@/hooks/use-toast";

const ApplyTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isApplied, setIsApplied] = useState(false);

  // Sample task data with Indian context and all coordinates
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

  const task = tasks.find(t => t.id === parseInt(id || '0'));

  // Auto-apply when component loads
  useEffect(() => {
    if (task && !isApplied) {
      setIsApplied(true);
      toast({
        title: "Applied for the task!",
        description: "Your application has been submitted successfully. Use the map below to navigate to the task location.",
      });
    }
  }, [task, isApplied, toast]);

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Task not found</h1>
          <Link to="/">
            <Button>Back to Tasks</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      cleaning: 'bg-blue-100 text-blue-800',
      delivery: 'bg-green-100 text-green-800',
      'pet-care': 'bg-pink-100 text-pink-800',
      handyman: 'bg-orange-100 text-orange-800',
      admin: 'bg-purple-100 text-purple-800',
      moving: 'bg-red-100 text-red-800',
      cooking: 'bg-yellow-100 text-yellow-800',
      maintenance: 'bg-indigo-100 text-indigo-800',
      gardening: 'bg-green-100 text-green-800',
      tutoring: 'bg-blue-100 text-blue-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'Today': 'bg-red-100 text-red-800',
      'Tomorrow': 'bg-orange-100 text-orange-800',
      'This Weekend': 'bg-yellow-100 text-yellow-800',
      'This Week': 'bg-blue-100 text-blue-800',
      'Next Week': 'bg-gray-100 text-gray-800',
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tasks
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskMap
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Success Message */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Applied for the task!</h2>
                <p className="text-gray-600 mb-6">
                  Your application has been submitted successfully. The task poster will contact you soon.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => navigate('/')} variant="outline">
                    Browse More Tasks
                  </Button>
                  <Button onClick={() => navigate(`/task/${task.id}`)} variant="outline">
                    View Task Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Map */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Navigate to Task Location
                </CardTitle>
                <CardDescription>
                  Use the map below to get directions to the task location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskMap tasks={[task]} showUserLocation={true} />
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Getting there:</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 <strong>Task Location:</strong> {task.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    💡 Tip: Click "Update Location" to get real-time directions from your current position
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{task.title}</span>
                  <div className="text-2xl font-bold text-green-600">₹{task.price}</div>
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getCategoryColor(task.category)}>
                    {task.category.replace('-', ' ')}
                  </Badge>
                  <Badge className={getUrgencyColor(task.urgency)}>
                    {task.urgency}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {task.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {task.timeEstimate}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {task.poster}
                  <Star className="w-4 h-4 ml-2 text-yellow-500" />
                  <span className="ml-1">{task.rating}</span>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    ✓ Application Status: Submitted
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    The poster will contact you within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Task Description */}
            <Card>
              <CardHeader>
                <CardTitle>Task Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{task.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyTask;
