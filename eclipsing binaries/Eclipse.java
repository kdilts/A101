/*     */ import java.applet.Applet;
/*     */ import java.awt.Button;
/*     */ import java.awt.Choice;
/*     */ import java.awt.Color;
/*     */ import java.awt.Component;
/*     */ import java.awt.Container;
/*     */ import java.awt.Dimension;
/*     */ import java.awt.Event;
/*     */ import java.awt.Graphics;
/*     */ import java.awt.Image;
/*     */ import java.awt.Label;
/*     */ import java.awt.Panel;
/*     */ import java.awt.TextField;
/*     */ import java.io.PrintStream;
/*     */ 
/*     */ public class Eclipse
/*     */   extends Applet
/*     */   implements Runnable
/*     */ {
/*     */   int angle;
/*     */   int ang;
/*     */   int prevang;
/*     */   int i;
/*     */   int r;
/*     */   int circW;
/*     */   int circH;
/*     */   int radconv;
/*     */   int graphtop;
/*     */   int graphbot;
/*     */   int graphleft;
/*     */   int graphright;
/*     */   int ra;
/*     */   int i2;
/*     */   double prevx;
/*     */   double preva;
/*     */   double h;
/*     */   double ri1;
/*     */   double ri2;
/*     */   double r1;
/*     */   double r2;
/*     */   double aover;
/*     */   double ad;
/*     */   double b;
/*     */   double m;
/*     */   double dth;
/*     */   double l;
/*     */   double prevco;
/*     */   double t1;
/*     */   double t2;
/*     */   double prevm;
/*     */   double previ;
/*     */   double a;
/*     */   double x;
/*     */   double loc;
/*     */   double mmax;
/*     */   double mmin;
/*     */   double prevm2;
/*     */   double ns1t;
/*     */   double ns1r;
/*     */   double ns2t;
/*     */   double ns2r;
/*     */   double prevhi;
/*     */   double hi;
/*     */   double bneh1;
/*     */   double co;
/*     */   double z;
/*     */   double mset;
/*     */   double d1;
/*     */   double d2;
/*     */   double m1;
/*     */   double m2;
/*     */   TextField t;
/*     */   Choice ch;
/*     */   Choice ch2;
/*     */   Button bu;
/*     */   Button cl;
/*     */   Button pa;
/*     */   LabeledScrollbar ansb;
/*     */   LabeledScrollbar rEnter;
/*  20 */   double[] prev = new double[10];
/*     */   boolean changed;
/*     */   boolean running;
/*     */   Thread kicker;
/*     */   Dimension offDimension;
/*     */   Color star1;
/*     */   Color star2;
/*     */   Color oc;
/*     */   Color bc;
/*     */   Color ac;
/*     */   Color fc;
/*     */   Color gc;
/*     */   Color kc;
/*     */   Color mc;
/*     */   Color tc1;
/*     */   Color tc2;
/*     */   int orbitwi;
/*     */   int orbithi;
/*     */   int graphwi;
/*     */   int graphhi;
/*     */   PlotBox2 pb;
/*     */   Panel orbitpanel;
/*     */   Panel graphpanel;
/*     */   Graphics orbitpanelg;
/*     */   Graphics graphpanelg;
/*     */   Label type1;
/*     */   Label type2;
/*     */   Label temp1;
/*     */   Label temp2;
/*     */   Label rad1;
/*     */   Label rad2;
/*     */   Label aofi;
/*     */   Label sep;
/*     */   Image im1;
/*     */   Image im2;
/*     */   Graphics offscreen1;
/*     */   Graphics offscreen2;
/*     */   
/*     */   public void init()
/*     */   {
/*  39 */     int j = 240;
/*  40 */     int k = 200;
/*  41 */     this.orbitwi = (size().width - j);
/*  42 */     this.orbithi = k;
/*  43 */     this.graphwi = this.orbitwi;
/*  44 */     this.graphhi = (size().height - this.orbithi);
/*     */     try
/*     */     {
/*  49 */       this.im1 = createImage(this.orbitwi, this.orbithi);
/*  50 */       this.offscreen1 = this.im1.getGraphics();
/*  51 */       this.im2 = createImage(this.graphwi, this.graphhi);
/*  52 */       this.offscreen2 = this.im2.getGraphics();
/*     */     }
/*     */     catch (Exception localException)
/*     */     {
/*  54 */       this.offscreen1 = null;
/*  55 */       this.offscreen2 = null;
/*     */     }
/*  60 */     setLayout(null);
/*  61 */     setBackground(Color.white);
/*     */     
/*     */ 
/*     */ 
/*  65 */     this.bu = new Button("Enter values");
/*  66 */     add(this.bu);
/*  67 */     this.bu.reshape(0, 0, 80, 20);
/*  68 */     this.cl = new Button("Clear graph");
/*  69 */     add(this.cl);
/*  70 */     this.cl.reshape(85, 0, 80, 20);
/*  71 */     this.pa = new Button("Pause");
/*  72 */     add(this.pa);
/*  73 */     this.pa.reshape(170, 0, 60, 20);
/*     */     
/*  75 */     Label localLabel1 = new Label("Angle:");
/*  76 */     add(localLabel1);
/*  77 */     localLabel1.reshape(0, 40, 50, 20);
/*  78 */     this.angle = 10;
/*  79 */     this.ansb = new LabeledScrollbar(0, 90, 0.0D, 90.0D, 1.0D, 80, 40, 150, this.angle, this);
/*  80 */     this.ansb.setLabel(this.ansb.getValue());
/*  81 */     Label localLabel2 = new Label("Separation:");
/*  82 */     add(localLabel2);
/*  83 */     localLabel2.reshape(0, 80, 70, 20);
/*  84 */     this.ra = 12;
/*  85 */     this.rEnter = new LabeledScrollbar(0, 25, 0.0D, 25.0D, 1.0D, 80, 80, 150, this.ra, this);
/*  86 */     this.rEnter.setLabel(this.rEnter.getValue());
/*     */     
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*  95 */     String str1 = "B";
/*  96 */     String str2 = "A";
/*  97 */     String str3 = "F";
/*  98 */     String str4 = "G";
/*  99 */     String str5 = "K";
/* 100 */     String str6 = "M";
/*     */     
/* 102 */     Label localLabel3 = new Label("Star 1:");
/* 103 */     add(localLabel3);
/* 104 */     localLabel3.reshape(0, 130, 50, 20);
/* 105 */     this.ch = new Choice();
/* 106 */     this.ch.addItem(str1);
/* 107 */     this.ch.addItem(str2);
/* 108 */     this.ch.addItem(str3);
/* 109 */     this.ch.addItem(str4);
/* 110 */     this.ch.addItem(str5);
/* 111 */     this.ch.addItem(str6);
/* 112 */     add(this.ch);
/* 113 */     this.ch.reshape(50, 130, 50, 20);
/* 114 */     Label localLabel4 = new Label("Star 2:");
/* 115 */     add(localLabel4);
/* 116 */     localLabel4.reshape(130, 130, 50, 20);
/* 117 */     this.ch2 = new Choice();
/* 118 */     this.ch2.addItem(str1);
/* 119 */     this.ch2.addItem(str2);
/* 120 */     this.ch2.addItem(str3);
/* 121 */     this.ch2.addItem(str4);
/* 122 */     this.ch2.addItem(str5);
/* 123 */     this.ch2.addItem(str6);
/* 124 */     add(this.ch2);
/* 125 */     this.ch2.reshape(180, 130, 50, 20);
/*     */     
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/* 131 */     int n = 0;
/* 132 */     int i1 = size().height - 230;
/* 133 */     int i3 = 20;
/* 134 */     Label localLabel5 = new Label("CURRENT VALUES:");
/* 135 */     add(localLabel5);
/* 136 */     localLabel5.reshape(n, i1, 150, 20);
/* 137 */     Label localLabel6 = new Label("Star 1:");
/* 138 */     add(localLabel6);
/* 139 */     localLabel6.reshape(n + 20, i1 + i3, 100, i3);
/* 140 */     Label localLabel7 = new Label("Type: ");
/* 141 */     add(localLabel7);
/* 142 */     localLabel7.reshape(n + 30, i1 + 2 * i3, 50, i3);
/* 143 */     this.type1 = new Label("");
/* 144 */     add(this.type1);
/* 145 */     this.type1.reshape(n + 90, i1 + 2 * i3, 100, i3);
/* 146 */     Label localLabel8 = new Label("T: ");
/* 147 */     add(localLabel8);
/* 148 */     localLabel8.reshape(n + 30, i1 + 3 * i3, 50, i3);
/* 149 */     this.temp1 = new Label("");
/* 150 */     add(this.temp1);
/* 151 */     this.temp1.reshape(n + 90, i1 + 3 * i3, 100, i3);
/* 152 */     Label localLabel9 = new Label("R: ");
/* 153 */     add(localLabel9);
/* 154 */     localLabel9.reshape(n + 30, i1 + 4 * i3, 50, i3);
/* 155 */     this.rad1 = new Label("");
/* 156 */     add(this.rad1);
/* 157 */     this.rad1.reshape(n + 90, i1 + 4 * i3, 100, i3);
/* 158 */     Label localLabel10 = new Label("Star 2:");
/* 159 */     add(localLabel10);
/* 160 */     localLabel10.reshape(n + 20, i1 + 5 * i3, 100, i3);
/* 161 */     Label localLabel11 = new Label("Type: ");
/* 162 */     add(localLabel11);
/* 163 */     localLabel11.reshape(n + 30, i1 + 6 * i3, 50, i3);
/* 164 */     this.type2 = new Label("");
/* 165 */     add(this.type2);
/* 166 */     this.type2.reshape(n + 90, i1 + 6 * i3, 100, i3);
/* 167 */     Label localLabel12 = new Label("T: ");
/* 168 */     add(localLabel12);
/* 169 */     localLabel12.reshape(n + 30, i1 + 7 * i3, 50, i3);
/* 170 */     this.temp2 = new Label("");
/* 171 */     add(this.temp2);
/* 172 */     this.temp2.reshape(n + 90, i1 + 7 * i3, 100, i3);
/* 173 */     Label localLabel13 = new Label("R: ");
/* 174 */     add(localLabel13);
/* 175 */     localLabel13.reshape(n + 30, i1 + 8 * i3, 50, i3);
/* 176 */     this.rad2 = new Label("");
/* 177 */     add(this.rad2);
/* 178 */     this.rad2.reshape(n + 90, i1 + 8 * i3, 100, i3);
/* 179 */     this.aofi = new Label("");
/* 180 */     add(this.aofi);
/* 181 */     this.aofi.reshape(n + 20, i1 + 9 * i3 + 10, 200, i3);
/* 182 */     this.sep = new Label("");
/* 183 */     add(this.sep);
/* 184 */     this.sep.reshape(n + 20, i1 + 10 * i3 + 10, 200, i3);
/*     */     
/*     */ 
/*     */ 
/*     */ 
/* 189 */     this.orbitpanel = new Panel();
/* 190 */     add(this.orbitpanel);
/* 191 */     this.orbitpanel.reshape(j, 0, this.orbitwi, this.orbithi);
/* 192 */     this.orbitpanelg = this.orbitpanel.getGraphics();
/*     */     
/*     */ 
/* 195 */     this.graphpanel = new Panel();
/* 196 */     add(this.graphpanel);
/* 197 */     this.graphpanel.reshape(j, this.orbithi, this.graphwi, this.graphhi);
/* 198 */     this.graphpanelg = this.graphpanel.getGraphics();
/* 199 */     Label localLabel14 = new Label("L");
/* 200 */     add(localLabel14);
/*     */     
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/* 206 */     this.i = 270;
/* 207 */     this.preva = 1.0D;
/* 208 */     this.prevx = 1.0D;
/* 209 */     this.prevco = 1.0D;
/* 210 */     this.prevm = 0.0D;
/* 211 */     this.prevm2 = 0.0D;
/* 212 */     this.previ = 265.0D;
/* 213 */     this.prevhi = -1.0D;
/* 214 */     this.ri1 = 3.0D;
/* 215 */     this.ns1r = 3.0D;
/*     */     
/* 217 */     this.ri2 = 1.5D;
/* 218 */     this.ns2r = 4.9D;
/* 219 */     this.r1 = (5.0D * this.ri1);
/* 220 */     this.r2 = (5.0D * this.ri2);
/* 221 */     this.t1 = 10000.0D;
/* 222 */     this.ns1t = 10000.0D;
/*     */     
/*     */ 
/* 225 */     this.t2 = 7500.0D;
/* 226 */     this.ns2t = 7500.0D;
/*     */     
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/* 239 */     this.ch.select(str2);
/* 240 */     this.ch2.select(str3);
/* 241 */     int i4 = 50;
/* 242 */     int i5 = 20;
/* 243 */     int i6 = 50;
/* 244 */     this.graphtop = 0;
/* 245 */     this.graphbot = (this.graphhi - i4);
/* 246 */     this.graphleft = i6;
/* 247 */     this.graphright = (this.graphwi - i5);
/* 248 */     localLabel14.reshape(j - 20, this.orbithi + (this.graphbot - this.graphtop) / 2, 20, 20);
/* 249 */     this.radconv = 7;
/* 250 */     this.loc = 20.0D;
/* 251 */     this.bneh1 = 0.0D;
/* 252 */     this.co = 0.0D;
/* 253 */     compute();
/* 254 */     double d = this.mmax - this.mmin;
/* 255 */     this.z = ((this.graphtop - this.graphbot) / d);
/* 256 */     this.mset = ((this.mmax * this.graphbot - this.mmin * this.graphtop) / d);
/* 257 */     this.changed = false;
/* 258 */     this.running = false;
/* 259 */     this.oc = new Color(181, 255, 250);
/* 260 */     this.bc = new Color(111, 255, 245);
/* 261 */     this.ac = new Color(0, 200, 246);
/* 262 */     this.fc = new Color(39, 255, 220);
/* 263 */     this.gc = new Color(251, 255, 80);
/* 264 */     this.kc = new Color(255, 126, 32);
/* 265 */     this.mc = new Color(255, 22, 25);
/* 266 */     this.tc1 = new Color(0, 0, 0);
/* 267 */     this.tc2 = new Color(0, 0, 0);
/* 268 */     this.star1 = this.ac;
/* 269 */     this.star2 = this.fc;
/* 270 */     this.tc1 = this.star1;
/* 271 */     this.tc2 = this.star2;
/* 272 */     this.i2 = 20;
/* 273 */     repaint();
/*     */   }
/*     */   
/*     */   public void reinit()
/*     */   {
/* 277 */     this.offscreen1.setColor(Color.white);
/* 278 */     this.offscreen1.fillRect(0, 0, this.orbitwi, this.orbithi);
/* 279 */     this.offscreen2.setColor(Color.white);
/* 280 */     this.offscreen2.fillRect(0, 0, this.graphwi, this.graphhi);
/*     */     
/*     */ 
/*     */ 
/*     */ 
/* 285 */     this.i = 270;
/* 286 */     this.type1.setText(this.ch.getSelectedItem());
/* 287 */     this.temp1.setText(this.t1 + "K");
/* 288 */     this.rad1.setText(this.ri1 + " Solar radii");
/* 289 */     this.type2.setText(this.ch2.getSelectedItem());
/* 290 */     this.temp2.setText(this.t2 + "K");
/* 291 */     this.rad2.setText(this.ri2 + " Solar radii");
/* 292 */     this.aofi.setText("Angle of Inclination: " + this.angle + " degrees");
/* 293 */     this.sep.setText("Separation: " + this.ra + " Solar radii");
/*     */     
/*     */ 
/* 296 */     this.r1 = (this.radconv * this.ri1);
/* 297 */     this.r2 = (this.radconv * this.ri2);
/* 298 */     this.r = (this.radconv * this.ra);
/* 299 */     this.bneh1 = Math.sin(6.283185307179586D * this.angle / 360.0D);
/* 300 */     this.co = (90.0D * Math.sin(6.283185307179586D * this.angle / 360.0D) - (180 - this.angle));
/* 301 */     this.circW = (this.orbitwi / 2);
/* 302 */     this.circH = (this.orbithi / 2);
/* 303 */     compute();
/* 304 */     double d = this.mmax - this.mmin;
/* 305 */     this.z = ((this.graphtop - this.graphbot) / d);
/* 306 */     this.mset = ((this.mmax * this.graphbot - this.mmin * this.graphtop) / d);
/* 307 */     System.out.println((float)this.mmin + "");
/* 308 */     System.out.println((float)this.mmax + "");
/* 309 */     PlotBox2 localPlotBox2 = new PlotBox2(0.0F, 360.0F, 30.0F, 60.0F, false, (float)this.mmin, (float)this.mmax, 0.125F, 0.125F, false, "Theta", this.graphleft, this.graphtop, this.graphright - this.graphleft, this.graphbot);
/* 310 */     localPlotBox2.DrawIt(this.offscreen2);
/* 311 */     if (this.prevhi == -1.0D) {
/* 312 */       this.prevhi = this.mmax;
/*     */     }
/* 314 */     this.running = true;
/*     */   }
/*     */   
/*     */   public void update(Graphics paramGraphics)
/*     */   {
/* 319 */     paint(paramGraphics);
/*     */   }
/*     */   
/*     */   public void paint(Graphics paramGraphics)
/*     */   {
/* 323 */     this.orbitpanelg.drawImage(this.im1, 0, 0, this);
/* 324 */     this.graphpanelg.drawImage(this.im2, 0, 0, this);
/*     */   }
/*     */   
/*     */   public void evolve()
/*     */   {
/* 328 */     if (!this.running) {
/* 329 */       reinit();
/*     */     }
/* 332 */     this.offscreen1.setColor(getBackground());
/* 333 */     this.offscreen1.fillRect(0, 0, this.orbitwi, this.orbithi);
/*     */     
/*     */ 
/* 336 */     this.ansb.setLabel(this.ansb.getValue());
/* 337 */     this.rEnter.setLabel(this.rEnter.getValue());
/*     */     
/* 339 */     this.b = (6.283185307179586D * this.i / 360.0D);
/* 340 */     this.x = Math.sin(this.b);
/* 341 */     this.a = (Math.cos(this.b) * Math.sin(6.283185307179586D * this.angle / 360.0D));
/* 342 */     this.offscreen1.setColor(Color.black);
/* 343 */     this.offscreen1.fillOval(this.circW - 2, this.circH - 2, 4, 4);
/* 344 */     if (this.r1 > this.r2)
/*     */     {
/* 345 */       double d = this.d1;
/* 346 */       this.d1 = this.d2;
/* 347 */       this.d2 = d;
/*     */     }
/* 351 */     if (((this.i > 450) && (this.r1 < this.r2)) || ((this.i < 450) && (this.r1 > this.r2)))
/*     */     {
/* 352 */       drawSun(this.offscreen1, Color.white);
/* 353 */       drawOtherStar(this.offscreen1, Color.white);
/* 354 */       drawOtherStar(this.offscreen1, this.tc1);
/* 355 */       drawSun(this.offscreen1, this.tc2);
/*     */     }
/*     */     else
/*     */     {
/* 357 */       drawOtherStar(this.offscreen1, Color.white);
/* 358 */       drawSun(this.offscreen1, Color.white);
/* 359 */       drawSun(this.offscreen1, this.tc2);
/* 360 */       drawOtherStar(this.offscreen1, this.tc1);
/*     */     }
/* 362 */     this.offscreen2.setColor(Color.black);
/* 363 */     this.preva = this.a;
/* 364 */     this.prevx = this.x;
/* 365 */     this.prevco = this.co;
/* 366 */     this.ang = this.angle;
/* 367 */     compute();
/* 368 */     this.offscreen2.setColor(Color.white);
/* 369 */     this.hi = (this.z * this.m + this.mset);
/* 370 */     int j = (int)((this.i - 230 - this.graphleft) * (this.graphright - this.graphleft) / 360.0D + this.graphleft + 10.0D);
/* 371 */     int k = (int)((this.previ - 230.0D - this.graphleft) * (this.graphright - this.graphleft) / 360.0D + this.graphleft + 10.0D);
/* 372 */     this.offscreen2.fillArc(k, (int)this.prevhi, 4, 4, 0, 360);
/* 373 */     this.offscreen2.setColor(Color.magenta);
/* 374 */     this.offscreen2.fillArc(j, (int)this.hi, 4, 4, 0, 360);
/* 375 */     this.offscreen2.setColor(Color.black);
/* 376 */     if ((this.i > 220 + this.graphleft) && (this.previ != 630.0D)) {
/* 377 */       this.offscreen2.drawLine(k, (int)this.prevhi, j, (int)this.hi);
/*     */     }
/* 379 */     this.prevhi = this.hi;
/* 380 */     this.previ = this.i;
/* 381 */     this.prevm = this.m;
/* 382 */     repaint();
/*     */   }
/*     */   
/*     */   public void drawSun(Graphics paramGraphics, Color paramColor)
/*     */   {
/* 385 */     paramGraphics.setColor(paramColor);
/* 386 */     paramGraphics.fillArc((int)(this.circW + this.d2 * this.prevx - this.r2), (int)(this.circH + this.d2 * this.preva - this.r2), (int)(2.0D * this.r2), (int)(2.0D * this.r2), 0, 360);
/*     */   }
/*     */   
/*     */   public void drawOtherStar(Graphics paramGraphics, Color paramColor)
/*     */   {
/* 389 */     paramGraphics.setColor(paramColor);
/* 390 */     paramGraphics.fillArc((int)(this.circW + this.d1 * this.prevx - this.r1), (int)(this.circH + this.d1 * this.preva - this.r1), (int)(2.0D * this.r1), (int)(2.0D * this.r1), 0, 360);
/*     */   }
/*     */   
/*     */   public void getvals(String paramString1, String paramString2)
/*     */   {
/* 393 */     if (paramString1.equals("O"))
/*     */     {
/* 394 */       this.t2 = 40000.0D;
/* 395 */       this.ri2 = 13.0D;
/* 396 */       this.tc2 = this.oc;
/*     */     }
/* 397 */     else if (paramString1.equals("B"))
/*     */     {
/* 398 */       this.t2 = 28000.0D;
/* 399 */       this.ri2 = 4.9D;
/* 400 */       this.tc2 = this.bc;
/*     */     }
/* 401 */     else if (paramString1.equals("A"))
/*     */     {
/* 402 */       this.t2 = 10000.0D;
/* 403 */       this.ri2 = 3.0D;
/* 404 */       this.tc2 = this.ac;
/*     */     }
/* 405 */     else if (paramString1.equals("F"))
/*     */     {
/* 406 */       this.t2 = 7500.0D;
/* 407 */       this.ri2 = 1.5D;
/* 408 */       this.tc2 = this.fc;
/*     */     }
/* 409 */     else if (paramString1.equals("G"))
/*     */     {
/* 410 */       this.t2 = 6000.0D;
/* 411 */       this.ri2 = 1.1D;
/* 412 */       this.tc2 = this.gc;
/*     */     }
/* 413 */     else if (paramString1.equals("K"))
/*     */     {
/* 414 */       this.t2 = 5000.0D;
/* 415 */       this.ri2 = 0.9D;
/* 416 */       this.tc2 = this.kc;
/*     */     }
/* 417 */     else if (paramString1.equals("M"))
/*     */     {
/* 418 */       this.t2 = 3500.0D;
/* 419 */       this.ri2 = 0.8D;
/* 420 */       this.tc2 = this.mc;
/*     */     }
/* 422 */     if (paramString2.equals("O"))
/*     */     {
/* 423 */       this.t1 = 40000.0D;
/* 424 */       this.ri1 = 13.0D;
/* 425 */       this.tc1 = this.oc;
/*     */     }
/* 426 */     else if (paramString2.equals("B"))
/*     */     {
/* 427 */       this.t1 = 28000.0D;
/* 428 */       this.ri1 = 4.9D;
/* 429 */       this.tc1 = this.bc;
/*     */     }
/* 430 */     else if (paramString2.equals("A"))
/*     */     {
/* 431 */       this.t1 = 10000.0D;
/* 432 */       this.ri1 = 3.0D;
/* 433 */       this.tc1 = this.ac;
/*     */     }
/* 434 */     else if (paramString2.equals("F"))
/*     */     {
/* 435 */       this.t1 = 7500.0D;
/* 436 */       this.ri1 = 1.5D;
/* 437 */       this.tc1 = this.fc;
/*     */     }
/* 438 */     else if (paramString2.equals("G"))
/*     */     {
/* 439 */       this.t1 = 6000.0D;
/* 440 */       this.ri1 = 1.1D;
/* 441 */       this.tc1 = this.gc;
/*     */     }
/* 442 */     else if (paramString2.equals("K"))
/*     */     {
/* 443 */       this.t1 = 5000.0D;
/* 444 */       this.ri1 = 0.9D;
/* 445 */       this.tc1 = this.kc;
/*     */     }
/* 446 */     else if (paramString2.equals("M"))
/*     */     {
/* 447 */       this.t1 = 3500.0D;
/* 448 */       this.ri1 = 0.8D;
/* 449 */       this.tc1 = this.mc;
/*     */     }
/*     */   }
/*     */   
/*     */   public boolean action(Event paramEvent, Object paramObject)
/*     */   {
/* 453 */     if ((paramObject instanceof String)) {
/* 454 */       if (paramObject.equals("Enter values"))
/*     */       {
/* 455 */         if (this.pa.getLabel().equals("Unpause"))
/*     */         {
/* 456 */           this.i = this.i2;
/* 457 */           this.pa.setLabel("Pause");
/*     */         }
/* 459 */         this.angle = this.ansb.getValue();
/* 460 */         this.prev[1] = this.t1;
/* 461 */         this.prev[2] = this.t2;
/* 462 */         this.prev[3] = this.ri1;
/* 463 */         this.prev[4] = this.ri2;
/* 464 */         this.prev[5] = this.ra;
/* 465 */         getvals(this.ch2.getSelectedItem().trim(), this.ch.getSelectedItem());
/* 466 */         this.ra = this.rEnter.getValue();
/* 467 */         if ((this.prev[1] == this.t1) && (this.prev[2] == this.t2) && (this.prev[3] == this.ri1) && (this.prev[4] == this.ri2) && (this.prev[5] == this.ra)) {
/* 468 */           this.changed = false;
/*     */         } else {
/* 470 */           this.changed = true;
/*     */         }
/* 472 */         this.changed = true;
/* 473 */         if ((this.ri1 + this.ri2 > this.ra) || (this.ri1 + this.ri2 == this.ra)) {
/* 474 */           this.ra = ((int)(this.ri1 + this.ri2 + 1.0D));
/*     */         }
/* 476 */         this.running = false;
/* 477 */         repaint();
/*     */       }
/* 478 */       else if (paramObject.equals("Clear graph"))
/*     */       {
/* 479 */         if (this.pa.getLabel().equals("Unpause"))
/*     */         {
/* 480 */           this.i = this.i2;
/* 481 */           this.pa.setLabel("Pause");
/*     */         }
/* 483 */         this.running = false;
/* 484 */         this.changed = true;
/* 485 */         repaint();
/*     */       }
/* 486 */       else if (paramObject.equals("Pause"))
/*     */       {
/* 487 */         this.i2 = this.i;
/* 488 */         this.i = 0;
/* 489 */         this.pa.setLabel("Unpause");
/*     */       }
/* 490 */       else if (paramObject.equals("Unpause"))
/*     */       {
/* 491 */         this.i = this.i2;
/* 492 */         this.pa.setLabel("Pause");
/* 493 */         repaint();
/*     */       }
/*     */     }
/* 505 */     return false;
/*     */   }
/*     */   
/*     */   public void run()
/*     */   {
/* 508 */     Thread.currentThread().setPriority(5);
/*     */     for (;;)
/*     */     {
/*     */       try
/*     */       {
/* 511 */         Thread.sleep(100L);
/*     */       }
/*     */       catch (Exception localException) {}
/* 515 */       if (this.i == 630)
/*     */       {
/* 516 */         this.i = 270;
/*     */       }
/* 517 */       else if (this.i != 0)
/*     */       {
/* 518 */         this.i += 5;
/* 519 */         evolve();
/* 520 */         repaint();
/*     */       }
/*     */     }
/*     */   }
/*     */   
/*     */   public void start()
/*     */   {
/* 525 */     if (this.kicker == null)
/*     */     {
/* 526 */       this.kicker = new Thread(this);
/* 527 */       this.kicker.start();
/*     */     }
/*     */   }
/*     */   
/*     */   public void stop()
/*     */   {
/* 531 */     this.kicker.stop();
/* 532 */     this.kicker = null;
/*     */   }
/*     */   
/*     */   public double findMass(double paramDouble)
/*     */   {
/* 535 */     double d = 0.0D;
/* 536 */     switch ((int)paramDouble)
/*     */     {
/*     */     case 40000: 
/* 538 */       d = 40.0D;
/* 539 */       break;
/*     */     case 28000: 
/* 541 */       d = 15.0D;
/* 542 */       break;
/*     */     case 10000: 
/* 544 */       d = 3.5D;
/* 545 */       break;
/*     */     case 7500: 
/* 547 */       d = 1.7D;
/* 548 */       break;
/*     */     case 6000: 
/* 550 */       d = 1.1D;
/* 551 */       break;
/*     */     case 5000: 
/* 553 */       d = 0.8D;
/* 554 */       break;
/*     */     case 3500: 
/* 556 */       d = 0.5D;
/* 557 */       break;
/*     */     }
/* 559 */     return d;
/*     */   }
/*     */   
/*     */   public void compute()
/*     */   {
/*     */     try
/*     */     {
/*     */       double d5;
/*     */       double d6;
/*     */       double d7;
/*     */       double d8;
/* 565 */       if (this.r1 < this.r2)
/*     */       {
/* 566 */         d5 = this.r1;
/* 567 */         d6 = this.r2;
/* 568 */         d7 = this.t1;
/* 569 */         d8 = this.t2;
/*     */       }
/*     */       else
/*     */       {
/* 571 */         d5 = this.r2;
/* 572 */         d6 = this.r1;
/* 573 */         d7 = this.t2;
/* 574 */         d8 = this.t1;
/*     */       }
/* 576 */       double d3 = this.r * Math.sin(this.b);
/* 577 */       double d4 = this.r * Math.cos(this.b) * Math.sin(this.ang * 0.0174532925199433D);
/* 578 */       this.dth = Math.sqrt(d3 * d3 + d4 * d4);
/* 579 */       this.h = (Math.sqrt(4.0D * this.r1 * this.r1 * this.r2 * this.r2 - (this.r1 * this.r1 + this.r2 * this.r2 - this.dth * this.dth) * (this.r1 * this.r1 + this.r2 * this.r2 - this.dth * this.dth)) / (2.0D * this.dth));
/* 580 */       double d9 = Math.asin(this.h / d5);
/* 581 */       double d10 = Math.asin(this.h / d6);
/* 582 */       double d11 = d5 * d5 * (d9 + Math.sin(2.0D * d9) / 2.0D);
/* 583 */       double d12 = d6 * d6 * (d10 + Math.sin(2.0D * d10) / 2.0D);
/* 584 */       this.aover = (this.dth * this.dth < d6 * d6 - d5 * d5 ? 3.141592653589793D * d5 * d5 - d11 + d12 - 2.0D * this.dth * this.h : d11 + d12 - 2.0D * this.dth * this.h);
/* 585 */       this.ad = (this.dth < d6 - d5 ? 3.141592653589793D * d5 * d5 : this.dth > d6 + d5 ? 0.0D : this.aover);
/* 586 */       double d13 = 3.141592653589793D * d5 * d5 * result(d7);
/* 587 */       double d14 = 3.141592653589793D * d6 * d6 * result(d8);
/* 588 */       this.l = (d4 > 0.0D ? d13 + d14 * (1.0D - this.ad / (3.141592653589793D * d6 * d6)) : d14 + d13 * (1.0D - this.ad / (3.141592653589793D * d5 * d5)));
/* 589 */       this.m = (1.086956521739131D * Math.log(this.l) + 10.0D);
/* 590 */       this.mmax = (1.086956521739131D * Math.log((d13 + d14) * 1.05D) + 10.0D);
/* 591 */       this.mmin = (1.086956521739131D * Math.log((d13 + d14 - d14 * (d5 * d5 / (d6 * d6))) * 0.95D) + 10.0D);
/* 592 */       this.m1 = findMass(d7);
/* 593 */       this.m2 = findMass(d8);
/* 594 */       this.d1 = (this.m2 / (this.m1 + this.m2) * this.r);
/* 595 */       this.d2 = (-(this.m1 / (this.m1 + this.m2)) * this.r);
/*     */     }
/*     */     catch (ArithmeticException localArithmeticException)
/*     */     {
/* 597 */       System.out.println(localArithmeticException.getMessage());
/*     */     }
/*     */   }
/*     */   
/*     */   public double result(double paramDouble)
/*     */   {
/* 601 */     double d = 1.0D;
/* 602 */     d = 0.35D / Math.exp(26160.0D / paramDouble);
/* 603 */     return d;
/*     */   }
/*     */ }


/* Location:           C:\Users\Avarice\Desktop\jd-gui-0.3.6.windows\
 * Qualified Name:     Eclipse
 * JD-Core Version:    0.7.0.1
 */