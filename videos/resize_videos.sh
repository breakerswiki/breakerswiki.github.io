find . -type f -iname '*.mp4' | while read -r file; do
    # Define the output file path
    output="${file%.mp4}_resized.mp4"
    
    # Resize the video
    ffmpeg -i "$file" -vf scale=320:224 -c:a copy "$output"
    
    # Remove the original file
    rm "$file"
    
    # Rename the resized file to have the same name as the original
    mv "$output" "$file"
done