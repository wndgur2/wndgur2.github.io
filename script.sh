# generate temp file
html=$(mktemp)
cp _header.html "$html"

# get all .md files
find . -name '*.md' -print | while read file; do
    echo '<div class="md">' >> "$html"
    pandoc "$file" >> "$html"
    echo '</div>' >> "$html"
done

cat _footer.html >> "$html"
cp "$html" index.html