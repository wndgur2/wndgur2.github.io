if [ "$#" -ne 1 ]; then
    echo "사용법: $0 <problem_name>"
    exit 1
fi

# Get file name from the user input
problem_name="$1"

current_time=$(date +"%Y-%m-%d %H:%M:%S")

# Create a temporary file
code_setup=$(mktemp)
echo "\"\"\"\n" > "$code_setup"
echo "\t$problem_name created at $current_time" >> "$code_setup"
echo "\n\"\"\"\n" >> "$code_setup"
cat "_solve" >> "$code_setup"

readme_setup=$(mktemp)
echo "## $problem_name $current_time" > "$readme_setup"
cat "_README" >> "$readme_setup"

if [ ! -f "$problem_name/$problem_name.py" ]; then
    mkdir "$problem_name"
    cp "$code_setup" "$problem_name/$problem_name.py"
else
    echo "$problem_name/$problem_name.py already exists."
fi
cp "$readme_setup" "$problem_name/README.md"
cd "$problem_name"
touch "input.txt"
echo "Generation complete!"