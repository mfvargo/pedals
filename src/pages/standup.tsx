import { Component } from "react";
import Slideshow from "../components/slideShow";
export default class StandUp extends Component {
  slideImages = [
    {
      caption: "The Raspberry Pi (with case)",
      description: `You can see the USB and Ethernet ports on the right side. Power is provided 
        via a USB-C connector at the left end of the left side.`,
      image: "images/pi-solo.png",
    },
    {
      caption: "Size Comparison",
      description: `The Raspberry Pi is a single board System On A Chip based computer. It hosts the rtjam software that takes
        audio from the USB audio device and feeds it over the internet to other players.`,
      image: "images/pi-with-cards.png",
    },
    {
      caption: "Micro SD Card slot",
      description: `After you burn the image to the SD card, you install it here.`,
      image: "images/pi-flash-slot.png",
    },
    {
      caption: "USB Audio Device",
      description: `A Focusrite Scarlett 2i2 USB audio Device.`,
      image: "images/scarlett-solo.png",
    },
    {
      caption: "Pi with Scarlett",
      description: `The Pi stacked on the Scarlett (for size comparison)`,
      image: "images/connect-step-0.png",
    },
    {
      caption: "Pi with Scarlett Backside",
      description: `You will connect the USB audio device to the Pi with a USB cable.`,
      image: "images/connect-step-0b.png",
    },
    {
      caption: "Pi to USB Audio connection",
      description: `Pi and Scarlett connected (Note: the Scarlett gets its power from the PI via USB)`,
      image: "images/connect-step-1.png",
    },
    {
      caption: "Ethernet Connection to Pi",
      description: `Remember it cannot use WiFi`,
      image: "images/connect-step-2a.png",
    },
    {
      caption: "Ethernet connected to Pi",
      description: `The other end should be connected to a port on your router`,
      image: "images/connect-step-2b.png",
    },
    {
      caption: "Power Supply for Pi",
      description: `Pi powered by USB C power adapter.  Make sure USB audio and ethernet are connected first!`,
      image: "images/connect-step-3.png",
    },
    {
      caption: "Connect Headphones to USB Audio",
      description: `You will need some way to listen to what's happening.  Headphones are preferred because they prevent 
        other players sounds from looping back into the room via your microphone.`,
      image: "images/connect-step-4.png",
    },
    {
      caption: "Microphone connection to Channel 1",
      description: `You are going to need a microphone to talk to the other people in the room.  If you are doing vocals or
        an acoustic instrument then you only need connect one input.`,
      image: "images/connect-step-5.png",
    },
    {
      caption: "Instrument connection to Channel 2",
      description: `Plug in your instrument here.`,
      image: "images/connect-step-6.png",
    },
  ];

  softwareSlideImages = [
    {
      caption: "Raspberry Pi Imager",
      description: `This is the initial screen when you launch the imager.`,
      image: "images/pi-imager-step-1.png",
    },
    {
      caption: "Select Custom Image",
      description: `Use the Operating system pulldown and select "Use Custom".`,
      image: "images/pi-imager-step-2.png",
    },
    {
      caption: "Select Custom Image (cont)",
      description: `Navigate to where you saved the downloaded image.`,
      image: "images/pi-imager-step-3.png",
    },
    {
      caption: "Select SD Card",
      description: `Make sure the SD card is plugged in.  The imager will find it!`,
      image: "images/pi-imager-step-4.png",
    },
    {
      caption: "Writing the image",
      description: `progress is shown along the way. Took a few minutes on my computer...`,
      image: "images/pi-imager-step-5.png",
    },
    {
      caption: "Verifying the image",
      description: `After the write, software verifies the image.`,
      image: "images/pi-imager-step-6.png",
    },
    {
      caption: "Voila!",
      description: `Ready to plug in to the Pi.`,
      image: "images/pi-imager-step-7.png",
    },
  ];

  render() {
    return (
      <div className="StandUp">
        <h3>How to put together an rtjam-unit</h3>
        <div>This page will give you the direction for creating your own rtjam-unit</div>
        <h4>List of Ingredients</h4>
        <p>
          <ul>
            <li>
              Raspberry Pi 4. 2Gb RAM, 4Gb Flash &nbsp;
              <a href="https://www.raspberrypi.org/">Offical Rasberry Pi Website</a>
            </li>
            <li>
              Raspberry Pi Case &nbsp;
              <a href="https://www.amazon.com/iUniker-Raspberry-Aluminium-Heatsink-Supply/dp/B07D3S4KBK/ref=pd_ybh_a_18">
                (this one works well)
              </a>
            </li>
            <li>
              USB C power supply for the Pi{" "}
              <a href="https://www.amazon.com/CanaKit-Raspberry-Power-Supply-PiSwitch/dp/B07TSFYXBC/ref=sr_1_2">
                Example
              </a>
            </li>
            <li>
              USB audio device (must have at least 2 channels)
              <ul>
                <li>
                  Focusrite Scarlett 2i2{" "}
                  <a href="https://www.sweetwater.com/store/detail/Scarlet2i2G3--focusrite-scarlett-2i2-3rd-gen-usb-audio-interface">
                    Sweetwater Link
                  </a>
                </li>
                <li>PreSonus Studio 24c</li>
                <li>PreSonus USB96</li>
                <li>MOTU M2</li>
                <li>M-Audio M-Track Duo</li>
                <li>etc</li>
              </ul>
            </li>
            <li>Ethernet Cable</li>
            <li>Open ethernet port on your router</li>
            <li>Microphone</li>
            <li>
              Software complete image for the raspberry pi or you can build software from{" "}
              <a href="https://github.com/mfvargo/rtjam_rust">github</a>
            </li>
          </ul>
        </p>
        <h3>Hardware Installation</h3>
        <p>Click on the arrows to step through the slideshow below on how to put together a unit:</p>
        <div>
          <Slideshow slideImages={this.slideImages} />
        </div>
        <h3>Software Installation</h3>
        <p>
          You will need to get the software onto the micro SD card for you Raspberry Pi. Here are the directions for
          getting the software and buring it onto your micro SD card.
        </p>
        <p>
          You will need a micro SD card slot on your computer and some software that allows you to burn images onto the
          card.
        </p>
        <p>
          Steps:
          <ul>
            <li>
              Download the image from &nbsp;
              <a href="http://rtjam-nation.com/pi/rust/sound.img">Sofware Image</a>
              &nbsp; and save it on your computer in a place you can find it later.
            </li>
            <li>
              If you don't have a good imager, the &nbsp;
              <a href="https://www.raspberrypi.org/software/">Raspberry Pi Imager</a>
              &nbsp runs on all platforms and is super easy to use.
            </li>
            <li>
              After you have burned the image to the SD card, put the card into the raspberry pi. Note: The download
              image is shrunk to just the size of the data. You SD card is undoubtably bigger than that. After you boot
              the Pi with the SD card, it will resize that image to the full size of the SD card you have. This cause an
              extra reboot after the resize. This only happens on the first boot with the SD card.
            </li>
          </ul>
          <p>Here is a slideshow showing the steps with the Raspberry Pi imager</p>
          <div>
            <Slideshow slideImages={this.softwareSlideImages} />
          </div>
        </p>
        <h3>TL;DNR</h3>
        <p>
          If you already have a pi or another debian based linux system, you can do your own install from the directions
          <a href="https://github.com/mfvargo/rtjam_rust/blob/main/docs/Pi%2064bit%20aarch64%20setup.md">here</a>
        </p>
      </div>
    );
  }
}
