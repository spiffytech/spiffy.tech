#!/bin/bash

find ./ -type f -name '*.png' -exec sh -c 'cwebp -lossless -resize 0 720 $1 -o "${1%.png}.webp"' _ {} \;
find ./ -type f -name '*.jpg' -exec sh -c 'cwebp -resize 0 720 $1 -o "${1%.jpg}.webp"' _ {} \;
rm *.png *.jpg
