const scene = document.querySelector("a-scene");
const tableAssets = [];
const assets = document.querySelectorAll("a-asset-item");
assets.forEach(asset => {
  asset.id.split("_")[0] === 'table' ? tableAssets.push(asset.id) : "";
});
console.log(tableAssets);

const fillTable = (objects, amount, parent) => {
  let positionOffset = 2.5 / amount;
  if (amount === 1) {
    positionOffset = 0;
  }
  for (let i = 0; i < amount; i++) {
    const childId = Math.floor(Math.random() * objects.length);
    const child = document.createElement('a-entity');
    child.setAttribute('gltf-model', `#${objects[childId]}`);
    child.object3D.position.set(
      amount === 1 ? 0 : (positionOffset * (i + 1)) - (amount / 2),
      1.6,
      Math.random() * (0.4 - (-0.4)) + (-0.4),
    );
    child.object3D.rotation.set(0, 0, 0);
    child.object3D.scale.set(0.2, 0.2, 0.2);
    parent.appendChild(child);
  }
};


const placeCircle = (amount, object, options) => {
  const { groupPosition, groupRotation, curve, radius, scale, shadows, rotationModifier } = options;
  const group = document.createElement('a-entity');
  const rotationOffset = curve / amount;

  group.object3D.position.set(groupPosition.x, groupPosition.y, groupPosition.z);
  group.object3D.rotation.set(THREE.Math.degToRad(groupRotation.x), THREE.Math.degToRad(groupRotation.y), THREE.Math.degToRad(groupRotation.z));

  for (let i = 0; i < amount; i++) {
    const el = document.createElement('a-entity');
    const rotation = rotationOffset * i
    el.setAttribute('gltf-model', `#${object}`);
    el.object3D.rotation.set(
      THREE.Math.degToRad(0),
      THREE.Math.degToRad(rotation + rotationModifier[i]),
      THREE.Math.degToRad(0),
    );
    el.object3D.position.set(
      radius * Math.sin(rotation * Math.PI / 180),
      0,
      radius * Math.cos(rotation * Math.PI / 180)
    );
    el.object3D.scale.set(scale, scale, scale);
    if(shadows) el.setAttribute('shadow', "cast: true, receive: true");
    if(object === "base_table") {
      const amountOnTable = Math.floor(Math.random() * (5 - 1) + 1);
      fillTable(tableAssets, amountOnTable, el);
    }
    group.appendChild(el);
  }
  scene.appendChild(group);
}

// Make first group
placeCircle(9, 'base_table', {
  groupPosition: {
    x: 7,
    y: 0,
    z: -70,
  },
  groupRotation: {
    x: 0,
    y: 60,
    z: 0,
  },
  rotationModifier: [90, 90, 90, 90, 0, 90, 90, 90, 90],
  radius: 70,
  curve: 50,
  shadows: true,
  scale: 1.2,
});

placeCircle(9, 'base_table', {
  groupPosition: { x: -6, y: 0, z: -74},
  groupRotation: {x: 180, y: -70, z: 180},
  rotationModifier: [90, 90, 90, 90, 0, 90, 90, 90, 90],
  radius: 70,
  curve: 50,
  shadows: true,
  scale: 1.2,
});