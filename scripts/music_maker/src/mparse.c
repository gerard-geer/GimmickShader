#include "mparse.h"

#define SAW_FUNC "saw(time, %f, %f)"
#define TRI_FUNC "tri(time, %f, %f)"
#define SIN_FUNC "sine(time, %f, %f)"
#define SQR_FUNC "sqr(time, %f, %f, %f)"
#define NOI_FUNC "noise(time, %f, %f)"
#define DECAY_FUNC "l_decay(time, %f, %f)"

FILE *track_file;

float amp;
float duty;
float step_prog;
float step_size;
float decay_len;
float note_len;
wavetype wave_sel;

#define AMP_DEFAULT 0.15
#define DUTY_DEFAULT 0.5
#define STEP_SIZE_DEFAULT 0.2
#define WAVE_SEL_DEFAULT pulse
#define DECAY_LEN_DEFAULT 0.2
#define NOTE_LEN_DEFAULT 0.2

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
	decay_len = DECAY_LEN_DEFAULT;
	step_prog = 0;
	return 1;
}

char *get_arg_to(const char *comp, char *line)
{
	if (!line || !comp)
	{
		fprintf(stderr,"Error: Nonsense arguments to get_arg_to\n");
		return NULL;
	}
	int wordlen = 0;
	char *line_buffer = (char *)malloc(sizeof(char) * LINE_BUFFER_SIZE + 1);
	memset(line_buffer, 0, sizeof(char) * LINE_BUFFER_SIZE + 1);
	strncpy(line_buffer,line,LINE_BUFFER_SIZE);
	for (int i = 0; i < LINE_BUFFER_SIZE; i++)
	{
		if (comp[i] == '\0' || comp[i] == '\n')
		{
			wordlen = i;
			break;
		}
	}

	for (int i = 0; i < LINE_BUFFER_SIZE; i++)
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
		if ((comp[i] | 0x20) != (line_buffer[i] | 0x20))
		{
			free(line_buffer);
			return NULL;
		}
	}

	char *ret_buffer = (char *)malloc(sizeof(char) * LINE_BUFFER_SIZE + 1);
	strncpy(ret_buffer,line_buffer + wordlen, LINE_BUFFER_SIZE - wordlen);
	free(line_buffer);
	return ret_buffer;
}

void handle_line(char *line)
{
	float freq = 0.0;
	int octave = -1;
	char *check = NULL;
	check = get_arg_to("#reset",line);
	if (check)
	{
		step_prog = 0;
		free(check);
		return;
	}

	check = get_arg_to("#step ",line);
	if (check)
	{
		step_size = (float)strtof(check,0);
		free(check);
		return;
	}

	check = get_arg_to("#amp ",line);
	if (check)
	{
		amp = (float)strtof(check,0);
		free(check);
		return;
	}

	check = get_arg_to("#duty ",line);
	if (check)
	{
		duty = (float)strtof(check,0);
		free(check);
		return;
	}

	check = get_arg_to("#wave ",line);
	if (check)
	{
		wave_sel = (int)strtoul(check,NULL,0);
		free(check);
		return;
	}

	check = get_arg_to("#decay ",line);
	if (check)
	{
		decay_len = (float)strtof(check,0);
		free(check);
		return;
	}

	check = get_arg_to("#len ",line);
	if (check)
	{
		note_len = (float)strtof(check,0);
		free(check);
		return;
	}

// Notes
	check = get_arg_to("C#",line);
	if (check)
	{
		freq = NOTE_CS;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("C",line);
	if (check)
	{
		freq = NOTE_C;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("D#",line);
	if (check)
	{
		freq = NOTE_DS;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("D",line);
	if (check)
	{
		freq = NOTE_D;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("E",line);
	if (check)
	{
		freq = NOTE_E;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("F#",line);
	if (check)
	{
		freq = NOTE_FS;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("F",line);
	if (check)
	{
		freq = NOTE_F;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("G#",line);
	if (check)
	{
		freq = NOTE_GS;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("G",line);
	if (check)
	{
		freq = NOTE_G;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("A#",line);
	if (check)
	{
		freq = NOTE_AS;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("A",line);
	if (check)
	{
		freq = NOTE_A;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("B",line);
	if (check)
	{
		freq = NOTE_B;
		octave = (int)strtoul(check,NULL,0);
		goto handle_line_finished;
	}
	check = get_arg_to("-",line);
	if (check)
	{
		freq = 0;
		octave = -1;
		goto handle_line_finished;
	}

// Unrecognized token, or a comment, etc
	free(check);
	return;

handle_line_finished:
	if (check)
	{
		free(check);
		print_line(freq, octave);
		step_prog += step_size;
	}
	return;
	
}

void print_line(float freq, int octave)
{
	if (octave <= 0)
	{
		return;
	}
	float start = step_prog;
	float end = step_prog + note_len;
	freq = freq * (1 << octave);
//	printf("\t((t>%f)?((t<%f)?{WAVE_FUNC}:0.0):0.0)\n + ",
//		start,end,freq*(1<<octave),duty,amp);

	char decay_str[64];
	memset(decay_str,0,sizeof(char) * 64);
	sprintf(decay_str,"max(1.0 - ((time - %f)/%f), 0.0)",step_prog,decay_len);

	char func_str[512];
	memset(func_str,0,sizeof(char) * 512);
	switch(wave_sel)
	{
		default:
		case pulse:
			sprintf(func_str,SQR_FUNC,freq,duty,amp);
			//sprintf(func_str,"%s * step (%f, sin(time * %f * 0.5) ) * %f",decay_str,duty, freq, amp);
			break;
		case saw:
			sprintf(func_str,SAW_FUNC,freq,amp);
			//sprintf(func_str,"%s * ((mod(time * 0.5 * %f * 0.31830989, 1.0) * 2.0) - 1.0) * %f",decay_str,freq,amp);
			break;
		case tri:
			sprintf(func_str,TRI_FUNC,freq,amp);
			//sprintf(func_str,"%s * %f * (((floor(abs(((mod(time * 0.5 * %f * 0.31830989, 1.0) * 2.0) - 1.0) * %f) * 16. )*0.0625)*2.0)-1.0)",decay_str,amp,freq,amp);
			break;
		case sine:
			sprintf(func_str,SIN_FUNC,freq,amp);
			//sprintf(func_str,"%s * sin(time * %f) * %f",decay_str,freq,amp);
			break;
		case noise:
			sprintf(func_str,NOI_FUNC,freq,amp);
			//sprintf(func_str,"%s * ((fract(sin(dot(vec2(time,%f),vec2(12.9898,78.233)))*43758.5453)*2.0)-1.0)*%f",decay_str,freq/4.0,amp);
			break;
	}

	printf("\tresult += ( (time > %f) ? ( (time < %f) ? (%s * (%s)) : 0.0) : 0.0);\n",start,end,decay_str,func_str);
}

void print_head(void)
{
	printf("// ShaderTracker: Ridiculous shader summation sound engine\n");
	printf("// Engine / Function Builder by Michael Moffitt (https://github.com/mikejmoffitt)\n");
	printf("// Sound Generation Functions by Gerard Geer (https://github.com/gerard-geer)\n");
	printf("// Waveform definitions\n\n");

	printf("float saw(float t, float f, float a)\n");
	printf("{\n\treturn ((mod(t*0.5*f*0.31830989, 1.0)*2.0)-1.0)*a;\n}\n\n");

	printf("float sqr(float t, float f, float duty, float a)\n");
	printf("{\n\treturn step(duty, abs(saw(t,f,1.0)))*a;\n}\n\n");

	printf("float tri(float t, float f, float a)\n");
	printf("{\n\treturn (((floor(abs(saw(t,f,a))*16.0)*0.0625)*2.0)-1.0)*a;\n}\n\n");

	printf("float sine(float t, float f, float a)\n");
	printf("{\n\treturn sin(t*f)*a;\n}\n\n");

	printf("float noise(float t, float f, float a)\n");
	printf("{\n\treturn ((fract(sin(dot(vec2(t,f),vec2(12.9898,78.233)))*43758.5453)*2.0)-1.0)*a;\n}\n\n");

	printf("float l_decay(float t, float s, float l)\n");
	printf("{\n\treturn clamp(1.0-((t-s)/l), 0.0, 1.0);\n}\n\n");

	printf("// Shadertoy's sound entry point.\n");
	printf("vec2 mainSound(float time)\n{\n\t");
	printf("float result = 0.0;\n");
	
}

void read_loop(void)
{
	if (!track_file)
	{
		fprintf(stderr,"Error: File is not open, nothing to read!\n");
		return;
	}
	print_head();
	char *line_buffer = (char *)malloc(sizeof(char) * LINE_BUFFER_SIZE + 1);
	memset(line_buffer,0,sizeof(char) * LINE_BUFFER_SIZE + 1);
	while (fgets(line_buffer, LINE_BUFFER_SIZE, track_file))
	{
		handle_line(line_buffer);
	}
	fclose(track_file);
	printf("\treturn vec2(result);\n}\n");
	free (line_buffer);

}
