from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

ROOT = Path(__file__).resolve().parent.parent
pdfmetrics.registerFont(TTFont('ArialCV', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialCV-Bold', 'C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('ArialCV', normal='ArialCV', bold='ArialCV-Bold', italic='ArialCV', boldItalic='ArialCV-Bold')
W,H = A4
INK='#18251e'; MUTED='#53645a'; GREEN='#c9f477'; CREAM='#f4f5ec'; DARK='#142019'
DATA={
'vi':{
'edition':'PORTFOLIO CÁ NHÂN / 2026','role':'Ý TƯỞNG · UX/UI · SẢN PHẨM SỐ','hero':['Tò mò.','Thử nghiệm.','Tạo nên.'],
'intro':'Tôi là Thiên Phúc — người yêu thích tạo ra trải nghiệm số, từ việc khám phá ý tưởng và lựa chọn bố cục đến hoàn thiện giao diện.',
'about_label':'VỀ TÔI','about':'Tôi đến với CNTT từ tình yêu dành cho game. Tôi thích tìm hiểu điều mới, thử nhiều phương án và chọn hướng phù hợp với con người, bối cảnh sử dụng. Ngoài màn hình, tôi thích gym, đạp xe và thiên nhiên.',
'index':'DỰ ÁN TUYỂN CHỌN','linksite':'XEM WEBSITE','linkrepo':'XEM MÃ NGUỒN','labels':['BỐI CẢNH','ĐÓNG GÓP','TRẠNG THÁI'],
'projects':[
{'n':'01','title':'GiaSuVLU','tag':'ĐỒ ÁN NHÓM / 2025','subtitle':'Kết nối người học với gia sư sinh viên Văn Lang.','img':'tutor.png','color':'#eaf4d7','url':'https://github.com/ThienPhuc132003/TotNghiep','action':'linkrepo','rows':['Nền tảng hướng đến nhu cầu tìm gia sư, đăng ký và học trực tuyến, với các luồng dành cho người học và gia sư.','Tôi quyết định UX/UI, các luồng giao diện, phát triển frontend và kết nối API. Thành viên còn lại chủ yếu xây dựng database và API.','Đăng nhập email trường qua Microsoft đã hoạt động. Zoom và thanh toán mới ở mức demo/test API; chưa hoàn thiện do điều kiện pháp lý và chi phí.'],'tools':'FIGMA   /   REACT   /   API   /   MICROSOFT'},
{'n':'02','title':'Elysian Wedding','tag':'WEB EXPERIENCE / 2026','subtitle':'Thiết kế một không gian để câu chuyện được cảm nhận.','img':'elysian.png','color':'#f3e8e4','url':'https://elysian-wedding.ely-wedding.workers.dev/','action':'linksite','rows':['Website cưới và sự kiện được thực hiện cho người quen, lấy câu chuyện và cảm xúc làm trọng tâm trải nghiệm.','Tôi tìm tòi ngôn ngữ thiết kế, chọn lọc typography, hình ảnh và bố cục để tạo trải nghiệm tinh tế cho người xem.','Website có thể xem trực tiếp; giao diện và nội dung dự án được trình bày qua đường dẫn bên dưới.'],'tools':'VISUAL DIRECTION   /   TYPOGRAPHY   /   WEB'},
{'n':'03','title':'SLTech','tag':'B2B WEBSITE / 2026','subtitle':'Từ năng lực kỹ thuật đến một câu chuyện rõ ràng.','img':'sltech.png','color':'#e3edf1','url':'https://sltech.vn/','action':'linksite','rows':['Công ty làm việc chủ yếu với đối tác và chủ đầu tư lớn; website cần trình bày năng lực và dự án một cách đáng tin cậy.','Tôi định hướng ý tưởng, UX/UI, hình ảnh và bố cục; sử dụng AI agents hỗ trợ triển khai và kiểm thử.','Website đang vận hành công khai, giới thiệu giải pháp, sản phẩm và dự án của công ty.'],'tools':'PRODUCT THINKING   /   UX/UI   /   AI-ASSISTED'}]},
'en':{
'edition':'PERSONAL PORTFOLIO / 2026','role':'IDEAS · UX/UI · DIGITAL PRODUCTS','hero':['Stay curious.','Experiment.','Make things.'],
'intro':'I’m Thien Phuc — a maker interested in shaping digital experiences, from exploring ideas and layouts to refining an interface.',
'about_label':'ABOUT ME','about':'I came to IT through games. I enjoy learning new things, exploring alternatives and selecting a direction that fits people and context. Away from the screen: the gym, cycling and nature.',
'index':'SELECTED PROJECTS','linksite':'VISIT WEBSITE','linkrepo':'VIEW REPOSITORY','labels':['CONTEXT','CONTRIBUTION','STATUS'],
'projects':[
{'n':'01','title':'GiaSuVLU','tag':'TEAM CAPSTONE / 2025','subtitle':'Connecting learners with Van Lang student tutors.','img':'tutor.png','color':'#eaf4d7','url':'https://github.com/ThienPhuc132003/TotNghiep','action':'linkrepo','rows':['A platform designed around finding a tutor, registering and learning online, with flows for learners and tutors.','I shaped the UX/UI and interface flows, developed the frontend and connected APIs. My teammate primarily built the database and APIs.','Microsoft school-email sign-in worked. Zoom and payments reached API testing/demo only; legal and cost constraints prevented completion.'],'tools':'FIGMA   /   REACT   /   API   /   MICROSOFT'},
{'n':'02','title':'Elysian Wedding','tag':'WEB EXPERIENCE / 2026','subtitle':'Designing a space where a story can be felt.','img':'elysian.png','color':'#f3e8e4','url':'https://elysian-wedding.ely-wedding.workers.dev/','action':'linksite','rows':['A wedding and events website made for an acquaintance, placing story and feeling at the heart of the experience.','I explored the visual language and selected typography, imagery and composition to create a considered experience.','The website is available to explore directly using the link below.'],'tools':'VISUAL DIRECTION   /   TYPOGRAPHY   /   WEB'},
{'n':'03','title':'SLTech','tag':'B2B WEBSITE / 2026','subtitle':'Turning technical capability into a clear story.','img':'sltech.png','color':'#e3edf1','url':'https://sltech.vn/','action':'linksite','rows':['The company works mainly with partners and major project owners; the website needs to communicate its capabilities and projects credibly.','I directed ideas, UX/UI, imagery and layout, using AI agents to support implementation and testing.','The website is live and presents the company’s solutions, products and projects.'],'tools':'PRODUCT THINKING   /   UX/UI   /   AI-ASSISTED'}]}}

def para(c,text,x,top,width,size=10.2,leading=15,color=INK,bold=False):
 style=ParagraphStyle('p',fontName='ArialCV-Bold' if bold else 'ArialCV',fontSize=size,leading=leading,textColor=HexColor(color),alignment=TA_LEFT,allowWidows=0,allowOrphans=0)
 p=Paragraph(text,style);_,h=p.wrap(width,1000);p.drawOn(c,x,top-h);return h

def txt(c,text,x,y,size=9,color=INK,bold=False):
 c.setFont('ArialCV-Bold' if bold else 'ArialCV',size);c.setFillColor(HexColor(color));c.drawString(x,y,text)

def line(c,x1,y,x2,color):
 c.setStrokeColor(HexColor(color));c.setLineWidth(.5);c.line(x1,y,x2,y)

def image(c,file,x,y,w,h):
 im=ImageReader(str(ROOT/'assets'/file)); iw,ih=im.getSize(); scale=max(w/iw,h/ih);dw=iw*scale;dh=ih*scale
 c.saveState();path=c.beginPath();path.rect(x,y,w,h);c.clipPath(path,stroke=0);c.drawImage(im,x+(w-dw)/2,y+h-dh,width=dw,height=dh,mask='auto');c.restoreState()

def render(lang):
 d=DATA[lang];c=canvas.Canvas(str(ROOT/f'portfolio-{lang}.pdf'),pagesize=A4,pageCompression=1);c.setTitle('Thien Phuc | Portfolio');c.setAuthor('Trinh Van Thien Phuc')
 margin=42; right=W-margin; inner=W-2*margin
 c.setFillColor(HexColor(DARK));c.rect(0,0,W,H,fill=1,stroke=0)
 txt(c,'TP / THIÊN PHÚC',margin,H-49,9,'#e9f1e6',True);txt(c,d['edition'],W-242,H-49,8,'#c3d1c4',True);line(c,margin,H-62,right,'#6d8272')
 txt(c,d['role'],margin,H-104,8.3,'#b7cebb',True)
 for i,t in enumerate(d['hero']):txt(c,t,margin,H-165-i*56,47,GREEN if i==2 else '#f4f5ec',True)
 para(c,d['intro'],margin,H-318,inner-50,14,21,'#e5eee1')
 line(c,margin,H-415,right,'#6d8272');txt(c,d['about_label'],margin,H-441,8,'#b7cebb',True);para(c,d['about'],margin+125,H-429,inner-125,10.5,16,'#e5eee1')
 txt(c,d['index'],margin,H-558,8,'#b7cebb',True)
 for i,p in enumerate(d['projects']):
  x=margin+i*(inner/3);txt(c,p['n'],x,H-582,8,GREEN,True);txt(c,p['title'],x,H-601,11,'#f4f5ec',True)
 line(c,margin,61,right,'#6d8272');txt(c,'THIENPHUC203302@GMAIL.COM',margin,42,8,'#e9f1e6');c.linkURL('mailto:thienphuc203302@gmail.com',(margin,38,margin+180,52),relative=0);txt(c,'PORTFOLIO / 01',right-83,42,8,'#b7cebb');c.showPage()
 for idx,p in enumerate(d['projects']):
  c.setFillColor(HexColor(CREAM));c.rect(0,0,W,H,fill=1,stroke=0)
  txt(c,'TP / THIÊN PHÚC',margin,H-49,9,INK,True);txt(c,f"{p['n']} / 03",right-40,H-49,8,MUTED,True);line(c,margin,H-62,right,'#a5b8a8')
  txt(c,p['tag'],margin,H-91,8,MUTED,True);txt(c,p['title'],margin,H-139,35,INK,True);para(c,p['subtitle'],margin,H-157,inner,12,17,MUTED)
  c.setFillColor(HexColor(p['color']));c.roundRect(margin,H-419,inner,233,5,fill=1,stroke=0)
  image(c,p['img'],margin+12,H-407,inner-24,209)
  y=H-448
  for label,body in zip(d['labels'],p['rows']):
   txt(c,label,margin,y,8.5,MUTED,True);h=para(c,body,margin+114,y+8,inner-114,11,16,INK);y-=max(h+13,46)
  line(c,margin,96,right,'#a5b8a8');txt(c,p['tools'],margin,78,7.3,MUTED,True)
  txt(c,d[p['action']],margin,47,8,INK,True);c.linkURL(p['url'],(margin,42,margin+160,60),relative=0);txt(c,f'PORTFOLIO / 0{idx+2}',right-83,47,8,MUTED);c.showPage()
 c.save()
for language in DATA:render(language)

