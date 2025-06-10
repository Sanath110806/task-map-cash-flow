
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

  // Complete task data for all 6 tasks
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
      title: "Walk my Golden Retriever",
      description: "Looking for someone to walk my friendly Golden Retriever, Max, for 1 hour in the evening. He's well-trained and loves meeting new people. Must be comfortable with large dogs. Route includes nearby park and some street walking. Max knows basic commands and is leash trained.",
      price: 300,
      category: "pet-care",
      location: "Bandra East, Mumbai",
      poster: "Meera D.",
      rating: 4.7,
      timeEstimate: "1 hour",
      urgency: "Today",
      coordinates: { lat: 19.0596, lng: 72.8295 }
    },
    {
      id: 4,
      title: "Fix leaking kitchen tap",
      description: "My kitchen tap has been dripping for a week now. Need a skilled handyman to fix or replace the tap. Basic tools will be provided, but please bring expertise in plumbing. The tap is a standard mixer type. Water supply can be turned off during work hours.",
      price: 450,
      category: "handyman",
      location: "Whitefield, Bangalore",
      poster: "Amit P.",
      rating: 4.5,
      timeEstimate: "1-2 hours",
      urgency: "This Weekend",
      coordinates: { lat: 12.9698, lng: 77.7500 }
    },
    {
      id: 5,
      title: "Cook dinner for family gathering",
      description: "Need an experienced cook to prepare traditional North Indian dinner for 8 people this Sunday. Menu includes dal makhani, paneer butter masala, rotis, rice, and dessert. All ingredients will be provided. Kitchen is fully equipped with gas stove and all necessary utensils.",
      price: 1200,
      category: "cooking",
      location: "Punjabi Bagh, Delhi",
      poster: "Sunita M.",
      rating: 4.9,
      timeEstimate: "3-4 hours",
      urgency: "This Weekend",
      coordinates: { lat: 28.6742, lng: 77.1311 }
    },
    {
      id: 6,
      title: "Help with house shifting",
      description: "Moving to a new 1BHK apartment within the same locality. Need 2-3 people to help pack, load, and unload furniture and boxes. Truck is already arranged. Items include bed, sofa, dining table, and about 20 boxes. New apartment is on ground floor.",
      price: 600,
      category: "moving",
      location: "Sector 62, Noida",
      poster: "Rohit S.",
      rating: 4.6,
      timeEstimate: "4-5 hours",
      urgency: "Tomorrow",
      coordinates: { lat: 28.6139, lng: 77.3678 }
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
