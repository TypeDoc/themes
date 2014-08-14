/// <reference path="./Gesture.ts"/>
/// <reference path="./Vector3.ts"/>
/// <reference path="./Pointable.ts"/>
/**
 * The SwipeGesture class represents a swiping motion of a finger or tool.
 *
 * <p><strong>Important: To use swipe gestures in your application, you must enable
 * recognition of the swipe gesture.</strong><br/>You can enable recognition with:</p>
 *
 * <p><code>leap.controller.enableGesture(Gesture.TYPE_SWIPE);</code></p>
 *
 * <p>Swipe gestures are continuous.</p>
 *
 * <p>You can set the minimum length and velocity required for a movement to be
 * recognized as a swipe using the config attribute of a connected Controller object.
 * Use the following keys to configure swipe recognition:</p>
 *
 * <table class="innertable">
 *   <tr>
 *    <th>Key string</th>
 *    <th>Value type</th>
 *    <th>Default value</th>
 *    <th>Units</th>
 *  </tr>
 *   <tr>
 *    <td>Gesture.Swipe.MinLength</td>
 *    <td>float</td>
 *    <td>150</td>
 *    <td>mm</td>
 *  </tr>
 *   <tr>
 *    <td>Gesture.Swipe.MinVelocity</td>
 *    <td>float</td>
 *    <td>1000</td>
 *    <td>mm/s</td>
 *  </tr>
 * </table>
 *
 * <p>The following example demonstrates how to set the swipe configuration parameters:</p>
 *
 * <code>if(controller.config().setFloat(&quot;Gesture.Swipe.MinLength&quot;, 200.0) &amp;&amp;
 *       controller.config().setFloat(&quot;Gesture.Swipe.MinVelocity&quot;, 750))
 *        controller.config().save();</code>
 *
 * @author logotype
 *
 */
class SwipeGesture extends Gesture
{
    /**
     * The type value designating a swipe gesture.
     */
    public static classType:number = Type.TYPE_SWIPE;

    /**
     * The unit direction vector parallel to the swipe motion.
     *
     * <p>You can compare the components of the vector to classify the swipe
     * as appropriate for your application. For example, if you are using
     * swipes for two dimensional scrolling, you can compare the x and y
     * values to determine if the swipe is primarily horizontal or vertical.</p>
     */
    public direction:Vector3;

    /**
     * The Finger or Tool performing the swipe gesture.
     */
    public pointable:Pointable;

    /**
     * The current swipe position within the Leap frame of reference, in mm.
     */
    public position:Vector3;

    /**
     * The speed of the finger performing the swipe gesture in millimeters per second.
     */
    public speed:number;

    /**
     * The position where the swipe began.
     */
    public startPosition:Vector3;

    /**
     * Constructs a SwipeGesture object from an instance of the Gesture class.
     *
     */
    constructor()
    {
        super();
    }
}