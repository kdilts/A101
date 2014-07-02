			var vec3 = function(x,y,z){ this.x = x; this.y = y; this.z = z; }
			var add = function(v1,v2){ return new vec3(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z); }
			var sub = function(v1,v2){ return new vec3(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z); }
			var dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z; }
			var mag = function(v){ return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2)+Math.pow(v.z,2)); }
			var unit = function(v){ var m = mag(v); return new vec3(v.x/m, v.y/m, v.z/m); }