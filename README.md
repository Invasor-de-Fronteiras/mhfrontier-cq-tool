<h1 align="center">
  <img src="./screenshots/logo.png" alt="Clash" width="128" />
  <br>
  MHFrontier CQ Tool
  <br>
</h1>

MHFrontier CQ Tool is a free and open-source solution to edit and create quests for Monster Hunter Frontier Z

### Table of Contents

- [Install](#install)
- [Instructions](#instructions)
- [Contributions](#contributions)
- [License](#license)

## Install

Download them from the [Github Release](https://github.com/Invasor-de-Fronteiras/mhfrontier-cq-tool/releases) for Windows, Linux and Mac.

## Instructions

> If you are using Erupe, set `DevMode` and `QuestDebugTools` to **true** on `config.json`. It shows the quest filename on console logs.

### Decompress the Quest

The quests required to decompress the quest to the editor read it. For it, we recommend you execute the [ReFrontier](https://github.com/mhvuze/ReFrontier) in the quest. The editor understands the existence of [ReFrontier](https://github.com/mhvuze/ReFrontier), just move the [ReFrontier](https://github.com/mhvuze/ReFrontier) to the same folder as the editor.

### Quest File

The quest file is binary because currently, the Erupe server does not implement each part of the quest, it reads all file content and sent to the client.

the name of the quest file is not random, it is composed of the quest id, time of day in-game and season in-game. We demonstrate how to separate this in the image below:

<img src="./screenshots/quest-id.png" alt="Quest" width="300" />

It's important to understand this so you can get the quests on your server and on your quest list.

### New Quest

> Currently, the editor does not support the creation of a quest from scratch, because the editor is not yet possible to edit a 100% map.

For creating a new quest, copy an existing quest, [decompress](#decompress-the-quest) the quest and rename the [quest id](#quest-file) to an id that is not already being used in your server. Open the quest in the editor and change the **Quest Id** in **Quest Information** to chosen id.

Nice! Now do the quest changes as your desire and save it.

## Contributions

Issue and PR welcome!

## License

GPL-3.0 License. See the [License here](/LICENSE) for details.
