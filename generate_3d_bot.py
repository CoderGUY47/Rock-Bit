import numpy as np
# pyrefly: ignore [missing-import]
from PIL import Image
# pyrefly: ignore [missing-import]
import trimesh
import os
import sys

def image_to_3d_glb(image_path, output_path, scale_z=0.45, resolution=160):
    if not os.path.exists(image_path):
        print(f"Error: {image_path} not found.")
        sys.exit(1)

    print(f"Loading image from {image_path}...")
    img = Image.open(image_path).convert('RGBA')

    # Downscale image to control polygon count and performance
    img.thumbnail((resolution, resolution))
    w, h = img.size

    print(f"Generating displacement mesh grid ({w}x{h} vertices)...")
    # Create vertex coordinate grid (-1 to 1)
    x = np.linspace(-1.2, 1.2, w)
    y = np.linspace(-1.2, 1.2, h)
    xx, yy = np.meshgrid(x, y)

    # Read pixel arrays for height calculation
    pixels = np.array(img)
    r = pixels[:, :, 0] / 255.0
    g = pixels[:, :, 1] / 255.0
    b = pixels[:, :, 2] / 255.0
    a = pixels[:, :, 3] / 255.0

    # Calculate relative luminance / brightness
    brightness = 0.299 * r + 0.587 * g + 0.114 * b

    # Displace Z (depth) proportional to brightness and alpha (transparent edges stay at 0)
    zz = brightness * a * scale_z

    vertices = []
    uvs = []
    for i in range(h):
        for j in range(w):
            vertices.append([xx[i, j], -yy[i, j], zz[i, j]])
            uvs.append([j / (w - 1), 1.0 - (i / (h - 1))])

    vertices = np.array(vertices)
    uvs = np.array(uvs)

    # Generate triangle index faces
    faces = []
    for i in range(h - 1):
        for j in range(w - 1):
            v0 = i * w + j
            v1 = v0 + 1
            v2 = (i + 1) * w + j
            v3 = v2 + 1

            # Triangle 1
            faces.append([v0, v2, v1])
            # Triangle 2
            faces.append([v1, v2, v3])

    faces = np.array(faces)

    print("Creating Trimesh object with texture visuals...")
    # Package into a textured mesh with correct UV mapping
    mesh = trimesh.Trimesh(
        vertices=vertices,
        faces=faces,
        visual=trimesh.visual.TextureVisuals(uv=uvs, image=img)
    )

    print(f"Saving 3D GLB model to {output_path}...")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    mesh.export(output_path)
    print("Success! 3D model generated.")

if __name__ == '__main__':
    # Use the local chatbot.png and output to the assets models directory
    image_to_3d_glb('chatbot.png', 'public/assets/models/rock-bit-bot.glb')
