# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Setup a pi with 64 bit os

install the latest 64 bit pi os <https://www.raspberrypi.com/software/>

make sure pi os is up to date

```bash
sudo apt update
sudo apt upgrade
```

## To run the software

```bash
sudo apt install jackd2
sudo apt install git
git clone https://github.com/mfvargo/rtjam_rust.git
cd rtjam_rust
```

## To build the software

### install libraries and tools

install rust

```bash
curl https://sh.rustup.rs -sSf | sh
```

install node vi nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```

install necessary libraries

```bash
sudo apt install jackd2
sudo apt install libjack-dev
sudo apt install libssl-dev
sudo apt-get install build-essential libgtk-3-dev
sudo apt install libjavascriptcoregtk-4.1-dev
sudo apt install libsoup-3.0-dev
sudo apt install libwebkit2gtk-4.1-dev
sudo apt install libalsa-ocaml-dev
```

get code and build

```bash
git clone https://github.com/mfvargo/pedals.git
cd pedals
npm i
npm run tauri build
```
