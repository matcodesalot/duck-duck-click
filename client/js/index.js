var quackCount = 0;
var quacksPerSecond = 0;
var autoClick = {
	price: 50,
	amount: 0,
};

function renderQuacks() {
	quackCount = Math.floor(quackCount);
	$("#quack-num").text(quackCount + " Quacks");
}

function renderTitle() {
	$("title").text(quackCount + " Quacks");
}

function renderAutoClick() {
	autoClick.price = Math.floor(autoClick.price);
	$("#auto-click-price").text(autoClick.price + " quacks");
	$("#auto-click-amount").text("You own " + autoClick.amount + " auto clickers");
}

function renderQuacksPerSecond() {
	$("quacks-per-second").text("Quacks Per Second: " + quacksPerSecond);
}

function timer() {
	quackCount += autoClick.amount;
	update();
}

setInterval(timer, 1000);

function buyAutoClick() {
	if(quackCount >= autoClick.price) {
		quackCount -= autoClick.price;
		autoClick.price = ((autoClick.amount + 1) * 1.2) * autoClick.price;
		autoClick.amount++;
		update();
		console.log(autoClick.price);
	}
	else {
		console.log("You can't afford");
	}
}

function save() {
	localStorage.setItem("quackCount", quackCount);
	localStorage.setItem("autoClickAmount", autoClick.amount);
	localStorage.setItem("autoClickPrice", autoClick.price);
	console.log("you saved " + quackCount + " quacks");
}

function load() {
	quackCount = localStorage.getItem("quackCount");
	quackCount = parseInt(quackCount);
	autoClick.amount = localStorage.getItem("autoClickAmount");
	autoClick.amount = parseInt(autoClick.amount);
	autoClick.price = localStorage.getItem("autoClickPrice");
	autoClick.price = parseInt(autoClick.price);
	update();
	console.log("you loaded " + quackCount + " quacks");
}

function update() {
	renderQuacks();
	renderTitle();
	renderAutoClick();
}

$(document).ready(function() {
	$(".img-container").on("click", "img", function(e) {
		e.preventDefault();
		quackCount++;
		update();
	});

	$("#auto-click").click(function() {
		buyAutoClick();
	});

	$("#save").click(function() {
		save();
	});

	$("#load").click(function() {
		load();
	});

	renderQuacksPerSecond();
});