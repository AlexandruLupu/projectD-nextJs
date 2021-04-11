const DUMMY_POSTS = [
	{
		id: "1",
		title: "Dogs are awesome",
		description:
			"One of the reasons why dogs make good pets is because they help with loneliness. ... During these times, having a dog as a companion can be very comforting. Dogs love being around their owners and love to please them. You'll always have your dog to cuddle with, eat dinner with, or head to a dog-friendly bar.",
		userName: "Alexandru Lupu",
		image:
			"https://images.unsplash.com/photo-1617255227693-44738e832383?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",

		comments: [
			{
				displaName: "Ioana Tistu",
				comment: "Wow, this is soooo true. Love dogs :D",
			},
			{
				displaName: "Lupu Alexandru",
				comment: "Yeap, having a pet can definitly boost your happiness",
			},
		],
		articleLink:
			"https://www.sykesvillevetclinic.com/news/5-reasons-dogs-make-good-pets/",
	},
	{
		id: "2",
		title: "Can a cat kill you?",
		description:
			"Denver psychologist Max Wachtel told USA Today that one of the reasons cats don't kill their owners is because they can't. Cats lack the crushing teeth that dogs have, meaning it's highly unlikely that they'd be able to successfully kill a full-grown human with their bite.",
		userName: "IoanaT",
		image:
			"https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",

		comments: [
			{
				displaName: "Lupu Alexandru",
				comment: "A dog will never try this shit.",
			},
		],
		articleLink:
			"https://www.cheatsheet.com/culture/the-terrifying-signs-your-cat-wants-to-kill-you.html/",
	},
	{
		id: "3",
		title: "Giant ship blocking Suez canal partially refloated",
		description:
			"One of the largest container ships in the world has been partially refloated after it ran aground in the Suez canal, causing a huge jam of vessels at either end of the vital international trade artery.  \n " +
			"The 220,000-ton, 400-metre-long Ever Given – a so-called megaship operated by the Taiwan-based firm Evergreen – became stuck near the southern end of the canal on Tuesday. The Suez Canal Authority (SCA) said it had lost the ability to steer amid high winds and a dust storm. \n" +
			"Eight tugboats were working to free the vessel, blocking a lane key to Asia-Europe trade through which about 50 ships a day passed in 2019, according to Egyptian government statistics",
		userName: "JohnD",
		image: "https://pbs.twimg.com/media/ExMx0oTVoAQz63L?format=jpg&name=large",

		comments: [
			{
				displaName: "Lupu Alexandru",
				comment:
					"Look at the size of the ship blocking the Suez Canal, if you zoom into the bow of the ship you can see a digger for size reference",
			},
		],
		articleLink:
			"https://www.theguardian.com/world/2021/mar/24/huge-container-ship-blocks-suez-canal-evergreen",
	},
];

export function getAllPosts() {
	return DUMMY_POSTS;
}

export function getPostById(id) {
	return DUMMY_POSTS.find((post) => post.id === id);
}
