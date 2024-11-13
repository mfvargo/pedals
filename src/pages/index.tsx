import { Component } from "react";

export default class Index extends Component {
  render() {
    return (
      <div className="SystemDescription">
        <h2>Welcome to rtjam-nation</h2>
        <p>
          rtjam-nation is network of users with rtjam-units that allow them to play music together in real time over
          the internet. Users meet in virtual rooms hosted across the world. Once they connect, they hear each other
          as if they were in the same place. Think of it as low latency high quality audio conferencing that lets you
          play music.
        </p>
        <h3>Demo</h3>
        <p>
          This demo audio was recorded live. Using the mix from one of the players (the handsome bass player). Each
          individual player recorded the video of themselves playing and that was stitched on top of the audio later
          for the video. rtjam-nation just does audio but the video makes it easier to understand what was happening.
        </p>
        <p className="floatLeft videoIframe">
          <iframe
            width="480"
            height="270"
            src="https://www.youtube.com/embed/txu-zlhYXdw"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </p>
        <p className="floatLeft videoIframe">
          <iframe
            width="480"
            height="270"
            src="https://www.youtube.com/embed/yYRzvgUxmxI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </p>
        <div className="clearBoth"></div>
        <h3>How does it work?</h3>
        <p>
          Each user has an rtjam-unit that allows them to plug in two channels of audio, like a microphone and some
          kind of instrument. This unit is connected to their network using an ethernet cable.
        </p>
        <p>
          <strong>
            Try as we may, wi-fi connections no matter how fast just introduce a bunch of jitter in the audio stream
            that prevents it from having low enough latency to play music. Someday 5G might solve this.... But until
            that time, a hard wired ethernet connection is needed to play music together.
          </strong>
        </p>
        <p>
          Users connect to virtual rooms where they can all hear each other. Each room supports up to 7 people at a
          time.
        </p>
        <p>
          Rooms are hosted by RTJam community members with good hearts and kick ass internet connections. We are
          adding servers to host more rooms all the time. We have rooms in the SF Bay area, Portland OR, and NYC.
        </p>
        <p>Here is an example rtjam-unit with a raspberry pi 4 and a FocusRite Scarlett USB audio device:</p>
        <p>
          <a href="/standup">
            <img width="75%" height="audo" src="images/scarlett-pi-unit.jpg" alt="this is an rtjam-unit" />
          </a>
        </p>
        <p>
          The rapberry pi runs the software that does the real time streaming to the internet over the ethernet
          interface. Audio is provided to the pi over the USB interface using the Scarlett. Other USB interfaces are
          also supported. &nbsp;
          <a href="/standup">Here are some Instructions</a> &nbsp; on how to "stand up" an rtjam-unit.
        </p>
        <p>Control of the device is done using this website! The u/x for a connected unit looks something like:</p>
        <p>
          <img width="50%" height="audo" src="images/rtjam-unit-ux.png" alt="this is unit control ux" />
        </p>
        <h3>How can I join the Nation</h3>
        <p>
          You can make your own unit. Just <a href="/standup">follow the directions here.</a>
        </p>
        <p>
          You can hack on the open source Rust component code on{" "}
          <a href="https://github.com/mfvargo/rtjam_rust">github</a>
        </p>
        <p>You can buy a premade unit from the imaginary store that does not exist yet.</p>
        <h3>How can I join the community?</h3>
        <p>
          <a href="https://rtjam.slack.com/" target="_blank">
            Join us on Slack
          </a>
        </p>
      </div>
    );
  }
}
