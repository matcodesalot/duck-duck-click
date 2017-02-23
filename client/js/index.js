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
	price: 280,
	amount: 0,
	perSecond: 3,
};
var bread = {
	price: 7500,
	amount: 0,
	perSecond: 10,
};
var featherCookie = {
	price: 35500,
	amount: 0,
	perSecond: 135,
};
var heavyMetal = {
	price: 666666,
	amount: 0,
	perSecond: 666,
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
	$("#xp-current").text("xp: " + xp.current + "/" + xp.toNextLevel);
}

function renderAutoClick() {
	autoClick.price = Math.floor(autoClick.price);
	$("#auto-click-price").text(autoClick.price + " quacks");
	$("#auto-click-amount").text(autoClick.amount);
}

function renderPond() {
	pond.price = Math.floor(pond.price);
	$("#pond-price").text(pond.price + " quacks");
	$("#pond-amount").text(pond.amount);
}

function renderBread() {
	bread.price = Math.floor(bread.price);
	$("#bread-price").text(bread.price + " quacks");
	$("#bread-amount").text(bread.amount);
}

function renderFeatherCookie() {
	featherCookie.price = Math.floor(featherCookie.price);
	$("#feather-cookie-price").text(featherCookie.price + " quacks");
	$("#feather-cookie-amount").text(featherCookie.amount);
}

function renderHeavyMetal() {
	heavyMetal.price = Math.floor(heavyMetal.price);
	$("#heavy-metal-price").text(heavyMetal.price + " quacks");
	$("#heavy-metal-amount").text(heavyMetal.amount);
}

function timer() {
	quackCount += autoClick.amount * autoClick.perSecond;
	quackCount += pond.amount * pond.perSecond;
	quackCount += bread.amount * bread.perSecond;
	quackCount += featherCookie.amount * featherCookie.perSecond;
	quackCount += heavyMetal.amount * heavyMetal.perSecond;
	update();
}

function duckClick() {
	quackCount += xp.level;
	xp.current += xp.level;
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

function playQuack(volume) {
	$("#quack-sound")[0].volume = volume;
	$("#quack-sound")[0].load();
	$("#quack-sound")[0].play();
}

function isMuted() {
	if($("#mute").is(":checked")) {
		playQuack(0);
	}
	else {
		playQuack(0.2);
	}
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
	renderBread();
	renderFeatherCookie();
	renderHeavyMetal();
	renderQuacksPerSecond();

	levelUp();
}

$(document).ready(function() {
	$(".img-container").on("click", "img", function(e) {
		duckClick();
		renderXP();
		clickEffect(e);
		isMuted();
	});

	$("#auto-click").click(function() {
		buyShopItem(autoClick);
	});

	$("#pond").click(function() {
		buyShopItem(pond);
	});

	$("#bread").click(function() {
		buyShopItem(bread);
	});

	$("#feather-cookie").click(function() {
		buyShopItem(featherCookie);
	});

	$("#heavy-metal").click(function() {
		buyShopItem(heavyMetal);
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