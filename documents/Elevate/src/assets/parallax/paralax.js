const Paralax = function (id,def) {
	let $def = 200;
	
	var $el = document.getElementById(id);
	if (!$el) return;
	var parent = document.getElementById('App');
	if (def) {
		$def = def;
	}
	let $last = 0;

	function move(top, parentHeight, height, offset) {
		if (top + parentHeight > offset && top-$def  < offset + height) {
			let $pos = (parentHeight - (offset - top))/((parentHeight+height)/100)/100;
			$el.style.transform ='translateY(-'+($def*$pos)+'px)';
			$last = $def*$pos;
		} else {
			$el.style.transform ='translateY(-'+$last+'px)';
		}
	}
	parent.addEventListener('scroll', function(e) {
		move(this.scrollTop,this.offsetHeight,$el.offsetHeight,$el.getBoundingClientRect().top+this.scrollTop);
	});
	window.addEventListener('resize', function(e) {
		$el.style.transform ='translateY(0px)';
		move(parent.scrollTop,parent.offsetHeight,$el.offsetHeight,$el.getBoundingClientRect().top+parent.scrollTop);
	})
}
export default Paralax;