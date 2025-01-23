// 題目 - 樂呵呵健身房
// 樂呵呵健身房目前有 8 位會員

const members = ["Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona", "George", "Hannah"];

let totalPrice = 0;
let purchaseRecords = [];

// 第一階段：新增課程購買記錄（優惠定價）
// 函式 addPurchaseRecord
const addPurchaseRecord = (name, numberOfLessons) => {
	// 先檢查member & number of lessons
	if (!isMember(name) || !isVaildNumberOfLessons(numberOfLessons)) {
		showErrorMsg();
		return;
	}

	// 符合以上後執行
	calcCourcesPrice(numberOfLessons);
	purchasePrice = Number(numberOfLessons) * Number(calcCourcesPrice(numberOfLessons));

	purchaseRecords.push({
		name,
		courses: Number(numberOfLessons),
		coursesPriceRange: calcCourcesPrice(numberOfLessons),
		totalPrice: purchasePrice,
	});

	console.log(`新增購買記錄成功！會員 ${name} 購買 ${numberOfLessons} 堂課，總金額為 ${purchasePrice} 元。`);
};

const showErrorMsg = () => console.log(`輸入錯誤，請輸入有效的會員名稱和課程數量。`);

const isMember = (name) => {
	if (typeof name !== "string") {
		showErrorMsg();
	}
	return members.includes(name);
};

const isVaildNumberOfLessons = (number) => {
	if (typeof number !== "number") {
		return false;
	}

	if (number < 1 || !Number.isInteger(number)) {
		return false;
	}
	return true;
};

const calcCourcesPrice = (numberOfLessons) => {
	let coursePrice = 1500;

	if (numberOfLessons >= 21) {
		coursePrice = 1100;
	} else if (numberOfLessons >= 11) {
		coursePrice = 1300;
	}

	return coursePrice;
};

const calculateTotalPrice = () => {
	totalPrice = purchaseRecords.reduce((acc, curr) => acc + Number(curr.totalPrice), 0);
	console.log(`目前總營業額為 ${totalPrice} 元`);
};

const filterNoPurchaseMember = () => {
  const missNameArr = members.filter((name) => !purchaseRecords.map((arr) => arr.name).includes(name));
  console.log(`未購買課程的會員有：${missNameArr.join(', ')}`);
}

//Test Error Case
addPurchaseRecord("Alice123", 4);
addPurchaseRecord("Alice123", -4);
addPurchaseRecord("Alice123", 0);
addPurchaseRecord("Alice123", "djksja");
addPurchaseRecord("Alice123", "123");
addPurchaseRecord("Alice", "123");
addPurchaseRecord("Alice", -4);
addPurchaseRecord("Alice", 0);
addPurchaseRecord("Alice", "dsada");
addPurchaseRecord("Alice", 0.2248);
console.log("預期test=========")
addPurchaseRecord("Alice", 4);
addPurchaseRecord("Bob", 12);
addPurchaseRecord("Charlie", 25);
addPurchaseRecord("Hannah", 50);
addPurchaseRecord("名稱", "課程數量");
calculateTotalPrice();
filterNoPurchaseMember();