// Simple program to read in a file of music commands, and spit out a bunch
// of playNote lines to be summed in the shader.
#include <stdio.h>
#include "mparse.h"

int main(int argc, char **argv)
{
	if (argc < 2)
	{
		printf("Usage: tracker (trackfile)\n");
		return 0;
	}
	if (parse_init(argv[1]))
	{
		read_loop();
	}
	return 0;
}
