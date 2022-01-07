const cors = require('cors');
const express = require('express');
const fs = require('fs');
const obj2gltf = require('obj2gltf');

const GLTF_SERVER = express();
const GLTF_SERVER_PORT = 2330;

GLTF_SERVER.get('/', (req, res) => {
    
});

GLTF_SERVER.listen(process.env.PORT || GLTF_SERVER_PORT);