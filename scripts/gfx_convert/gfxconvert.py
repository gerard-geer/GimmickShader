from PIL import Image
from sys import exit

if __name__ == "__main__":

	again = True
	
	while again:
		# Get the image name.
		try:
			filename = raw_input('\nImage name: ')
		except KeyboardInterrupt:
			print("\nKeyboard exit.")
			exit()

		# If there is no filename, we assume it's a .PNG.
		if not filename.endswith(('.png', '.PNG', '.jpg', '.jpeg', '.dds', '.raw', '.eeuuughhh')):
			filename += '.png'

		# Load the image. 
		try:
			im = Image.open(filename)
		except IOError:
			print('Invalid filename.')
			continue
			
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
		for key, value in palette.iteritems():
			print str(value) + ': ' + key


		# Get a list of pixels.
		pixels = im.getdata()

		# Create a place to store our converted data.
		indices = []
		for i in range(im.size[1]): # Outer loop loops over height.
			indices.append([])
			for j in range(im.size[0]): # Inner? Width.
				indices[i].append( str(palette[ str( pixels[i*im.size[0]+j] ) ]) )

		# Now we can print the output.
		for l in indices:
			print('ARR'+str(len(l))+'('+','.join(l)+')')
			
		# Do we want to do another?
		try:
			again = raw_input('\nAgain? (y/n) ') != 'n' 
		except KeyboardInterrupt:
			print("\nKeyboard exit.")
			exit()