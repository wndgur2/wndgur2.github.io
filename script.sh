# generate temp file
html=$(mktemp)
cp _header.html "$html"

files=()
# get all .md files
while IFS= read -r file; do
    files+=("$file")
done < <(find . -name '*.md' -print)

# convert each file to html
for file in "${files[@]}"; do
    echo "Converting $file"
    echo "<div class='md $extension'>" >> "$html"
    pandoc -f markdown -t html "$file" >> "$html"
    echo "</div>" >> "$html"
done

cat _footer.html >> "$html"
cp "$html" index.html