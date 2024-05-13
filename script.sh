# generate temp file
html=$(mktemp)
cp _header.html "$html"

files=()
# get all .md files
while IFS= read -r file; do
    files+=("$file")
done < <(find . -name '*.md' -print)

# sort files by name
IFS=$'\n' files=($(sort -n <<<"${files[*]}"))

dates_files=()
for file in "${files[@]}"; do
    date=$(stat -t '%F' $file | cut -d ' ' -f 12)
    dates_files+=("$date $file")
done

sorted_dates_files=($(printf "%s\n" "${dates_files[@]}" | sort -r -k1,1))

# convert each file to html
for file in "${sorted_dates_files[@]}"; do
    file=$(echo $file | cut -d ' ' -f 2)
    echo "Converting $file"
    echo "<div class='block $extension'>" >> "$html"
    pandoc -f markdown -t html "$file" >> "$html"
    echo "</div>" >> "$html"
done

cat _footer.html >> "$html"
cp "$html" index.html