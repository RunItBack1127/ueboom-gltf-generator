const cors = require('cors');
const express = require('express');
const fs = require('fs');
const obj2gltf = require('obj2gltf');

const CONVERSION_CONSTANTS = {
    RGB_MIN_VALUE: 0,
    RGB_MAX_VALUE: 255,
    NUM_RGB_SIG_DIGITS: 7,
    RGB_DELIM: '/'
}

class RegionColors {
    constructor(red, green, blue) {
        this.red = ( red / CONVERSION_CONSTANTS.RGB_MAX_VALUE ).toFixed( CONVERSION_CONSTANTS.NUM_RGB_SIG_DIGITS );
        this.green = ( green / CONVERSION_CONSTANTS.RGB_MAX_VALUE ).toFixed( CONVERSION_CONSTANTS.NUM_RGB_SIG_DIGITS );
        this.blue = ( blue / CONVERSION_CONSTANTS.RGB_MAX_VALUE ).toFixed( CONVERSION_CONSTANTS.NUM_RGB_SIG_DIGITS );
    }
};

const GLTF_SERVER = express();
const GLTF_SERVER_PORT = 2330;

GLTF_SERVER.use(cors());

GLTF_SERVER.get('/', (req, res) => {
    if( !req.params.region1 || !req.params.region2 ||
        !req.params.region3 || !req.params.region4 ||
        !req.params.region5 ) {
        
        // Not all parameters defined, or no
        // parameters defined, return BAD
        // STATUS error code
        res.status(400);
        res.send({
            description: "Incomplete set of parameters provided"
        });
    }
    
    const [isSuccess, retMsg] = errorCheckInputParameters(
        req.params.region1,
        req.params.region2,
        req.params.region3,
        req.params.region4,
        req.params.region5
    );
    if( !isSuccess ) {

    }
});

GLTF_SERVER.listen(GLTF_SERVER_PORT);