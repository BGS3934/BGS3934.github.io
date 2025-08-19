<h2 style="color:#3F51B5;">🤖 Animating Models</h2>
<p>Here the clawbots <b>drive</b> using the same animation system as the frog earlier.</p>
<ul>
  <li>Each clawbot is animated in 4 steps, each triggered by the step before it.</li>
  <li>The wheel rotation is animated as part of the glb model.</li>
  <li>Try chaning where the clawbots go, swap to different models or change their speed.</li>
  <li>This example also features our first use of an <code>a-text</code> box. </li>
  <li>Notice how the sound of the clawbots fades as the move away from you, this is controlled by <code> maxDistance: 10; positional: true</code>.  Without the positional value set to true the volume wouldn't change.</li>

</ul>
