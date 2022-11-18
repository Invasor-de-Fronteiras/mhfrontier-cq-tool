![Dark theme preview](http://invidget.switchblade.xyz/967058504403808356)

# MHFrontier-CQ-Tool

MHFrontier-CQ-Tool is a editor of custom quests for Monster Hunter Frontier Z.

## Table of Contents

- [Contributing](#contributing)
- [Local development](#local-development)
- [Load Quest](#load-quest)
- [Manager questlist](#manager-questlist)
- [Manager questlist in 9.1](#manager-questlist-in-91)
- [Credits](#credits)
- [License](#license)

## Requirements

- [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section)
- [ReFrontier](https://github.com/mhvuze/ReFrontier)

## How to use

First of all, it's not possible to create quest from scratch, we need to copie one quest as base and edit from it.

## Load Quest

To find quest file which you want you can does this enabling the options **DevMode** and **QuestDebugTools** on config.json to show quest filename on console logs.

To load quests it's necessary to execute [ReFrontier](https://github.com/mhvuze/ReFrontier) in quest file.

Rename file for one **quest_id** (without the last two characters) which is not being used in folder **/bin/quests** and put file in **/bin/quests** (Example: 64555d0.bin). 
I strongly recommend to choose based in quest map because its not possible to change map.

After that you load the quest and change **Quest ID** in Quest Information to choosed id and do the quests changes as your desire and save it.

## Manager questlist

To quest show in game it's necessary to add quest in questlist, for its you need to change the selected tool **QuestEditor** to **QuestlistEditor**.

![SelectTool](./screenshots/select_tool.png)

Now you click in **Load Folder** and select questlist folder, after this you can manager your quests in menu **Questlist** and add quests clicking on **Add Quest from file**.

After all you can save questlist in **Save Questlist**.

### Manager questlist in 9.1

After update 9.1 from [Erupe CE](https://github.com/ZeruLight/Erupe) the questlist files are removed and now we need to export a template from questfile to folder **/bin/events**.

To do this just go to **Export quest** in QuestEditor and choose questlist options.

![ExportQuest](./screenshots/export_quest.png)

## Contributing

If your contribution is an advance for Erupe, prefer to send it to the [main community repository](#here-are-the-main-repositories-maintained-by-the-community-that-this-code-is-based-on), but otherwise, feel the advantage for any contributions! If you have any questions, don't hesitate to join [our community]() server and ask as many questions as you like.

## License

Licensed under [MIT](/LICENSE).
