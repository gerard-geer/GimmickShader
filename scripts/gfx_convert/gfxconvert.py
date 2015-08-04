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
	result = []
	if len(l) == 0 or is_power2(len(l)):
		result.append(l)
		return result
		
	else:
		# Get the next lowest and power of 2.
		nextLowest = 2**floor(log(len(l), 2))
		
		# If the length of the list is less than half way between the next lower
		# and higher powers of 2, then that means the top half of the binary
		# searching of this list will always be ignored as far as ARRXX works.
		# Therefore we split it.
		if len(l)-nextLowest < nextLowest/2.0:
			result.append(divvy(l[:nextLowest]))
			result.append(divvy(l[nextLowest:]))
			return result
		# Otherwise we generate extra rows of just 9s.
		else:
			while not(is_power2(len(l))):
				l.append([9]*len(l[0]))

def generateARRXXCall(row):
	"""
	Generates an X-axis call to ARRXX.
	
	Parameters:
		row(list): The list of palette indices to wrap into an ARRXX call.
		
	Returns:
		A String containing the call.
		
	Preconditions:
		None.
	
	Postconditions:	
		None.
	"""
	return "ARR"+str(len(row))+"(x,"+",".join(row)+")"

def generateARRYYCall(rowSet):
	"""
	Generates a Y-axis call to ARRXX.
	
	Parameters:
		rowSet (List): The list of rows to wrap into a multi-line ARRXX call.
		
	Returns:
		A list of lines containing the call.
		
	Preconditions:
		None.
		
	Postconditions:
		None.
	"""
	# Create a place to store the result.
	result = []
	
	# Convert all the rows into their own X axis calls.
	calls = []
	for row in rows:
		if homogeneous(row):
			calls.append(row[0])
		else:
			calls.append(generateARRXXCall(row))
	
	# If there is only one call, then we don't need to make a big fuss
	# over having a Y axis ARRXX call at all.
	if len(calls) == 1:
		return result.append("".join(calls))
		
	# If there is more though, we need to make the multiple lines of the call.
	else:
		result.append( "ARR"+str(int(len(rowSet)))+"(y," )
		for call in calls[:-1]:
			result.append( "  "+call+"," )
		result.append( "  "+calls[-1] )
		result.append( ");" )
		
	return result
			
def generateClause(rows, startIndex, endIndex):
	"""
	Generates an if clause for non-power-of-two Y axis ARRXX calls.
	
	Parameters:
		rows(List of rows): The list of rows this clause shall contain.
		startIndex(integer): The y-value at which this clause starts.
		endIndex(integer): The y-value at which this clause ends.
		
	Returns:
		An array of strings representing the lines of the clause.
		
	Preconditions:
		None.
		
	Postconditions:
		None.
	"""
	# Create a place to store the lines of the result.
	result = []
	
	# Get the internal ARRYY call and indent it.
	calls = generateARRYYCall(rows)
	for i in range(len(calls)):
		calls[i] = "\t"+calls[i]
	
	result.append("")
	result.append("if(y<"+str(endIndex)+")")
	result.append("{")
	result.append("\ty-="+str(startIndex)+";")
	result.append("\treturn")
	result.extend(calls)
	result.append("}")
	return result
	
def generateBody(rowSets):
	"""
	Generates the body of a sprite/tile function.
	
	Parameters:
		rowSets(list of lists): The balanced set of rows.
		
	Returns:
		A list of strings representing the output.
		
	Preconditions:
		The rows of the image have been divvy'd up.
		
	Postconditions:
		None.
	"""
	# A place to store all the clauses together.
	result = []
	# The current starting and finishing index of the clause.
	curStart = 0
	curFinish = 0
	for set in rowSets:
		curFinish += len(set)
		clause = generateClause(set, curStart, curFinish)
		curStart = curFinish
		result.extend(clause)
	return result
		
	
		
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

		# Generate a dictionary to link colors to palette indices.
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

		# Generate a place to store our converted data.
		rows = []
		for i in range(im.size[1]): # Outer loop loops over height.
			rows.append([])
			for j in range(im.size[0]): # Inner? Width.
				rows[i].append( str(palette[ str( pixels[i*im.size[0]+j] ) ]) )

		# Divvy up the rows to align them best in encapsulating ARRXX calls.
		rowSets = divvy(rows)
		
		# Print for current functionality.
		print "\n".join(generateBody(rowSets))
			
		# Do we want to do another?
		try:
			again = raw_input('\nAgain? (y/n) ') != 'n' 
		except KeyboardInterrupt:
			print("\nKeyboard exit.")
			exit()