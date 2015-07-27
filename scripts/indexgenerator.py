from PIL import Image


# Get the image name.
filename = raw_input('Image name: ')
# Load the image. 
im = Image.open(filename)

# Get the colors used in the image.
colors = im.getcolors()

# Create a dictionary to link colors to palette indices.
palette = {}

# For each tuple returned by getcolors(), we take the
# color, make it a string, use it as a key, then
# at that key store the palette index.
for t in colors:
	palette[str(t[1])] = len(palette.keys())
	
# Print the color->index binding.
print(palette)

# Get a list of pixels.
pixels = im.getdata()

# Create a place to store our converted data.
indices = []
for i in range(im.size[1]): # Outer loop loops over height.
	indices.append([])
	for j in range(im.size[0]): # Inner? Width.
		indices[i].append( str(palette[ str( pixels[i*im.size[0]+j] ) ])+' ' )

# Now we can print the output.
for l in indices:
	for s in l:
		print(s)