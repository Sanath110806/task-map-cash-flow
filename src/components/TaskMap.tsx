
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

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

interface TaskMapProps {
  tasks: Task[];
  apiKey: string;
}

const TaskMap = ({ tasks, apiKey }: TaskMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!apiKey || !mapContainer.current) return;

    // Load Google Maps script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup script
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [apiKey]);

  useEffect(() => {
    if (map.current && apiKey) {
      updateMarkers();
    }
  }, [tasks, apiKey]);

  const initializeMap = () => {
    if (!mapContainer.current || !window.google) return;

    // Initialize map centered on NYC
    map.current = new google.maps.Map(mapContainer.current, {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 12,
      styles: [
        {
          featureType: 'poi.business',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    updateMarkers();
  };

  const updateMarkers = () => {
    if (!map.current || !window.google) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // Add markers for each task
    tasks.forEach(task => {
      const marker = new google.maps.Marker({
        position: task.coordinates,
        map: map.current,
        title: task.title,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#3B82F6"/>
              <circle cx="15" cy="15" r="8" fill="white"/>
              <text x="15" y="20" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#3B82F6">$${task.price}</text>
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(30, 40),
          anchor: new google.maps.Point(15, 40)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-3 max-w-xs">
            <h3 class="font-semibold text-gray-900 mb-1">${task.title}</h3>
            <p class="text-sm text-gray-600 mb-2">${task.description}</p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-green-600">$${task.price}</span>
              <span class="text-xs text-gray-500">${task.timeEstimate}</span>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current, marker);
      });

      markers.current.push(marker);
    });

    // Adjust map bounds to fit all markers
    if (markers.current.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markers.current.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      map.current.fitBounds(bounds);
    }
  };

  if (!apiKey) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Task Map
          </CardTitle>
          <CardDescription>
            Enter your Google Maps API key above to see task locations
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-center text-gray-500">
            <MapPin className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <p>Map will appear here when API key is provided</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Task Locations
        </CardTitle>
        <CardDescription>
          Click on markers to see task details
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapContainer} className="w-full h-64 rounded-b-lg" />
      </CardContent>
    </Card>
  );
};

export default TaskMap;
