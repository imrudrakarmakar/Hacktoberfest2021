const pilihanKomputer = function(){
	let comp = Math.random();
	if(comp < 0.34) return 'rabbit';
	if(comp > 0.34 && comp < 0.67) return 'lion';
	return 'monkey';
}
const aturanMain = function(player,comp){
	if(player == comp) return 'SERI';
	if(player == 'carrot') return (comp == 'rabbit') ? 'WIN' : 'LOSE';
	if(player == 'meat') return (comp == 'lion') ? 'WIN' : 'LOSE';
	if(player == 'banana') return (comp == 'monkey') ? 'WIN' : 'LOSE';
}


// let pilihGajah = document.querySelector('.gajah');
// pilihGajah.addEventListener('click',function(){
// 	let computer = pilihanKomputer();
// 	let player = pilihGajah.className;
// 	let hasil = aturanMain(player,computer);
// 	console.log(computer);
// 	console.log(player);
// 	//Hasil
// 	let h2 = document.querySelector('.info h2');
// 	h2.innerHTML = hasil;
// 	h2.style.opacity = '0';
// 	h2.style.transition = '1s';
// 	h2.style.opacity = '1';
// 	let imgKomputer = document.querySelector('.img-computer');
// 	imgKomputer.setAttribute('src','img/'+computer+'.png');

// let pilihSemut = document.querySelector('.semut');
// pilihSemut.addEventListener('click',function(){
// 	let computer = pilihanKomputer();
// 	let player = pilihSemut.className;
// 	let hasil = aturanMain(player,computer);
// 	console.log(computer);
// 	console.log(player);
// 	//Hasil
// 	let h2 = document.querySelector('.info h2');
// 	h2.innerHTML = hasil;
// 	let imgKomputer = document.querySelector('.img-computer');
// 	imgKomputer.setAttribute('src','img/'+computer+'.png');

// let pilihOrang = document.querySelector('.orang');
// pilihOrang.addEventListener('click',function(){
// 	let computer = pilihanKomputer();
// 	let player = pilihOrang.className;
// 	let hasil = aturanMain(player,computer);
// 	console.log(computer);
// 	console.log(player);
// 	//Hasil
// 	let h2 = document.querySelector('.info h2');
// 	h2.innerHTML = hasil;
// 	let imgKomputer = document.querySelector('.img-computer');
// 	imgKomputer.setAttribute('src','img/'+computer+'.png');
let putar = function(){
	const waktuMulai = new Date().getTime();
	let computer = document.querySelector('.img-computer');
	let pilihon = ['rabbit','lion','monkey'];
	let i = 0;
	setInterval(function(){
	if(new Date().getTime() - waktuMulai > 1000){
	clearInterval();
	return;
	}
	computer.setAttribute('src','img/'+pilihon[i]+'.jpg')
	i++;
	if(i >= pilihon.length){
		i=0;
	}
	},100)
};
let pilih = document.querySelectorAll('li img');
pilih.forEach(function(pilihan){
	pilihan.addEventListener('click',function(){
	let computer = pilihanKomputer();
	let player = pilihan.className;
	let hasil = aturanMain(player,computer);
	console.log(computer);
	console.log(player);
	putar();
	//Hasil
	setTimeout(function(){
	let h2 = document.querySelector('.info h2');
	h2.innerHTML = hasil;
	let imgKomputer = document.querySelector('.img-computer');
	imgKomputer.setAttribute('src','img/'+computer+'.JPG');
},1000);
});
});

//Mengatur waktu dijalankan pada kodingan
// setTimeout(function(){}, waktu dalam ms);

//melakukan sesuatu berulang-ulang dalam interval waktu tertentu
//setInterval(function(){},waktu dalam ms);
let i = 4;
let tes = setInterval(function(){	
	i--;
	console.log(i);
	if(i < 1){
		clearInterval(tes);
		console.log('GO!');
	}
},2000)
