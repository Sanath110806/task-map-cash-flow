
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Locate } from 'lucide-react';

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
  showUserLocation?: boolean;
  onLocationDetected?: (location: { lat: number; lng: number }) => void;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

const TaskMap = ({ tasks, showUserLocation = false, onLocationDetected }: TaskMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const userMarker = useRef<google.maps.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    // Load Google Maps script dynamically with a default API key for demo
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    if (map.current) {
      updateMarkers();
    }
  }, [tasks]);

  useEffect(() => {
    if (showUserLocation) {
      getCurrentLocation();
    }
  }, [showUserLocation]);

  const initializeMap = () => {
    if (!mapContainer.current || !window.google) return;

    map.current = new window.google.maps.Map(mapContainer.current, {
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
    if (showUserLocation && userLocation) {
      addUserMarker();
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setIsGettingLocation(false);
        
        if (onLocationDetected) {
          onLocationDetected(location);
        }
        
        if (map.current) {
          addUserMarker(location);
          map.current.setCenter(location);
          map.current.setZoom(15);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const addUserMarker = (location = userLocation) => {
    if (!map.current || !window.google || !location) return;

    // Remove existing user marker
    if (userMarker.current) {
      userMarker.current.setMap(null);
    }

    userMarker.current = new window.google.maps.Marker({
      position: location,
      map: map.current,
      title: 'Your Location',
      icon: {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#10B981"/>
            <circle cx="15" cy="15" r="8" fill="white"/>
            <circle cx="15" cy="15" r="4" fill="#10B981"/>
          </svg>
        `)}`,
        scaledSize: new window.google.maps.Size(30, 40),
        anchor: new window.google.maps.Point(15, 40)
      }
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div class="p-3">
          <h3 class="font-semibold text-gray-900 mb-1">Your Current Location</h3>
          <p class="text-sm text-gray-600">Lat: ${location.lat.toFixed(6)}</p>
          <p class="text-sm text-gray-600">Lng: ${location.lng.toFixed(6)}</p>
        </div>
      `
    });

    userMarker.current.addListener('click', () => {
      infoWindow.open(map.current, userMarker.current);
    });
  };

  const updateMarkers = () => {
    if (!map.current || !window.google) return;

    // Clear existing task markers
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // Add markers for each task
    tasks.forEach(task => {
      const marker = new window.google.maps.Marker({
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
          scaledSize: new window.google.maps.Size(30, 40),
          anchor: new window.google.maps.Point(15, 40)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
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

    // Adjust map bounds to fit all markers including user location
    if (markers.current.length > 0 || userLocation) {
      const bounds = new window.google.maps.LatLngBounds();
      
      markers.current.forEach(marker => {
        const position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      });

      if (userLocation) {
        bounds.extend(userLocation);
      }

      map.current.fitBounds(bounds);
    }
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            {showUserLocation ? 'Your Location & Task' : 'Task Locations'}
          </div>
          {showUserLocation && (
            <Button
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              size="sm"
              variant="outline"
            >
              <Locate className="w-4 h-4 mr-2" />
              {isGettingLocation ? 'Getting Location...' : 'Update Location'}
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          {showUserLocation 
            ? 'Your live location and task location are shown on the map'
            : 'Click on markers to see task details'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapContainer} className="w-full h-64 rounded-b-lg" />
      </CardContent>
    </Card>
  );
};

export default TaskMap;
