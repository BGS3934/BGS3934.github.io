AFRAME.registerComponent('thumbstick-jump', {
  schema: {
    distance: { type: 'number', default: 2 } // Default jump distance
  },

  init: function () {
    this.canMove = true;
    this.deadZone = 0.2;
    this.moveThreshold = 0.8;

    // Cache references to rig and head for movement & direction
    this.rig = document.querySelector('#cameraRig');
    this.head = document.querySelector('#head');

    if (!this.rig || !this.head) {
      console.warn('thumbstick-jump component requires #cameraRig and #head entities.');
      return;
    }

    this.el.addEventListener('thumbstickmoved', this.onThumbstickMoved.bind(this));
  },

  onThumbstickMoved: function (evt) {
    const x = evt.detail.x;
    const y = evt.detail.y;

    // Reset canMove when stick is near center
    if (Math.abs(x) < this.deadZone && Math.abs(y) < this.deadZone) {
      this.canMove = true;
      return;
    }

    if (!this.canMove) return;

    // Forward direction vector (head orientation, horizontal only)
    const direction = new THREE.Vector3();
    this.head.object3D.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    // Right vector (perpendicular to forward and up)
    const right = new THREE.Vector3();
    right.crossVectors(this.rig.object3D.up, direction).normalize();

    // Use optional distance property for movement
    const moveDist = this.data.distance;

    if (y < -this.moveThreshold) {
      this.rig.object3D.position.addScaledVector(direction, -moveDist);
      this.canMove = false;
    } else if (y > this.moveThreshold) {
      this.rig.object3D.position.addScaledVector(direction, moveDist);
      this.canMove = false;
    } else if (x < -this.moveThreshold) {
      this.rig.object3D.position.addScaledVector(right, -moveDist);
      this.canMove = false;
    } else if (x > this.moveThreshold) {
      this.rig.object3D.position.addScaledVector(right, moveDist);
      this.canMove = false;
    }
  }
});
