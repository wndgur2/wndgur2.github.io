# generate temp file
html=$(mktemp)
cp _header.html "$html"

# get all .md files
find . -name '*.md' -print | while read file; do
    # get file value
    pandoc "$file" >> "$html"
done

cat _footer.html >> "$html"
cp "$html" index.html