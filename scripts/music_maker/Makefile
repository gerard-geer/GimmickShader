CC := cc
CFLAGS := -O2 -Wall

LDFLAGS :=
LIBRARIES :=

SOURCES := $(wildcard *.c)
OBJECTS := $(SOURCES:.c=.o)
EXEC_NAME := mconv

.PHONY: all clean

all: $(EXEC_NAME)

clean:
	$(RM) $(OBJECTS) $(EXEC_NAME)

$(EXEC_NAME): $(OBJECTS)
	$(CC) $(LDFLAGS) $(CFLAGS) $(OBJECTS) -o $@ $(LIBRARIES)

.c.o:
	$(CC) -c $(CFLAGS) $(CPPFLAGS) $< -o $@
