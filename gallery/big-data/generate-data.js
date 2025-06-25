self.onmessage = (event) => {
	const { amount } = event.data;
	const japanBrands = [
		{
			brand: "Toyota",
			models: [
				{ name: "Camry", priceRange: [25000, 35000] },
				{ name: "RAV4", priceRange: [28000, 40000] },
				{ name: "Highlander", priceRange: [40000, 50000] },
				{ name: "Land Cruiser 300", priceRange: [85000, 120000] },
				{ name: "Land Cruiser 250", priceRange: [75000, 105000] },
				{ name: "Land Cruiser Prado", priceRange: [55000, 80000] },
				{ name: "Supra", priceRange: [50000, 65000] },
				{ name: "GR86", priceRange: [30000, 40000] },
				{ name: "GR Supra", priceRange: [55000, 70000] },
				{ name: "C-HR", priceRange: [25000, 35000] }
			]
		},
		{
			brand: "Mazda",
			models: [
				{ name: "Mazda3", priceRange: [22000, 30000] },
				{ name: "CX-5", priceRange: [28000, 40000] },
				{ name: "MX-5", priceRange: [27000, 35000] },
				{ name: "CX-30", priceRange: [25000, 35000] },
				{ name: "CX-50", priceRange: [30000, 45000] },
				{ name: "Mazda6", priceRange: [25000, 35000] },
				{ name: "CX-90", priceRange: [45000, 60000] },
				{ name: "MX-30", priceRange: [35000, 45000] }
			]
		},
		{
			brand: "Honda",
			models: [
				{ name: "Civic", priceRange: [25000, 35000] },
				{ name: "Accord", priceRange: [28000, 40000] },
				{ name: "CR-V", priceRange: [30000, 45000] },
				{ name: "HR-V", priceRange: [25000, 35000] },
				{ name: "Pilot", priceRange: [35000, 50000] },
				{ name: "Insight", priceRange: [23000, 33000] },
				{ name: "Ridgeline", priceRange: [37000, 45000] }
			]
		},
		{
			brand: "Subaru",
			models: [
				{ name: "Impreza", priceRange: [20000, 30000] },
				{ name: "Outback", priceRange: [27000, 40000] },
				{ name: "Forester", priceRange: [25000, 35000] },
				{ name: "WRX", priceRange: [30000, 45000] },
				{ name: "Ascent", priceRange: [32000, 45000] },
				{ name: "Crosstrek", priceRange: [23000, 32000] }
			]
		},
		{
			brand: "Mitsubishi",
			models: [
				{ name: "Outlander", priceRange: [25000, 35000] },
				{ name: "Lancer", priceRange: [22000, 32000] },
				{ name: "Eclipse Cross", priceRange: [24000, 34000] },
				{ name: "Pajero", priceRange: [40000, 60000] },
				{ name: "Mirage", priceRange: [15000, 20000] },
				{ name: "ASX", priceRange: [23000, 30000] }
			]
		},
		{
			brand: "Nissan",
			models: [
				{ name: "Altima", priceRange: [25000, 35000] },
				{ name: "Rogue", priceRange: [27000, 38000] },
				{ name: "Murano", priceRange: [32000, 45000] },
				{ name: "GT-R", priceRange: [113000, 210000] },
				{ name: "Pathfinder", priceRange: [34000, 48000] },
				{ name: "370Z", priceRange: [30000, 45000] }
			]
		},
		{
			brand: "Lexus",
			models: [
				{ name: "IS", priceRange: [40000, 55000] },
				{ name: "RX", priceRange: [45000, 65000] },
				{ name: "GX", priceRange: [55000, 70000] },
				{ name: "LX", priceRange: [90000, 120000] },
				{ name: "ES", priceRange: [42000, 55000] }
			]
		}
	];

	const germanBrands = [
		{
			brand: "Volkswagen",
			models: [
				{ name: "Golf", priceRange: [25000, 40000] },
				{ name: "Tiguan", priceRange: [30000, 45000] },
				{ name: "Passat", priceRange: [28000, 40000] },
				{ name: "Arteon", priceRange: [40000, 55000] },
				{ name: "Touareg", priceRange: [60000, 85000] },
				{ name: "ID.4", priceRange: [40000, 60000] },
				{ name: "ID.Buzz", priceRange: [60000, 80000] },
				{ name: "T-Roc", priceRange: [25000, 35000] },
				{ name: "T-Cross", priceRange: [23000, 32000] },
				{ name: "Amarok", priceRange: [40000, 65000] }
			]
		},
		{
			brand: "Audi",
			models: [
				{ name: "A3", priceRange: [33000, 45000] },
				{ name: "A4", priceRange: [40000, 55000] },
				{ name: "A6", priceRange: [55000, 75000] },
				{ name: "Q3", priceRange: [37000, 50000] },
				{ name: "Q5", priceRange: [45000, 65000] },
				{ name: "Q7", priceRange: [60000, 80000] },
				{ name: "E-Tron", priceRange: [65000, 85000] },
				{ name: "RS6", priceRange: [115000, 130000] }
			]
		},
		{
			brand: "BMW",
			models: [
				{ name: "3 Series", priceRange: [42000, 60000] },
				{ name: "5 Series", priceRange: [55000, 75000] },
				{ name: "7 Series", priceRange: [90000, 120000] },
				{ name: "X3", priceRange: [45000, 60000] },
				{ name: "X5", priceRange: [60000, 85000] },
				{ name: "X7", priceRange: [85000, 110000] },
				{ name: "i4", priceRange: [60000, 80000] },
				{ name: "iX", priceRange: [85000, 105000] }
			]
		},
		{
			brand: "Mercedes-Benz",
			models: [
				{ name: "A-Class", priceRange: [35000, 45000] },
				{ name: "C-Class", priceRange: [45000, 60000] },
				{ name: "E-Class", priceRange: [60000, 80000] },
				{ name: "S-Class", priceRange: [110000, 150000] },
				{ name: "GLA", priceRange: [40000, 55000] },
				{ name: "GLE", priceRange: [65000, 90000] },
				{ name: "EQC", priceRange: [70000, 90000] },
				{ name: "AMG GT", priceRange: [130000, 160000] }
			]
		},
		{
			brand: "Porsche",
			models: [
				{ name: "911", priceRange: [120000, 200000] },
				{ name: "Cayenne", priceRange: [70000, 120000] },
				{ name: "Macan", priceRange: [55000, 85000] },
				{ name: "Panamera", priceRange: [90000, 130000] },
				{ name: "Taycan", priceRange: [85000, 130000] }
			]
		}
	];

	const britishBrands = [
		{
			brand: "Land Rover",
			models: [
				{ name: "Range Rover", priceRange: [100000, 150000] },
				{ name: "Range Rover Sport", priceRange: [80000, 120000] },
				{ name: "Defender", priceRange: [60000, 95000] },
				{ name: "Discovery", priceRange: [55000, 80000] },
				{ name: "Evoque", priceRange: [50000, 70000] }
			]
		},
		{
			brand: "Bentley",
			models: [
				{ name: "Bentayga", priceRange: [170000, 250000] },
				{ name: "Continental GT", priceRange: [220000, 300000] },
				{ name: "Flying Spur", priceRange: [200000, 280000] },
				{ name: "Mulsanne", priceRange: [310000, 400000] }
			]
		},
		{
			brand: "Aston Martin",
			models: [
				{ name: "DBX", priceRange: [190000, 250000] },
				{ name: "Vantage", priceRange: [150000, 200000] },
				{ name: "DB11", priceRange: [200000, 250000] },
				{ name: "Rapide", priceRange: [220000, 300000] }
			]
		},
		{
			brand: "Rolls-Royce",
			models: [
				{ name: "Ghost", priceRange: [350000, 450000] },
				{ name: "Phantom", priceRange: [450000, 550000] },
				{ name: "Cullinan", priceRange: [400000, 500000] },
				{ name: "Wraith", priceRange: [330000, 400000] }
			]
		},
		{
			brand: "McLaren",
			models: [
				{ name: "720S", priceRange: [300000, 400000] },
				{ name: "GT", priceRange: [210000, 280000] },
				{ name: "Artura", priceRange: [230000, 300000] },
				{ name: "765LT", priceRange: [350000, 450000] }
			]
		}
	];


	const americanBrands = [
		{
			brand: "Ford",
			models: [
				{ name: "F-150", priceRange: [35000, 70000] },
				{ name: "Mustang", priceRange: [30000, 55000] },
				{ name: "Explorer", priceRange: [40000, 60000] },
				{ name: "Bronco", priceRange: [35000, 55000] },
				{ name: "Escape", priceRange: [27000, 40000] }
			]
		},
		{
			brand: "Chevrolet",
			models: [
				{ name: "Silverado", priceRange: [35000, 70000] },
				{ name: "Camaro", priceRange: [30000, 60000] },
				{ name: "Corvette", priceRange: [70000, 120000] },
				{ name: "Tahoe", priceRange: [55000, 75000] },
				{ name: "Suburban", priceRange: [60000, 80000] }
			]
		},
		{
			brand: "Tesla",
			models: [
				{ name: "Model 3", priceRange: [40000, 60000] },
				{ name: "Model S", priceRange: [80000, 120000] },
				{ name: "Model X", priceRange: [90000, 130000] },
				{ name: "Model Y", priceRange: [50000, 75000] }
			]
		},
		{
			brand: "Jeep",
			models: [
				{ name: "Wrangler", priceRange: [40000, 60000] },
				{ name: "Grand Cherokee", priceRange: [50000, 80000] },
				{ name: "Compass", priceRange: [25000, 40000] },
				{ name: "Renegade", priceRange: [23000, 35000] },
				{ name: "Gladiator", priceRange: [40000, 70000] }
			]
		},
		{
			brand: "Dodge",
			models: [
				{ name: "Charger", priceRange: [35000, 70000] },
				{ name: "Challenger", priceRange: [30000, 80000] },
				{ name: "Durango", priceRange: [40000, 65000] },
				{ name: "Hornet", priceRange: [30000, 45000] },
				{ name: "Ram 1500", priceRange: [40000, 75000] }
			]
		}
	];

	const koreanBrands = [
		{
			brand: "Hyundai",
			models: [
				{ name: "Elantra", priceRange: [20000, 30000] },
				{ name: "Sonata", priceRange: [25000, 35000] },
				{ name: "Tucson", priceRange: [27000, 40000] },
				{ name: "Santa Fe", priceRange: [32000, 45000] },
				{ name: "Palisade", priceRange: [35000, 50000] },
				{ name: "Ioniq 5", priceRange: [45000, 60000] },
				{ name: "Kona", priceRange: [23000, 35000] }
			]
		},
		{
			brand: "Kia",
			models: [
				{ name: "Rio", priceRange: [17000, 25000] },
				{ name: "Soul", priceRange: [19000, 27000] },
				{ name: "Sportage", priceRange: [25000, 40000] },
				{ name: "Sorento", priceRange: [30000, 45000] },
				{ name: "Telluride", priceRange: [35000, 50000] },
				{ name: "EV6", priceRange: [45000, 60000] },
				{ name: "Seltos", priceRange: [23000, 32000] }
			]
		},
		{
			brand: "Genesis",
			models: [
				{ name: "G70", priceRange: [40000, 50000] },
				{ name: "G80", priceRange: [50000, 70000] },
				{ name: "G90", priceRange: [75000, 100000] },
				{ name: "GV70", priceRange: [50000, 65000] },
				{ name: "GV80", priceRange: [60000, 80000] }
			]
		}
	];

	const swedishBrands = [
		{
			brand: "Volvo",
			models: [
				{ name: "XC40", priceRange: [40000, 55000] },
				{ name: "XC60", priceRange: [50000, 70000] },
				{ name: "XC90", priceRange: [60000, 85000] },
				{ name: "S60", priceRange: [45000, 60000] },
				{ name: "S90", priceRange: [55000, 75000] },
				{ name: "V60", priceRange: [50000, 65000] },
				{ name: "V90", priceRange: [60000, 80000] },
				{ name: "C40 Recharge", priceRange: [55000, 65000] }
			]
		}
	];

	const countries = ['Japan', 'Germany', 'USA', 'UK', 'South Korea', 'Sweden'];
	const colors = ["Blue", "Red", "White", "Black", "Silver", "Grey", "Green"];
	const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
	const transmissions = ["Automatic", "Manual"];

	const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
	const randomYear = (start, end) => Math.floor(Math.random() * (end - start + 1)) + start;
	const randomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	const cars = [];

	for (let i = 0; i < amount; i++) {
		const country = randomItem(countries);
		const brands = (() => {
			switch(country){
				case 'Japan':
					return japanBrands;
				case 'Germany':
					return germanBrands;
				case 'USA':
					return americanBrands;
				case 'UK':
					return britishBrands;
				case 'South Korea':
					return koreanBrands;
				case 'Sweden':
					return swedishBrands;
			}
		})();

		const brandObj = randomItem(brands);
		const modelObj = randomItem(brandObj.models);
		const car = {
			brand: brandObj.brand,
			model: modelObj.name,
			price: randomPrice(modelObj.priceRange[0], modelObj.priceRange[1]),
			color: randomItem(colors),
			country,
			year: randomYear(2017, 2024),
			fuelType: randomItem(fuelTypes),
			electric: Math.random() > 0.7,
			transmission: randomItem(transmissions),
		};
		cars.push(car);

		if (i % 1000 === 0) {
			self.postMessage({ type: 'progress', amountDone: i });
		}
	}

	self.postMessage({ type: 'done', data: cars });
}
