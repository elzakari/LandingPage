import os

# Directory containing the images
image_directory = r"C:\Users\elzak\Downloads\Project\Reign Landing Page\public\images\Russell_heights_property"

# Supported image file extensions
image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')

# List to store the image filenames
image_names = []

print(f"Searching for images in: {image_directory}")

# Step 1: Rename all .jpeg files to .jpg
for root, dirs, files in os.walk(image_directory):
    for filename in files:
        # Check if the file has a .jpeg extension
        if filename.lower().endswith('.jpeg'):
            old_path = os.path.join(root, filename)
            new_path = os.path.join(root, os.path.splitext(filename)[0] + ".jpg")
            
            # Check if the new file already exists
            if os.path.exists(new_path):
                print(f"File already exists, skipping: {new_path}")
                continue
            
            # Rename the file
            print(f"Renaming file: {old_path} -> {new_path}")
            try:
                os.rename(old_path, new_path)
            except Exception as e:
                print(f"Error renaming file: {e}")

# Step 2: Recursively iterate through all files in the directory and its subdirectories
for root, dirs, files in os.walk(image_directory):
    print(f"Checking directory: {root}")
    for filename in files:
        print(f"Found file: {filename}")
        
        # Skip hidden files
        if filename.startswith("."):
            print(f"Skipping hidden file: {filename}")
            continue
        
        # Check if the file is an image
        if filename.lower().endswith(image_extensions):
            print(f"Adding image: {filename}")
            image_names.append(filename)

# Print the list of image filenames
print("Image Filenames (Recursive Search):")
print(image_names)
