#version 400
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_atomic_counters : require
#extension GL_ARB_shader_image_load_store : require
#extension GL_ARB_shader_storage_buffer_object : require


#include "utils.h"


layout (early_fragment_tests) in;
coherent layout (r32ui) uniform uimage2D counterImage;
layout (offset = 0, binding = 0) uniform atomic_uint counter;
coherent layout (std430, binding = 0) buffer oitData {
	OITData data[];
};
uniform uint bufSize;


in vec3 colorFrag;


void main(void)
{
	uint idx = atomicCounterIncrement(counter) + 1;

	if (idx < bufSize) {
		ivec2 coord = ivec2(gl_FragCoord.xy);
		uint prev = imageAtomicExchange(counterImage, coord, idx);
		uvec3 colorTemp = uvec3(colorFrag * 255.0);
		uint alpha = uint(0.5 * 255);
		uint color = (alpha << 24) | (colorTemp.r << 16) | (colorTemp.g << 8) | colorTemp.b;
		data[idx].color = color;
		data[idx].depth = gl_FragCoord.z;
		data[idx].prev = prev;
	}
}
