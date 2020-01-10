//scene declared in tableLoader.js

let totalLamps = 6 * 2;
let lampRadius = 74;
let lampMaxRotation = 360;

const lampGroup = document.createElement('a-entity');


let interval = (Math.PI * 2) / totalLamps;

//center is x,y,z 
let centerPoint = [12.355, 10, -73];

let centerX = centerPoint[0];
let lampY = centerPoint[1];
let centerZ = centerPoint[2];


lampGroup.object3D.position.set(centerX, lampY, centerZ);

for (let i = 0; i < totalLamps; i++) {


    let desiredRadianAngleOnCircle = interval * i;

    //position of each lamp
    let x = lampRadius * Math.cos(desiredRadianAngleOnCircle);
    let z = lampRadius * Math.sin(desiredRadianAngleOnCircle);
    let y = 0


    const el = document.createElement('a-entity');
    // Set attributes for element
    el.setAttribute('gltf-model', '#lamp1');
    el.setAttribute('light', "type: directional; color: #EEE; intensity: 0.2");
    el.object3D.position.set(
        x,
        y,
        z
    );
    el.object3D.scale.set(2, 2, 2);
    el.setAttribute('shadow', "cast: true, receive: true");
    lampGroup.appendChild(el);
}
scene.appendChild(lampGroup);