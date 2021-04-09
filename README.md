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

### sources
1. Mars image maps: http://planetpixelemporium.com/mars.html#

# TODO

Housekeeping:
1. Dockerize
1. Add more bootstrap and react components

Features:
1. add SPICE NAIF 
1. add orbit phobos and deimos  
1. add orbits of currently known orbiting satellites


## Generic Run in Docker
```
docker run -d -v ${PWD}:/app -v /app/node_modules -p 8081:3000 --name orb --rm orbits
```