var quackCount = 0;
var quacksPerSecond = 0;
var autoClick = {
	price: 50,
	amount: 0,
	perSecond: 1,
};
var pond = {
	price: 140,
	amount: 0,
	perSecond: 2,
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

function renderPond() {
	pond.price = Math.floor(pond.price);
	$("#pond-price").text(pond.price + " quacks");
	$("#pond-amount").text("You own " + pond.amount + " ponds");
}

function renderQuacksPerSecond() {
	$("#quacks-per-second").text("Quacks Per Second: " + quacksPerSecond);
}

function timer() {
	quackCount += autoClick.amount * autoClick.perSecond;
	quackCount += pond.amount * pond.perSecond;
	update();
}

setInterval(timer, 1000);

function buyAutoClick() {
	if(quackCount >= autoClick.price) {
		quackCount -= autoClick.price;
		autoClick.price = ((autoClick.amount + 1) * 1.2) * autoClick.price;
		autoClick.amount++;
		quacksPerSecond += autoClick.perSecond;
		update();
	}
	else {
		console.log("You can't afford");
	}
}

function buyPond() {
	if(quackCount >= pond.price) {
		quackCount -= pond.price;
		pond.price = ((pond.amount + 1) * 1.2) * pond.price;
		pond.amount++;
		quacksPerSecond += pond.perSecond;
		update();
	}
	else {
		console.log("You can't afford");
	}
}

function save() {
	localStorage.setItem("quackCount", quackCount);
	localStorage.setItem("quacksPerSecond", quacksPerSecond);
	localStorage.setItem("autoClickAmount", autoClick.amount);
	localStorage.setItem("autoClickPrice", autoClick.price);
	localStorage.setItem("pondAmount", pond.amount);
	localStorage.setItem("pondPrice", pond.price);
}

function load() {
	quackCount = localStorage.getItem("quackCount");
	quackCount = parseInt(quackCount);
	quacksPerSecond = localStorage.getItem("quacksPerSecond");
	quacksPerSecond = parseInt(quacksPerSecond);
	autoClick.amount = localStorage.getItem("autoClickAmount");
	autoClick.amount = parseInt(autoClick.amount);
	autoClick.price = localStorage.getItem("autoClickPrice");
	autoClick.price = parseInt(autoClick.price);
	pond.amount = localStorage.getItem("pondAmount");
	pond.amount = parseInt(pond.amount);
	pond.price = localStorage.getItem("pondPrice");
	pond.price = parseInt(pond.price);
	update();
}

function update() {
	renderQuacks();
	renderTitle();
	renderAutoClick();
	renderPond();
	renderQuacksPerSecond();
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

	$("#pond").click(function() {
		buyPond();
	})

	$("#save").click(function() {
		save();
	});

	$("#load").click(function() {
		load();
	});
});