# example of local configuration
# copy to local.mk


# location of source
TOPDIR:=..


LTO:=n
ASAN:=n
TSAN:=n
UBSAN:=n


USE_GLEW:=y


# compiler options etc
CC:=i686-w64-mingw32-gcc
CXX:=i686-w64-mingw32-g++


CFLAGS:=-gstabs -mwindows
CFLAGS+=-Wall -Wextra -Wshadow -Werror
CFLAGS+=-I.
OPTFLAGS:=-O
OPTFLAGS+=-ffast-math


# lazy assignment because CFLAGS is changed later
CXXFLAGS=$(CFLAGS)
CXXFLAGS+=-std=c++11


LDFLAGS:=-mwindows
LDFLAGS+=-gstabs
LDFLAGS+=-L.
LDFLAGS+=-static-libstdc++ -static-libgcc
LDLIBS:=-lSDL2main -lSDL2 -lopengl32


LTOCFLAGS:=-flto
LTOLDFLAGS:=-flto


OBJSUFFIX:=.o
EXESUFFIX:=.exe
