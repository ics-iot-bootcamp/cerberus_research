#!/bin/sh
npm install --no-optional
mkdir jsobfuscator
cd jsobfuscator
git clone https://github.com/javascript-obfuscator/javascript-obfuscator.git
cd javascript-obfuscator
npm install --no-optional
exit