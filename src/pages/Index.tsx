import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  name: string;
  age: number;
  distance: number;
  favoriteDrink: string;
  drinkType: string;
  image: string;
  location: string;
  isOnline: boolean;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Лена",
    age: 28,
    distance: 0.1,
    favoriteDrink: "Виски",
    drinkType: "Крепкие",
    image: "/img/e44ed428-cc05-4d1d-9f84-02c4f4be8d76.jpg",
    location: "Центр",
    isOnline: true
  },
  {
    id: 2,
    name: "Анна",
    age: 25,
    distance: 0.5,
    favoriteDrink: "Мартини",
    drinkType: "Коктейли",
    image: "/img/e44ed428-cc05-4d1d-9f84-02c4f4be8d76.jpg",
    location: "Арбат",
    isOnline: true
  },
  {
    id: 3,
    name: "Катя",
    age: 30,
    distance: 1.2,
    favoriteDrink: "Красное вино",
    drinkType: "Вино",
    image: "/img/e44ed428-cc05-4d1d-9f84-02c4f4be8d76.jpg",
    location: "Замоскворечье",
    isOnline: false
  },
  {
    id: 4,
    name: "Мария",
    age: 27,
    distance: 2.1,
    favoriteDrink: "Джин-тоник",
    drinkType: "Коктейли",
    image: "/img/e44ed428-cc05-4d1d-9f84-02c4f4be8d76.jpg",
    location: "Таганка",
    isOnline: true
  }
];

const drinkTypes = ["Все", "Коктейли", "Вино", "Пиво", "Крепкие"];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrinkType, setSelectedDrinkType] = useState("Все");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.favoriteDrink.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDrinkType = selectedDrinkType === "Все" || user.drinkType === selectedDrinkType;
    return matchesSearch && matchesDrinkType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      {/* Header */}
      <div className="max-w-md mx-auto mb-8 animate-fade-in">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            DRINK & MEET
          </h1>
          <p className="text-muted-foreground text-sm">
            Находите людей через общие интересы в напитках
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Icon name="Search" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени или напитку..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-0 bg-card shadow-sm"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {drinkTypes.map((type) => (
            <Button
              key={type}
              variant={selectedDrinkType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDrinkType(type)}
              className="rounded-full px-4 h-8 text-xs transition-all duration-200 hover:scale-105"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* User Cards */}
      <div className="max-w-md mx-auto space-y-4">
        {filteredUsers.map((user, index) => (
          <Card 
            key={user.id} 
            className="overflow-hidden bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-0">
              <div className="relative">
                {/* Profile Image */}
                <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Online Status */}
                  {user.isOnline && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Онлайн
                    </div>
                  )}
                  
                  {/* Distance */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                    <Icon name="MapPin" size={12} />
                    {user.distance < 1 ? 
                      `${Math.round(user.distance * 1000)} м` : 
                      `${user.distance.toFixed(1)} км`
                    }
                  </div>
                </div>

                {/* User Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}, {user.age}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon name="MapPin" size={12} />
                        {user.location}
                      </p>
                    </div>
                    <Button size="sm" className="rounded-full px-6 bg-primary hover:bg-primary/90 transition-colors">
                      <Icon name="Heart" size={14} className="mr-1" />
                      Связаться
                    </Button>
                  </div>

                  {/* Favorite Drink */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="Wine" size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.favoriteDrink}</p>
                        <p className="text-xs text-muted-foreground">Любимый напиток</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {user.drinkType}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Никого не найдено</h3>
          <p className="text-muted-foreground text-sm">
            Попробуйте изменить критерии поиска
          </p>
        </div>
      )}

      {/* Bottom Navigation Hint */}
      <div className="max-w-md mx-auto mt-8 text-center">
        <div className="flex items-center justify-center gap-6 py-4 bg-card/50 backdrop-blur-sm rounded-2xl">
          <div className="flex items-center gap-2 text-primary">
            <Icon name="Users" size={20} />
            <span className="text-sm font-medium">Поблизости: {filteredUsers.length}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Filter" size={20} />
            <span className="text-sm">Фильтры</span>
          </div>
        </div>
      </div>
    </div>
  );
}