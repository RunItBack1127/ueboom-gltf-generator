const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const obj2gltf = require('obj2gltf');

const CONVERSION_CONSTANTS = {
    RGB_MIN_VALUE: 0,
    RGB_MAX_VALUE: 255,
    NUM_RGB_SIG_DIGITS: 7,
    RGB_DELIM: '/'
}

class RegionColor {
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
    if( !req.query.region1 || !req.query.region2 ||
        !req.query.region3 || !req.query.region4 ||
        !req.query.region5 ) {
        
        // Not all parameters defined, or no
        // parameters defined, return BAD
        // STATUS error code
        res.status(400);
        res.send({
            description: "Incomplete set of parameters provided"
        });
    }
    else {
        const region1 = req.query.region1.split(CONVERSION_CONSTANTS.RGB_DELIM);
        const region2 = req.query.region2.split(CONVERSION_CONSTANTS.RGB_DELIM);
        const region3 = req.query.region3.split(CONVERSION_CONSTANTS.RGB_DELIM);
        const region4 = req.query.region4.split(CONVERSION_CONSTANTS.RGB_DELIM);
        const region5 = req.query.region5.split(CONVERSION_CONSTANTS.RGB_DELIM);
        
        // In the event of failure to process input
        // arguments, set BAD STATUS code and return
        // the description message
        if(!errorCheckInputParameters(
            region1,
            region2,
            region3,
            region4,
            region5
        )) {
            res.status(400);
            res.send({
                description: "One of the provided inputs is either not a number, or is not within the valid RGB range ("
                    + CONVERSION_CONSTANTS.RGB_MIN_VALUE + "-" + CONVERSION_CONSTANTS.RGB_MAX_VALUE + ")"
            });
        }
        else {
            const region1Color = new RegionColor(region1[0], region1[1], region1[2]);
            const region2Color = new RegionColor(region2[0], region2[1], region2[2]);
            const region3Color = new RegionColor(region3[0], region3[1], region3[2]);
            const region4Color = new RegionColor(region4[0], region4[1], region4[2]);
            const region5Color = new RegionColor(region5[0], region5[1], region5[2]);

            const mtlTemplate = `
                #
                # Bunkspeed OBJ Material File
                # http://www.bunkspeed.com
                #
                newmtl speaker_mesh
                Kd ${region1Color.red} ${region1Color.green} ${region1Color.blue}
                Ks 0.5 0.5 0.5
                illum 2
                Ns 99.90109
                newmtl burnished_titanium
                Kd 1 0.9607843 0.9294118
                Ks 1 0.9607843 0.9294118
                illum 2
                Ns 6.954887
                newmtl white_low_gloss_plastic
                Kd 1 1 1
                Ks 0.5 0.5 0.5
                illum 2
                Ns 1.801619
                newmtl burnished_brass
                Kd 1 0.8705882 0.5294118
                Ks 1 0.8705882 0.5294118
                illum 2
                Ns 6.954887
                newmtl speaker_cover
                Kd ${region2Color.red} ${region2Color.green} ${region2Color.blue}
                Ks 0.5 0.5 0.5
                illum 2
                Ns 1.614907
                newmtl speaker_power_indicator
                Kd ${region3Color.red} ${region3Color.green} ${region3Color.blue}
                Ks 0.5 0.5 0.5
                illum 2
                newmtl speaker_insignia
                Kd ${region4Color.red} ${region4Color.green} ${region4Color.blue}
                Ks 0.5 0.5 0.5
                illum 2
                Ns 99.90109
                newmtl black_low_gloss_plastic
                Kd 0.1019608 0.1019608 0.1019608
                Ks 0.5 0.5 0.5
                illum 2
                Ns 1.801619
                newmtl speaker_bottom_screw
                Kd ${region5Color.red} ${region5Color.green} ${region5Color.blue}
                Ks 0.5 0.5 0.5
                illum 2
            `;

            fs.writeFileSync(path.join(__dirname, "UE_MEGABOOM.mtl"), mtlTemplate);

            obj2gltf(path.join(__dirname, "UE_MEGABOOM.obj")).then((gltf) => {
                const gltfData = Buffer.from(JSON.stringify(gltf));
                fs.writeFileSync(path.join(__dirname, "UE_MEGABOOM.gltf"), gltfData);

                res.setHeader('Content-Type', 'model/gltf+json');
                res.setHeader('Content-Disposition', 'attachment; filename="UE_MEGABOOM.gltf"');
                res.status(200);
                res.sendFile(path.join(__dirname, "UE_MEGABOOM.gltf"));
            }).catch(error => {
                console.log(error);
            });
        }
    }
});

function errorCheckInputParameters(inputquery) {
    [...inputquery].map((param) => {
        if(typeof param !== "number" ||
            param < CONVERSION_CONSTANTS.RGB_MIN_VALUE,
            param > CONVERSION_CONSTANTS.RGB_MAX_VALUE) {
            
            return false;
        }
    });
    return true;
}

GLTF_SERVER.listen(process.env.PORT || GLTF_SERVER_PORT);