var quackCount = 0;
var quacksPerSecond = 0;
var xp = {
	current: 0,
	level: 1,
	toNextLevel: 10,
};
var autoClick = {
	price: 40,
	amount: 0,
	perSecond: 1,
};
var pond = {
	price: 160,
	amount: 0,
	perSecond: 3,
};

function renderTitle() {
	$("title").text(quackCount + " Quacks - DuckDuckClick");
}

function renderQuacks() {
	quackCount = Math.floor(quackCount);
	$("#quack-num").text(quackCount + " Quacks");
}

function renderQuacksPerSecond() {
	$("#quacks-per-second").text("Quacks Per Second: " + quacksPerSecond);
}

function renderXP() {
	xp.toNextLevel = Math.floor(xp.toNextLevel);
	$("#xp-level").text("Level " + xp.level);
	$("#xp-current").text(xp.current + "/" + xp.toNextLevel);
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

function timer() {
	quackCount += autoClick.amount * autoClick.perSecond;
	quackCount += pond.amount * pond.perSecond;
	update();
}

function duckClick() {
	quackCount += xp.level;
	update();
}

function clickEffect(e) {
	$("#multiplier").css("top", e.pageY);
	$("#multiplier").css("left", e.pageX);
	$("#multiplier").append("<h2 class='multiplier-text'>+" + xp.level + "</h2>");
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

function increaseXP() {
	xp.current += xp.level;
}

function levelUp() {
	if(xp.current >= xp.toNextLevel) {
		xp.level++;
		xp.current = 0;
		xp.toNextLevel += 10 * xp.level;
	}
}

function save() {
	localStorage.setItem("quackCount", quackCount);
	localStorage.setItem("quacksPerSecond", quacksPerSecond);
	localStorage.setItem("autoClickAmount", autoClick.amount);
	localStorage.setItem("autoClickPrice", autoClick.price);
	localStorage.setItem("pondAmount", pond.amount);
	localStorage.setItem("pondPrice", pond.price);
	localStorage.setItem("level", xp.level);
	localStorage.setItem("currentXP", xp.current);
	localStorage.setItem("toNextLevel", xp.toNextLevel);
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
	xp.level = localStorage.getItem("level");
	xp.level = parseInt(xp.level);
	xp.current = localStorage.getItem("currentXP");
	xp.current = parseInt(xp.current);
	xp.toNextLevel = localStorage.getItem("toNextLevel");
	xp.toNextLevel = parseInt(xp.toNextLevel);
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
	renderXP();

	levelUp();
}

function playQuack() {
	$("#quack-sound")[0].volume = 0.2;
	$("#quack-sound")[0].load();
	$("#quack-sound")[0].play();
}

$(document).ready(function() {
	$(".img-container").on("click", "img", function(e) {
		duckClick();
		increaseXP();
		renderXP();
		clickEffect(e);
		playQuack();
	});

	$("#auto-click").click(function() {
		buyShopItem(autoClick);
	});

	$("#pond").click(function() {
		buyShopItem(pond);
	});

	$("#rubber-duck-div").on("click", "img", function() {
		console.log("YOU DID IT");
		$(this).remove();
	});

	$("#save").click(function() {
		save();
	});

	$("#load").click(function() {
		load();
	});

	setInterval(timer, 1000);

	moveRubberDuck();
});