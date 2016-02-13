#version 420
#extension GL_ARB_shader_image_load_store : require


layout (early_fragment_tests) in;
layout (r32ui) uniform uimage2D counterImage;


in vec3 colorFrag;


void main(void)
{
	ivec2 coord = ivec2(gl_FragCoord.xy);
	imageAtomicAdd(counterImage, coord, 1u);
}