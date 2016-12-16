#!/bin/bash
filename='list.csv'
while read p; do 
    node dataDump.js $p
    find ./exports/companies -type f -name '*.json' | wc -l
    find ./exports/products -type f -name '*.json' | wc -l
    sleep 5 
done < $filename
