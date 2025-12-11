# Obsidian Table Emoji Toggle


Designed specifically to solve the frustration of using checklists inside Obsidian **Live Preview** tables.

[中文说明](#中文说明)

## ✨ Features

- **True Live Preview Interaction**: Click to toggle emojis instantly. No more jumping into source code or switching to Edit Mode.
- **Zero Layout Shift**: Since it doesn't trigger the editor's focus, your table layout remains stable.
- **Global Support**: While optimized for tables, it works anywhere in your document (lists, callouts, headers).
- **Native Experience**: Uses advanced DOM event interception to provide an app-like feel.
- **Performance**: Extremely lightweight. No background processes, no heavy rendering.

## 📸 Demo

> *(Please replace this line with a GIF of your plugin in action. Show clicking a ❌ turning into a ✅ inside a table in Live Preview mode.)*

## 🚀 Usage

This plugin works out of the box. No configuration required.

Simply use the following emojis in your tables:

- **Unchecked**: `❌`
- **Checked**: `✅`

**Click on the emoji to toggle its state.**

### Example

Copy and paste this into your note to test:

```markdown
| Task | Status |
| ---- | :----: |
| Buy Milk | ❌ |
| Walk the Dog | ✅ |
| Read Book | ❌ |
```

## 📦 Installation

### Via Community Plugins (Pending)
*This plugin is currently under review for the official community plugin list.*

### Via BRAT (Beta Review)
1. Install **BRAT** from the Community Plugins.
2. Add Beta plugin with repository: `your-github-username/obsidian-table-toggle`
3. Enable "Table Emoji Toggle" in settings.

### Manual Installation
1. Download the `main.js`, `manifest.json`, and `styles.css` from the [Latest Release](https://github.com/your-github-username/obsidian-table-toggle/releases).
2. Copy them to your vault folder: `.obsidian/plugins/obsidian-table-toggle/`.
3. Reload Obsidian and enable the plugin.

## 🔧 How it Works

Unlike other checkbox plugins that try to render HTML widgets (which often conflict with Live Preview's table renderer), this plugin uses **DOM Topology Mapping**.

It detects your click event at the window level, calculates the exact line in the Markdown source based on the HTML table structure, and modifies the text directly. This ensures 100% stability and compatibility with other themes and plugins.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue if you have any ideas.

## 📄 License

MIT License.

---

<a name="中文说明"></a>

# 中文说明 (Chinese)

## 主要功能

它允许你直接点击表格，切换其中的 Emoji 图标


## 如何使用

插件默认支持以下 Emoji 的互相切换：

- **未完成**: `❌`
- **已完成**: `✅`

只需在笔记中输入上述图标，点击即可切换。

**测试示例：**

```markdown
| 任务  | 状态  |
| --- | --- |
| 买牛奶 | ❌   |
| 遛狗  | ✅   |
| 读书  | ❌   |
```

## 安装方法

### 社区插件市场 (审核中)
目前插件正在等待官方审核。

### 使用 BRAT
1. 在社区插件市场搜索并安装 **BRAT**。
2. 在 BRAT 设置中点击 "Add Beta plugin"。
3. 输入本仓库地址：`caffet/obsidian-table-toggle`。
4. 启用插件。

### 手动安装
1. 从 [Releases](https://github.com/caffet/obsidian-table-toggle/releases) 页面下载最新版本的文件。
2. 将文件放入你的库目录：`.obsidian/plugins/obsidian-table-toggle/`。
3. 重启 Obsidian 并启用插件。
