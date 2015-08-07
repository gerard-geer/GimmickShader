ShaderTracker
=============

What is it?
-----------

Shadertracker is a very primitive music tracker that facilitates creating music
as a function of time (t). Given a simple text file with some setup commands,
and a list of notes, a multi-channel composition can be put together.

The output is ready to go to be pasted into ShaderToy. 

How primitive is it?
--------------------

There is no support for re-use of sequences. It is more of a stream format in
text form. The result is a summation of a ton of waves with very selective
time periods where their amplitude isn't pulled down to zero.

How do I use it?
----------------

The commands are as follows:

	Command      Description
	#reset        set the track progress counter to zero (start a new channel)
	#step         set the duration in seconds for each note line
	#amp	      set the output amplitude (make sure it isn't too high!)
	#wave         set the wave type to (0 pulse, 1 saw, 2 tri, 3 sine, 4 noise)
	#duty         set the duty cycle in floating point for the pulse wave
	#decay        set the amplitude decay speed
	#tmod         set the track length for looping, or -1 for no looping

Notes are entered like this:

	C 4 or C4 (the space is not important)

Simple - the note, then the octave. A "rest" is a hyphen:

	-

As of 11:06 PM, ShaderTracker now supports really primitive functions, and as
a result, code-reuse.

You can begin a function definition like follows:

	#func func_name

Don't forget to end it with this:

	#endfunc

There is a special function that you must define:

	#main

It has its own ending:

	#endmain

That will insert the function declaration for ShaderToy's sound entry point. It
also must be closed with the ending command.

You can then call a function like this:

	#call func_name

All functions are functions of parameter t, whichever t is being used in the 
current context (see "what's up with tmod"). Functions aren't "blocking" since
this isn't a real language, and they will simply be summed. 

Functions exist to help organize a song. You can do something like:

	#func bass_line
	...
	#endfunc

then reference your bass line in your main function:

	#main
	#call bass_line
	#endmain

That way, your main is less messy. Do not forget that changing the order of the
functions in main will NOT change the order in which they are played. That is
a function of how you write your functions themselves and their t context!!

Oh my god, the code's a wreck!
------------------------------

This was written during an eight hour marathon with a serious time constraint. 
You get what you pay for (in time!)

This sucks, there is no support for complex time signatures or triplets!
------------------------------------------------------------------------

To say that it supports or doesn't support something is really not fair. This
exists as a stream format more than a composition tool, so with some creativity
this sort of slightly complex behavior can be implemented.

In a given context let's say a quarter note is 0.25 seconds, at 60bpm.
This means a half note is 0.5 seconds. We'd indicate that we'd like to play some
half notes like this:

	#step 0.5

Then, after playing some notes, it's time for a triplet! What do we do? 
We set the note duration to 0.33333333 seconds, for triplets:

	#step 0.333333333

Ah, now our note are 1/3 a measure, instead of 1/2. Once we're done with that
we can put it back to half notes:

	#step 0.5

or even quarter notes:

	#step 0.25

I don't get how I am supposed to do multiple channels
-----------------------------------------------------

The thing is, this tracker is stupid and primitive. So simple, in fact, that a
"channel" is really just resetting the tracker's idea of time and continuing
to feed it notes. To get another "channel" simply do 

	#reset

followed by whatever commands and notes should fill another channel. 

What's up with tmod how do I use that
-------------------------------------

When the track parsing begins, there is one function, t0. This is a free
running timer, representing seconds as a floating point number. By default,
this is used, and your song won't loop.

If you write

	#tmod 5.0

then a new t is introduced, t1. From that point on, all notes entered will
be based off of t1, until you introduce t2, etc. A simple use case could be
that you write your drum track for a tightly looped t1, then put your longer
melody on t2, etc. You could write everything for t0, and just decide to loop
something else on t1 for ambient effect. Hell, you can layer many of them to 
make weird out of phase ambient music - there's no limit to how many times you
can use tmod. 

What future plans are there?
----------------------------

Some features that wouldn't be hard that I'd like:
-Vibrato (amplitude, depth)
-Duty cycle modulation (speed, hi, lo)
