# if [ "$#" -ne 1 ]; then
#     echo "사용법: $0 <commit_message>"
#     exit 1
# fi

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


# commit_message="$1"

# git add .
# git commit -m "$commit_message"
# git push origin main
# echo "Push complete!"
