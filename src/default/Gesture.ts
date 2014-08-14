/// <reference path="./Frame.ts"/>
/// <reference path="./Hand.ts"/>
/// <reference path="./Pointable.ts"/>
/**
 * The Gesture class represents a recognized movement by the user.
 *
 * <p>The Leap watches the activity within its field of view for certain movement
 * patterns typical of a user gesture or command. For example, a movement from
 * side to side with the hand can indicate a swipe gesture, while a finger poking
 * forward can indicate a screen tap gesture.</p>
 *
 * <p>When the Leap recognizes a gesture, it assigns an ID and adds a Gesture object
 * to the frame gesture list. For continuous gestures, which occur over many frames,
 * the Leap updates the gesture by adding a Gesture object having the same ID and
 * updated properties in each subsequent frame.</p>
 *
 * <p><strong>Important: Recognition for each type of gesture must be enabled using the
 * <code>Controller.enableGesture()</code> function; otherwise no gestures are recognized
 * or reported.</strong></p>
 *
 * <p>Subclasses of Gesture define the properties for the specific movement
 * patterns recognized by the Leap.</p>
 *
 * <p>The Gesture subclasses for include:
 * <pre>
 * CircleGesture – A circular movement by a finger.
 * SwipeGesture – A straight line movement by the hand with fingers extended.
 * ScreenTapGesture – A forward tapping movement by a finger.
 * KeyTapGesture – A downward tapping movement by a finger.
 * </pre>
 * </p>
 *
 * <p>Circle and swipe gestures are continuous and these objects can have a state
 * of start, update, and stop.</p>
 *
 * <p>The screen tap gesture is a discrete gesture. The Leap only creates a single
 * ScreenTapGesture object appears for each tap and it always has a stop state.</p>
 *
 * <p>Get valid Gesture instances from a Frame object. You can get a list of gestures
 * with the <code>Frame.gestures()</code> method. You can get a list of gestures since a specified
 * frame with the <code>Frame.gestures(frame)</code> methods. You can also use the <code>Frame.gesture()</code>
 * method to find a gesture in the current frame using an ID value obtained
 * in a previous frame.</p>
 *
 * <p>Gesture objects can be invalid. For example, when you get a gesture by ID using
 * <code>Frame.gesture()</code>, and there is no gesture with that ID in the current frame, then
 * <code>gesture()</code> returns an Invalid Gesture object (rather than a null value).
 * Always check object validity in situations where a gesture might be invalid.</p>
 *
 * <p>The following keys can be used with the Config class to configure the gesture recognizer:</p>
 *
 * <table class="innertable">
 *   <tr>
 *    <th>Key string</th>
 *    <th>Value type</th>
 *    <th>Default value</th>
 *    <th>Units</th>
 *  </tr>
 *   <tr>
 *    <td>Gesture.Circle.MinRadius</td>
 *    <td>float</td>
 *    <td>5.0</td>
 *    <td>mm</td>
 *  </tr>
 *   <tr>
 *    <td>Gesture.Circle.MinArc</td>
 *    <td>float</td>
 *    <td>1.5&#42;pi</td>
 *    <td>radians</td>
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
 *   <tr>
 *    <td>Gesture.KeyTap.MinDownVelocity</td>
 *    <td>float</td>
 *    <td>50</td>
 *    <td>mm/s</td>
 *  </tr>
 *   <tr>
 *    <td>Gesture.KeyTap.HistorySeconds</td>
 *    <td>float</td>
 *    <td>0.1</td>
 *    <td>s</td>
 *  </tr>
 *   <tr>
 *    <td>Gesture.KeyTap.MinDistance</td>
 *    <td>float</td>
 *    <td>5.0</td>
 *    <td>mm</td>
 *  </tr>
 *   <tr>
 *    <td>Gesture.ScreenTap.MinForwardVelocity</td>
 *    <td>float</td>
 *    <td>50</td>
 *    <td>mm/s</td>
 *  </tr>
 *   <tr>
 *    <td>Gesture.ScreenTap.HistorySeconds</td>
 *    <td>float</td>
 *    <td>0.1</td>
 *    <td>s</td>
 *  </tr>
 *   <tr>
 *    <td>Gesture.ScreenTap.MinDistance</td>
 *    <td>float</td>
 *    <td>3.0</td>
 *    <td>mm</td>
 *  </tr>
 * </table>
 *
 * @author logotype
 * @see CircleGesture
 * @see SwipeGesture
 * @see ScreenTapGesture
 * @see KeyTapGesture
 * @see Config
 *
 */

/**
 * The possible gesture states.
 */
enum State {
    /**
     * An invalid state.
     */
    STATE_INVALID = 0,

    /**
     * The gesture is starting.<br/>
     * Just enough has happened to recognize it.
     */
    STATE_START = 1,

    /**
     * The gesture is in progress.<br/>
     * (Note: not all gestures have updates).
     */
    STATE_UPDATE = 2,

    /**
     * The gesture has completed or stopped.
     */
    STATE_STOP = 3
}

/**
 * The supported types of gestures.
 */
enum Type {
    /**
     * An invalid type.
     */
    TYPE_INVALID = 4,

    /**
     * A straight line movement by the hand with fingers extended.
     */
    TYPE_SWIPE = 5,

    /**
     * A circular movement by a finger.
     */
    TYPE_CIRCLE = 6,

    /**
     * A forward tapping movement by a finger.
     */
    TYPE_SCREEN_TAP = 7,

    /**
     * A downward tapping movement by a finger.
     */
    TYPE_KEY_TAP = 8
}
class Gesture
{
    /**
     * The elapsed duration of the recognized movement up to the frame
     * containing this Gesture object, in microseconds.
     *
     * <p>The duration reported for the first Gesture in the sequence (with
     * the <code>STATE_START</code> state) will typically be a small positive number
     * since the movement must progress far enough for the Leap to recognize
     * it as an intentional gesture.</p>
     */
    public duration:number;

    /**
     * The elapsed duration in seconds.
     */
    public durationSeconds:number;

    /**
     * The Frame containing this Gesture instance.
     */
    public frame:Frame;

    /**
     * The list of hands associated with this Gesture, if any.
     *
     * <p>If no hands are related to this gesture, the list is empty.</p>
     */
    public hands:Hand[] = [];

    /**
     * The gesture ID.
     *
     * <p>All Gesture objects belonging to the same recognized movement share
     * the same ID value. Use the ID value with the Frame.gesture() method
     * to find updates related to this Gesture object in subsequent frames.</p>
     */
    public id:number;

    /**
     * The list of fingers and tools associated with this Gesture, if any.
     *
     * <p>If no Pointable objects are related to this gesture, the list is empty.</p>
     */
    public pointables:Pointable[] = [];

    /**
     * The gesture state.
     *
     * <p>Recognized movements occur over time and have a beginning, a middle,
     * and an end. The <code>state</code> attribute reports where in that sequence
     * this Gesture object falls.</p>
     */
    public state:State;

    /**
     * The gesture type.
     */
    public type:Type;

    /**
     * Constructs a new Gesture object.
     *
     * <p>An uninitialized Gesture object is considered invalid. Get valid
     * instances of the Gesture class, which will be one of the Gesture
     * subclasses, from a Frame object.</p>
     *
     */
    constructor()
    {
    }

    /**
     * Compare Gesture object equality/inequality.
     *
     * <p>Two Gestures are equal if they represent the same snapshot of
     * the same recognized movement.</p>
     *
     * @param other The Gesture to compare with.
     * @return True; if equal, False otherwise.
     *
     */
    public isEqualTo( other:Gesture ):boolean
    {
        return (this.id == other.id);
    }

    /**
     * Reports whether this Gesture instance represents a valid Gesture.
     *
     * <p>An invalid Gesture object does not represent a snapshot of a recognized
     * movement. Invalid Gesture objects are returned when a valid object
     * cannot be provided. For example, when you get an gesture by ID using
     * Frame.gesture(), and there is no gesture with that ID in the current
     * frame, then gesture() returns an Invalid Gesture object (rather than
     * a null value). Always check object validity in situations where an
     * gesture might be invalid.</p>
     *
     * @return True, if this is a valid Gesture instance; false, otherwise.
     *
     */
    public isValid():boolean
    {
        if( !this.durationSeconds )
            return false;

        return true;
    }

    /**
     * Returns an invalid Gesture object.
     *
     * <p>You can use the instance returned by this in comparisons
     * testing whether a given Gesture instance is valid or invalid.
     * (You can also use the <code>Gesture.isValid()</code> function.)</p>
     *
     * @return The invalid Gesture instance.
     *
     */
    public static invalid():Gesture
    {
        return new Gesture();
    }

    /**
     * A string containing a brief, human-readable description of this Gesture.
     *
     */
    public toString():string
    {
        return "[Gesture id:" + this.id + " duration:" + this.duration + " type:" + this.type + "]";
    }
}