from pathlib import Path
from io import BytesIO
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
OUT = ROOT / 'downloads'
OUT.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('Body', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Bold', 'C:/Windows/Fonts/arialbd.ttf'))
W, H = A4
INK = '#101712'
PAPER = '#F1F1E8'
ACID = '#CAEF70'

CONTENT = {
    'en': {
        'label': 'PORTFOLIO / SELECTED WORK',
        'role': 'IDEAS  /  UX + UI  /  FRONTEND',
        'headline': ['Curiosity', 'in motion.'],
        'intro': 'I’m Thiên Phúc. I explore ideas, shape interfaces and bring thoughtful digital experiences to life.',
        'about_label': 'A LITTLE ABOUT ME',
        'about': 'Games brought me into IT; curiosity led me towards design. I like exploring new ideas and comparing possibilities. Away from the screen: the gym, cycling, walks and nature.',
        'content_labels': ['CONTEXT', 'MY CONTRIBUTION', 'STATUS'],
        'source': 'EXPLORE PROJECT',
        'projects': [
            ('SLTech', '01 / TECHNOLOGY', 'A digital presence for the work behind the business.', 'A company website for an audience of partners and major project owners.', 'I shaped the ideas, UX/UI, imagery and layout. AI agents supported implementation and testing; I reviewed and guided the visual direction.', 'The public website is available to explore.', 'sltech.png', 'https://sltech.vn/', '#9BC7DF'),
            ('Elysian Wedding', '02 / WEDDING', 'A personal story, explored through design.', 'A wedding website created for an acquaintance, shaped through visual exploration and conversation.', 'I start with the client’s ideas and references, use AI to create sample options, review them and refine the direction after feedback.', 'The public website is available to explore.', 'elysian.png', 'https://elysian-wedding.ely-wedding.workers.dev/', '#E9C9BC'),
            ('GiaSuVLU', '03 / TEAM CAPSTONE', 'An interface connecting learners and tutors.', 'A team graduation project exploring a tutoring platform for learners and Van Lang student tutors.', 'I decided the UX/UI and interface flows, developed the frontend and connected APIs. My teammate primarily built the database and APIs.', 'Microsoft school-email sign-in worked. Zoom and payments reached API tests only due to legal and cost constraints; the backend is currently unavailable.', 'tutor.png', 'https://github.com/ThienPhuc132003/TotNghiep', '#EE6B63'),
        ],
    },
    'vi': {
        'label': 'PORTFOLIO / DỰ ÁN CHỌN LỌC',
        'role': 'Ý TƯỞNG  /  UX + UI  /  FRONTEND',
        'headline': ['Tò mò', 'để sáng tạo.'],
        'intro': 'Mình là Thiên Phúc. Mình khám phá ý tưởng, tạo giao diện và mang sự chỉn chu vào trải nghiệm số.',
        'about_label': 'MỘT CHÚT VỀ MÌNH',
        'about': 'Game đưa mình đến với CNTT; sự tò mò dẫn mình tới thiết kế. Mình thích tìm hiểu điều mới và cân nhắc nhiều phương án. Ngoài màn hình: tập gym, đạp xe, đi dạo và thiên nhiên.',
        'content_labels': ['BỐI CẢNH', 'ĐÓNG GÓP', 'TRẠNG THÁI'],
        'source': 'XEM DỰ ÁN',
        'projects': [
            ('SLTech', '01 / CÔNG NGHỆ', 'Không gian số cho những dự án của doanh nghiệp.', 'Website doanh nghiệp dành cho đối tác và chủ đầu tư lớn.', 'Mình định hướng ý tưởng, UX/UI, hình ảnh và bố cục. AI agent hỗ trợ triển khai và kiểm thử; mình đánh giá và định hướng hình ảnh.', 'Website công khai hiện có thể truy cập.', 'sltech.png', 'https://sltech.vn/', '#9BC7DF'),
            ('Elysian Wedding', '02 / WEBSITE CƯỚI', 'Một câu chuyện cá nhân được kể qua thiết kế.', 'Website cưới cho người quen, được hình thành qua quá trình tìm tòi và trao đổi.', 'Mình bắt đầu từ ý tưởng và tư liệu khách hàng, dùng AI tạo các mẫu, đánh giá và điều chỉnh hướng hình ảnh theo phản hồi.', 'Website công khai hiện có thể truy cập.', 'elysian.png', 'https://elysian-wedding.ely-wedding.workers.dev/', '#E9C9BC'),
            ('GiaSuVLU', '03 / ĐỒ ÁN NHÓM', 'Giao diện kết nối người học và gia sư.', 'Đồ án tốt nghiệp nhóm về nền tảng kết nối người học và gia sư sinh viên Văn Lang.', 'Mình quyết định UX/UI, luồng giao diện, phát triển frontend và kết nối API. Thành viên còn lại chủ yếu xây dựng database và API.', 'Đăng nhập email trường qua Microsoft từng hoạt động. Zoom và thanh toán mới thử API do điều kiện pháp lý, chi phí; backend hiện không hoạt động.', 'tutor.png', 'https://github.com/ThienPhuc132003/TotNghiep', '#EE6B63'),
        ],
    },
}

def color(value):
    return HexColor(value)

def text(c, value, x, y, size=9, shade=INK, bold=False):
    c.setFillColor(color(shade))
    c.setFont('Bold' if bold else 'Body', size)
    c.drawString(x, y, value)

def paragraph(c, value, x, top, width, size=11, leading=16, shade=INK):
    style = ParagraphStyle('portfolio', fontName='Body', fontSize=size, leading=leading, textColor=color(shade))
    p = Paragraph(value.replace('&', '&amp;'), style)
    _, height = p.wrap(width, H)
    p.drawOn(c, x, top - height)
    return height

def jpeg(path):
    with Image.open(path) as source:
        buf = BytesIO()
        source.convert('RGB').save(buf, format='JPEG', quality=92, subsampling=0, optimize=True)
        buf.seek(0)
        return ImageReader(buf)

def contain(c, reader, x, y, width, height):
    iw, ih = reader.getSize()
    scale = min(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(reader, x + (width - dw) / 2, y + (height - dh) / 2, width=dw, height=dh)

def make(lang):
    d = CONTENT[lang]
    c = canvas.Canvas(str(OUT / f'thien-phuc-portfolio-{lang}.pdf'), pagesize=A4, pageCompression=1)
    c.setTitle('Thiên Phúc — Portfolio')
    c.setAuthor('Trịnh Văn Thiên Phúc')
    c.setFillColor(color(INK)); c.rect(0, 0, W, H, fill=1, stroke=0)
    text(c, 'PHÚC / 2026', 42, H-52, 9, PAPER, True)
    text(c, d['label'], 335, H-52, 8, ACID, True)
    c.setStrokeColor(color('#708070')); c.line(42, H-68, W-42, H-68)
    text(c, d['role'], 42, H-109, 8, ACID, True)
    for n, line in enumerate(d['headline']):
        text(c, line, 40, H-178-n*54, 47, PAPER if n == 0 else ACID, True)
    paragraph(c, d['intro'], 42, H-273, 290, 13, 19, PAPER)
    portrait = jpeg(ROOT / 'phuc-portrait.png')
    c.saveState()
    crop = c.beginPath(); crop.rect(W-220, H-374, 178, 245); c.clipPath(crop, stroke=0)
    iw, ih = portrait.getSize(); scale = max(178/iw, 245/ih)
    dw, dh = iw*scale, ih*scale
    c.drawImage(portrait, W-220+(178-dw)/2, H-374+(245-dh)/2, width=dw, height=dh)
    c.restoreState()
    text(c, d['about_label'], 42, H-433, 8, ACID, True)
    paragraph(c, d['about'], 42, H-452, 320, 10.5, 16, PAPER)
    c.setStrokeColor(color('#708070')); c.line(42, 75, W-42, 75)
    text(c, 'THIENPHUC203302@GMAIL.COM', 42, 52, 8, PAPER, True)
    c.linkURL('mailto:thienphuc203302@gmail.com', (42, 47, 230, 64), relative=0)
    text(c, '01 / 04', W-78, 52, 8, ACID, True); c.showPage()
    for idx, project in enumerate(d['projects'], 1):
        title, tag, subtitle, context, contribution, status, image, url, accent = project
        c.setFillColor(color(PAPER)); c.rect(0, 0, W, H, fill=1, stroke=0)
        text(c, 'PHÚC / SELECTED WORK', 42, H-48, 8, INK, True)
        text(c, f'0{idx} / 03', W-78, H-48, 8, INK, True)
        c.setStrokeColor(color('#99A99B')); c.line(42, H-62, W-42, H-62)
        text(c, tag, 42, H-90, 8, '#4C6154', True)
        text(c, title, 40, H-137, 34 if len(title)<13 else 29, INK, True)
        paragraph(c, subtitle, 42, H-151, W-84, 11, 16, '#4C6154')
        c.setFillColor(color(accent)); c.rect(42, H-413, W-84, 220, fill=1, stroke=0)
        contain(c, jpeg(ROOT / 'assets' / image), 54, H-401, W-108, 196)
        top = H-444
        for label, body in zip(d['content_labels'], (context, contribution, status)):
            text(c, label, 42, top-9, 8, '#4C6154', True)
            used = paragraph(c, body, 154, top, W-196, 10.2, 15, INK)
            top -= max(used+19, 47)
        c.setStrokeColor(color('#99A99B')); c.line(42, 76, W-42, 76)
        text(c, d['source'], 42, 53, 8, INK, True)
        c.linkURL(url, (42, 47, 215, 66), relative=0)
        text(c, f'0{idx+1} / 04', W-78, 53, 8, INK, True)
        c.showPage()
    c.save()

for language in ('en', 'vi'):
    make(language)
