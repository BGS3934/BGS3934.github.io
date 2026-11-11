

function delay(ms) {
    return new Promise(function(resolve){return setTimeout(resolve, ms)})
}


async function main() {
    
    // wait then add new object.
    // await delay(5000)
    // var sceneElement = document.querySelector("a-scene")
    console.log("starting animation")
    // var Element = document.getElementById("animation_object")
    console.log(Element)
    await delay(2000)
    while (true) {
    // for (let i = 1; i < 10; i++) {

        let Element = document.getElementById("animation_object")
        let position = Math.floor((Math.random() * 10)).toString() + " " + Math.floor((Math.random() * 10)).toString() + " " + Math.floor((Math.random() * 10)).toString()
        let rotation = Math.floor((Math.random() * 360)).toString() + " " + Math.floor((Math.random() * 360)).toString() + " " + Math.floor((Math.random() * 360)).toString()
        console.log("property: position; to:" + position + "; dur: 1000; startEvents: animation_1; autoplay: false;")
        Element.setAttribute("animation", "property: position; to:" + position +"; dur: 1000; startEvents: animation_1; autoplay: false;")
        Element.setAttribute("animation__2", "property: rotation; to:" + rotation +"; dur: 1000; startEvents: animation_1; autoplay: false;")

        Element.emit("animation_1", null, false);
        Element = document.getElementById("animation_object2")
        position = Math.floor((Math.random() * 10)).toString() + " " + Math.floor((Math.random() * 10)).toString() + " " + Math.floor((Math.random() * 10)).toString()
        rotation = Math.floor((Math.random() * 360)).toString() + " " + Math.floor((Math.random() * 360)).toString() + " " + Math.floor((Math.random() * 360)).toString()
        console.log("property: position; to:" + position + "; dur: 1000; startEvents: animation_1; autoplay: false;")
        Element.setAttribute("animation", "property: position; to:" + position +"; dur: 1000; startEvents: animation_1; autoplay: false;")
        Element.setAttribute("animation__2", "property: rotation; to:" + rotation +"; dur: 1000; startEvents: animation_1; autoplay: false;")

        Element.emit("animation_1", null, false);
        Element = document.getElementById("animation_object3")
        position = Math.floor((Math.random() * 10)).toString() + " " + Math.floor((Math.random() * 10)).toString() + " " + Math.floor((Math.random() * 10)).toString()
        rotation = Math.floor((Math.random() * 360)).toString() + " " + Math.floor((Math.random() * 360)).toString() + " " + Math.floor((Math.random() * 360)).toString()
        console.log("property: position; to:" + position + "; dur: 1000; startEvents: animation_1; autoplay: false;")
        Element.setAttribute("animation", "property: position; to:" + position +"; dur: 1000; startEvents: animation_1; autoplay: false;")
        Element.setAttribute("animation__2", "property: rotation; to:" + rotation +"; dur: 1000; startEvents: animation_1; autoplay: false;")

        Element.emit("animation_1", null, false);
        await delay(1000);
        // console.log("waiting for anim 1 to complete")
        // await delay(1000)
        // Element.emit("animation_2", null, false);
        // console.log("waiting for anim 2 to complete")
        // await delay(1000)
    }

    
    // while (true) {
    //     await delay(1000)
    //     let box = document.createElement("a-box")
    //     let position = Math.floor((Math.random() * 10)).toString() + " " + Math.floor((Math.random() * 10)).toString() + " " + Math.floor((Math.random() * 10)).toString()
    //     box.setAttribute("position", position)
    //     console.log(position)
    //     sceneElement.appendChild(box)
    // }

}

main();