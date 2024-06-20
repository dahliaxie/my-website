import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ASCII characters sorted by brightness (from dark to light)
ASCII_CHARS = '@%#*+=-:;~<>^()_{}|\\/?,.`" '
font_path = 'src/fonts/arial.ttf'

# Function to convert frame to ASCII representation
def frame_to_ascii(frame, target_width, font):
    # Convert frame to grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Calculate target height based on original aspect ratio
    aspect_ratio = frame.shape[1] / frame.shape[0]
    target_height = int(target_width / aspect_ratio)

    # Resize the grayscale frame to the desired width and height
    gray_frame_resized = cv2.resize(gray_frame, (target_width, target_height))

    # Create PIL image for drawing
    img = Image.new('RGB', (target_width * 8, target_height * 16), color=(0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Convert each pixel to ASCII character based on its brightness
    for y in range(target_height):
        for x in range(target_width):
            pixel = gray_frame_resized[y, x]
            ascii_char = ASCII_CHARS[int(pixel / 255 * (len(ASCII_CHARS) - 1))]
            draw.text((x * 8, y * 16), ascii_char, font=font, fill=(255, 255, 255))
    
    return img

# Function to write ASCII frames to a new video file
def write_ascii_animation(video_path, output_path, target_width=50, target_fps=8):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Unable to open video file {video_path}")
        return

    # Get original frame rate and size of the video
    original_fps = cap.get(cv2.CAP_PROP_FPS)
    frame_skip = int(original_fps / target_fps)

    # Load font
    font_size = int(600 / target_width)  # Adjust font size based on target width
    font = ImageFont.truetype(font_path, font_size)

    # Initialize VideoWriter with the same dimensions as the processed frames
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    frame_width = target_width * 8
    frame_height = int(frame_width / (cap.get(cv2.CAP_PROP_FRAME_WIDTH) / cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
    out = cv2.VideoWriter(output_path, fourcc, target_fps, (frame_width, frame_height))

    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_skip == 0:
            ascii_img = frame_to_ascii(frame, target_width, font)
            img_np = np.array(ascii_img)
            img_cv2 = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
            out.write(img_cv2)
        
        frame_count += 1

    cap.release()
    out.release()
    print(f"ASCII animation saved as {output_path}")

# Example usage
if __name__ == "__main__":
    video_path = r'C:\Users\Dahlia\Documents\dahliaxie.github.io\src\videos\nature.mp4'
    output_path = 'src/videos/new_nature.mp4'
    write_ascii_animation(video_path, output_path, target_width=48, target_fps=8)
