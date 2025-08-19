import os
import json

# Project root (folder where you run this script)
base = os.path.dirname(os.path.abspath(__file__))

# Top-level resource folders
folders = {
    "Sky": os.path.join("Sky"),
    "Buildings": os.path.join(base, "Assets", "Buildings"),
    "Characters": os.path.join(base, "Assets", "Characters"),
    "Vehicles": os.path.join(base, "Assets", "Vehicles"),
    "City Pack": os.path.join(base, "Assets", "City_Pack"),
    "Cube World": os.path.join(base, "Assets", "Cube_World"),
    "Food Pack": os.path.join(base, "Assets", "Food_Pack"),
    "Houses": os.path.join(base, "Assets", "Houses"),
    "Outdoor Decorations": os.path.join(base, "Assets", "Outdoor_Decorations"),
    "Outdoor Decorations": os.path.join(base, "Assets", "Furniture"),
    "Post Apocolypse": os.path.join(base, "Assets", "Post_Apocolypse"),
    "Space_Kit": os.path.join(base, "Assets", "Space_Kit"),
    "Textures": os.path.join("Ground"),
    "Sounds": os.path.join("Sounds"),
    "SFX": os.path.join("SFX"),

}

manifest = {}

def scan_folder(folder_path, rel_path=""):
    """
    Recursively scan folder_path and return a list of dicts with name and file path.
    rel_path keeps the path relative to the project root for JSON.
    """
    items = []
    for entry in os.scandir(folder_path):
        if entry.is_file():
            name, ext = os.path.splitext(entry.name)
            items.append({
                "name": f"{rel_path}{entry.name}",
                "file": f"{rel_path}{entry.name}".replace("\\", "/")  # browser-friendly
            })
        elif entry.is_dir():
            # Recurse into subfolder
            sub_items = scan_folder(entry.path, rel_path=f"{rel_path}{entry.name}/")
            items.extend(sub_items)
    return items

for key, folder in folders.items():
    if os.path.exists(folder):
        manifest[key] = scan_folder(folder, rel_path=os.path.relpath(folder, base).replace("\\", "/") + "/")
    else:
        manifest[key] = []

# Write JSON
with open(os.path.join(base, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print("Manifest generated successfully!")
