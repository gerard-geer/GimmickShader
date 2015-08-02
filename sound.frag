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

float pulse(float t, float f, float duty, float a)
{
    return step( duty, sin(t*f*0.5) )*a;
}

float saw(float t, float f, float unusedButNeedFour, float a)
{
    return ((mod(t*0.5*f*.31830989, 1.0)*2.0)-1.0)*a;
}

float tri(float t, float f, float unusedButNeedFour, float a)
{
    return (((floor( abs(saw(t,f,0.,a))*16. )*.0625)*2.0)-1.0)*a;
}

float sine(float t, float f, float unusedButNeedFour, float a)
{
    return sin(t*f)*a; 
}

float l_decay(float t, float l)
{
    return max(1.0-(t/l), 0.0);
}

float noise(float t, float f, float unusedButNeedFour, float a)
{
    // The ol' regurgitated noise function.
    return ((fract(sin(dot(vec2(t,f),vec2(12.9898,78.233)))*43758.5453)*2.)-1.)*a;
}

float basicSong(float t)
{
    // The intro to White Room by Cream.
    return playNote(t, G*16.,  .25, .15, pulse, 0.1, 3.0) // Chord
		 + playNote(t, Bb*16., .5, .15,  pulse, 0.1, 3.0)
         + playNote(t, D*32.,  .75, .15, pulse, 0.1, 3.0)
        
         + playNote(t, G*4.,   .50, .5, tri, 0.1, 3.0) // Bass
        
         + playNote(t, A*64.0, .65, .5, noise, 0.1, 0.3) // Drumline.
         + playNote(t, A*64.0, .25, .5, noise, 0.8, 0.9)
         + playNote(t, A*64.0, .25, .5, noise, 1.0, 1.1)
         + playNote(t, A*64.0, .25, .5, noise, 1.2, 1.3)
         + playNote(t, A*64.0, .25, .5, noise, 1.4, 1.5)
         + playNote(t, A*64.0, .25, .5, noise, 2.0, 2.2)
         + playNote(t, A*64.0, .25, .5, noise, 2.6, 2.8)
        
         + playNote(t, F*16.,  .25, .15, pulse, 3.1, 6.0)
		 + playNote(t, A*16.,  .5, .15,  pulse, 3.1, 6.0)
         + playNote(t, C*32.,  .75, .15, pulse, 3.1, 6.0)
        
         + playNote(t, F*4.,  .25, .5, tri, 3.1, 6.0)  
        
         + playNote(t, A*64.0, .25, .5, noise, 3.1, 3.3)
         + playNote(t, A*64.0, .25, .5, noise, 3.8, 3.9)
         + playNote(t, A*64.0, .25, .5, noise, 4.0, 4.1)
         + playNote(t, A*64.0, .25, .5, noise, 4.2, 4.3)
         + playNote(t, A*64.0, .25, .5, noise, 4.4, 4.5)
         + playNote(t, A*64.0, .25, .5, noise, 5.0, 5.2)
         + playNote(t, A*64.0, .25, .5, noise, 5.6, 5.8)
        
         + playNote(t, A*16.,  .25, .15, sine, 6.1, 9.0)
		 + playNote(t, F*16.,  .25, .15, sine, 6.1, 9.0)
         + playNote(t, D*16.,  .25, .15, sine, 6.1, 9.0)
        
         + playNote(t, A*8.,  .25, .5, tri, 6.1, 9.0)  
        
         + playNote(t, A*64.0, .25, .5, noise, 6.1, 6.3)
         + playNote(t, A*64.0, .25, .5, noise, 6.8, 6.9)
         + playNote(t, A*64.0, .25, .5, noise, 7.0, 7.1)
         + playNote(t, A*64.0, .25, .5, noise, 7.2, 7.3)
         + playNote(t, A*64.0, .25, .5, noise, 7.4, 7.5)
         + playNote(t, A*64.0, .25, .5, noise, 8.0, 8.2)
         + playNote(t, A*64.0, .25, .5, noise, 8.6, 8.8)
        
         + playNote(t, C*16.,  .25, .15, sine, 9.1, 12.0)
		 + playNote(t, E*16.,  .25, .15, sine, 9.1, 12.0)
         + playNote(t, G*16.,  .25, .15, sine, 9.1, 12.0)
        
         + playNote(t, C*8.,  .25, .5, tri, 9.1, 12.0)  
        
         + playNote(t, A*64.0, .25, .5, noise, 9.1,   9.3)
         + playNote(t, A*64.0, .25, .5, noise, 9.8,   9.9)
         + playNote(t, A*64.0, .25, .5, noise, 10.0, 10.1)
         + playNote(t, A*64.0, .25, .5, noise, 10.2, 10.3)
         + playNote(t, A*64.0, .25, .5, noise, 10.4, 10.5)
         + playNote(t, A*64.0, .25, .5, noise, 11.0, 11.2)
         + playNote(t, A*64.0, .25, .5, noise, 11.6, 11.8)
         
         + playNote(t, G*16.,  .25, .15, sine, 12.1, 15.0)
		 + playNote(t, Bb*16., .25, .15, sine, 12.1, 15.0)
         + playNote(t, D*32.,  .25, .15, sine, 12.1, 15.0)
         
         + playNote(t, G*8.,  .25, .5, tri, 12.1, 15.0)  
        
         + playNote(t, A*64.0, .25, .5, noise, 12.1, 12.3)
         + playNote(t, A*64.0, .25, .5, noise, 12.8, 12.9)
         + playNote(t, A*64.0, .25, .5, noise, 13.0, 13.1)
         + playNote(t, A*64.0, .25, .5, noise, 13.2, 13.3)
         + playNote(t, A*64.0, .25, .5, noise, 13.4, 13.5)
         + playNote(t, A*64.0, .25, .5, noise, 14.0, 14.2)
         + playNote(t, A*64.0, .25, .5, noise, 14.6, 14.8)
        
         + playNote(t, F*16.,  .25, .15, sine, 15.1, 18.0)
		 + playNote(t, A*16.,  .25, .15, sine, 15.1, 18.0)
         + playNote(t, C*32.,  .25, .15, sine, 15.1, 18.0)
        
         + playNote(t, F*8.,  .25, .5, tri, 15.1, 18.0)  
        
         + playNote(t, A*64.0, .25, .5, noise, 15.1, 15.3)
         + playNote(t, A*64.0, .25, .5, noise, 15.8, 15.9)
         + playNote(t, A*64.0, .25, .5, noise, 16.0, 16.1)
         + playNote(t, A*64.0, .25, .5, noise, 16.2, 16.3)
         + playNote(t, A*64.0, .25, .5, noise, 16.4, 16.5)
         + playNote(t, A*64.0, .25, .5, noise, 17.0, 17.2)
         + playNote(t, A*64.0, .25, .5, noise, 17.6, 17.8)
        
         + playNote(t, A*16.,  .25, .15, sine, 18.1, 21.0)
		 + playNote(t, F*16.,  .25, .15, sine, 18.1, 21.0)
         + playNote(t, D*16.,  .25, .15, sine, 18.1, 21.0)
        
         + playNote(t, A*8.,  .25, .15, tri, 18.1, 21.0)  
        
         + playNote(t, A*64.0, .25, .5, noise, 18.1, 18.3)
         + playNote(t, A*64.0, .25, .5, noise, 18.8, 18.9)
         + playNote(t, A*64.0, .25, .5, noise, 19.0, 19.1)
         + playNote(t, A*64.0, .25, .5, noise, 19.2, 19.3)
         + playNote(t, A*64.0, .25, .5, noise, 19.4, 19.5)
         + playNote(t, A*64.0, .25, .5, noise, 20.0, 20.2)
         + playNote(t, A*64.0, .25, .5, noise, 20.6, 20.8)
        
         + playNote(t, C*16.,  .25, .15, sine, 21.1, 24.0)
		 + playNote(t, E*16.,  .25, .15, sine, 21.1, 24.0)
         + playNote(t, G*16.,  .25, .15, sine, 21.1, 24.0)
        
         + playNote(t, C*8.,  .25, .5, tri, 21.1, 24.0)  
        
         + playNote(t, A*32.0, .25, .5, noise, 21.1, 21.3)
         + playNote(t, A*32.0, .25, .5, noise, 21.8, 21.9)
         + playNote(t, A*32.0, .25, .5, noise, 22.0, 22.1)
         + playNote(t, A*32.0, .25, .5, noise, 22.2, 22.3)
         + playNote(t, A*32.0, .25, .5, noise, 22.4, 22.5)
         + playNote(t, A*32.0, .25, .5, noise, 23.0, 23.2)
         + playNote(t, A*32.0, .25, .5, noise, 23.6, 23.8)
        
         + playNote(t, A*8.,   .25, .15, sine, 24.1, 27.0)
		 + playNote(t, E*16.,  .25, .15, sine, 24.1, 27.0)
         + playNote(t, G*16.,  .25, .15, sine, 24.1, 27.0)
        
         + playNote(t, A*8.,   .25, .5, tri, 24.1, 27.0)  
        
         + playNote(t, A*128.0, .25, .5, noise, 24.1, 24.3)
         + playNote(t, A*128.0, .25, .5, noise, 24.8, 24.9)
         + playNote(t, A*128.0, .25, .5, noise, 25.0, 25.1)
         + playNote(t, A*128.0, .25, .5, noise, 25.2, 25.3)
         + playNote(t, A*128.0, .25, .5, noise, 25.4, 25.5)
         + playNote(t, A*128.0, .25, .5, noise, 26.0, 26.2)
         + playNote(t, A*128.0, .25, .5, noise, 26.6, 26.8);
}

vec2 mainSound(float t)
{
    return vec2( basicSong(t) );
}
