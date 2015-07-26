// A 2,4,8 or 16 element array implemented as a binary search, #defined for type agnosticity.
#define ARR2(x, a,b) (x<1) ? a : b
#define ARR4(x, a,b,c,d) (x<2) ? ARR2(x,a,b) : ARR2(x-2,c,d)
#define ARR8(x, a,b,c,d, e,f,g,h) (x<4) ? ARR4(x, a,b,c,d) : ARR4(x-4, e,f,g,h)
#define ARR16(x, a,b,c,d, e,f,g,h, i,j,k,l, m,n,o,p) (x<8) ? ARR8(x, a,b,c,d, e,f,g,h) : ARR8(x-8, i,j,k,l, m,n,o,p)

// A simple conversion macro that  converts 255 range values to normal. These will be done ahead of time eventually.
#define RGBA(r, g, b, a) vec4(r*.003922,g*.003922,b*.003922,a*.003922)

// Returns a palette entry given an index.
vec4 yumetarouPalette(int c)
{
    return ARR8(c,  RGBA(252.0, 252.0, 252.0, 255.0),  // The slightly not white white.
                	RGBA(76.00, 220.0, 72.00, 255.0),  // Light green.
                	RGBA(0.000, 60.00, 20.00, 255.0),  // Dark green.
                    RGBA(252.0, 152.0, 56.00, 255.0),  // Light gold.
                	RGBA(124.0, 8.000, 0.000, 255.0),  // Dark gold.
                	vec4(0.000, 0.000, 0.000, 0.000),  // Transparency.
                	vec4(0.000, 0.000, 0.000, 0.000),  // Transparency.
                	vec4(0.000, 0.000, 0.000, 0.000)); // Transparency.
}

// Returns a palette index given the position of the pixel within the sprite.
int yumetarouEyesOpen(in int x, in int y)
{
    x = int(mod(float(x),16.0));
    y = int(mod(float(y),19.0));
    if(y<16)
    {
        return ARR16(y,  ARR16(x, 5 ,5 ,5 ,5 ,4 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,5 ,4 ,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,5 ,4 ,3 ,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,5 ,2 ,2 ,2 ,2 ,2 ,2 ,5 ,5 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,5 ,2 ,2 ,1 ,1 ,1 ,1 ,2 ,2 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,2 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,2 ,5 ,5),
                         ARR16(x, 5 ,2 ,1 ,1 ,1 ,0 ,0 ,2 ,2 ,2 ,0 ,0 ,2 ,2 ,5 ,5),
                         ARR16(x, 5 ,2 ,1 ,1 ,1 ,0 ,0 ,0 ,2 ,2 ,0 ,0 ,0 ,2 ,5 ,5),
                         ARR16(x, 2 ,1 ,1 ,1 ,1 ,0 ,0 ,2 ,2 ,2 ,0 ,0 ,2 ,2 ,2 ,5),
                         ARR16(x, 2 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,1 ,2 ,5),
                         ARR16(x, 2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2),
                         ARR16(x, 2 ,1 ,1 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2),
                         ARR16(x, 5 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,1 ,1 ,1 ,2),
                         ARR16(x, 5 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2));
    } 
    if(y==16) return 	 ARR16(x, 5 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,5);
    if(y==17) return 	 ARR16(x, 5 ,5 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,5);
    if(y==18) return 	 ARR16(x, 1 ,0 ,0 ,0 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,0 ,0 ,0);
   	return 5;
}

// Returns a palette index given the position of the pixel within the sprite.
int yumetarouEyesClosed(in int x, in int y)
{
    x = int(mod(float(x),16.0));
    y = int(mod(float(y),19.0));
    if(y<16){
        return ARR16(y,  ARR16(x, 5 ,5 ,5 ,5 ,4 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,5 ,4 ,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,5 ,4 ,3 ,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,5 ,2 ,2 ,2 ,2 ,2 ,2 ,5 ,5 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,5 ,2 ,2 ,1 ,1 ,1 ,1 ,2 ,2 ,5 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,5 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,5 ,5 ,5),
                         ARR16(x, 5 ,5 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,5 ,5 ,5),
						 ARR16(x, 5 ,5 ,2 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,2 ,5 ,5),
						 ARR16(x, 5 ,2 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,5),
						 ARR16(x, 5 ,2 ,1 ,1 ,1 ,0 ,2 ,2 ,2 ,2 ,0 ,2 ,2 ,2 ,5 ,5),
						 ARR16(x, 2 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,5),
						 ARR16(x, 2 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,1 ,2 ,5),
                         ARR16(x, 2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2),
                         ARR16(x, 2 ,1 ,1 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2),
                         ARR16(x, 5 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,1 ,1 ,1 ,2),
                         ARR16(x, 5 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2));
    } 
    if(y==16) return 	 ARR16(x, 5 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,5);
    if(y==17) return 	 ARR16(x, 5 ,5 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,5);
    if(y==18) return 	 ARR16(x, 1 ,0 ,0 ,0 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,0 ,0 ,0);
   	return 5;
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

// Draws all sprites and tiles.
vec4 drawElements(in int x, in int y)
{
    return drawYumetarou(x, y, 15, 15);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalize coordinates.
    fragCoord = (fragCoord.xy / iResolution.xy);
    // Invert the Y axis.
    fragCoord.y = 1.0-fragCoord.y;
    // Convert to NES screen resolution.
    fragCoord *= vec2(256,240);
    
    // Default the outgoing fragColor to the background color.
    fragColor = RGBA(60.00, 188.0, 252.0, 255.0);
    
    // Determine and store the texel of the scene elements this pixel occupies.
    vec4 imageElements = drawElements(int(fragCoord.x), int(fragCoord.y));
    
	// Mix this texel with the background.
	fragColor = mix(fragColor, imageElements, imageElements.a);
}
