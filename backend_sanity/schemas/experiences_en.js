export default {
	name: "experiences_en",
	title: "Experiences EN",
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
