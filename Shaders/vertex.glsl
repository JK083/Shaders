uniform float uTime;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.);
    modelPosition.z += .1 * sin(modelPosition.x * 4.8 + modelPosition.y * 3.4 + uTime) ;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}