
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, ArrowLeft, CheckCircle, Clock, DollarSign, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ApplyTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [applicationData, setApplicationData] = useState({
    message: '',
    proposedRate: '',
    estimatedTime: '',
    availability: '',
    experience: ''
  });

  // Sample task data - in a real app, you'd fetch this based on the ID
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
      urgency: "Today"
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
      urgency: "Tomorrow"
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

  const handleInputChange = (field: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!applicationData.message || !applicationData.proposedRate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    console.log('Application data:', applicationData);
    
    toast({
      title: "Application Submitted!",
      description: "Your application has been sent to the task poster.",
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to={`/task/${id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Task
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply for Task</h2>
          <p className="text-lg text-gray-600">
            Submit your application to work on this task.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Application Details
                </CardTitle>
                <CardDescription>
                  Tell the poster why you're the right person for this job.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cover Message */}
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Cover Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Introduce yourself and explain why you're perfect for this task..."
                      value={applicationData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  {/* Proposed Rate and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="proposedRate" className="text-sm font-medium text-gray-700">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Your Rate *
                      </Label>
                      <Input
                        id="proposedRate"
                        type="number"
                        placeholder="80"
                        value={applicationData.proposedRate}
                        onChange={(e) => handleInputChange('proposedRate', e.target.value)}
                        className="mt-1"
                        min="0"
                        step="0.01"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Suggested: ${task.price}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="estimatedTime" className="text-sm font-medium text-gray-700">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Your Time Estimate
                      </Label>
                      <Input
                        id="estimatedTime"
                        placeholder="3-4 hours"
                        value={applicationData.estimatedTime}
                        onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Suggested: {task.timeEstimate}
                      </p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <Label htmlFor="availability" className="text-sm font-medium text-gray-700">
                      When can you start?
                    </Label>
                    <Input
                      id="availability"
                      placeholder="e.g., Today afternoon, Tomorrow morning"
                      value={applicationData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                      Relevant Experience
                    </Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe any relevant experience or skills..."
                      value={applicationData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(`/task/${id}`)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Task Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Task Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{task.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">{task.description}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-semibold text-green-600">${task.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{task.timeEstimate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{task.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urgency:</span>
                    <span className="font-medium">{task.urgency}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-600">Posted by</span>
                    <span className="font-medium ml-1">{task.poster}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyTask;
