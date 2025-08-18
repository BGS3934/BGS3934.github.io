AFRAME.registerComponent('thumbstick-jump', {
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

    if (Math.abs(x) < this.deadZone && Math.abs(y) < this.deadZone) {
      // Stick back to neutral, allow next move
      this.canMove = true;
      return;
    }

    if (!this.canMove) {
      // Already moved for this push, wait for neutral to reset
      return;
    }

    // Get forward direction vector (head direction on horizontal plane)
    const direction = new THREE.Vector3();
    this.head.object3D.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    // Calculate right vector (perpendicular to forward and up)
    const right = new THREE.Vector3();
    right.crossVectors(this.rig.object3D.up, direction).normalize();

    // Move rig 1 meter jump in one direction
    if (y < -this.moveThreshold) {
      this.rig.object3D.position.addScaledVector(direction, -2);
      this.canMove = false;
    } else if (y > this.moveThreshold) {
      this.rig.object3D.position.addScaledVector(direction, 2);
      this.canMove = false;
    } else if (x < -this.moveThreshold) {
      this.rig.object3D.position.addScaledVector(right, -2);
      this.canMove = false;
    } else if (x > this.moveThreshold) {
      this.rig.object3D.position.addScaledVector(right, 2);
      this.canMove = false;
    }
  }
});
