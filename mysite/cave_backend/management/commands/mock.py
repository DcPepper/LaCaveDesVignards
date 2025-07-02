from django.core.management.base import BaseCommand
from cave_backend.models.beverages import Vine, Biere, Spirits
from cave_backend.models.utils import Tag
import random
from django.utils import timezone

class Command(BaseCommand):
    help = 'Creates mock data for wine, beer, and spirits (20 of each)'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating mock data...')
        
        # Create some tags
        tags = [
            'Red', 'White', 'Rosé', 'Sparkling', 'Sweet', 'Dry', 'Full-bodied', 'Light-bodied',
            'Craft', 'Import', 'Domestic', 'Lager', 'Ale', 'IPA', 'Stout', 'Porter',
            'Whisky', 'Bourbon', 'Scotch', 'Vodka', 'Rum', 'Gin', 'Tequila', 'Mezcal', 'Brandy', 'Cognac'
        ]
        
        existing_tags = Tag.objects.all()
        if not existing_tags.exists():
            for tag_name in tags:
                Tag.objects.create(name=tag_name)
            self.stdout.write(self.style.SUCCESS('Created tags'))
        
        # Wine data
        wine_colors = ['Red', 'White', 'Rosé', 'Sparkling']
        wine_origins = ['France', 'Italy', 'Spain', 'USA', 'Argentina', 'Chile', 'Australia', 'Germany', 'Portugal', 'New Zealand']
        wine_varieties = [
            'Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Syrah/Shiraz', 'Malbec', 
            'Chardonnay', 'Sauvignon Blanc', 'Riesling', 'Pinot Grigio', 'Gewürztraminer',
            'Grenache', 'Tempranillo', 'Sangiovese', 'Nebbiolo', 'Zinfandel'
        ]
        wine_years = list(range(2000, 2023))
        
        # Beer data
        beer_varieties = [
            'IPA', 'Double IPA', 'Stout', 'Porter', 'Lager', 'Pilsner', 'Wheat Beer', 
            'Pale Ale', 'Amber Ale', 'Belgian Tripel', 'Hefeweizen', 'Saison', 
            'Sour', 'Gose', 'Barleywine', 'Brown Ale', 'Kölsch', 'Dunkel', 'Bock', 'Rauchbier'
        ]
        beer_brands = [
            'Sierra Nevada', 'Dogfish Head', 'Stone Brewing', 'Founders', 'Bell\'s', 
            'Heineken', 'Guinness', 'Budweiser', 'Samuel Adams', 'Lagunitas',
            'New Belgium', 'Goose Island', 'Weihenstephaner', 'Brooklyn Brewery', 'Carlsberg',
            'Chimay', 'Duvel', 'Orval', 'Rogue', 'BrewDog'
        ]
        
        # Spirits data
        spirit_varieties = [
            'Single Malt Whisky', 'Blended Whisky', 'Bourbon', 'Rye Whiskey', 'Irish Whiskey',
            'Vodka', 'Flavored Vodka', 'Gin', 'London Dry Gin', 'White Rum', 
            'Dark Rum', 'Spiced Rum', 'Silver Tequila', 'Reposado Tequila', 'Añejo Tequila',
            'Cognac', 'Brandy', 'Armagnac', 'Mezcal', 'Absinthe'
        ]
        spirit_brands = [
            'Macallan', 'Johnnie Walker', 'Jack Daniel\'s', 'Maker\'s Mark', 'Jameson',
            'Grey Goose', 'Absolut', 'Belvedere', 'Hendrick\'s', 'Bombay Sapphire',
            'Bacardi', 'Captain Morgan', 'Havana Club', 'Don Julio', 'Patrón',
            'Hennessy', 'Rémy Martin', 'Martell', 'Del Maguey', 'Pernod'
        ]
        
        # Create 20 wines
        wines = []
        for i in range(1, 21):
            color = random.choice(wine_colors)
            origin = random.choice(wine_origins)
            variety = random.choice(wine_varieties)
            year = random.choice(wine_years)
            
            wine = {
                'name': f"{origin} {variety} {year}",
                'description': f"A {color.lower()} wine from {origin} made with {variety} grapes. Vintage {year}.",
                'price': round(random.uniform(10.0, 500.0), 2),
                'stock': random.randint(5, 100),
                'quantity': 750,  # ml
                'photos': f"wine_{i}.jpg",
                'pourcentage': random.randint(11, 15),
                'couleur': color,
                'origin': origin,
                'year': year,
                'variety': variety
            }
            wines.append(wine)
        
        # Create 20 beers
        beers = []
        for i in range(1, 21):
            variety = random.choice(beer_varieties)
            brand = random.choice(beer_brands)
            
            beer = {
                'name': f"{brand} {variety}",
                'description': f"A {variety} style beer from {brand}.",
                'price': round(random.uniform(3.0, 25.0), 2),
                'stock': random.randint(10, 200),
                'quantity': random.choice([330, 355, 500, 650]),  # ml
                'photos': f"beer_{i}.jpg",
                'pourcentage': random.randint(4, 12),
                'variety': variety,
                'brand': brand
            }
            beers.append(beer)
        
        # Create 20 spirits
        spirits = []
        for i in range(1, 21):
            variety = random.choice(spirit_varieties)
            brand = random.choice(spirit_brands)
            
            spirit = {
                'name': f"{brand} {variety}",
                'description': f"Premium {variety} from {brand}.",
                'price': round(random.uniform(20.0, 300.0), 2),
                'stock': random.randint(5, 50),
                'quantity': random.choice([700, 750, 1000]),  # ml
                'photos': f"spirit_{i}.jpg",
                'pourcentage': random.randint(35, 50),
                'variety': variety,
                'brand': brand
            }
            spirits.append(spirit)
        
        # Save wines to database
        for wine_data in wines:
            if not Vine.objects.filter(name=wine_data['name']).exists():
                Vine.objects.create(**wine_data)
        
        # Save beers to database
        for beer_data in beers:
            if not Biere.objects.filter(name=beer_data['name']).exists():
                Biere.objects.create(**beer_data)
        
        # Save spirits to database
        for spirit_data in spirits:
            if not Spirits.objects.filter(name=spirit_data['name']).exists():
                Spirits.objects.create(**spirit_data)
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created mock data: 20 wines, 20 beers, and 20 spirits'))