import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const drinkOptions = [
  { type: "Коктейли", drinks: ["Мартини", "Мохито", "Дайкири", "Космополитен", "Джин-тоник"] },
  { type: "Вино", drinks: ["Красное вино", "Белое вино", "Шампанское", "Просекко", "Розе"] },
  { type: "Пиво", drinks: ["Светлое", "Темное", "Пшеничное", "IPA", "Стаут"] },
  { type: "Крепкие", drinks: ["Виски", "Водка", "Ром", "Коньяк", "Текила"] }
];

const cities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"];

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "Анна",
    age: 25,
    city: "Москва",
    district: "Центр",
    bio: "Люблю классические коктейли и интересные беседы",
    favoriteDrink: "Мартини",
    drinkType: "Коктейли",
    isVisible: true,
    distance: 5
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-8">
          <Button variant="ghost" size="sm" className="p-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-xl font-semibold">Мой профиль</h1>
          <Button 
            variant={isEditing ? "default" : "ghost"} 
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Icon name={isEditing ? "Check" : "Edit"} size={16} />
          </Button>
        </div>

        {/* Profile Photo */}
        <Card className="mb-6 overflow-hidden bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 relative flex items-center justify-center">
              <img 
                src="/img/4e3303bb-0cc5-4cda-9526-5878a55f7dfa.jpg" 
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <Button size="sm" className="absolute bottom-4 right-4 rounded-full">
                  <Icon name="Camera" size={16} />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="User" size={20} />
              Основная информация
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                ) : (
                  <p className="text-lg font-medium">{formData.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="age">Возраст</Label>
                {isEditing ? (
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                  />
                ) : (
                  <p className="text-lg font-medium">{formData.age} лет</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="bio">О себе</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Расскажите о себе..."
                />
              ) : (
                <p className="text-muted-foreground">{formData.bio}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="MapPin" size={20} />
              Местоположение
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="city">Город</Label>
              {isEditing ? (
                <Select value={formData.city} onValueChange={(value) => setFormData({...formData, city: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-lg font-medium">{formData.city}</p>
              )}
            </div>

            <div>
              <Label htmlFor="district">Район</Label>
              {isEditing ? (
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                />
              ) : (
                <p className="text-lg font-medium">{formData.district}</p>
              )}
            </div>

            <div>
              <Label htmlFor="distance">Радиус поиска: {formData.distance} км</Label>
              {isEditing && (
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={formData.distance}
                  onChange={(e) => setFormData({...formData, distance: parseInt(e.target.value)})}
                  className="w-full"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Drinks Preferences */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Wine" size={20} />
              Предпочтения в напитках
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Категория напитков</Label>
              {isEditing ? (
                <Select value={formData.drinkType} onValueChange={(value) => setFormData({...formData, drinkType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {drinkOptions.map(option => (
                      <SelectItem key={option.type} value={option.type}>{option.type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {formData.drinkType}
                </Badge>
              )}
            </div>

            <div>
              <Label>Любимый напиток</Label>
              {isEditing ? (
                <Select value={formData.favoriteDrink} onValueChange={(value) => setFormData({...formData, favoriteDrink: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {drinkOptions.find(opt => opt.type === formData.drinkType)?.drinks.map(drink => (
                      <SelectItem key={drink} value={drink}>{drink}</SelectItem>
                    )) || []}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Wine" size={16} className="text-primary" />
                  </div>
                  <p className="text-lg font-medium">{formData.favoriteDrink}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Shield" size={20} />
              Настройки приватности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Показывать профиль</p>
                <p className="text-sm text-muted-foreground">Другие пользователи смогут найти вас</p>
              </div>
              <Switch
                checked={formData.isVisible}
                onCheckedChange={(checked) => setFormData({...formData, isVisible: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        {isEditing && (
          <Button onClick={handleSave} className="w-full mb-6">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить изменения
          </Button>
        )}
      </div>
    </div>
  );
}