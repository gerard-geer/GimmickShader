#include "mparse.h"

FILE track_file;

int amp;
float duty;
float step_prog;
float step_size;
wavetype wave_sel;

#define AMP_DEFAULT 0.15
#define DUTY_DEFAULT 0.5
#define STEP_SIZE_DEFAULT 0.2
#define WAVE_SEL_DEFAULT pulse

#define LINE_BUFFER_SIZE 64

int parse_init(const char *fname)
{
	if (track_file)
	{
		fclose(track_file);
	}
	track_file = fopen(fname,"r");
	if (!track_file)
	{
		fprintf(stderr,"Error: Couldn't open file %s.\n",fname);
		return 0;
	}

	amp = AMP_DEFAULT;
	duty = DUTY_DEFAULT;
	step_size = STEP_SIZE_DEFAULT; 
	wave_sel = WAVE_SEL_DEFAULT;
	step_prog = 0;
}

char *get_arg_to_(const char *comp, char *line)
{
	if (!line || !comp)
	{
		fprintf(stderr,"Error: Nonsense arguments to get_arg_to\n");
		return 0;
	}
	int wordlen = 0;
	char *line_buffer = (char *)malloc(sizeof(char) * LINE_BUFFER_SIZE + 1);
	memset(line_buffer, 0, sizeof(char) * LINE_BUFFER_SIZE + 1);
	strncpy(line_buffer,line,LINE_BUFFER_SIZE);

	for (int i = 0; i < strnlen(comp,LINE_BUFFER_SIZE); i++)
	{
		if (comp[i] == '\0' || comp[i] == '\n')
		{
			wordlen = i;
			break;
		}
	}

	for (int i = 0; i < strnlen(line_buffer, LINE_BUFFER_SIZE); i++)
	{
		if (line_buffer[i] == '\n')
		{
			line_buffer[i] = '\0';
		}
		if (line_buffer[i] == '\0')
		{
			break;
		}
	}

	for (int i = 0; i < wordlen; i++)
	{
		if ((word[i] | 0x20) != (line_buffer[i] | 0x20))
		{
			free(line_buffer);
			return NULL;
		}
	}

	char *ret_buffer = (char *)malloc(sizeof(char) * LINE_BUFFER_SIZE + 1);
	strncpy(ret,line_buffer + wordlen, LINE_BUFFER_SIZE - wordlen);
	free(line_buffer);
	return ret_buffer;
}

void handle_line(char *line)
{
	float freq = 0.0;
	int octave = 1;
	char *check = NULL;
	check = get_arg_to("reset",line);
	if (check)
	{
		step_prog = 0;
		goto handle_line_finished;
	}

	check = get_arg_to("step ",line);
	if (check)
	{
		step_size = (float)strtof(check,0);
		goto handle_line_finished;
	}

	check = get_arg_to("amp ",line);
	if (check)
	{
		amp = (float)strtof(check,0);
		goto handle_line_finished;
	}

	check = get_arg_to("duty ",line);
	if (check)
	{
		duty = (float)strtof(check,0);
		goto handle_line_finished;
	}

	check = get_arg_to("wave ",line);
	if (check)
	{
		wave_sel = (int)strtoul(check,NULL,0);
	}

handle_line_finished:
	if (check)
	{
		free(check);
	}
	return;

handle_line_note:
	
}

void read_loop(void)
{
	if (!track_file)
	{
		fprintf(stderr,"Error: File is not open, nothing to read!\n");
		return;
	}
	char *line_buffer = (char *)malloc(sizeof(char) * LINE_BUFFER_SIZE + 1);
	memset(line_buffer,0,sizeof(char) * LINE_BUFFER_SIZE + 1);
	while (fgets(line_buffer, LINE_BUFFER_SIZE, track_file))
	{
		handle_line(line_buffer);
	}

	free (line_buffer);

}
