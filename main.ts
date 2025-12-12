import { Plugin, MarkdownView } from 'obsidian';
import { EditorView } from '@codemirror/view';

// ==========================================
// 🎯 图标定义 (可根据需要修改)
// ==========================================
const CHECKED = "✅";
const UNCHECKED = "❌";

interface EditorWithCM {
	cm: EditorView;
}

export default class EmojiTogglePlugin extends Plugin {
	// 【修复1】删除了 async 关键字，因为里面没有 await
	onload() {
		// 【修复2】删除了 console.log，审核要求不能留 log
		
		// 使用捕获模式拦截点击，优先级最高
		this.registerDomEvent(window, 'pointerdown', (event) => {
			this.handleGlobalClick(event);
		}, true);
	}

	handleGlobalClick(event: PointerEvent) {
		// 只响应左键点击
		if (event.button !== 0) return;

		const target = event.target as HTMLElement;
		const text = (target.innerText || target.textContent || "").trim();

		// 1. 快速过滤：内容必须包含图标
		if (!text.includes(CHECKED) && !text.includes(UNCHECKED)) return;

		// 2. 向上查找 TR (表格行)
		const tr = target.closest("tr");
		if (!tr) return;

		// 3. 获取编辑器实例
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view || !view.editor) return;

		const editorWithCm = view.editor as unknown as EditorWithCM;
		const cm = editorWithCm.cm;
		if (!cm) return;

		// 4. 找到表格在源码中的基准点
		// 尝试找表格容器，或者 cm-embed-block
		const tableBlock = target.closest(".cm-embed-block") || target.closest("table");
		if (!tableBlock) return;

		const tableStartPos = cm.posAtDOM(tableBlock);
		if (tableStartPos === null) return;

		const doc = cm.state.doc;
		const tableStartLine = doc.lineAt(tableStartPos);

		// 5. 计算目标行号 (核心算法)
		const parentTag = tr.parentElement?.tagName;
		let targetLineNumber = -1;

		if (parentTag === "THEAD") {
			// 表头就是起始行
			targetLineNumber = tableStartLine.number;
		} else if (parentTag === "TBODY") {
			// 数据行：计算索引
			const tbody = tr.parentElement;
			if (!tbody) return;
			const rows = Array.from(tbody.children).filter(el => el.tagName === "TR");
			const rowIndex = rows.indexOf(tr);

			// 核心修正：表头(1) + 分割线(1) + 数据行索引
			targetLineNumber = tableStartLine.number + 2 + rowIndex;
		} else {
			// 兼容无 TBODY 的简单结构
			const table = tr.parentElement;
			if (!table) return;
			const rows = Array.from(table.children).filter(el => el.tagName === "TR");
			const rowIndex = rows.indexOf(tr);

			if (rowIndex === 0) {
				targetLineNumber = tableStartLine.number;
			} else {
				targetLineNumber = tableStartLine.number + rowIndex + 1;
			}
		}

		// 6. 验证行号有效性
		if (targetLineNumber > doc.lines) return;

		const targetLine = doc.line(targetLineNumber);
		const lineText = targetLine.text;

		// 双重确认：目标行真的有图标吗？
		if (!lineText.includes(CHECKED) && !lineText.includes(UNCHECKED)) return;

		// 7. 查找并切换
		const icons = [CHECKED, UNCHECKED];
		for (const icon of icons) {
			const index = lineText.indexOf(icon);

			if (index !== -1) {
				const start = targetLine.from + index;
				const end = start + icon.length;

				// 拦截事件，阻止进入编辑模式
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();

				const newIcon = (icon === CHECKED) ? UNCHECKED : CHECKED;
				cm.dispatch({
					changes: { from: start, to: end, insert: newIcon }
				});

				return;
			}
		}
	}
}