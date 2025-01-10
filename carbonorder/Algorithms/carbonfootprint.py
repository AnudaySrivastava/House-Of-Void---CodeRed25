from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import re

# Path to Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Define emission factors
emission_factors = {
    "petrol": 2.31,  # kg CO2e/liter
    "diesel": 2.68,  # kg CO2e/liter
    "cng": 1.88      # kg CO2e/kg
}

# Define vehicle categories and their mileage values (km per liter/kg)
vehicle_categories = {
    1: ("Compact Cars", 11),
    2: ("Sedans", 9),
    3: ("SUVs and Crossovers", 7),
    4: ("Pickup Trucks", 6),
    5: ("Hybrid Vehicles", 20),
    6: ("Motorcycles", 22),
    7: ("Heavy Vehicles", 4)
}

def calculate_plastic_emissions():
    print("Select the household size:")
    print("1. 1 Person")
    print("2. 2-4 People")
    print("3. 5+ People")
    
    choice = int(input("Enter your choice (1/2/3): "))
    
    # Calculate waste weight based on selection
    if choice == 1:
        waste_weight = 0.6 * 30  # kg/month
    elif choice == 2:
        waste_weight = 0.5 * 30  # kg/month
    elif choice == 3:
        waste_weight = 0.4 * 30  # kg/month
    else:
        print("Invalid choice. Exiting.")
        return
    
    # Constants
    plastic_emission_factor = 6.0  # kg CO2e per kg of plastic waste
    waste_donated_for_recycling = 0  # kg

    # Calculations
    emissions = waste_weight * plastic_emission_factor
    footprint_reduced = waste_donated_for_recycling * plastic_emission_factor
    final_footprint = emissions - footprint_reduced
    
    # Results
    print("\n--- Results ---")
    print(f"Plastic Waste Weight: {waste_weight:.2f} kg/month")
    print(f"Emissions: {emissions:.2f} kg CO₂e")
    print(f"Footprint Reduced: {footprint_reduced:.2f} kg CO₂e")
    print(f"Final Footprint: {final_footprint:.2f} kg CO₂e")
    return final_footprint

def calculate_food_emissions():
    print("Select the household size:")
    print("1. 1 Person")
    print("2. 2-4 People")
    print("3. 5+ People")
    
    choice = int(input("Enter your choice (1/2/3): "))
    
    # Calculate food waste based on selection
    if choice == 1:
        food_waste = 0.2 * 30  # kg/month
    elif choice == 2:
        food_waste = 0.15 * 30  # kg/month
    elif choice == 3:
        food_waste = 0.1 * 30  # kg/month
    else:
        print("Invalid choice. Exiting.")
        return
    
    # Constants
    emission_factor = 1.5  # kg CO2e per kg of waste
    waste_donated_for_composting = 0  # kg

    # Calculations
    emissions = food_waste * emission_factor
    footprint_reduced = waste_donated_for_composting * emission_factor
    final_footprint = emissions - footprint_reduced
    
    # Results
    print("\n--- Results ---")
    print(f"Food Waste: {food_waste:.2f} kg/month")
    print(f"Emissions: {emissions:.2f} kg CO₂e")
    print(f"Footprint Reduced: {footprint_reduced:.2f} kg CO₂e")
    print(f"Final Footprint: {final_footprint:.2f} kg CO₂e")
    return final_footprint

def calculate_vehicle_emissions():
    # Set the distance traveled to 12111 km
    distance = 12111

    # Input the vehicle category
    print("\nSelect your vehicle category:")
    for key, value in vehicle_categories.items():
        print(f"{key}. {value[0]}")

    vehicle_choice = int(input("Enter the number corresponding to your vehicle category: "))
    if vehicle_choice not in vehicle_categories:
        print("Invalid vehicle category selected!")
        return

    vehicle_name, mileage = vehicle_categories[vehicle_choice]

    # Input the fuel type
    print("\nSelect your fuel type:")
    print("1. Petrol")
    print("2. Diesel")
    print("3. CNG")

    fuel_choice = int(input("Enter the number corresponding to your fuel type: "))

    if fuel_choice == 1:
        fuel_type = "petrol"
    elif fuel_choice == 2:
        fuel_type = "diesel"
    elif fuel_choice == 3:
        fuel_type = "cng"
    else:
        print("Invalid fuel type selected!")
        return

    emission_factor = emission_factors[fuel_type]

    # Calculate the emissions
    emissions = (distance * emission_factor) / mileage

    # Display the results
    print(f"\nResults:")
    print(f"Vehicle Category: {vehicle_name}")
    print(f"Fuel Type: {fuel_type.capitalize()}")
    print(f"Distance Traveled: {distance} km")
    print(f"Carbon Emissions: {emissions:.2f} kg CO2e")
    return emissions

def calculate_electricity_emissions():
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
        final = consumption_units * 0.825
        print(f"{final:.2f} Kg CO2e")  # Only output the value
        return final
    else:
        print("Value not found")
        return 0

def main():
    total_emissions = 0
    total_emissions += calculate_plastic_emissions()
    total_emissions += calculate_food_emissions()
    total_emissions += calculate_vehicle_emissions()
    total_emissions += calculate_electricity_emissions()

    print(f"\nTotal Emissions: {total_emissions:.2f} kg CO2e")

# Run the main function
if _name_ == "_main_":
    main()