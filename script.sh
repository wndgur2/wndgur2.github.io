#!/bin/bash

# generate temp file
html=$(mktemp)
cp _header.html "$html"
files=()

# get all .md files
while IFS= read -r file; do
    files+=("$file")
done < <(find . -name '*.md' -print)

dates_files=()
for file in "${files[@]}"; do
    echo $(basename $file)
    date=$(head -1 $file | cut -d ' ' -f 3)
    dates_files+=("$date>$file")
    echo "Detected $date>$file"
done

sorted_dates_files=($(printf "%s\n" "${dates_files[@]}" | sort -r -k1,1))

# convert each file to html
for f in "${sorted_dates_files[@]}"; do
    echo "Converting $f"
    f=$(echo $f | cut -d '>' -f 2)
    echo "<div class='block $extension'>" >> "$html"
    pandoc -f markdown -t html "$f" >> "$html"
    echo "</div>" >> "$html"
done

cat _footer.html >> "$html"
cp "$html" index.html