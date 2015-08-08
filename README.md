# GimmickShader
A shader that replicates the extra shoreline screen from Stage 2 of Gimmick, complete with sound!

![alt tag](http://csh.rit.edu/~gman/img/gimmickshaderscreen.png)

Why?
----
Gimmick is a game that was 100% heart and 100% brilliant programming by a tiny team at Sunsoft that
is %200 under-appreciated. The environments are as immersive as one can imagine, it did slopes and round
ground and kinetic platforming easily as well as SonicTeam ever did on 8-bit platforms, and had
gameplay unrivaled in precision and potential. Plus the levels were painted with details and secrets
that were in no way necessary for the game to make it out the door, but the team of four DID IT ANYWAY.
This shoreline scene is one of those extra details. It's not even an area the gameplay takes
you through.

Some liberties have been taken. the HUD is gone, and the scene 
is expanded rightward to fill aspect ratios wider than the original game's play area.

System Requirements
-------------------
Since WebGL's GLSL doesn't support arrays *at all*, every sprite and tile is represented by macros that use binary
searching to emulate arrays of power-of-two sizes. The GLSL compiler doesn't really enjoy all the
conditionality this requires, and will crap out on hardware not up to snuff.

Also, it works better on Firefox. It will take a while to compile, but your chances of success are far higher.

