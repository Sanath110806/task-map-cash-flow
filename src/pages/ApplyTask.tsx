import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Star, Clock, DollarSign, User, ArrowLeft, Upload, MapIcon } from 'lucide-react';
import TaskMap from '../components/TaskMap';
import { useToast } from "@/hooks/use-toast";

const ApplyTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [application, setApplication] = useState({
    coverLetter: '',
    experience: '',
    availability: '',
    expectedCompletionTime: '',
    portfolio: null as File | null
  });

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');

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

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
          toast({
            title: "Location shared successfully",
            description: "Your location has been included in your application.",
          });
        },
        (error) => {
          setLocationError('Failed to get your location. Please enable location access.');
          toast({
            title: "Location access denied",
            description: "Please enable location access to share your location with the task poster.",
            variant: "destructive",
          });
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Include user location in application if available
    const applicationData = {
      ...application,
      taskId: task.id,
      userLocation: userLocation,
      timestamp: new Date().toISOString()
    };

    console.log('Application submitted:', applicationData);
    
    toast({
      title: "Application submitted!",
      description: "Your application has been sent to the task poster. They will contact you soon.",
    });
    
    navigate(`/task/${task.id}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setApplication(prev => ({ ...prev, portfolio: file }));
    }
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
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Task</CardTitle>
                <CardDescription>
                  Tell the poster why you're the right person for this job
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="coverLetter">Cover Letter *</Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Explain why you're perfect for this task..."
                      value={application.coverLetter}
                      onChange={(e) => setApplication(prev => ({ ...prev, coverLetter: e.target.value }))}
                      required
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Relevant Experience</Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe your relevant experience..."
                      value={application.experience}
                      onChange={(e) => setApplication(prev => ({ ...prev, experience: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="availability">When can you start?</Label>
                      <Input
                        id="availability"
                        placeholder="e.g., Tomorrow morning"
                        value={application.availability}
                        onChange={(e) => setApplication(prev => ({ ...prev, availability: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="completionTime">Expected completion time</Label>
                      <Input
                        id="completionTime"
                        placeholder="e.g., 3-4 hours"
                        value={application.expectedCompletionTime}
                        onChange={(e) => setApplication(prev => ({ ...prev, expectedCompletionTime: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="portfolio">Portfolio/Previous Work (Optional)</Label>
                    <div className="mt-1">
                      <input
                        id="portfolio"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="portfolio"
                        className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            {application.portfolio ? application.portfolio.name : 'Click to upload files'}
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Location Sharing */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Share Your Location</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Help the task poster know you're nearby by sharing your current location.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getCurrentLocation}
                      className="w-full"
                    >
                      <MapIcon className="w-4 h-4 mr-2" />
                      {userLocation ? 'Location Shared ✓' : 'Share My Location'}
                    </Button>
                    {locationError && (
                      <p className="text-sm text-red-600 mt-2">{locationError}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Task Summary & Map */}
          <div className="space-y-6">
            {/* Task Summary */}
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
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle>Task Location</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskMap tasks={[task]} />
                {userLocation && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✓ Your location has been shared and will be included in your application.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyTask;
