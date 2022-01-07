# UE MEGABOOM GLTF Generator
Customization backend used for creating custom colored speaker models for the Bumbox Create-A-Speaker website, written in Node.js.

Capable of customizing five (5) regions of the original OBJ file, through manipulating the diffuse colors of the associated materials within the MTL file, and leveraging the [obj2gltf](https://github.com/CesiumGS/obj2gltf) NPM library to compress the model to one file, which is retrieved from the server.

## How To Use
The API is hosted on Heroku, and can be accessed with the following parameters:
| Parameter Name     | Value | Description |
| -------- | ------------------ | ------------------- |
| region1       | [RED]/[GREEN]/[BLUE]   | Customizes speaker mesh     |
| region2       | [RED]/[GREEN]/[BLUE]    | Customizes speaker cover      |
| region3       | [RED]/[GREEN]/[BLUE]         | Customizes speaker power indicator       |
| region4       | [RED]/[GREEN]/[BLUE]     | Customizes speaker insignia     |
| region5       | [RED]/[GREEN]/[BLUE]    | Customizes speaker bottom screw    |
* Each RED, GREEN, BLUE value is an integer between 0 and 255

**Example**
```
ueboom-gltf-generator.herokuapp.com/?region1=255%2F255%2F255&region2=255%2F255%2F255&region3=255%2F255%2F255&region4=255%2F255%2F&region5=255%2F255%2F255
```
*`%2F` corresponds to the `/` delimiter used in passing each URL parameter

## Citations
* [Ultimate Ears BLAST Bluetooth speaker](https://grabcad.com/library/ultimate-ears-blast-bluetooth-speaker-1) by user [luuk](https://grabcad.com/luuk--4), GrabCAD Community - OBJ and MTL source files generated from BLAST .STL file courtesy of SOLIDWORKS Visualize 2018
* [obj2gltf](https://github.com/CesiumGS/obj2gltf) by [CesiumGS](https://github.com/CesiumGS)
