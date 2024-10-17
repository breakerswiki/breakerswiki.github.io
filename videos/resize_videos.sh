#!/bin/bash

# Check if output folder is specified
OUTPUT_DIR="./output"

# Create the output directory if it doesn't exist
if [ ! -d "$OUTPUT_DIR" ]; then
  mkdir -p "$OUTPUT_DIR"
fi

# Loop through all MP4 files in the current directory
for INPUT_VIDEO in *.mp4; do
  # Check if no MP4 files are found
  if [ ! -f "$INPUT_VIDEO" ]; then
    echo "No MP4 files found in the current directory."
    exit 1
  fi

  # Extract the filename without extension
  FILENAME="${INPUT_VIDEO%.*}"

  # Set output video path (output directory + original filename + .mp4)
  OUTPUT_VIDEO="${OUTPUT_DIR}/${FILENAME}.mp4"

  # Resize the video using HandBrakeCLI
  echo "Resizing $INPUT_VIDEO to 320x224..."
  HandBrakeCLI -i "$INPUT_VIDEO" -o "$OUTPUT_VIDEO" --width 320 --height 224 --preset="Fast 720p30"

  # Check if the conversion was successful
  if [ $? -eq 0 ]; then
    echo "Video resized successfully: $OUTPUT_VIDEO"
  else
    echo "Failed to resize video: $INPUT_VIDEO"
  fi
done
