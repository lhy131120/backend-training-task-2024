const correctTest = (name) => {
	return new Promise((res, rej) => {
		console.log("Ready...");
		setTimeout(() => {
			const score = Math.round(Math.random() * 100);
			res({
				name,
				score,
			});
		}, Math.random() * 1000);
	});
};

// const checkReward = (data) => {
// 	return new Promise((res, rej) => {
// 		console.log("checking reward...");
// 		setTimeout(() => {
// 			if (data.score >= 90) {
// 				res(`${data.name}有電影票`);
// 			} else if (data.score >= 60 && data.score < 90) {
// 				res(`${data.name}有安慰獎`);
// 			} else {
// 				rej(`${data.name}沒有獎`);
// 			}
// 		}, Math.random() + 10000);
// 	});
// };

// correctTest("Ming")
// 	.then((res) => checkReward(res))
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log(err));

const init = async () => {
	try {
		const studentA = await correctTest("Ming");
		const rewardA = await checkReward(studentA);
	} catch (error) {
		console.log(error);
	}
};

// init();

Promise.all([correctTest("Ming"), correctTest("Lucy"), correctTest("KK")]).then((data) => console.log(data));
