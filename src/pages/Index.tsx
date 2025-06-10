
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, DollarSign, User, Bell, Search, Filter, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import CategoryFilter from '@/components/CategoryFilter';
import TaskCard from '@/components/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { tasks, loading, error } = useTasks();
  const { user } = useAuth();

  // Sample tasks data for when backend is not ready
  const sampleTasks = [
    {
      id: '1',
      title: "Deep clean 2BHK apartment",
      description: "Need professional cleaning service for my 2BHK apartment in Koramangala. Includes bathroom deep cleaning, kitchen chimney cleaning, floor mopping, dusting all furniture, and balcony cleaning.",
      price: 800,
      category: "cleaning",
      location: "Koramangala, Bangalore",
      latitude: 12.9352,
      longitude: 77.6245,
      status: "open" as const,
      poster_id: "user1",
      estimated_time: "4-5 hours",
      urgency: "Today",
      created_at: "2024-01-15T10:00:00Z",
      profiles: {
        first_name: "Priya",
        last_name: "S.",
        rating: 4.8
      }
    },
    {
      id: '2',
      title: "Grocery shopping from Big Bazaar",
      description: "Need someone to pick up monthly groceries from Big Bazaar and deliver to my home in Andheri. Will provide detailed shopping list with brand preferences.",
      price: 250,
      category: "delivery",
      location: "Andheri West, Mumbai",
      latitude: 19.1358,
      longitude: 72.8262,
      status: "open" as const,
      poster_id: "user2",
      estimated_time: "2-3 hours",
      urgency: "Tomorrow",
      created_at: "2024-01-15T09:30:00Z",
      profiles: {
        first_name: "Rajesh",
        last_name: "K.",
        rating: 4.9
      }
    },
    {
      id: '3',
      title: "Walk my Golden Retriever",
      description: "Looking for someone to walk my friendly Golden Retriever, Max, for 1 hour in the evening. He's well-trained and loves meeting new people. Must be comfortable with large dogs.",
      price: 300,
      category: "pet-care",
      location: "Bandra East, Mumbai",
      latitude: 19.0596,
      longitude: 72.8295,
      status: "open" as const,
      poster_id: "user3",
      estimated_time: "1 hour",
      urgency: "Today",
      created_at: "2024-01-15T08:45:00Z",
      profiles: {
        first_name: "Meera",
        last_name: "D.",
        rating: 4.7
      }
    },
    {
      id: '4',
      title: "Fix leaking kitchen tap",
      description: "My kitchen tap has been dripping for a week now. Need a skilled handyman to fix or replace the tap. Basic tools will be provided, but please bring expertise in plumbing.",
      price: 450,
      category: "handyman",
      location: "Whitefield, Bangalore",
      latitude: 12.9698,
      longitude: 77.7500,
      status: "open" as const,
      poster_id: "user4",
      estimated_time: "1-2 hours",
      urgency: "This Weekend",
      created_at: "2024-01-15T07:20:00Z",
      profiles: {
        first_name: "Amit",
        last_name: "P.",
        rating: 4.5
      }
    },
    {
      id: '5',
      title: "Cook dinner for family gathering",
      description: "Need an experienced cook to prepare traditional North Indian dinner for 8 people this Sunday. Menu includes dal, sabzi, roti, rice, and dessert. All ingredients will be provided.",
      price: 1200,
      category: "cooking",
      location: "Punjabi Bagh, Delhi",
      latitude: 28.6742,
      longitude: 77.1311,
      status: "open" as const,
      poster_id: "user5",
      estimated_time: "3-4 hours",
      urgency: "This Weekend",
      created_at: "2024-01-15T06:15:00Z",
      profiles: {
        first_name: "Sunita",
        last_name: "M.",
        rating: 4.9
      }
    },
    {
      id: '6',
      title: "Help with house shifting",
      description: "Moving to a new 1BHK apartment within the same locality. Need 2-3 people to help pack, load, and unload furniture and boxes. Truck is already arranged.",
      price: 600,
      category: "moving",
      location: "Sector 62, Noida",
      latitude: 28.6139,
      longitude: 77.3678,
      status: "open" as const,
      poster_id: "user6",
      estimated_time: "4-5 hours",
      urgency: "Tomorrow",
      created_at: "2024-01-15T05:30:00Z",
      profiles: {
        first_name: "Rohit",
        last_name: "S.",
        rating: 4.6
      }
    }
  ];

  // Use sample data if there's an error or no tasks
  const displayTasks = error || !tasks?.length ? sampleTasks : tasks;

  const filteredTasks = displayTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Tasks', count: filteredTasks.length },
    { id: 'cleaning', name: 'Cleaning', count: filteredTasks.filter(t => t.category === 'cleaning').length },
    { id: 'delivery', name: 'Delivery', count: filteredTasks.filter(t => t.category === 'delivery').length },
    { id: 'handyman', name: 'Handyman', count: filteredTasks.filter(t => t.category === 'handyman').length },
    { id: 'pet-care', name: 'Pet Care', count: filteredTasks.filter(t => t.category === 'pet-care').length },
    { id: 'cooking', name: 'Cooking', count: filteredTasks.filter(t => t.category === 'cooking').length },
    { id: 'moving', name: 'Moving', count: filteredTasks.filter(t => t.category === 'moving').length },
  ];

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
              {user ? (
                <>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Link to="/post-task">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Task
                    </Button>
                  </Link>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find Local Help for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Everyday Tasks</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with trusted neighbors and skilled workers in your area. From cleaning to deliveries, get help when you need it most.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for tasks, locations, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Tasks</span>
                    <Badge variant="secondary">{filteredTasks.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Price</span>
                    <span className="font-medium">₹{Math.round(filteredTasks.reduce((acc, task) => acc + task.price, 0) / filteredTasks.length) || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">{"< 2 hours"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Task Locations Map */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Task Locations
                  </CardTitle>
                  <CardDescription>
                    See tasks near you on the map
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/c65a79d4-83ff-4989-9d27-9a54fce8cc25.png"
                      alt="Task locations map"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Available Tasks */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Available Tasks</h3>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="h-3 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                )}

                {!loading && filteredTasks.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                    <Button onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
