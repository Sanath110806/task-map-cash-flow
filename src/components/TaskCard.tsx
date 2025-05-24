
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, DollarSign, User } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  poster: string;
  rating: number;
  timeEstimate: string;
  urgency: string;
  coordinates: { lat: number; lng: number };
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      cleaning: 'bg-blue-100 text-blue-800',
      delivery: 'bg-green-100 text-green-800',
      'pet-care': 'bg-pink-100 text-pink-800',
      handyman: 'bg-orange-100 text-orange-800',
      admin: 'bg-purple-100 text-purple-800',
      moving: 'bg-red-100 text-red-800',
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
    <Card className="hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {task.title}
            </h4>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          </div>
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-green-600 mb-1">
              ${task.price}
            </div>
            <div className="text-xs text-gray-500">per task</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={getCategoryColor(task.category)}>
            {task.category.replace('-', ' ')}
          </Badge>
          <Badge className={getUrgencyColor(task.urgency)}>
            {task.urgency}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {task.location}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {task.timeEstimate}
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {task.poster}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            {task.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
