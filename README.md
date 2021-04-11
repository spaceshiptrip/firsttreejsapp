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


## Run in Docker
The `npm run dev` will choose the first open dev port, in this case because there isn't anything running in the docker container except for the app, it will choose `8080`
```
docker run -d -v ${PWD}:/app -v /app/node_modules -p 80:8080 --name tre --rm three
```

## TODO
* Connect to SPICE for realistic orbit and rotations
* Include SPICE starfield in the background
* Add text at the bottom
* FIXME Warnings:
   ```
   npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
   npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
   npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
   npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
   npm notice created a lockfile as package-lock.json. You should commit this file.
   npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.7 (node_modules/chokidar/node_modules/fsevents):
   npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"arm"})
   npm WARN app No description
   ```