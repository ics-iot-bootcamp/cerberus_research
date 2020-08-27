#!/bin/sh
rm -rf ./build
npm run-script build -p
cd build
find -name "*.js" -exec ./../jsobfuscator/javascript-obfuscator/bin/javascript-obfuscator {} --output {} \;
find -name "*.map" -exec rm -rf {} \;
rm manifest.json
rm config.json
rm asset-manifest.json
rm precache-manifest.*.js
rm ../build.zip
zip -r ../build.zip ./
cd ..
exit
