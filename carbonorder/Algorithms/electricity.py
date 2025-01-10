from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import re

# Path to Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Load and preprocess the image
image_path = r'C:\Users\Administrator\Desktop\bill.jpg'
image = Image.open(image_path)
image = image.convert('L')  # Convert to grayscale
image = ImageEnhance.Contrast(image).enhance(2.0)  # Enhance contrast
image = image.filter(ImageFilter.SHARPEN)  # Sharpen image

# Perform OCR with configurations
config = '--psm 6'
extracted_text = pytesseract.image_to_string(image, lang='eng', config=config)

# Search for "Consumption (Units)" or its variations in the extracted text
consumption_pattern = r"Consumption\(.?Units\).?(\d+)|Consumption\(.?Unils\).?(\d+)"
match = re.search(consumption_pattern, extracted_text)

if match:
    consumption_units = match.group(1) if match.group(1) else match.group(2)
    consumption_units = float(consumption_units)
    final=consumption_units*0.475
    print(f"{final}KgCo2 e")  # Only output the value
else:
    print("Value not found")