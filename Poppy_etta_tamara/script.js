AFRAME.registerComponent("animation-manager", {
  init: function() {
    // wait for the first animation to finish
    this.el.addEventListener("animationcomplete__first", e => {
      // start the second animation
      this.el.emit("second")
    });
    this.el.addEventListener("animationcomplete__second", e => {
      // start the second animation
      this.el.emit("third")
    });
    this.el.addEventListener("animationcomplete__third", e => {
      // start the second animation
      this.el.emit("fourth")
    });
    this.el.addEventListener("animationcomplete__fourth", e => {
      // start the second animation
      this.el.emit("first")
    });

  }
})


AFRAME.registerComponent("animation-manager", {
  init: function() {

    this.el.addEventListener("mouseenter",
      e => {
        this.el.emit("gaze")
      });
    this.el.addEventListener('mouseleave',
      e => {

      });
    el.addEventListener('click', {

    });

  }
})