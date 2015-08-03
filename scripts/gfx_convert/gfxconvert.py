from PIL import Image
from sys import exit


def homogeneous(l):
	"""
	Returns whether a list contains all of the same value.
	
	Parameters:
		l (List): The list to examine.
		
	Returns:
		Whether or not the list contains all of the same value.
	
	Preconditions:
		List isn't empty.
		
	Postconditions:
		None.
	"""
	x = l[0]
	for i in l[1:]:
		if i != x:
			return False
	return True

def is_power2(num):
	"""
	states if a number is a power of two.
	Author: A.Polino
	
	Parameters:
		num (integer): The number to test.
	
	Returns:
		Whether or not the number is a power of two.

	Preconditions:
		None.
		
	Postconditions:
		None.
	"""
		
	return num != 0 and ((num & (num - 1)) == 0)

	
def divvy(l):
	"""
	Divides a list into subsections balanced for binary search.
	
	Parameters:
		l (list): The list to divide.
		
	Returns:
		A list of the divided parts of the original list.
		
	Preconditions:
		None.
		
	Postconditions:
		None.
	"""
	if len(list) == 0 or is_power2(len(list)):
		return list
		
	else:
		# Get the next lowest and power of 2.
		nextLowest = 2**floor(log(len(list), 2))
		
		# If the length of the list is less than half way between the next lower
		# and higher powers of 2, then that means the top half of the binary
		# searching of this list will always be ignored as far as ARRXX works.
		# Therefore we split it.
		if len(list)-nextLowest < nextLowest/2.0:
			return []+divvy(list[:nextLowest])+divvy(list[nextLowest:])
		
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
			c[str(t[1])] = len(palette.keys())
			
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