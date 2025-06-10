
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, DollarSign, User, ArrowLeft, Calendar, Phone, Mail, MapIcon } from 'lucide-react';

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      coordinates: { lat: 12.9352, lng: 77.6245 },
      postedDate: "2 hours ago",
      requirements: ["Must bring own cleaning supplies", "Non-smoker preferred", "References required"],
      images: ["/placeholder.svg", "/placeholder.svg"]
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
      coordinates: { lat: 19.1358, lng: 72.8262 },
      postedDate: "1 day ago",
      requirements: ["Own vehicle required", "Must be 18+"],
      images: []
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
      coordinates: { lat: 19.0596, lng: 72.8295 },
      postedDate: "3 hours ago",
      requirements: ["Must be comfortable with large dogs", "Experience with pets preferred", "Available in evenings"],
      images: ["/placeholder.svg"]
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
      coordinates: { lat: 12.9698, lng: 77.7500 },
      postedDate: "5 hours ago",
      requirements: ["Plumbing experience required", "Must bring own tools", "Weekend availability"],
      images: []
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
      coordinates: { lat: 28.6742, lng: 77.1311 },
      postedDate: "6 hours ago",
      requirements: ["Experience in North Indian cuisine", "Must be hygienic", "Sunday availability"],
      images: ["/placeholder.svg"]
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
      coordinates: { lat: 28.6139, lng: 77.3678 },
      postedDate: "8 hours ago",
      requirements: ["Physical fitness required", "Team of 2-3 people", "Tomorrow availability"],
      images: []
    }
  ];

  const task = tasks.find(t => t.id === parseInt(id || '0'));

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
          {/* Task Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{task.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      Posted {task.postedDate}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">₹{task.price}</div>
                    <div className="text-sm text-gray-500">per task</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className={getCategoryColor(task.category)}>
                    {task.category.replace('-', ' ')}
                  </Badge>
                  <Badge className={getUrgencyColor(task.urgency)}>
                    {task.urgency}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{task.description}</p>
                  </div>

                  {task.requirements && task.requirements.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {task.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">Duration</div>
                        <div className="text-sm text-gray-600">{task.timeEstimate}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <MapIcon className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">Location</div>
                        <div className="text-sm text-gray-600">{task.location}</div>
                      </div>
                    </div>
                  </div>

                  {task.images && task.images.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Images</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {task.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Task image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Poster Info & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Task Poster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">{task.poster}</div>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span className="font-medium">{task.rating.toFixed(1)}</span>
                        <span className="text-gray-500 ml-1">(24 reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Member since 2023
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {task.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={() => navigate(`/task/${task.id}/apply`)}
                  >
                    Apply for This Task
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Poster
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
