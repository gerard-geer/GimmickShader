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
reset        set the track progress counter to zero (start a new channel)
step         set the duration in seconds for each note line
amp	         set the output amplitude (make sure it isn't too high!)
wave         set the wave type to (0 pulse, 1 saw, 2 tri, 3 sine, 4 noise)
duty         set the duty cycle in floating point for the pulse wave

Notes are entered like this:

C 4

Simple - the note, then the octave. A "rest" is a hyphen:

-

This sucks, there is no support for complex time signatures or triplets!
------------------------------------------------------------------------

To say that it supports or doesn't support something is really not fair. This
exists as a stream format more than a composition tool, so with some creativity
this sort of slightly complex behavior can be implemented.

In a given context let's say a quarter note is 0.25 seconds, at 60bpm.
This means a half note is 0.5 seconds. We'd indicate that we'd like to play some
half notes like this:

step 0.5

Then, after playing some notes, it's time for a triplet! What do we do? 
We set the note duration to 0.33333333 seconds, for triplets:

step 0.333333333

Ah, now our note are 1/3 a measure, instead of 1/2. Once we're done with that
we can put it back to half notes:

step 0.5

or even quarter notes:

step 0.25

In this same way, a very crude amplitude envelope can be emulated, though this
is non-ideal even for a stream format. Future expansion may include envelope
definitions.

What future plans are there?
----------------------------

Some features that wouldn't be hard that I'd like:
-Vibrato (amplitude, depth)
-Envelope (depth/speed)
-Duty cycle modulation (speed, hi, lo)
-Looping
