# generate temp file
html=$(mktemp)
cp _header.html "$html"

# get all .md files
# TODO: 각 파일 모듈화
find . -name '*.md' -print | while read file; do
    # get file value
    echo '<div class="md">' >> "$html"
    pandoc "$file" >> "$html"
    echo '</div>' >> "$html"
done

cat _footer.html >> "$html"
cp "$html" index.html