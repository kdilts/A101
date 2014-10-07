 import java.applet.Applet;
 import java.awt.Button;
 import java.awt.Choice;
 import java.awt.Color;
 import java.awt.Component;
 import java.awt.Container;
 import java.awt.Dimension;
 import java.awt.Event;
 import java.awt.Graphics;
 import java.awt.Image;
 import java.awt.Label;
 import java.awt.Panel;
 import java.awt.TextField;
 import java.io.PrintStream;
 
 public class Eclipse
 extends Applet
 implements Runnable
 {
 	int angle;
 	int ang;
 	int prevang;
 	int i;
 	int r;
 	int circW;
 	int circH;
 	int radconv;
 	int graphtop;
 	int graphbot;
 	int graphleft;
 	int graphright;
 	int ra;
 	int i2;
 	double prevx;
 	double preva;
 	double h;
 	double ri1;
 	double ri2;
 	double r1;		// star radius of star 1
 	double r2;		// star radius of star 2
 	double aover;
 	double ad;
 	double b;
 	double m;
 	double dth;
 	double l;
 	double prevco;
 	double t1;		// temperature of star 1
 	double t2;		// temperature of star 2
 	double prevm;
 	double previ;
 	double a;
 	double x;
 	double loc;
 	double mmax;
 	double mmin;
 	double prevm2;
 	double ns1t;
 	double ns1r;
 	double ns2t;
 	double ns2r;
 	double prevhi;
 	double hi;
 	double bneh1;
 	double co;
 	double z;
 	double mset;
 	double d1;
 	double d2;
 	double m1;
 	double m2;
 	TextField t;
 	Choice ch;
 	Choice ch2;
 	Button bu;
 	Button cl;
 	Button pa;
 	LabeledScrollbar ansb;
 	LabeledScrollbar rEnter;
 	double[] prev = new double[10];
 	boolean changed;
 	boolean running;
 	Thread kicker;
 	Dimension offDimension;

 	// predefined colors
 	Color star1;	Color star2;
 	Color oc; 	Color bc; 	Color ac; 	Color fc;
 	Color gc; 	Color kc; 	Color mc;
 	Color tc1; 	Color tc2;

 	int orbitwi;
 	int orbithi;
 	int graphwi;
 	int graphhi;
 	PlotBox2 pb;
 	Panel orbitpanel;
 	Panel graphpanel;
 	Graphics orbitpanelg;
 	Graphics graphpanelg;
 	Label type1;
 	Label type2;
 	Label temp1;
 	Label temp2;
 	Label rad1;
 	Label rad2;
 	Label aofi;
 	Label sep;
 	Image im1;
 	Image im2;
 	Graphics offscreen1;
 	Graphics offscreen2;

 	public void init()
 	{
 		int j = 240;
 		int k = 200;
 		this.orbitwi = (size().width - j);
 		this.orbithi = k;
 		this.graphwi = this.orbitwi;
 		this.graphhi = (size().height - this.orbithi);
 		try
 		{
 			this.im1 = createImage(this.orbitwi, this.orbithi);
 			this.offscreen1 = this.im1.getGraphics();
 			this.im2 = createImage(this.graphwi, this.graphhi);
 			this.offscreen2 = this.im2.getGraphics();
 		}
 		catch (Exception localException)
 		{
 			this.offscreen1 = null;
 			this.offscreen2 = null;
 		}
 		setLayout(null);
 		setBackground(Color.white);



 		this.bu = new Button("Enter values");
 		add(this.bu);
 		this.bu.reshape(0, 0, 80, 20);
 		this.cl = new Button("Clear graph");
 		add(this.cl);
 		this.cl.reshape(85, 0, 80, 20);
 		this.pa = new Button("Pause");
 		add(this.pa);
 		this.pa.reshape(170, 0, 60, 20);

 		Label localLabel1 = new Label("Angle:");
 		add(localLabel1);
 		localLabel1.reshape(0, 40, 50, 20);
 		this.angle = 10;
 		this.ansb = new LabeledScrollbar(0, 90, 0.0D, 90.0D, 1.0D, 80, 40, 150, this.angle, this);
 		this.ansb.setLabel(this.ansb.getValue());
 		Label localLabel2 = new Label("Separation:");
 		add(localLabel2);
 		localLabel2.reshape(0, 80, 70, 20);
 		this.ra = 12;
 		this.rEnter = new LabeledScrollbar(0, 25, 0.0D, 25.0D, 1.0D, 80, 80, 150, this.ra, this);
 		this.rEnter.setLabel(this.rEnter.getValue());








 		String str1 = "B";
 		String str2 = "A";
 		String str3 = "F";
 		String str4 = "G";
 		String str5 = "K";
 		String str6 = "M";

 		Label localLabel3 = new Label("Star 1:");
 		add(localLabel3);
 		localLabel3.reshape(0, 130, 50, 20);
 		this.ch = new Choice();
 		this.ch.addItem(str1);
 		this.ch.addItem(str2);
 		this.ch.addItem(str3);
 		this.ch.addItem(str4);
 		this.ch.addItem(str5);
 		this.ch.addItem(str6);
 		add(this.ch);
 		this.ch.reshape(50, 130, 50, 20);
 		Label localLabel4 = new Label("Star 2:");
 		add(localLabel4);
 		localLabel4.reshape(130, 130, 50, 20);
 		this.ch2 = new Choice();
 		this.ch2.addItem(str1);
 		this.ch2.addItem(str2);
 		this.ch2.addItem(str3);
 		this.ch2.addItem(str4);
 		this.ch2.addItem(str5);
 		this.ch2.addItem(str6);
 		add(this.ch2);
 		this.ch2.reshape(180, 130, 50, 20);





 		int n = 0;
 		int i1 = size().height - 230;
 		int i3 = 20;
 		Label localLabel5 = new Label("CURRENT VALUES:");
 		add(localLabel5);
 		localLabel5.reshape(n, i1, 150, 20);
 		Label localLabel6 = new Label("Star 1:");
 		add(localLabel6);
 		localLabel6.reshape(n + 20, i1 + i3, 100, i3);
 		Label localLabel7 = new Label("Type: ");
 		add(localLabel7);
 		localLabel7.reshape(n + 30, i1 + 2 * i3, 50, i3);
 		this.type1 = new Label("");
 		add(this.type1);
 		this.type1.reshape(n + 90, i1 + 2 * i3, 100, i3);
 		Label localLabel8 = new Label("T: ");
 		add(localLabel8);
 		localLabel8.reshape(n + 30, i1 + 3 * i3, 50, i3);
 		this.temp1 = new Label("");
 		add(this.temp1);
 		this.temp1.reshape(n + 90, i1 + 3 * i3, 100, i3);
 		Label localLabel9 = new Label("R: ");
 		add(localLabel9);
 		localLabel9.reshape(n + 30, i1 + 4 * i3, 50, i3);
 		this.rad1 = new Label("");
 		add(this.rad1);
 		this.rad1.reshape(n + 90, i1 + 4 * i3, 100, i3);
 		Label localLabel10 = new Label("Star 2:");
 		add(localLabel10);
 		localLabel10.reshape(n + 20, i1 + 5 * i3, 100, i3);
 		Label localLabel11 = new Label("Type: ");
 		add(localLabel11);
 		localLabel11.reshape(n + 30, i1 + 6 * i3, 50, i3);
 		this.type2 = new Label("");
 		add(this.type2);
 		this.type2.reshape(n + 90, i1 + 6 * i3, 100, i3);
 		Label localLabel12 = new Label("T: ");
 		add(localLabel12);
 		localLabel12.reshape(n + 30, i1 + 7 * i3, 50, i3);
 		this.temp2 = new Label("");
 		add(this.temp2);
 		this.temp2.reshape(n + 90, i1 + 7 * i3, 100, i3);
 		Label localLabel13 = new Label("R: ");
 		add(localLabel13);
 		localLabel13.reshape(n + 30, i1 + 8 * i3, 50, i3);
 		this.rad2 = new Label("");
 		add(this.rad2);
 		this.rad2.reshape(n + 90, i1 + 8 * i3, 100, i3);
 		this.aofi = new Label("");
 		add(this.aofi);
 		this.aofi.reshape(n + 20, i1 + 9 * i3 + 10, 200, i3);
 		this.sep = new Label("");
 		add(this.sep);
 		this.sep.reshape(n + 20, i1 + 10 * i3 + 10, 200, i3);




 		this.orbitpanel = new Panel();
 		add(this.orbitpanel);
 		this.orbitpanel.reshape(j, 0, this.orbitwi, this.orbithi);
 		this.orbitpanelg = this.orbitpanel.getGraphics();


 		this.graphpanel = new Panel();
 		add(this.graphpanel);
 		this.graphpanel.reshape(j, this.orbithi, this.graphwi, this.graphhi);
 		this.graphpanelg = this.graphpanel.getGraphics();
 		Label localLabel14 = new Label("L");
 		add(localLabel14);





 		this.i = 270;
 		this.preva = 1.0D;
 		this.prevx = 1.0D;
 		this.prevco = 1.0D;
 		this.prevm = 0.0D;
 		this.prevm2 = 0.0D;
 		this.previ = 265.0D;
 		this.prevhi = -1.0D;
 		this.ri1 = 3.0D;
 		this.ns1r = 3.0D;

 		this.ri2 = 1.5D;
 		this.ns2r = 4.9D;
 		this.r1 = (5.0D * this.ri1);
 		this.r2 = (5.0D * this.ri2);
 		this.t1 = 10000.0D;
 		this.ns1t = 10000.0D;


 		this.t2 = 7500.0D;
 		this.ns2t = 7500.0D;












 		this.ch.select(str2);
 		this.ch2.select(str3);
 		int i4 = 50;
 		int i5 = 20;
 		int i6 = 50;
 		this.graphtop = 0;
 		this.graphbot = (this.graphhi - i4);
 		this.graphleft = i6;
 		this.graphright = (this.graphwi - i5);
 		localLabel14.reshape(j - 20, this.orbithi + (this.graphbot - this.graphtop) / 2, 20, 20);
 		this.radconv = 7;
 		this.loc = 20.0D;
 		this.bneh1 = 0.0D;
 		this.co = 0.0D;
 		compute();
 		double d = this.mmax - this.mmin;
 		this.z = ((this.graphtop - this.graphbot) / d);
 		this.mset = ((this.mmax * this.graphbot - this.mmin * this.graphtop) / d);
 		this.changed = false;
 		this.running = false;
 		this.oc = new Color(181, 255, 250);
 		this.bc = new Color(111, 255, 245);
 		this.ac = new Color(0, 200, 246);
 		this.fc = new Color(39, 255, 220);
 		this.gc = new Color(251, 255, 80);
 		this.kc = new Color(255, 126, 32);
 		this.mc = new Color(255, 22, 25);
 		this.tc1 = new Color(0, 0, 0);
 		this.tc2 = new Color(0, 0, 0);
 		this.star1 = this.ac;
 		this.star2 = this.fc;
 		this.tc1 = this.star1;
 		this.tc2 = this.star2;
 		this.i2 = 20;
 		repaint();
 	}

 	public void reinit()
 	{
 		this.offscreen1.setColor(Color.white);
 		this.offscreen1.fillRect(0, 0, this.orbitwi, this.orbithi);
 		this.offscreen2.setColor(Color.white);
 		this.offscreen2.fillRect(0, 0, this.graphwi, this.graphhi);




 		this.i = 270;
 		this.type1.setText(this.ch.getSelectedItem());
 		this.temp1.setText(this.t1 + "K");
 		this.rad1.setText(this.ri1 + " Solar radii");
 		this.type2.setText(this.ch2.getSelectedItem());
 		this.temp2.setText(this.t2 + "K");
 		this.rad2.setText(this.ri2 + " Solar radii");
 		this.aofi.setText("Angle of Inclination: " + this.angle + " degrees");
 		this.sep.setText("Separation: " + this.ra + " Solar radii");


 		this.r1 = (this.radconv * this.ri1);
 		this.r2 = (this.radconv * this.ri2);
 		this.r = (this.radconv * this.ra);
 		this.bneh1 = Math.sin(6.283185307179586D * this.angle / 360.0D);
 		this.co = (90.0D * Math.sin(6.283185307179586D * this.angle / 360.0D) - (180 - this.angle));
 		this.circW = (this.orbitwi / 2);
 		this.circH = (this.orbithi / 2);
 		compute();
 		double d = this.mmax - this.mmin;
 		this.z = ((this.graphtop - this.graphbot) / d);
 		this.mset = ((this.mmax * this.graphbot - this.mmin * this.graphtop) / d);
 		System.out.println((float)this.mmin + "");
 		System.out.println((float)this.mmax + "");
 		PlotBox2 localPlotBox2 = new PlotBox2(0.0F, 360.0F, 30.0F, 60.0F, false, (float)this.mmin, (float)this.mmax, 0.125F, 0.125F, false, "Theta", this.graphleft, this.graphtop, this.graphright - this.graphleft, this.graphbot);
 		localPlotBox2.DrawIt(this.offscreen2);
 		if (this.prevhi == -1.0D) {
 			this.prevhi = this.mmax;
 		}
 		this.running = true;
 	}

 	public void update(Graphics paramGraphics)
 	{
 		paint(paramGraphics);
 	}

 	public void paint(Graphics paramGraphics)
 	{
 		this.orbitpanelg.drawImage(this.im1, 0, 0, this);
 		this.graphpanelg.drawImage(this.im2, 0, 0, this);
 	}

 	public void evolve()
 	{
 		if (!this.running) {
 			reinit();
 		}
 		this.offscreen1.setColor(getBackground());
 		this.offscreen1.fillRect(0, 0, this.orbitwi, this.orbithi);


 		this.ansb.setLabel(this.ansb.getValue());
 		this.rEnter.setLabel(this.rEnter.getValue());

 		this.b = (6.283185307179586D * this.i / 360.0D);
 		this.x = Math.sin(this.b);
 		this.a = (Math.cos(this.b) * Math.sin(6.283185307179586D * this.angle / 360.0D));
 		this.offscreen1.setColor(Color.black);
 		this.offscreen1.fillOval(this.circW - 2, this.circH - 2, 4, 4);
 		if (this.r1 > this.r2)
 		{
 			double d = this.d1;
 			this.d1 = this.d2;
 			this.d2 = d;
 		}
 		if (((this.i > 450) && (this.r1 < this.r2)) || ((this.i < 450) && (this.r1 > this.r2)))
 		{
 			drawSun(this.offscreen1, Color.white);
 			drawOtherStar(this.offscreen1, Color.white);
 			drawOtherStar(this.offscreen1, this.tc1);
 			drawSun(this.offscreen1, this.tc2);
 		}
 		else
 		{
 			drawOtherStar(this.offscreen1, Color.white);
 			drawSun(this.offscreen1, Color.white);
 			drawSun(this.offscreen1, this.tc2);
 			drawOtherStar(this.offscreen1, this.tc1);
 		}
 		this.offscreen2.setColor(Color.black);
 		this.preva = this.a;
 		this.prevx = this.x;
 		this.prevco = this.co;
 		this.ang = this.angle;
 		compute();
 		this.offscreen2.setColor(Color.white);
 		this.hi = (this.z * this.m + this.mset);
 		int j = (int)((this.i - 230 - this.graphleft) * (this.graphright - this.graphleft) / 360.0D + this.graphleft + 10.0D);
 		int k = (int)((this.previ - 230.0D - this.graphleft) * (this.graphright - this.graphleft) / 360.0D + this.graphleft + 10.0D);
 		this.offscreen2.fillArc(k, (int)this.prevhi, 4, 4, 0, 360);
 		this.offscreen2.setColor(Color.magenta);
 		this.offscreen2.fillArc(j, (int)this.hi, 4, 4, 0, 360);
 		this.offscreen2.setColor(Color.black);
 		if ((this.i > 220 + this.graphleft) && (this.previ != 630.0D)) {
 			this.offscreen2.drawLine(k, (int)this.prevhi, j, (int)this.hi);
 		}
 		this.prevhi = this.hi;
 		this.previ = this.i;
 		this.prevm = this.m;
 		repaint();
 	}

 	public void drawSun(Graphics paramGraphics, Color paramColor)
 	{
 		paramGraphics.setColor(paramColor);
 		paramGraphics.fillArc((int)(this.circW + this.d2 * this.prevx - this.r2), (int)(this.circH + this.d2 * this.preva - this.r2), (int)(2.0D * this.r2), (int)(2.0D * this.r2), 0, 360);
 	}

 	public void drawOtherStar(Graphics paramGraphics, Color paramColor)
 	{
 		paramGraphics.setColor(paramColor);
 		paramGraphics.fillArc((int)(this.circW + this.d1 * this.prevx - this.r1), (int)(this.circH + this.d1 * this.preva - this.r1), (int)(2.0D * this.r1), (int)(2.0D * this.r1), 0, 360);
 	}

 	public void getvals(String paramString1, String paramString2)
 	{
 		if (paramString1.equals("O"))
 		{
 			this.t2 = 40000.0D;
 			this.ri2 = 13.0D;
 			this.tc2 = this.oc;
 		}
 		else if (paramString1.equals("B"))
 		{
 			this.t2 = 28000.0D;
 			this.ri2 = 4.9D;
 			this.tc2 = this.bc;
 		}
 		else if (paramString1.equals("A"))
 		{
 			this.t2 = 10000.0D;
 			this.ri2 = 3.0D;
 			this.tc2 = this.ac;
 		}
 		else if (paramString1.equals("F"))
 		{
 			this.t2 = 7500.0D;
 			this.ri2 = 1.5D;
 			this.tc2 = this.fc;
 		}
 		else if (paramString1.equals("G"))
 		{
 			this.t2 = 6000.0D;
 			this.ri2 = 1.1D;
 			this.tc2 = this.gc;
 		}
 		else if (paramString1.equals("K"))
 		{
 			this.t2 = 5000.0D;
 			this.ri2 = 0.9D;
 			this.tc2 = this.kc;
 		}
 		else if (paramString1.equals("M"))
 		{
 			this.t2 = 3500.0D;
 			this.ri2 = 0.8D;
 			this.tc2 = this.mc;
 		}
 		if (paramString2.equals("O"))
 		{
 			this.t1 = 40000.0D;
 			this.ri1 = 13.0D;
 			this.tc1 = this.oc;
 		}
 		else if (paramString2.equals("B"))
 		{
 			this.t1 = 28000.0D;
 			this.ri1 = 4.9D;
 			this.tc1 = this.bc;
 		}
 		else if (paramString2.equals("A"))
 		{
 			this.t1 = 10000.0D;
 			this.ri1 = 3.0D;
 			this.tc1 = this.ac;
 		}
 		else if (paramString2.equals("F"))
 		{
 			this.t1 = 7500.0D;
 			this.ri1 = 1.5D;
 			this.tc1 = this.fc;
 		}
 		else if (paramString2.equals("G"))
 		{
 			this.t1 = 6000.0D;
 			this.ri1 = 1.1D;
 			this.tc1 = this.gc;
 		}
 		else if (paramString2.equals("K"))
 		{
 			this.t1 = 5000.0D;
 			this.ri1 = 0.9D;
 			this.tc1 = this.kc;
 		}
 		else if (paramString2.equals("M"))
 		{
 			this.t1 = 3500.0D;
 			this.ri1 = 0.8D;
 			this.tc1 = this.mc;
 		}
 	}

 	public boolean action(Event paramEvent, Object paramObject)
 	{
 		if ((paramObject instanceof String)) {
 			if (paramObject.equals("Enter values"))
 			{
 				if (this.pa.getLabel().equals("Unpause"))
 				{
 					this.i = this.i2;
 					this.pa.setLabel("Pause");
 				}
 				this.angle = this.ansb.getValue();
 				this.prev[1] = this.t1;
 				this.prev[2] = this.t2;
 				this.prev[3] = this.ri1;
 				this.prev[4] = this.ri2;
 				this.prev[5] = this.ra;
 				getvals(this.ch2.getSelectedItem().trim(), this.ch.getSelectedItem());
 				this.ra = this.rEnter.getValue();
 				if ((this.prev[1] == this.t1) && (this.prev[2] == this.t2) && (this.prev[3] == this.ri1) && (this.prev[4] == this.ri2) && (this.prev[5] == this.ra)) {
 					this.changed = false;
 				} else {
 					this.changed = true;
 				}
 				this.changed = true;
 				if ((this.ri1 + this.ri2 > this.ra) || (this.ri1 + this.ri2 == this.ra)) {
 					this.ra = ((int)(this.ri1 + this.ri2 + 1.0D));
 				}
 				this.running = false;
 				repaint();
 			}
 			else if (paramObject.equals("Clear graph"))
 			{
 				if (this.pa.getLabel().equals("Unpause"))
 				{
 					this.i = this.i2;
 					this.pa.setLabel("Pause");
 				}
 				this.running = false;
 				this.changed = true;
 				repaint();
 			}
 			else if (paramObject.equals("Pause"))
 			{
 				this.i2 = this.i;
 				this.i = 0;
 				this.pa.setLabel("Unpause");
 			}
 			else if (paramObject.equals("Unpause"))
 			{
 				this.i = this.i2;
 				this.pa.setLabel("Pause");
 				repaint();
 			}
 		}
 		return false;
 	}

 	public void run()
 	{
 		Thread.currentThread().setPriority(5);
 		for (;;)
 		{
 			try
 			{
 				Thread.sleep(100L);
 			}
 			catch (Exception localException) {}
 			if (this.i == 630)
 			{
 				this.i = 270;
 			}
 			else if (this.i != 0)
 			{
 				this.i += 5;
 				evolve();
 				repaint();
 			}
 		}
 	}

 	public void start()
 	{
 		if (this.kicker == null)
 		{
 			this.kicker = new Thread(this);
 			this.kicker.start();
 		}
 	}

 	public void stop()
 	{
 		this.kicker.stop();
 		this.kicker = null;
 	}

 	public double findMass(double paramDouble)
 	{
 		double d = 0.0D;
 		switch ((int)paramDouble)
 		{
 			case 40000: 
 			d = 40.0D;
 			break;
 			case 28000: 
 			d = 15.0D;
 			break;
 			case 10000: 
 			d = 3.5D;
 			break;
 			case 7500: 
 			d = 1.7D;
 			break;
 			case 6000: 
 			d = 1.1D;
 			break;
 			case 5000: 
 			d = 0.8D;
 			break;
 			case 3500: 
 			d = 0.5D;
 			break;
 		}
 		return d;
 	}

 	public void compute()
 	{
 		try
 		{
 			double d5;
 			double d6;
 			double d7;
 			double d8;
 			if (this.r1 < this.r2)
 			{
 				d5 = this.r1;
 				d6 = this.r2;
 				d7 = this.t1;
 				d8 = this.t2;
 			}
 			else
 			{
 				d5 = this.r2;
 				d6 = this.r1;
 				d7 = this.t2;
 				d8 = this.t1;
 			}
 			double d3 = this.r * Math.sin(this.b);
 			double d4 = this.r * Math.cos(this.b) * Math.sin(this.ang * 0.0174532925199433D);
 			this.dth = Math.sqrt(d3 * d3 + d4 * d4);
 			this.h = (Math.sqrt(4.0D * this.r1 * this.r1 * this.r2 * this.r2 - (this.r1 * this.r1 + this.r2 * this.r2 - this.dth * this.dth) * (this.r1 * this.r1 + this.r2 * this.r2 - this.dth * this.dth)) / (2.0D * this.dth));
 			double d9 = Math.asin(this.h / d5);
 			double d10 = Math.asin(this.h / d6);
 			double d11 = d5 * d5 * (d9 + Math.sin(2.0D * d9) / 2.0D);
 			double d12 = d6 * d6 * (d10 + Math.sin(2.0D * d10) / 2.0D);
 			this.aover = (this.dth * this.dth < d6 * d6 - d5 * d5 ? 3.141592653589793D * d5 * d5 - d11 + d12 - 2.0D * this.dth * this.h : d11 + d12 - 2.0D * this.dth * this.h);
 			this.ad = (this.dth < d6 - d5 ? 3.141592653589793D * d5 * d5 : this.dth > d6 + d5 ? 0.0D : this.aover);
 			double d13 = 3.141592653589793D * d5 * d5 * result(d7);
 			double d14 = 3.141592653589793D * d6 * d6 * result(d8);
 			this.l = (d4 > 0.0D ? d13 + d14 * (1.0D - this.ad / (3.141592653589793D * d6 * d6)) : d14 + d13 * (1.0D - this.ad / (3.141592653589793D * d5 * d5)));
 			this.m = (1.086956521739131D * Math.log(this.l) + 10.0D);
 			this.mmax = (1.086956521739131D * Math.log((d13 + d14) * 1.05D) + 10.0D);
 			this.mmin = (1.086956521739131D * Math.log((d13 + d14 - d14 * (d5 * d5 / (d6 * d6))) * 0.95D) + 10.0D);
 			this.m1 = findMass(d7);
 			this.m2 = findMass(d8);
 			this.d1 = (this.m2 / (this.m1 + this.m2) * this.r);
 			this.d2 = (-(this.m1 / (this.m1 + this.m2)) * this.r);
 		}
 		catch (ArithmeticException localArithmeticException)
 		{
 			System.out.println(localArithmeticException.getMessage());
 		}
 	}

 	public double result(double paramDouble)
 	{
 		double d = 1.0D;
 		d = 0.35D / Math.exp(26160.0D / paramDouble);
 		return d;
 	}
 }