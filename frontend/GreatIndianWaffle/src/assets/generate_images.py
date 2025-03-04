from PIL import Image, ImageDraw, ImageFont
import os

# Define image sizes
PROMOTION_SIZE = (400, 200)
FOOD_SIZE = (300, 300)
HERO_SIZE = (800, 400)

# Define colors
COLORS = {
    'promotion1': (255, 215, 0),    # Gold
    'promotion2': (255, 107, 107),  # Light Red
    'promotion3': (76, 175, 80),    # Green
    'classic_masala_waffle': (205, 133, 63),  # Peru (brownish)
    'chocolate_chai_waffle': (139, 69, 19),   # Saddle Brown
    'hero_background': (70, 130, 180)         # Steel Blue
}

def create_image(filename, size, color, text):
    # Create a new image with the given color
    img = Image.new('RGB', size, color)
    draw = ImageDraw.Draw(img)
    
    # Add text to the center of the image
    try:
        font = ImageFont.truetype("Arial.ttf", 20)
    except IOError:
        font = ImageFont.load_default()
    
    text_width, text_height = draw.textbbox((0, 0), text, font=font)[2:4]
    position = ((size[0] - text_width) // 2, (size[1] - text_height) // 2)
    
    # Draw text in white
    draw.text(position, text, fill=(255, 255, 255), font=font)
    
    # Save the image
    img.save(filename)
    print(f"Created {filename}")

# Current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Create promotion images
create_image(os.path.join(current_dir, 'promotion1.jpg'), PROMOTION_SIZE, COLORS['promotion1'], "Summer Special")
create_image(os.path.join(current_dir, 'promotion2.jpg'), PROMOTION_SIZE, COLORS['promotion2'], "Combo Deal")
create_image(os.path.join(current_dir, 'promotion3.jpg'), PROMOTION_SIZE, COLORS['promotion3'], "Happy Hours")

# Create food images
create_image(os.path.join(current_dir, 'classic_masala_waffle.jpg'), FOOD_SIZE, COLORS['classic_masala_waffle'], "Classic Masala Waffle")
create_image(os.path.join(current_dir, 'chocolate_chai_waffle.jpg'), FOOD_SIZE, COLORS['chocolate_chai_waffle'], "Chocolate Chai Waffle")

# Create hero background
create_image(os.path.join(current_dir, 'hero_background.jpg'), HERO_SIZE, COLORS['hero_background'], "Great Indian Waffle")

print("All images generated successfully!")
