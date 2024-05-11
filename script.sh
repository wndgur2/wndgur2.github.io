# generate temp file
html=$(mktemp)
cp _header.html "$html"

files=()
# get all .md files
while IFS= read -r file; do
    files+=("$file")
    echo "Found $file"
    echo "${files[@]}"
done < <(find . -name '*.md' -print)

echo "Files"
echo "${files[@]}"
# sort files by date
IFS=$'\n' files=($(stat -f '%SB %N' "${files[@]}" | sort -n -r | cut -d ' ' -f5-))

echo "Sorted files"
echo "${files[@]}"

# convert each file to html
for file in "${files[@]}"; do
    echo "Converting $file"
    echo "<div class='md'>" >> "$html"
    pandoc -f markdown -t html "$file" >> "$html"
    echo "</div>" >> "$html"
done

cat _footer.html >> "$html"
cp "$html" index.html