/* Every trip on the site. Newest first — the timeline reads left (now) to
 * right (further back in time), the same direction the reference site uses.
 *
 * scale   how tall this trip stands on the timeline, 0–1 of the full height.
 *         Vary it freely — it is not tied to how old the trip is.
 * width /
 * height  the natural pixel size of the image, used to keep its aspect ratio.
 * body    the blog post. Each entry is one of:
 *           { p: "..." }              a paragraph
 *           { h: "..." }              a subheading
 *           { quote: "...", by: "" }  a pull quote
 *           { img: "images/x.svg", caption: "..." }
 */
window.SITE = {
  name: 'Nithin Aruswamy',
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Instagram', href: '#' },
    { label: 'Email', href: 'mailto:nithin.alaska@gmail.com' }
  ],
  about: {
    text: [
      'I travel when I can and write it down afterwards so I do not lose it.',
      'This is the whole list, most recent first. Swipe right to walk back through the years, then click a trip to read what happened.'
    ]
  }
};

window.TRIPS = [
  {
    id: 'tokyo',
    title: 'Tokyo',
    place: 'Japan',
    blurb: 'Two weeks, no plan',
    date: 'March 2025',
    year: 2025,
    image: 'images/tokyo.svg',
    width: 900, height: 1500,
    scale: 0.88,
    with: ['Sarah', 'Dev', 'Maya'],
    body: [
      { p: 'We landed at Haneda a little after eleven at night and the city was still completely awake. The train into Shinagawa was silent in the way only Japanese trains are silent — full, but silent — and I remember thinking that I had been travelling for nineteen hours and was somehow not tired at all.' },
      { p: 'The plan, such as it was, ran to one line in a notes app: stay east of the river, walk everywhere, eat standing up.' },
      { h: 'Walking the Yamanote' },
      { p: 'On the third day we decided to get off at every stop on the Yamanote line and walk until we found something worth stopping for. It took eleven hours. We made it around two thirds of the loop. Somewhere near Nippori there is a street of nothing but fabric shops, five floors each, and Maya spent an hour in one of them buying buttons.' },
      { quote: 'Nobody was in a hurry, which made the fact that everything ran on time feel like a magic trick.', by: '' },
      { p: 'Evenings were the best part. The alleys under the tracks at Yurakucho fill with smoke and salarymen at about six, and if you stand at the end of a counter long enough somebody will make room for you.' },
      { h: 'Going out to Hakone' },
      { p: 'We took two days away from the city and it reset everything. Hot spring in the morning, mountains hidden in fog until about three in the afternoon, and then the fog moved and Fuji was simply there, much closer than any of us expected.' },
      { p: 'I would go back tomorrow.' }
    ]
  },
  {
    id: 'patagonia',
    title: 'Patagonia',
    place: 'Chile & Argentina',
    blurb: 'Torres del Paine, on foot',
    date: 'November 2024',
    year: 2024,
    image: 'images/patagonia.svg',
    width: 3000, height: 1200,
    scale: 0.6,
    with: ['Dev', 'Priya'],
    body: [
      { p: 'The wind in Patagonia is not a detail, it is the whole story. It arrives from the ice field with nothing in the way for two hundred kilometres and it does not stop for the five days you are walking into it.' },
      { p: 'We did the W in five days, west to east, sleeping in refugios and eating an unreasonable amount of instant soup.' },
      { h: 'Day three' },
      { p: 'The French Valley is the day everyone warns you about and they are right to. Six hours up through boulder field and beech forest, and then you come out into a bowl of hanging glaciers that calve every few minutes with a noise like distant artillery. We sat there for an hour and did not say very much.' },
      { quote: 'Priya said it looked like the world before anyone got here. That is about right.', by: '' },
      { p: 'The last morning we were up at four to be at the base of the towers for sunrise. Nine hundred metres of climbing in the dark, headtorches strung out up the moraine like a slow procession, and then twenty minutes of the granite going orange, and everyone completely quiet.' }
    ]
  },
  {
    id: 'lisbon',
    title: 'Lisbon',
    place: 'Portugal',
    blurb: 'A month working from Alfama',
    date: 'June 2023',
    year: 2023,
    image: 'images/lisbon.svg',
    width: 1500, height: 1500,
    scale: 1.0,
    with: ['Sarah'],
    body: [
      { p: 'A month is long enough to stop being a tourist and not long enough to stop being surprised. We rented the top floor of a building in Alfama with a terrace the size of a dining table and a view over the whole of the river.' },
      { h: 'The routine' },
      { p: 'Coffee downstairs at eight. Work until two. Then out, in whatever direction had the most shade. The city is built on hills that are steeper than they look in photographs, and by the end of the month I could walk up the Calçada do Combro without stopping, which felt like an achievement.' },
      { quote: 'Everything closes when it wants to and opens again when it feels like it, and the city is better for it.', by: '' },
      { p: 'Fridays we took the train out to Cascais and swam in water cold enough to be genuinely rude about it.' }
    ]
  },
  {
    id: 'marrakech',
    title: 'Marrakech',
    place: 'Morocco',
    blurb: 'Medina, then the Atlas',
    date: 'October 2022',
    year: 2022,
    image: 'images/marrakech.svg',
    width: 2000, height: 1300,
    scale: 0.72,
    with: ['Dev', 'Maya', 'Tom'],
    body: [
      { p: 'You do not walk through the medina so much as get carried by it. Four of us went in on the first afternoon with a rough idea of where the riad was and came out somewhere else entirely, an hour later, holding tea.' },
      { h: 'Out of the city' },
      { p: 'The Atlas mountains start about an hour south and the change is abrupt — red dust, then switchbacks, then villages built into the side of the valley where the only wheeled traffic is a wheelbarrow.' },
      { p: 'We stayed two nights in Imlil and walked up towards the Toubkal refuge until the snow line turned us around. Came back down in the dark, badly prepared, very happy.' }
    ]
  },
  {
    id: 'iceland',
    title: 'Iceland',
    place: 'Ring Road',
    blurb: 'Ten days, one car',
    date: 'February 2021',
    year: 2021,
    image: 'images/iceland.svg',
    width: 1100, height: 1500,
    scale: 0.95,
    with: ['Sarah', 'Dev'],
    body: [
      { p: 'February is the wrong month to drive the ring road and that is exactly why we did it. Four hours of daylight, a rental car with studded tyres, and a weather service that we learned to check three times a day.' },
      { quote: 'The road was closed twice. Both times we found somewhere to sleep within twenty minutes. Everyone there is used to it.', by: '' },
      { p: 'The aurora came on the sixth night, over the lagoon at Jokulsarlon, and it was nothing like the photographs. Faster. Less green. More like weather than light.' }
    ]
  },
  {
    id: 'amalfi',
    title: 'Amalfi Coast',
    place: 'Italy',
    blurb: 'Boats and stairs',
    date: 'September 2019',
    year: 2019,
    image: 'images/amalfi.svg',
    width: 1000, height: 1500,
    scale: 0.66,
    with: ['Sarah', 'Priya', 'Tom'],
    body: [
      { p: 'Everything on that coast is either up or down. The village we stayed in had one road at the top, one harbour at the bottom, and eight hundred steps in between, which we counted on the second day and never mentioned again.' },
      { h: 'The Path of the Gods' },
      { p: 'It is as good as the name suggests. Three hours along the ridge with the whole gulf underneath and almost nobody else on it if you leave early enough.' }
    ]
  },
  {
    id: 'capetown',
    title: 'Cape Town',
    place: 'South Africa',
    blurb: 'Table Mountain in the fog',
    date: 'January 2018',
    year: 2018,
    image: 'images/capetown.svg',
    width: 2400, height: 1000,
    scale: 0.82,
    with: ['Dev'],
    body: [
      { p: 'The tablecloth came over the mountain most afternoons at about four, which meant mornings were for climbing and the rest of the day was for the coast road.' },
      { p: 'We drove out to the Cape of Good Hope on a day so windy that opening the car door took two hands, and stood at the sign with everyone else, and it was worth it anyway.' }
    ]
  },
  {
    id: 'bali',
    title: 'Bali',
    place: 'Indonesia',
    blurb: 'Rice terraces and rain',
    date: 'April 2016',
    year: 2016,
    image: 'images/bali.svg',
    width: 1500, height: 1500,
    scale: 0.58,
    with: ['Sarah'],
    body: [
      { p: 'It rained every afternoon at three for about forty minutes and then stopped completely, and after the first week we planned around it without thinking.' },
      { p: 'The terraces above Ubud are worked by hand and have been for a thousand years, which you can feel standing in them in a way that reading about it does not deliver.' }
    ]
  },
  {
    id: 'peru',
    title: 'Peru',
    place: 'Sacred Valley',
    blurb: 'Four days to Machu Picchu',
    date: 'August 2014',
    year: 2014,
    image: 'images/peru.svg',
    width: 1600, height: 1500,
    scale: 1.0,
    with: ['Dev', 'Tom'],
    body: [
      { p: 'Dead Woman’s Pass is at 4,215 metres and the last hour of it is the hardest walking I have done. Nobody talks. You count steps and you stop counting and you start again.' },
      { p: 'You reach the Sun Gate at about six in the morning on the fourth day. The cloud was sitting in the valley and for ten minutes we could see nothing at all, and then it lifted all at once.' }
    ]
  },
  {
    id: 'newzealand',
    title: 'New Zealand',
    place: 'South Island',
    blurb: 'The first big one',
    date: 'December 2012',
    year: 2012,
    image: 'images/newzealand.svg',
    width: 2100, height: 1300,
    scale: 0.75,
    with: ['Tom'],
    body: [
      { p: 'The first proper trip, in a van that cost almost nothing and smelled accordingly. Three weeks from Christchurch down to Queenstown and back up the west coast.' },
      { p: 'I did not write any of it down at the time, which is the reason this site exists.' }
    ]
  }
];
