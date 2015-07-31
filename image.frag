// A 2,4,8,16, or 32 element array implemented as a binary search, #defined for type agnosticity.
#define ARR2(x, a,b) (x<1) ? a : b
#define ARR4(x, a,b,c,d) (x<2) ? ARR2(x,a,b) : ARR2(x-2,c,d)
#define ARR8(x, a,b,c,d, e,f,g,h) (x<4) ? ARR4(x, a,b,c,d) : ARR4(x-4, e,f,g,h)
#define ARR16(x, a,b,c,d, e,f,g,h, i,j,k,l, m,n,o,p) (x<8) ? ARR8(x, a,b,c,d, e,f,g,h) : ARR8(x-8, i,j,k,l, m,n,o,p)
#define ARR32(x_, a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p, q,r,s,t,u,v,w,x,y,z,aa,ab,ac,ad,ae,af) (x_<16) ? ARR16(x_, a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p) : ARR16(x_-16,q,r,s,t,u,v,w,x,y,z,aa,ab,ac,ad,ae,af)

// Constant color vectors so palette functions don't continually have to initialize new stuff.
const vec4 D_BLUE  = vec4(.235, .737, .988, 1.00);
const vec4 L_BLUE  = vec4(.659, .894, .988, 1.00);
const vec4 WHITE   = vec4(.988, .988, .988, 1.00);
const vec4 BLACK   = vec4(.000, .000, .000, 1.00);
const vec4 GRAY    = vec4(.455, .455, .455, 1.00);
const vec4 GRASS   = vec4(.502, .816, .063, 1.00);
const vec4 D_GREEN = vec4(.000, .235, .078, 1.00);
const vec4 L_GREEN = vec4(.298, .863, .282, 1.00);
const vec4 D_GOLD  = vec4(.486, .031, .000, 1.00);
const vec4 L_GOLD  = vec4(.988, .596, .219, 1.00);
const vec4 TRANS   = vec4(.000, .000, .000, .000);
    
// Returns a palette entry given an index.
vec4 yumetarouPalette(int c)
{
    if(c < 4)
    {
        return ARR4(c,  WHITE,  	// The slightly not white white.
                        L_GREEN,	// Light green.
                        D_GREEN,	// Dark green.
                        L_GOLD); 	// Light gold.
    }
    else
    {
        c-=4;
        return ARR2(c, 	D_GOLD, 	// Dark gold.
                		TRANS);  	// Transparency.
    }
}

// Returns a palette index given the position of the pixel within the sprite.
int yumetarouEyesOpen(in int x, in int y)
{
    x = int(mod(float(x),16.0));
    y = int(mod(float(y),19.0));
    if(y<16)
    {
        return ARR16(y,  ARR16(x, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 5, 4, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 5, 4, 3, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 5, 2, 2, 1, 1, 1, 1, 2, 2, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 5, 5),
                         ARR16(x, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 5, 5),
                         ARR16(x, 5, 5, 2, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 2, 5, 5),
                         ARR16(x, 5, 2, 1, 1, 1, 0, 0, 2, 2, 2, 0, 0, 2, 2, 5, 5),
                         ARR16(x, 5, 2, 1, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 5, 5),
                         ARR16(x, 2, 1, 1, 1, 1, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 5),
                         ARR16(x, 2, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 2, 5),
                         ARR16(x, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2),
                         ARR16(x, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2),
                         ARR16(x, 5, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2),
                         ARR16(x, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2));
    } 
    if(y==16) return 	 ARR16(x, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5);
    if(y==17) return 	 ARR16(x, 5, 5, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5);
    if(y==18) return 	 ARR16(x, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0);
   	return 5;
}

// Returns a palette index given the position of the pixel within the sprite.
int yumetarouEyesClosed(in int x, in int y)
{
    x = int(mod(float(x),16.0));
    y = int(mod(float(y),19.0));
    if(y<16){
        return ARR16(y,  ARR16(x, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 5, 4, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 5, 4, 3, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 5, 2, 2, 1, 1, 1, 1, 2, 2, 5, 5, 5, 5),
                         ARR16(x, 5, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 5, 5),
                         ARR16(x, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 5, 5),
						 ARR16(x, 5, 5, 2, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 2, 5, 5),
						 ARR16(x, 5, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5),
						 ARR16(x, 5, 2, 1, 1, 1, 0, 2, 2, 2, 2, 0, 2, 2, 2, 5, 5),
						 ARR16(x, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5),
						 ARR16(x, 2, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 2, 5),
                         ARR16(x, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2),
                         ARR16(x, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2),
                         ARR16(x, 5, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2),
                         ARR16(x, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2));
    } 
    if(y==16) return 	 ARR16(x, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5);
    if(y==17) return 	 ARR16(x, 5, 5, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5);
    if(y==18) return 	 ARR16(x, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0);
   	return 5; // Transparency.
}
 
// Returns a texel of Yumetarou.
vec4 drawYumetarou(int x, int y, int atx, int aty)
{
    if(x < atx || x > atx + 15) return vec4(0.0);
    if(y < aty || y > aty + 18) return vec4(0.0);
    x -= atx;
    y -= aty;
    
    // Yummy yummy frame counting.
    float t = mod(iGlobalTime, 3.67);
    if( t < .066 || (t > .533 && t <.600) )
        return yumetarouPalette(yumetarouEyesClosed(x,y));
    else
        return yumetarouPalette(yumetarouEyesOpen(x,y));
}

vec4 birdPalette(int c)
{
    return ARR4(c,  WHITE,  // The slightly not white white.
                	GRAY,  // Gray
                	BLACK,  // Black
                    TRANS); // Transparency.
}

int birdWingsLevel(in int x, in int y)
{
    
    x = int(mod(float(x),8.0));
    y = int(mod(float(y),5.0));
    if(y<4){
		return ARR4(y,	 ARR8(x, 3, 3, 3, 3, 3, 3, 3, 3),
						 ARR8(x, 3, 0, 0, 0, 1, 0, 0, 3),
						 ARR8(x, 2, 3, 3, 0, 0, 3, 3, 2),
						 ARR8(x, 3, 3, 3, 1, 0, 3, 3, 3));
    }
    if(y==4) return		 ARR8(x, 3, 3, 3, 3, 3, 3, 3, 3);
    else return 3;
}

int birdWingsUp(in int x, in int y)
{
    
    x = int(mod(float(x),8.0));
    y = int(mod(float(y),5.0));
    if(y<4){
		return ARR4(y,	 ARR8(x, 3, 2, 0, 3, 3, 3, 2, 3),
						 ARR8(x, 3, 3, 0, 0, 3, 0, 3, 3),
						 ARR8(x, 3, 3, 1, 0, 1, 0, 3, 3),
						 ARR8(x, 3, 3, 3, 0, 0, 3, 3, 3));
    }
    if(y==4) return		 ARR8(x, 3, 3, 3, 1, 0, 3, 3, 3);
    else return 3;
}

int birdWingsDown(in int x, in int y)
{
    
    x = int(mod(float(x),8.0));
    y = int(mod(float(y),5.0));
    if(y<4){
		return ARR4(y,	 ARR8(x, 3, 3, 3, 0, 1, 3, 3, 3),
						 ARR8(x, 3, 3, 3, 0, 0, 0, 3, 3),
						 ARR8(x, 3, 3, 0, 1, 0, 1, 3, 3),
						 ARR8(x, 3, 3, 0, 3, 3, 3, 0, 3));
    }
    if(y==4) return		 ARR8(x, 3, 3, 2, 3, 3, 3, 2, 3);
    else return 3;
}

vec4 drawBird(int x, int y, int atx, int aty)
{
    if(x < atx || x > atx + 7) return vec4(0.0);
    if(y < aty || y > aty + 4) return vec4(0.0);
    x -= atx;
    y -= aty;
    float t = mod(iGlobalTime, .533);
    if(t < .133)	return birdPalette(birdWingsLevel(x,y));
    if(t < .266)	return birdPalette(birdWingsUp(x,y));
    if(t < .400)	return birdPalette(birdWingsLevel(x,y));
    return birdPalette(birdWingsDown(x,y));
}

vec4 shorePalette(in int x)
{
    return ARR4(x, WHITE,
                   GRASS,
                   GRAY,
                   BLACK);
}

int shoreInterior(in int x, in int y)
{
    x = int(mod(float(x),32.0));
    y = int(mod(float(y),32.0));
    return ARR32(y, 
             3,
			 0,
			 1,
			 1,
			 1,
			 1,
			 1,
			 1,
			 ARR32(x, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
			 ARR32(x, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1),
			 ARR32(x, 1, 1, 1, 1, 1, 2, 2, 3, 2, 1, 2, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 1, 1, 1, 1),
			 ARR32(x, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 2, 2, 3, 2, 2, 2, 2, 2, 1, 1, 1),
			 ARR32(x, 1, 1, 1, 1, 2, 2, 3, 3, 2, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 1, 1),
			 ARR32(x, 1, 1, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1),
			 ARR32(x, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2),
			 ARR32(x, 2, 2, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2),
			 ARR32(x, 2, 2, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3),
			 ARR32(x, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3),
			 ARR32(x, 2, 2, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3),
			 ARR32(x, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 3, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 2),
			 ARR32(x, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 2, 0),
			 ARR32(x, 0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0),
			 ARR32(x, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 0, 0),
			 ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 2, 2, 3, 3, 3, 2, 0, 0),
			 ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 3, 3, 2, 0, 0),
			 ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0),
			 ARR32(x, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0),
			 ARR32(x, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0),
			 ARR32(x, 0, 0, 0, 0, 0, 2, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2),
			 ARR32(x, 2, 0, 0, 0, 2, 2, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2),
			 ARR32(x, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 0, 0, 0, 0, 0, 2, 3, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2),
			 ARR32(x, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 3, 3, 2));
}

int shoreExterior(in int x, in int y)
{
    x = int(mod(float(x),16.0));
    y = int(mod(float(y),32.0));
    return ARR32(y,
            ARR16(x, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2),
            ARR16(x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3),
            ARR16(x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3),
            ARR16(x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3),
            ARR16(x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3),
            ARR16(x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3),
            ARR16(x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3),
            ARR16(x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3),
            ARR16(x, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 3),
            ARR16(x, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2),
            ARR16(x, 1, 1, 1, 1, 1, 2, 2, 3, 2, 2, 2, 2, 3, 3, 3, 2),
            ARR16(x, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 3, 3, 2),
            ARR16(x, 1, 1, 1, 1, 2, 2, 3, 3, 0, 0, 0, 0, 0, 2, 3, 2),
            ARR16(x, 1, 1, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 2, 2, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 2, 2, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 2, 2, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3),
            ARR16(x, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 3, 2),
            ARR16(x, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 3, 3, 2),
            ARR16(x, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2, 2, 2, 0, 0, 3, 2),
            ARR16(x, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 0, 0, 0, 2, 3),
            ARR16(x, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0, 2, 3),
            ARR16(x, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 0, 0, 0, 0, 0, 2, 2, 2, 3, 0, 0, 0, 0, 0, 2, 3),
            ARR16(x, 2, 0, 0, 0, 2, 2, 2, 2, 3, 0, 0, 0, 0, 2, 3, 3),
            ARR16(x, 2, 2, 2, 2, 2, 2, 2, 3, 3, 0, 0, 0, 2, 2, 2, 3),
            ARR16(x, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 0, 0, 2, 3));
}

vec4 drawShore(int x, int y, int atx, int aty)
{
    if(x < atx || x > atx + 79) return vec4(0.0);
    if(y < aty || y > aty + 31) return vec4(0.0);
    x -= atx;
    y -= aty;
    
    if(x < 64) return shorePalette(shoreInterior(x,y));
    return shorePalette(shoreExterior(x,y));
}

vec4 farCloudsPalette(int x)
{
    return ARR2(x, TRANS,
                   L_BLUE);
}

int farClouds(in int x, in int y)
{
    x = int(mod(float(x),32.0));
    y = int(mod(float(y),5.0));
    if(y < 4)
    {
        return ARR4(y, 
        ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0),
        ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0),
        ARR32(x, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0),
        ARR32(x, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0));
    }
    return ARR32(x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
}

vec4 drawFarClouds(in int x, in int y, in int aty)
{
    if(y >= aty && y < aty + 5) return farCloudsPalette(farClouds(x,y-aty));
    if(y >= aty + 5) return L_BLUE;
    return vec4(0.0);
}

vec4 wavesShadowPalette(in int x)
{
    if(x<4)
    {
        return ARR4(x,  D_BLUE,
			   			D_BLUE,
			   			L_BLUE,
			   			L_BLUE);
    }
    else return WHITE;
}

vec4 wavesSunnyPalette(in int x)
{
    if(x<4)
    {
        return ARR4(x, L_BLUE,
					   WHITE,
					   L_BLUE,
					   WHITE);
    }
    else return WHITE;
}

int wavesA( in int x, in int y)
{
    x = int(mod(float(x),32.0));
    y = int(mod(float(y),8.0));
    if(x < 32) // ARR64 would be a really long line.
    {
        return ARR8(y,
       	ARR32(x, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4),
		ARR32(x, 4, 4, 4, 2, 2, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0),
		ARR32(x, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4, 2, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2),
		ARR32(x, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3),
		ARR32(x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3),
		ARR32(x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		2,
        2);
    }
    else
    {
        x -= 32;
        return ARR8(y,
		ARR32(x, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4),
        ARR32(x, 0, 0, 0, 0, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4),
        ARR32(x, 2, 2, 3, 4, 4, 4, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4),
        ARR32(x, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 4, 4, 4, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 2, 0),
        ARR32(x, 3, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 3, 3, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 2, 0, 0, 0, 2),
        ARR32(x, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2),
        2,
        2);
    }
}

int wavesB( in int x, in int y)
{
    x = int(mod(float(x),32.0));
    y = int(mod(float(y),8.0));
    if(x < 32) // ARR64 would be a really long line.
    {
        return ARR8(y,
		ARR32(x, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 2, 0, 0, 0, 0, 0),
        ARR32(x, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 0),
        ARR32(x, 0, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2),
        ARR32(x, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
        ARR32(x, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0),
        ARR32(x, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2),
        2,
        2);
    }
    else
    {
        x -= 32;
        return ARR8(y,
        ARR32(x, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        ARR32(x, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2),
        ARR32(x, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 2, 4, 2, 0, 0, 0, 0),
        ARR32(x, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2),
        ARR32(x, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4),
        ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
        ARR32(x, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2),
        2);
    }
}

int wavesC( in int x, in int y)
{
    x = int(mod(float(x),32.0));
    y = int(mod(float(y),8.0));
    if(x < 32) // ARR64 would be a really long line.
    {
        return ARR8(y,
        ARR32(x, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0),
        ARR32(x, 2, 0, 0, 0, 3, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 2, 2, 2, 4, 2, 2, 0, 0, 4, 4, 4),
        ARR32(x, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 3, 0, 0, 0, 0, 0, 0, 3, 3, 4, 4, 4, 4),
        ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 4, 4, 4, 3, 4, 1),
        ARR32(x, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 4, 4, 1, 0),
        ARR32(x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0),
        ARR32(x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2),
        2);

    }
    else
    {
        x -= 32;
        return ARR8(y,
		ARR32(x, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3, 4, 4, 4, 4, 4),
		ARR32(x, 4, 4, 4, 4, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4),
		ARR32(x, 4, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 2, 0, 0),
		ARR32(x, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 4, 3, 2, 2, 2, 3, 4, 4, 4, 4, 1, 0, 0, 0, 2, 2),
		ARR32(x, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 3, 4, 4, 3, 3, 0, 0, 0, 2, 2, 2, 2, 2, 2),
		ARR32(x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2),
		2,
		2);
    }
}

int wavesD( in int x, in int y)
{
    x = int(mod(float(x),32.0));
    y = int(mod(float(y),8.0));
    if(x < 32) // ARR64 would be a really long line.
    {
        return ARR8(y,
		ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2),
		ARR32(x, 2, 2, 2, 2, 2, 4, 4, 4, 4, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 4, 4, 4, 4),
		ARR32(x, 4, 4, 4, 4, 4, 3, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 0, 0, 0, 0, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4),
		ARR32(x, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 0),
		ARR32(x, 0, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 0, 0, 0, 0, 0),
		ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2),
		ARR32(x, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2),
		2);
    }
    else
    {
        x -= 32;
        return ARR8(y,
		ARR32(x, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0),
		ARR32(x, 4, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2),
		ARR32(x, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3),
		ARR32(x, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3),
		ARR32(x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		ARR32(x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0),
		2,
		2);
    }
}

vec4 drawWaves(in int x, in int y, in int aty)
{
    if(y >= aty && y < aty + 5)
    {
        if(x > 80) return wavesSunnyPalette(wavesA(x,y-aty));
        return wavesShadowPalette(wavesA(x,y-aty));
    }
    return vec4(0.0);
}

// Draws all sprites and tiles.
vec4 drawElements(in int x, in int y)
{
    vec4 farClouds = drawFarClouds(x,y,128);
    vec4 bird = drawBird(x,y,100,66);
    vec4 shore = drawShore(x,y,0,136);
    vec4 yumetarou = drawYumetarou(x,y,52,117);
    vec4 waves = drawWaves(x,y,168);
    
    // Overriting blending using alpha, since every sprite returns a value for every pixe.
    vec4 result = mix(farClouds, bird, bird.a);
    result = mix(result,shore,shore.a);
    result = mix(result,waves,waves.a);
    result = mix(result,yumetarou, yumetarou.a);
    return result;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalize coordinates.
    fragCoord = (fragCoord.xy / iResolution.xy);
    // Invert the Y axis.
    fragCoord.y = 1.0-fragCoord.y;
    // Convert to NES screen resolution. The Y is stunted because we are not doing the HUD.
    fragCoord *= vec2(256,184);
    
    // Default the outgoing fragColor to the background color.
    fragColor = D_BLUE;
    
    // Determine and store the texel of the scene elements this pixel occupies.
    vec4 imageElements = drawElements(int(fragCoord.x), int(fragCoord.y));
    
	// Mix this texel with the background.
	fragColor = mix(fragColor, imageElements, imageElements.a);
}
