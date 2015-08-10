CC := gcc
CFLAGS := -std=c99 -O2 -g -Wall -Iinc

LDFLAGS :=
LIBRARIES :=

SOURCES := $(wildcard src/*.c)
OBJECTS := $(SOURCES:.c=.o)
EXEC_NAME := tracker

.PHONY: all clean

all: $(EXEC_NAME)

clean:
	$(RM) $(OBJECTS) $(EXEC_NAME)

$(EXEC_NAME): $(OBJECTS)
	$(CC) $(LDFLAGS) $(CFLAGS) $(OBJECTS) -o $@ $(LIBRARIES)

.c.o:
	$(CC) -c $(CFLAGS) $(CPPFLAGS) $< -o $@
