// list of supported vaccines

const covid_19 = {
	disease: "COVID 19",
	vaccines: [
		{
			name: "Pfizer-BioNTech",
			release: new Date(Date.parse("dec 11, 2020")).toUTCString(),
			type: "mRNA",
		},
		{
			name: "Moderna",
			release: new Date(Date.parse("dec 18, 2020")).toUTCString(),
			type: "mRNA",
		},
		{
			name: "Johnson & Johnson",
			release: new Date(Date.parse("feb 27, 2021")).toUTCString(),
			type: "ChAD",
		},
	],
};
const hepatitis_b = {
	disease: "Hepatitis B",
	vaccines: [],
};
const hepatitis_a = {
	disease: "Hepatitis A",
	vaccines: [],
};
const chickenpox = {
	disease: "Chicken Pox",
	vaccines: [
		{
			name: "Varicella",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const diphtheria = {
	disease: "Diphtheria",
	vaccines: [
		{
			name: "DTaP",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const flu = {
	disease: "Influenza",
	vaccines: [
		{
			name: "Flu Vaccine",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const measles = {
	disease: "Measles",
	vaccines: [
		{
			name: "MMR",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const mumps = {
	disease: "Mumps",
	vaccines: [
		{
			name: "MMP",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const pertussis = {
	disease: "Pertussis",
	vaccines: [
		{
			name: "DTaP",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const polio = {
	disease: "Polio",
	vaccines: [
		{
			name: "IPV",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const pneumococcal = {
	disease: "Pneumococcal",
	vaccines: [
		{
			name: "PCV13",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const rotavirus = {
	disease: "Rotavirus",
	vaccines: [
		{
			name: "RV",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const rubella = {
	disease: "Rubella",
	vaccines: [
		{
			name: "MMR",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};
const tetanus = {
	disease: "Tetanus",
	vaccines: [
		{
			name: "DTaP",
			release: new Date(Date.parse("")).toUTCString(),
		},
	],
};

const supported = [
	covid_19,
	chickenpox,
	diphtheria,
	hepatitis_a,
	hepatitis_b,
	flu,
	measles,
	mumps,
	pertussis,
	polio,
	pneumococcal,
	rotavirus,
	rubella,
	tetanus,
];

module.exports = {
	supported,
};
