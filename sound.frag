// These frequencies are multiplied by PI since we're working with math builtins.
// They're also all in octave 1.
# define C 102.740133
# define Db 108.849273943
# define D 115.321897287
# define Eb 122.179365731
# define E 129.444298743
# define F 137.141514903
# define Gb 145.296461114
# define G 153.93615507
# define Ab 163.089813585
# define A 172.787595947
# define Bb 183.062174721
# define B 193.947479106

# define playNote(t, f, d, a, instr, start, end) ((t>start) ? ( (t<end) ? instr(t,f,d,a) : 0.0 ) : 0.0)

/*
	A saw wave that wasn't used on the NES as far as our recreation of
	Gimmick is concerned, but is used to create the triangle wave.
*/
float saw(float t, float f, float unusedButNeedFour, float a)
{
    return ((mod(t*0.5*f*.31830989, 1.0)*2.0)-1.0)*a;
}

/*
	An approximation of a squarewave instrument.
*/
float sqr(float t, float f, float duty, float a)
{
    return step( duty, abs( saw(t,f,.0,a) ) )*a;
}

/*
	The classic NES/Famicom triangle wave. This even emulates the
	4-bit aliasing the system produced.
*/
float tri(float t, float f, float unusedButNeedFour, float a)
{
    return (((floor( abs(saw(t,f,0.,a))*16. )*.0625)*2.0)-1.0)*a;
}

/*
	Just a sine wave. Nothing to see here.
*/
float sine(float t, float f, float unusedButNeedFour, float a)
{
    return sin(t*f)*a; 
}

/*
	Produces a coefficient representing linear decay starting
	at a time s and ending l seconds later.
*/
float l_decay(float t, float s, float l)
{
    return clamp(1.0-((t-s)/l), 0.0, 1.0);
}

/*
	This really is just the random() function you see littered across
	the landscape. But it works for what we need it to do.
*/
float noise(float t, float f, float unusedButNeedFour, float a)
{
    // Not the NES noise algorithm, but one that's 'ehh, umm' similar in output.
    return ((fract(sin(dot(vec2(t,f),vec2(12.9898,78.233)))*43758.5453)*2.)-1.)*a;
}

/*
	A song function.
*/
float basicSong(float t)
{
    // Not the intro to White Room by Cream.
    return 	playNote(t, 1551.579834, 0.250000, 0.300000, tri, 0.800000, 1.000000) + 
	playNote(t, 1643.842163, 0.250000, 0.300000, tri, 1.000000, 1.200000) + 
	playNote(t, 2071.108887, 0.250000, 0.300000, tri, 1.200000, 1.400000) + 
	playNote(t, 2462.978516, 0.250000, 0.300000, tri, 1.400000, 1.600000) + 
	playNote(t, 3103.159668, 0.250000, 0.300000, sqr, 1.600000, 1.800000) + 
	playNote(t, 3103.159668, 0.250000, 0.300000, sqr, 1.800000, 2.000000) + 
	playNote(t, 3103.159668, 0.250000, 0.300000, sqr, 2.000000, 2.200000) + 
	playNote(t, 3103.159668, 0.250000, 0.300000, sqr, 2.200000, 2.400000) + 
	playNote(t, 3287.684326, 0.250000, 0.300000, sqr, 3.000000, 3.200001) + 
	playNote(t, 1643.842163, 0.250000, 0.300000, sqr, 3.200001, 3.400001) + 
	playNote(t, 2462.978516, 0.250000, 0.300000, sqr, 3.600001, 3.800001) + 
	playNote(t, 2071.108887, 0.250000, 0.300000, sqr, 3.800001, 4.000000) + 
	playNote(t, 1643.842163, 0.250000, 0.500000, sqr, 4.000000, 4.200000) + 
	playNote(t, 1551.579834, 0.250000, 0.500000, sqr, 4.400000, 4.600000) + 
	playNote(t, 1643.842163, 0.250000, 0.500000, sqr, 4.600000, 4.800000) + 
	playNote(t, 2071.108887, 0.250000, 0.500000, sqr, 4.800000, 5.000000) + 
	playNote(t, 2462.978516, 0.250000, 0.550000, sqr, 5.000000, 5.199999) + 
	playNote(t, 3103.159668, 0.250000, 0.500000, sqr, 5.199999, 5.399999) + 
	playNote(t, 3287.684326, 0.250000, 0.550000, sqr, 5.399999, 5.599999) + 
	playNote(t, 3103.159668, 0.250000, 0.500000, sqr, 5.599999, 5.799999) + 
	playNote(t, 3103.159668, 0.250000, 0.500000, sqr, 5.799999, 5.999999) + 
	playNote(t, 3103.159668, 0.250000, 0.500000, sqr, 6.199998, 6.399998) + 
	playNote(t, 3103.159668, 0.250000, 0.300000, tri, 6.399998, 6.599998) + 
	playNote(t, 3103.159668, 0.250000, 0.300000, tri, 6.599998, 6.799998) + 
	playNote(t, 3103.159668, 0.250000, 0.300000, tri, 6.799998, 6.999998);
0;
}

/*
	The Shadertoy sound entrypoint.
*/
vec2 mainSound(float t)
{
    return vec2( basicSong(t) );
}
