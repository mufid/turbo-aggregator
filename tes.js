var nilai = 0;
var inc = [];
var timer = [];
var tambah = function(timernum) {
	var iterasi, timm;
	timm = setInterval(function() {
		nilai = nilai + 1;
		iterasi++;
		if (iterasi > 5) clearInterval(timm);
	}, 1);

	inc[timernum]++;
	if (inc[timernum] > 50) {
		clearInterval(timer[1]);
		console.log("ends timer" + timernum + " with " + nilai);
	}
}

inc = [0, 1, 2, 3, 4];

for (var i = inc.length - 1; i >= 0; i--) {
	inc[i] = 0;
	timer[i] = setInterval(function() {
		tambah(i);
	}, 1);
}; 
