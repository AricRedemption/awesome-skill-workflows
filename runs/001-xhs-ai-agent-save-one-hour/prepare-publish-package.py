from pathlib import Path
import json
import textwrap

from PIL import Image, ImageDraw, ImageFont


RUN_DIR = Path(__file__).parent
ASSET_DIR = RUN_DIR / "media"
ASSET_DIR.mkdir(exist_ok=True)

FONT_REGULAR = "/System/Library/Fonts/Hiragino Sans GB.ttc"
FONT_BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_wrapped(draw, text, xy, font_obj, fill, width_chars, line_gap=14):
    x, y = xy
    for para in text.split("\n"):
        if not para.strip():
            y += font_obj.size + line_gap
            continue
        for line in textwrap.wrap(para, width=width_chars, break_long_words=False):
            draw.text((x, y), line, font=font_obj, fill=fill)
            y += font_obj.size + line_gap
    return y


def make_card(path, eyebrow, title, body, accent):
    img = Image.new("RGB", (1242, 1660), "#F6F1E8")
    draw = ImageDraw.Draw(img)

    draw.rectangle((0, 0, 1242, 1660), fill="#F6F1E8")
    draw.rectangle((0, 0, 1242, 160), fill=accent)
    draw.text((92, 56), eyebrow, font=font(FONT_BOLD, 46), fill="#FBF7EE")

    draw.rounded_rectangle((82, 230, 1160, 1450), radius=36, fill="#FFFDF8", outline="#201A16", width=4)
    draw.text((122, 300), title, font=font(FONT_BOLD, 70), fill="#201A16")
    draw.line((122, 415, 1070, 415), fill=accent, width=8)
    draw_wrapped(draw, body, (122, 480), font(FONT_REGULAR, 43), "#201A16", 22)
    draw.text((122, 1510), "AI Agent / 职场效率 / 可复制工作流", font=font(FONT_REGULAR, 34), fill="#6A615A")
    img.save(path, quality=95)


cards = [
    (
        "01",
        "每天省 1 小时",
        "不是多努力，\n是少做重复劳动",
        "把每天重复 3 次以上的事交给 AI Agent：资料整理、会议纪要、选题清单、初稿生成。先从低风险、规则清楚的任务开始。",
        "#1F5C4A",
    ),
    (
        "02",
        "最适合交给 Agent 的 3 类事",
        "重复型 / 半结构化 / 起稿卡住",
        "重复型：邮件要点、会议行动项。\n半结构化：用户反馈、访谈、素材整理。\n起稿卡住：先出底稿，再由你判断保留、删除、补证据。",
        "#8D3F2F",
    ),
    (
        "03",
        "我的固定提示词结构",
        "输入 / 目标 / 输出 / 禁区",
        "给 Agent 任务时别只说“帮我写一下”。更稳定的格式是：输入是什么、目标是什么、输出长什么样、哪些内容不能写。",
        "#254F7A",
    ),
    (
        "04",
        "今天就能试的动作",
        "挑 1 个重复工作，\n先自动化一小段",
        "不要一上来追求全自动。先选一个最稳定、最容易复用的环节：信息整理、文案起稿、会议/待办总结。",
        "#6B4E16",
    ),
]

media_paths = []
for idx, eyebrow, title, body, accent in cards:
    path = ASSET_DIR / f"xhs-ai-agent-save-one-hour-{idx}.png"
    make_card(path, eyebrow, title, body, accent)
    media_paths.append(str(path))

package = {
    "mode": "draft_preferred",
    "platform": "xiaohongshu",
    "title": "AI Agent每天省1小时",
    "content": (
        "普通人用 AI Agent 省时间，最有效的不是追求全自动，而是先接走重复、低价值、容易拖延的小事。\n\n"
        "我建议从 3 类开始：\n"
        "1. 信息整理：邮件要点、会议纪要、资料归类。\n"
        "2. 文案起稿：标题、大纲、初稿、素材整理。\n"
        "3. 待办总结：会后行动项、每日任务拆解。\n\n"
        "提示词结构也很简单：输入是什么、目标是什么、输出要长什么样、哪些内容不能写。\n\n"
        "别一开始就追求全自动。先把每天重复 3 次以上的一件事交给 Agent，稳定之后再扩展。"
    ),
    "tags": "AI工具,效率提升,职场效率,AIAgent,内容创作,工作流",
    "media_paths": media_paths,
    "source_note": str(RUN_DIR / "generated-note.md"),
}

(RUN_DIR / "publish-package.json").write_text(json.dumps(package, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(json.dumps(package, ensure_ascii=False, indent=2))
