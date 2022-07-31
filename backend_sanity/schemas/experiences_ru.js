export default {
	name: "experiences_ru",
	title: "Experiences RU",
	type: "document",
	fields: [
		{
			name: "year",
			title: "Year",
			type: "string",
		},
		{
			name: "works",
			title: "Works",
			type: "array",
			of: [{ type: "workExperience" }],
		},
	],
	orderings: [
		{
			title: "Year, New",
			name: "year",
			by: [{ field: "year", direction: "desc" }],
		},
	],
};
