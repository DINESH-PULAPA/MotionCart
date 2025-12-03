from PIL import Image
import sys

def check_center_pixel(filename):
    try:
        img = Image.open(filename)
        width, height = img.size
        center_x = width // 2
        center_y = height // 2
        pixel = img.getpixel((center_x, center_y))
        print(f"{filename} center pixel: {pixel}")
    except Exception as e:
        print(f"Error reading {filename}: {e}")

check_center_pixel('original.png')
check_center_pixel('react.png')
