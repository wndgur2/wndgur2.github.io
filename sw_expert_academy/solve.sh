if [ "$#" -ne 1 ]; then
    echo "사용법: $0 <problem_name>"
    exit 1
fi

# Get the compressed file name from the user input
problem_name="$1"

# Create the zip file excluding the __MACOSX folder
mkdir -p "$problem_name"
cp "./_solve.py" "$problem_name/$problem_name.py"
cd "$problem_name"
touch "input.txt"

# Display a message indicating the compression is complete
echo "Generation complete!"