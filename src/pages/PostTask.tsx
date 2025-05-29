
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, ArrowLeft, Upload, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const PostTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    estimatedTime: '',
    fee: '',
    location: '',
    latitude: '',
    longitude: '',
    urgency: '',
    images: [] as File[]
  });

  const categories = [
    'cleaning', 'delivery', 'pet-care', 'handyman', 'admin', 'moving', 'gardening', 'tutoring'
  ];

  const urgencyOptions = [
    'Today', 'Tomorrow', 'This Weekend', 'This Week', 'Next Week', 'Flexible'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 3);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 3)
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const getCoordinatesFromAddress = async (address: string) => {
    // Simple geocoding fallback - in production you'd use a proper geocoding service
    const defaultCoords = { lat: 28.6139, lng: 77.2090 }; // Delhi coordinates as fallback
    return defaultCoords;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to post a task.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!formData.title || !formData.description || !formData.category || !formData.fee) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Get coordinates for the location
      const coords = await getCoordinatesFromAddress(formData.location);
      
      // Insert task into database
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: parseFloat(formData.fee),
          estimated_time: formData.estimatedTime,
          urgency: formData.urgency,
          location: formData.location,
          latitude: coords.lat,
          longitude: coords.lng,
          poster_id: user.id,
          images: [] // For now, we'll handle image upload later
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Task Posted Successfully!",
        description: "Your task has been posted and is now visible to workers.",
      });

      navigate('/');
    } catch (error) {
      console.error('Error posting task:', error);
      toast({
        title: "Error",
        description: "Failed to post task. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
                  Back
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Post a New Task</h2>
          <p className="text-lg text-gray-600">
            Tell us what you need help with and connect with skilled workers in your area.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Task Details
            </CardTitle>
            <CardDescription>
              Provide clear information about your task to attract the best workers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Task Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Clean my 2-bedroom apartment"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about what needs to be done, any specific requirements, and what you expect..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1 min-h-[120px]"
                />
              </div>

              {/* Category and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category *
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="mt-1 w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Downtown, Brooklyn"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              {/* Time Estimate and Fee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimatedTime" className="text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Estimated Time
                  </Label>
                  <Input
                    id="estimatedTime"
                    placeholder="e.g., 2-3 hours"
                    value={formData.estimatedTime}
                    onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="fee" className="text-sm font-medium text-gray-700">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Performance Fee *
                  </Label>
                  <Input
                    id="fee"
                    type="number"
                    placeholder="0"
                    value={formData.fee}
                    onChange={(e) => handleInputChange('fee', e.target.value)}
                    className="mt-1"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Urgency */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  When do you need this done?
                </Label>
                <div className="flex flex-wrap gap-2">
                  {urgencyOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleInputChange('urgency', option)}
                      className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                        formData.urgency === option
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  <Upload className="w-4 h-4 inline mr-1" />
                  Add Photos (Optional - up to 3)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload images or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB each
                    </p>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? 'Posting Task...' : 'Post Task'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostTask;
