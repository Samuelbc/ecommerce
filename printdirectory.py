import os

def print_tree(startpath, output_file):
    try:
        with open(output_file, 'w') as f:
            for root, dirs, files in os.walk(startpath):
                # Exclude node_modules and .git directories
                dirs[:] = [d for d in dirs if d not in ['node_modules', '.git']]
                
                level = root.replace(startpath, '').count(os.sep)
                indent = ' ' * 4 * (level)
                f.write('{}{}/\n'.format(indent, os.path.basename(root)))
                
                subindent = ' ' * 4 * (level + 1)
                for d in dirs:
                    f.write('{}{}/\n'.format(subindent, d))
                
                for file in files:
                    f.write('{}{}\n'.format(subindent, file))
        
        print(f"Directory structure written to {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Get the directory where the Python script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Set the path to the directory you want to print (base directory is where the script is located)
startpath = script_dir
output_file = os.path.join(script_dir, 'directory_structure.txt')  # Output file path

print_tree(startpath, output_file)
