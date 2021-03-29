# spacehiptrip First ThreeJS App


Things to add:
1. Load a texture image
1. Load normal map on top of the image

```
function createTextureMesh(geometry, image, otherImage) {
        let map = new THREE.TextureLoader().load(image);
        let normalMap = new THREE.TextureLoader().load(otherImage);

        let material = new THREE.MeshPhongMaterial();
            material.map = map;//Bottom mapping
            material.normalMap = normalMap;//normal map
            material.normalScale = new THREE.Vector2(0.3, 0.3);//Concavo convex degree

        return new THREE.Mesh(geometry, material);
    }
```