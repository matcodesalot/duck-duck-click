var quackCount = 0;
var quacksPerSecond = 0;
var clickMultiplier = {
	price: 1000,
	amount: 1,
};
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

function renderClickMultiplier() {
	$("#click-multiplier-price").text(clickMultiplier.price + " quacks");
	$("#click-multiplier-amount").text("x" + clickMultiplier.amount);
}

function renderQuacksPerSecond() {
	$("#quacks-per-second").text("Quacks Per Second: " + quacksPerSecond);
}

function timer() {
	quackCount += autoClick.amount * autoClick.perSecond;
	quackCount += pond.amount * pond.perSecond;
	update();
}

function duckClick() {
	quackCount += clickMultiplier.amount;
	update();
}

function clickEffect(e) {
	$("#multiplier").css("top", e.pageY);
	$("#multiplier").css("left", e.pageX);
	$("#multiplier").append("<h2 class='multiplier-text'>+" + clickMultiplier.amount + "</h2>");
	$(".multiplier-text").fadeOut("slow", function() {
		$(this).remove();
	});
}

function buyShopItem(object) {
	if(quackCount >= object.price) {
		quackCount -= object.price;
		object.price = ((object.amount + 1) * 1.2) * object.price;
		object.amount++;
		quacksPerSecond += object.perSecond;
		update();
	}
	else {
		console.log("You can't afford");
	}
}

function buyClickMultiplier() {
	if(quackCount >= clickMultiplier.price) {
		quackCount -= clickMultiplier.price;
		clickMultiplier.price += 1000;
		clickMultiplier.amount++;
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
	localStorage.setItem("clickMultiplierAmount", clickMultiplier.amount);
	localStorage.setItem("clickMultiplierPrice", clickMultiplier.price);
	console.log("You saved " + quackCount + " quacks");
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
	clickMultiplier.amount = localStorage.getItem("clickMultiplierAmount");
	clickMultiplier.amount = parseInt(clickMultiplier.amount);
	clickMultiplier.price = localStorage.getItem("clickMultiplierPrice");
	clickMultiplier.price = parseInt(clickMultiplier.price);
	update();
	console.log("You loaded " + quackCount + " quacks");
}

function moveRubberDuck() {
	var height = $(document).height();
	$("#rubber-duck").animate({
		top: height
	}, 5000, function() {
		$(this).remove();
	});
}

function update() {
	renderQuacks();
	renderTitle();
	renderAutoClick();
	renderPond();
	renderQuacksPerSecond();
	renderClickMultiplier();
}

function playQuack() {
	$("#quack-sound")[0].volume = 0.2;
	$("#quack-sound")[0].load();
	$("#quack-sound")[0].play();
}

$(document).ready(function() {
	$(".img-container").on("click", "img", function(e) {
		duckClick();
		clickEffect(e);
		playQuack();
	});

	$("#auto-click").click(function() {
		buyShopItem(autoClick);
	});

	$("#pond").click(function() {
		buyShopItem(pond);
	});

	$("#click-multiplier").click(function() {
		buyClickMultiplier();
	});

	$("#rubber-duck-div").on("click", "img", function() {
		console.log("YOU DID IT");
		$(this).remove();
	})

	$("#save").click(function() {
		save();
	});

	$("#load").click(function() {
		load();
	});

	setInterval(timer, 1000);

	moveRubberDuck();
});