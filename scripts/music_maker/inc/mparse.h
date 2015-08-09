#ifndef MPARSE_H
#define MPARSE_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NOTE_C 102.740133
#define NOTE_CS 108.849273943
#define NOTE_D 115.321897287
#define NOTE_DS 122.179365731
#define NOTE_E 129.444298743
#define NOTE_F 137.141514904
#define NOTE_FS 145.296461114
#define NOTE_G 153.93615507
#define NOTE_GS 163.089813585
#define NOTE_A 172.787595947
#define NOTE_AS 183.062174721
#define NOTE_B 193.947479106

// Sound generation function strings


extern const char saw_func[];
extern const char tri_func[];
extern const char sin_func[];
extern const char sqr_func[];
extern const char noi_func[];
extern const char decay_func[];

extern FILE *track_file;

// Track progress state vars
extern float amp;
extern float duty;
extern float step_size;
extern float decay_len;
extern float note_len;
extern float step_prog;
extern float tmod;
extern float overclock;
extern float left_a;
extern float right_a;
extern float tune;

int parse_init(const char *fname);
char *get_arg_to(const char *comp, char *line);
void handle_line(char *line);
void print_line(float freq, int octave);
void print_head(void);
void read_loop(void);
typedef enum
{
	pulse = 0,
	saw = 1,
	tri = 2,
	sine = 3,
	noise = 4
} wavetype;

extern wavetype wave_sel;
#endif
