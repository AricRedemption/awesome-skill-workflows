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
    draw.text((122, 1510), "AI Agent / localized text / localized text", font=font(FONT_REGULAR, 34), fill="#6A615A")
    img.save(path, quality=95)


cards = [
    (
        "01",
        "localized text 1 localized text",
        "localized text,\nlocalized text",
        "localized text 3 localized text AI Agent:localized text,localized text,localized text,localized text.localized text,localized text.",
        "#1F5C4A",
    ),
    (
        "02",
        "localized text Agent localized text 3 localized text",
        "localized text / localized text / localized text",
        "localized text:localized text,localized text.\nlocalized text:localized text,localized text,localized text.\nlocalized text:localized text,localized text,localized text,localized text.",
        "#8D3F2F",
    ),
    (
        "03",
        "localized text",
        "localized text / localized text / localized text / localized text",
        "localized text Agent localized text"localized text".localized text:localized text,localized text,localized text,localized text.",
        "#254F7A",
    ),
    (
        "04",
        "localized text",
        "localized text 1 localized text,\nlocalized text",
        "localized text.localized text,localized text:localized text,localized text,localized text/localized text.",
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
    "title": "AI Agentlocalized text1localized text",
    "content": (
        "localized text AI Agent localized text,localized text,localized text,localized text,localized text.\n\n"
        "localized text 3 localized text:\n"
        "1. localized text:localized text,localized text,localized text.\n"
        "2. localized text:localized text,localized text,localized text,localized text.\n"
        "3. localized text:localized text,localized text.\n\n"
        "localized text:localized text,localized text,localized text,localized text.\n\n"
        "localized text.localized text 3 localized text Agent,localized text."
    ),
    "tags": "AIlocalized text,localized text,localized text,AIAgent,localized text,localized text",
    "media_paths": media_paths,
    "source_note": str(RUN_DIR / "generated-note.md"),
}

(RUN_DIR / "publish-package.json").write_text(json.dumps(package, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(json.dumps(package, ensure_ascii=False, indent=2))
