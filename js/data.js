/* Every trip on the site, newest first.
 *
 * A trip with a "body" gets an article: the timeline opens it, and from there
 * you can read on. A trip without one is just the photograph.
 *
 * scale   how tall the photo stands on the timeline, 0-1 of the full height.
 *         Vary it freely; it is not tied to how old the trip is.
 * width /
 * height  the photo's real pixel size, used to keep its aspect ratio. These
 *         must match the file or the zoom between levels will not line up.
 */
window.SITE = {
  "name": "Nithin Aruswamy",
  "nav": [
    {
      "label": "About",
      "href": "#about"
    },
    {
      "label": "Instagram",
      "href": "#"
    },
    {
      "label": "Email",
      "href": "mailto:nithin.alaska@gmail.com"
    }
  ],
  "about": {
    "text": [
      "I travel when I can and write it down afterwards so I do not lose it.",
      "This is the whole list, most recent first. Swipe right to walk back through the years, then click a trip to read what happened."
    ]
  }
};

window.TRIPS = [
  {
    "id": "bolivia-april2026",
    "title": "Bolivia",
    "date": "April 2026",
    "year": 2026,
    "month": 4,
    "image": "images/bolivia-april2026.jpg",
    "width": 1500,
    "height": 2000,
    "scale": 1
  },
  {
    "id": "chile-april2026",
    "title": "Chile",
    "date": "April 2026",
    "year": 2026,
    "month": 4,
    "image": "images/chile-april2026.jpg",
    "width": 1500,
    "height": 2000,
    "scale": 0.62
  },
  {
    "id": "oregon-february2026",
    "title": "Oregon",
    "date": "February 2026",
    "year": 2026,
    "month": 2,
    "image": "images/oregon-february2026.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.85
  },
  {
    "id": "brazil-august2025",
    "title": "Brazil",
    "date": "August 2025",
    "year": 2025,
    "month": 8,
    "image": "images/brazil-august2025.jpg",
    "width": 1135,
    "height": 2000,
    "scale": 0.7
  },
  {
    "id": "colombia-august2025",
    "title": "Colombia",
    "date": "August 2025",
    "year": 2025,
    "month": 8,
    "image": "images/colombia-august2025.jpg",
    "width": 1199,
    "height": 2000,
    "scale": 0.95
  },
  {
    "id": "nicaragua-march2025",
    "title": "Nicaragua",
    "date": "March 2025",
    "year": 2025,
    "month": 3,
    "image": "images/nicaragua-march2025.jpg",
    "width": 1500,
    "height": 2000,
    "scale": 0.58
  },
  {
    "id": "honduras-january2025",
    "title": "Honduras",
    "date": "January 2025",
    "year": 2025,
    "month": 1,
    "image": "images/honduras-january2025.jpg",
    "width": 1500,
    "height": 2000,
    "scale": 0.88
  },
  {
    "id": "hawaii-october2024",
    "title": "Hawaii",
    "date": "October 2024",
    "year": 2024,
    "month": 10,
    "image": "images/hawaii-october2024.jpg",
    "width": 1500,
    "height": 2000,
    "scale": 0.66
  },
  {
    "id": "england-june2024",
    "title": "England",
    "date": "June 2024",
    "year": 2024,
    "month": 6,
    "image": "images/england-june2024.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.78
  },
  {
    "id": "scotland",
    "title": "Scotland",
    "place": "Highlands & Skye",
    "blurb": "Castles, lochs and the Isle of Skye",
    "date": "June 2024",
    "year": 2024,
    "month": 6,
    "image": "images/scotland-1.jpg",
    "width": 2000,
    "height": 2000,
    "scale": 0.92,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Embark on a captivating journey through Scotland, where ancient castles cling to mist-shrouded cliffs and vibrant cities pulse with modern energy. Begin in Edinburgh, where the majestic Edinburgh Castle overlooks a city steeped in medieval history and literary legend. Explore the rugged beauty of the Isle of Skye, where cascading waterfalls and ancient ruins whisper tales of clans and kings. From the mystical waters of Loch Ness to the towering Kelpies of Falkirk, Scotland’s landscapes and landmarks promise adventure and enchantment at every turn."
      },
      {
        "h": "Day 1: To Scotland!"
      },
      {
        "p": "I embarked on my journey from San Francisco, flying to Dublin, Ireland with my family. After a four-hour layover, we caught our next flight to Edinburgh, Scotland. Surprisingly, there were no customs or immigration checks, and we were immediately allowed to exit the airport. We rented a car and began the drive to Kyle, Scotland. Along the way, we stopped at a Tesco to pick up some fruits and pastries for the following morning. For dinner, we had pizza at a Domino’s. I noted that the pizza sizes were smaller than what I was used to in the US, which sparked some fun conversation about the differences between American and British food. On the way, we checked out Loch Ness, hoping to catch a glimpse of the legendary Loch Ness Monster. The lake was serene and surrounded by picturesque landscapes, creating a mystical atmosphere. After about four hours, we arrived in Kyle, where hotels were scarce and expensive, so we booked an Airbnb—a small tent. The setup was charming, but the temperature was cold. Thankfully, they provided thick blankets, and we were able to stay warm. The adventure of staying in a tent added a fun, rustic element to our trip."
      },
      {
        "img": "images/scotland-2.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Day 2: Isle of Skye Adventures"
      },
      {
        "p": "Due to jet lag, we woke up at 2 AM but managed to sleep until 9 AM. Our Airbnb tent didn’t have a shower, so we went to a public paid shower. For breakfast, we visited The Coffee Bothy and enjoyed a delicious meal of apple compote waffles. The owners were friendly and jovial, making us feel right at home. Our first stop was Duntulm Castle, about an hour from our Airbnb. This historical site, perched near the sea, dates back to the 14th century and was once a stronghold of the Clan MacDonald. Though now in ruins, the castle offered stunning views of the rugged coastline and the cold, windswept landscape. It was easy to imagine the castle in its heyday, commanding respect and awe."
      },
      {
        "p": "Next, we drove 30 minutes to Kilt Rock Waterfall. This unique waterfall cascades over basalt columns that resemble a kilt, hence its name. Although the waterfall itself was underwhelming in terms of water flow, the surrounding scenery was breathtaking. The ocean stretched endlessly, merging with the sky, and the view from the cliff provided a unique perspective of the waterfall. The kids loved trying to spot the kilt pattern in the rocks."
      },
      {
        "p": "For lunch, we headed to Portree, where we dined at the Highland Cow Coffee Shop. I had hot chocolate and a grilled cheese, and we spent some time taking photos of the town’s medieval aesthetic. Portree, the largest town on the Isle of Skye, is known for its colorful harbor and charming streets. My next destination was Dunvegan Castle, a fully built medieval castle and the oldest continuously inhabited castle in Scotland. Unfortunately, we arrived at 5:20 PM, just after it closed at 5 PM. Disappointed, we drove another 30 minutes to Neist Point Lighthouse, an abandoned lighthouse on a cliff. The hike to the lighthouse was phenomenal, with sheep dotting the mountains. The lighthouse itself was deserted, with windows showing signs of neglect. After taking some photos, we began our drive back to the Airbnb, stopping at Sligachan Old Bridge, known for its “magical water” that grants eternal beauty."
      },
      {
        "img": "images/scotland-3.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Day 3: 1st Time Trying Chaiiwala"
      },
      {
        "p": "We woke up at 7 AM and started our four-hour drive to Glasgow. Along the way, we stopped at various attractions, including viewpoints next to the Spean River near Spean Bridge. The tranquil river offered beautiful photo opportunities with its reflective waters and surrounding greenery. We had breakfast at a café in town before continuing to the Glencoe Lochan Trail. Although we didn’t have much time, we walked to the lake and took some serene pictures of the mirror-like water. This man-made lochan was created by Lord Strathcona in the 19th century and provides a peaceful escape with its dense woodland and calm waters."
      },
      {
        "p": "We then visited the Three Sisters, three massive peaks reminiscent of the Three Sisters in Australia. These towering mountains are part of the Bidean Nam Bian range and are a popular spot for hikers and photographers. The sight of these majestic peaks was awe-inspiring, and we spent a while just soaking in the views."
      },
      {
        "p": "Upon arriving in Glasgow, we had lunch at Chaiiwala and took a two-hour break. In the evening, we explored the city center, driving around to see the Necropolis, a Victorian cemetery filled with elaborate tombstones and monuments. We also visited Glasgow Cathedral, a stunning example of medieval architecture, and the University of Glasgow, known for its Gothic Revival buildings and picturesque campus. Glasgow Green, the oldest public park in the city, provided a lovely place for a stroll."
      },
      {
        "p": "We parked the car and walked around Buchanan Street, a bustling shopping street lined with high-end stores and street performers. We grabbed dinner at Tim Hortons and visited Primark for some quick shopping. We also saw the statue of the Duke of Wellington, famous for the traffic cone often placed on its head by locals, and explored Merchant City, an area known for its historic buildings and vibrant nightlife."
      },
      {
        "img": "images/scotland-4.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Day 4: The Kelpies"
      },
      {
        "p": "We drove from Glasgow to Falkirk, stopping at a Greggs for pastries for breakfast. In Falkirk, we visited the Kelpies, two massive horse-head sculptures that stand 30 meters high. These impressive structures pay homage to the horse-powered heritage of Scotland and are a striking sight against the landscape. The sheer scale of the Kelpies was breathtaking, and we spent some time marveling at their beauty."
      },
      {
        "p": "Next, we drove 15 minutes to the Falkirk Wheel, a unique rotating boat lift that connects the Forth and Clyde Canal with the Union Canal. Old Town Edinburgh, with its cobbled streets and historic buildings, felt like stepping into a movie. The vibrant architecture and lively atmosphere made it a memorable end to the day. We then took a taxi up to the Royal Mile, a historic street that runs through the heart of Edinburgh’s Old Town."
      }
    ]
  },
  {
    "id": "arizona-april2024",
    "title": "Arizona",
    "date": "April 2024",
    "year": 2024,
    "month": 4,
    "image": "images/arizona-april2024.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.72
  },
  {
    "id": "singapore-december2023",
    "title": "Singapore",
    "date": "December 2023",
    "year": 2023,
    "month": 12,
    "image": "images/singapore-december2023.jpg",
    "width": 2000,
    "height": 2000,
    "scale": 0.82
  },
  {
    "id": "czechia",
    "title": "Czechia",
    "place": "Prague & Brno",
    "blurb": "Red roofs and a French chateau",
    "date": "July 2023",
    "year": 2023,
    "month": 7,
    "image": "images/czechia-1.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 1,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Step into the enchanting embrace of Czechia, where history dances with modern marvels in a captivating fusion. Wander along colorful, narrow streets adorned with timeless architecture and majestic medieval churches that whisper tales of centuries past. This iconic country invites you to unravel its treasures, from the magnificent Sychrov Castle to the mesmerizing Freedom Square in Prague and Brno."
      },
      {
        "h": "Day 1 — Red Roofs Everywhere!"
      },
      {
        "p": "In the morning we started in Bratislava, the capital of Slovakia. After a quick breakfast at our hotel, my family and I drove to Brno, Czechia which took around an hour and a half. We first visited the Cathedral of St. Paul and Peter, initially known as Petrov. The gothic church was a brown color with black accents, making it seem like a villain’s base! However, on the inside, it was much more homey, with a loud organ playing in the background. The music was amazing, so we spent a few minutes sitting in the church."
      },
      {
        "p": "Before leaving, we got tickets to look at the view from one of the spires in the church. There I got an amazing view of the narrow streets and colorful buildings on the red roofs! At the top, there was a pigeon that was guarding its egg in a small nest. The pigeon was very still the entire time, but when we got close it started flapping its wings at us. Leaving the cathedral, we walked down over to the small town square, where there was a farmer’s market. The prices were not too cheap, but the fruits were very fresh, so we got some cherries and raspberries."
      },
      {
        "p": "Walking through the streets, past the Town Square we made it to Freedom Square, where there were many shops along with ice cream parlors, where I bought some ice cream. After a quick look, we walked back to our car to drive to Jurkovič Villa, a house built in 1906 by famous architect Dušan Jurkovič. To me, the house didn’t look too impressive, but it is very modern for the early 20th century."
      },
      {
        "p": "We ate lunch, then drove an hour and a half to Prague. Here we stopped at the National Museum, which we took a quick photo of, before going to Primark. After a short 2 hours, and a lot of new clothing we left for our hotel where we rested for the day."
      },
      {
        "img": "images/czechia-2.jpg",
        "w": 2000,
        "h": 1500
      },
      {
        "h": "Day 2 — A Dancing Building?"
      },
      {
        "p": "After getting ready for the day, we immediately left for Old Town Square in Prague. As we parked a bit far away from the location itself, we walked away from the Vltava River and into the streets. There were lots of high-end shops such as Hugo Boss, Burberry, and more. Near the end of the shops was Freedom Square, where a parade was happening during the time we went. Groups of people of all ages walked in their traditional dress with their country’s flag playing music. We saw many such as Germany, Poland, China and more!"
      },
      {
        "p": "There was a huge crowd so lots of the attractions such as St. Nicholas’s Church and the Stone Bell House were busy, but we were able to get a few good pictures. As it was around an hour and a half, we walked back to our car to drive to Prague 1, a different sector of the city. Here, we walked through a mini-mall and more shops and also bought a freshly baked Chimney Cake, which was absolutely delicious."
      },
      {
        "p": "After driving to Prague 2, we walked down to the river and walked along till we reached the Dancing Building. The building was designed as if the glass portion of it was a person, dancing with the building! There were a lot of tourists but it appeared that the building was empty. It was 1 PM, so I headed to a bagel place where they had really nice bagel sandwiches!"
      },
      {
        "p": "Next, we drove to the Strahov Monastery, which was a long, white building with bright red roofs. Since we couldn’t go inside, we walked along the path and found a beautiful view of the entire Prague city line. It was getting late so we quickly drove to Prague Castle, which looks like Hogwarts from the Harry Potter movies! There we walked around and admired the architecture, and followed the path to find some more historic buildings. Finally, we visited the Golden Lane, which is a small strip with small colorful buildings, straight out of a fantasy book."
      },
      {
        "img": "images/czechia-3.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Day 3 — A French Chateau"
      },
      {
        "p": "Today, we were leaving Czechia to go to Vienna, Austria. Taking a 2-hour drive near the border, we stopped to visit Sychrov Castle in Zámek, Czechia. Here, we saw a beautiful palace-like building used in the 17th–19th century for French royalty. There were huge fields of grass, beautiful plants, and flowers in the garden, along with a huge greenhouse with multiple tropical plants."
      },
      {
        "p": "Our tour started at 11 AM and was in the local language, and we were given packets with text in English. The entire chateau was beautiful, with color-coordinated furniture, beautiful wallpapers, and amazing wood carvings on the walls, roofs, and doors."
      },
      {
        "p": "When our tour ended, we took our car and drove 1 hour to Vienna, Austria stopping on the way to take pictures of the HUGE fields of sunflowers!"
      }
    ]
  },
  {
    "id": "hungary",
    "title": "Hungary",
    "place": "Hungary",
    "blurb": "A day on the Danube",
    "date": "July 2023",
    "year": 2023,
    "month": 7,
    "image": "images/hungary-1.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.62,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Step into the captivating world of Hungary, a landlocked country embraced by the picturesque Carpathian Basin and bordered by Austria and Slovakia. In the heart of this enchanting nation lies Budapest, a city renowned for its rejuvenating hot spas and soothing thermal baths, all gracefully woven along the banks of the majestic Danube River. From the poignant memorial of Shoes on the Danube Bank to the awe-inspiring grandeur of the Hungarian Parliament, Budapest’s medieval architecture and design weave a mesmerizing tapestry of history and culture."
      },
      {
        "h": "Morning — The Hungarian Parliament"
      },
      {
        "p": "In the morning we left our hotel in Hungary, which was near Austria. In around a 1-hour drive, we made it to Budapest, Hungary where we parked our car. In Budapest, public transportation was excellent so we both had day tickets on the metro there. To enter the metro, it was a very long and steep escalator that went through deep in the ground. Here we boarded a fast train to the Hungarian Parliament."
      },
      {
        "p": "At the Hungarian Parliament, we walked around taking pictures of the iconic narrow streets with red roofs along with the train lines going on the road. Nearby, were other old buildings with similar architecture. At around 10 AM, we went to the visitor center of the Hungarian Parliament, where we started our tour of the inside. Unfortunately, there was no English guide and the tour was in Italian, so we had to just walk around. The Parliament, however, was amazing, and we even got to see the soldier switch, in the room where the crown and scepter of Hungary is stored."
      },
      {
        "img": "images/hungary-2.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Noon — Fashion Street"
      },
      {
        "p": "It was getting pretty hot outside, so we decided to take a break. After the tour of the Hungarian Parliament, we returned to the car parking area through the metro. In the underground metro, was a small shop selling chimney cakes. I decided to buy one, and it was the best option ever! It was so tasty — like a crispy churro with a soft inside, with a lot of cinnamon flavor but light sugar."
      },
      {
        "p": "From the parking lot, we took another ride to St. Stephen’s Basilica. Based on the admission tickets ($20 per person) we decided to take pictures from the outside, then watch a video later. Once done, we visited Fashion Street, which is a street with a combination of new and old architecture filled with modern shops such as H&M and Lindt. In the Lindt store, I saw around 30 different flavors from banana to orange!"
      },
      {
        "img": "images/hungary-3.jpg",
        "w": 2000,
        "h": 1500
      },
      {
        "h": "Evening — The Danube River"
      },
      {
        "p": "After heavy jetlag and walking around the sun all day we were left tired, so we left to the parking lot, where we took our car and left to our hotel. After sleeping for a few hours, we woke up and got ready to go outside again. We parked our car in Margaret Island, a small island in the middle of the Danube River. From the island, we took a bus to the other end, where we visited the Chain Bridge. Here we were able to enjoy the sunset while also taking pictures of the crown statue in the middle of the bridge."
      },
      {
        "p": "Since we covered the main attractions of Budapest, and the remaining attractions were closing, we headed to Great Market Hall, where we browsed through the huge open-air building with multiple little shops, with bright lights! The sun had set, and we were running low on time, so before heading back to the hotel, my parents and I went to Decathlon to check out the sports products, then visited a Thai fast-food restaurant nearby, where I ate dinner."
      },
      {
        "p": "My parents and I took the local public bus to our hotel, where we rested. I was excited to leave for Slovakia the next day!"
      }
    ]
  },
  {
    "id": "slovakia",
    "title": "Slovakia",
    "place": "Slovakia",
    "blurb": "One day in the old town",
    "date": "July 2023",
    "year": 2023,
    "month": 7,
    "image": "images/slovakia-1.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.85,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Welcome to the enchanting city of Bratislava, Slovakia’s fusion of history and modern allure. Walk along its cobblestone streets lined with historic buildings, where whispers of bygone eras still echo in the air. From the imposing Bratislava Castle overlooking the Danube River to the charming squares filled with vibrant culture, this city is a treasure trove to explore."
      },
      {
        "h": "Morning — UFO Bridge!?"
      },
      {
        "p": "I was excited for today, to travel around Slovakia! Unfortunately, Slovakia is one of the less visited countries out of the bigger countries in Europe. Once we got ready, we drove 2 hours from Budapest, Hungary and finally made it to Bratislava, the capital of Slovakia. We parked our car near the Danube River and walked down the sidewalk on the sides."
      },
      {
        "p": "From there, we were able to view the amazing Most SNP Bridge, also known as the UFO Bridge. The bridge did look like alien architecture, with a UFO-like building on the top of the suspension tower. After relaxing from the long drive, and having some snacks, we returned to our car and drove to Old Town Bratislava."
      },
      {
        "img": "images/slovakia-2.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Noon — An Amazing Italian Restaurant"
      },
      {
        "p": "After arriving in Old Town Bratislava, we started walking down the hot, cobblestone streets searching for a nice restaurant to eat at. In one of the small hallways that went through the buildings, we found a small Italian restaurant, which had a nice menu. Here, we were greeted by an old man, who was very nice and recommended some dishes. The food was amazing, and he later told his story of how he came to Bratislava."
      },
      {
        "p": "The man lived in Italy, working at a restaurant for around 20 years, before opening his restaurant in Slovakia. Now, he does yoga and his dream goal is to one day visit India to continue his yoga journey. He hopes to raise enough money through his restaurant to do this. If you ever visit Bratislava, I highly recommend visiting Bagelka Na Zelenei. After a delicious lunch, we said bye to the owner and left to visit St. Martin’s Cathedral. It was closed on the inside, but we were able to see the beautiful white, red-roofed church!"
      },
      {
        "img": "images/slovakia-3.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Evening — An 800 Year Old Street"
      },
      {
        "p": "We walked further into the Old Town to visit Kapitulska Street, an old street believed to have been used since the year 1204! The street didn’t look too different from the rest of the streets in Old Town Bratislava other than a little fazed up. The buildings still had the signature red roofs that I saw throughout the Balkans. Here we were able to see the medieval walls built back in the day. The walls were uniformed and built out of misshapen rock bricks held by concrete-like man-made rock. Along with the wall, we crossed the old bridge that is now under a bustling highway!"
      },
      {
        "p": "My family and I continued the path from the old bridge, up the other side of the town where we ended up following the path till we reached Bratislava Castle. We were pretty tired from the high heat, so we skipped the tour of the castle but did admire the view of the city including the UFO bridge from the hill. The castle itself towered above us and was very symmetrical in its bright white color."
      },
      {
        "p": "After the long walk back to our car, we visited Eurovea which is a huge modern mall, that had a choir performance when we visited. We ate dinner and went to Primark, an amazing store with cheap prices but very nice clothing. There was only 20 minutes before the store closed, but we were able to buy some nice items. As it got late, we went to our hotel and finished the long day trip."
      }
    ]
  },
  {
    "id": "elsalvador",
    "title": "El Salvador",
    "place": "Land of the Volcanoes",
    "blurb": "Five days, coast to crater",
    "date": "April 2023",
    "year": 2023,
    "month": 4,
    "image": "images/elsalvador-1.jpg",
    "width": 1500,
    "height": 2000,
    "scale": 0.7,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "El Salvador is a unique country in Central America bordered by Guatemala and Honduras. Other than sharing the same language as its neighboring countries, El Salvador has so much to offer, such as pupusas, a famous pancake-like food made of cornmeal, rice flour, cheese, and beans. On top of that, there are multiple attractions such as El Tunco for surfing, many Mayan archaeological sites, active volcanoes for hiking, and historical towns."
      },
      {
        "h": "Day 1 — Arrival in San Salvador"
      },
      {
        "p": "This was my 3rd time landing at San Salvador International Airport, although I never exited. My flight was from Oakland Airport in California at 10:30 PM PST, and I landed at 5 AM the next morning in San Salvador. We completed immigration, rented a car and drove to a breakfast restaurant to fuel up for the day. Here, we had our first taste of pupusa, which is a staple food in El Salvador and is available in pretty much every nook and cranny. It tasted like a cheese pancake."
      },
      {
        "p": "We went to downtown San Salvador, where we had a guided walking tour. We started in the central park where our guide explained the history of the country. Around 2 years ago, before the new government took over, the central park of San Salvador along with many of the other places in the country was taken over by gangs and bandits. Now, the country is a much safer place. On the tour, I noticed multiple people dressed similarly to police with big guns strapped to their bodies."
      },
      {
        "p": "Throughout the tour, we visited various churches, like the central church (which was surprisingly rebuilt 3 different times, due to fires and earthquakes) and historic buildings that are still being used. Out of these structures, my favorite was Iglesia El Rosario. The church on the outside looked very uninviting as it was entirely built with concrete which was stained over the years, but on the inside it looked amazing, with shards of stained glass shining colorful lights of the rainbow on the inside."
      },
      {
        "img": "images/elsalvador-2.jpg",
        "w": 2000,
        "h": 1920
      },
      {
        "h": "Day 2 — Trekking to the Top of a Volcano"
      },
      {
        "p": "Once we got ready and ate breakfast at our hotel, we drove to Santa Ana Volcano, an active volcano famous for its small lagoon of milky aqua sulfurous water. We bought entry tickets and paid for a guide, which was needed for protection from any robbers or bandits."
      },
      {
        "p": "The beginning of the guide took us lower than we already were, to the base of the volcano. The trail wasn’t very difficult but was very uneven with small pebbles, massive rocks, and more. In around 2 and a half hours, we made it to the top of the volcano and were able to see the lake. Unlike Lake Louise in Canada, the pool of water was the same color as in the pictures!"
      },
      {
        "p": "My family and I spent around 30 minutes on the top of the volcano, then headed back. As it was the weekend, there were plenty of trekkers on the trails, slowing us down. Towards the end, we were very tired, so we took a pickup-truck taxi from the base of the mountain to the parking area. Before heading to our hotel, we drank some tender coconuts and then went to Lake Coatepeque where we were able to negotiate the boat fare down to $20 for 30 minutes. It was a relaxing ride after the tiring trek."
      },
      {
        "img": "images/elsalvador-3.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Day 3 — Ruta de las Flores"
      },
      {
        "p": "After waking up and getting ready, we ate breakfast at the hotel and drove to Sonsonate. Here, we stopped to take some pictures of the Monumento a Los Ferrocarrileros. It was a very small monument, with colorful murals near the train tracks and an old train parked on the side. After snapping a few pictures we started driving toward Salcoatitán. Before arriving, we stopped at some roadside shops, where we bought a colorful woven basket and some wooden utensils."
      },
      {
        "p": "When we arrived in Salcoatitán, we visited a museum and learned about the Industrial Revolution, some of the machines used, and the history. Finishing up with the museum we had some tender coconuts for lunch then headed to Apaneca, which is a famous adventure park with many different attractions. In the park, I went on all the rides including the Pendulum, Rainbow Slide, Labyrinth, Zipline Surfing, and more!"
      },
      {
        "p": "Before going to our hotel, we visited a coffee plantation, where they had great-tasting coffee, so I bought some coffee beans. My parents and I later made it to Ataco and viewed its amazing murals and roadside shops. We bought many souvenirs, before going to a Mexican restaurant nearby called El Bistro Habanero — the best Mexican food I’ve ever had. The quesadillas were amazing and the waiters were very nice."
      },
      {
        "img": "images/elsalvador-4.jpg",
        "w": 2000,
        "h": 1500
      },
      {
        "h": "Day 4 — The Remains of the Mayan Empire"
      },
      {
        "p": "Today, we were leaving our hotel, so we packed all our luggage and left for Tazumal, an ancient Mayan ruin built between 250 and 900 CE. The ruin was right next to the city and looked ancient. Unlike world wonders like Chichen Itza or Tikal, this monument was much less intricate. Don’t get me wrong, it’s still an amazing remnant with interesting history, but it doesn’t have the architectural expertise of some of the other famous ancient monuments."
      },
      {
        "p": "After finishing Tazumal, we went to Casa Blanca, another monument 400 years older. We had an amazing guide there, who taught us about the rich history of the entire place along with explaining the architecture. Then we left for San Andrés, yet another Mayan remnant, with similar non-symmetric pyramid architecture made out of lime and stone cement covering moderate-sized rocks and mud."
      },
      {
        "p": "For the last monument of the day, and the best, we arrived at Joya de Cerén. This remnant is the most famous of them all, nicknamed the Pompeii of America and recognized as a UNESCO World Heritage Site. The Mayan remains were covered by a huge tent-like structure. We finished the museum first, where we learned that the people in this area were buried by volcanic ash. The remains were well below the ground, but we were amazed by the brilliance of the architecture of the time. They even had a structure with a dome!"
      },
      {
        "p": "After finally arriving at our hotel, we rested for a while before going to the beach, which was around 100 feet from our hotel room. The beach was one of a kind with the finest black sand I’ve ever seen — both powdery and pure. On top of that, the ocean was very warm compared to the harsh, cold waters of California, where I’m from."
      },
      {
        "img": "images/elsalvador-5.jpg",
        "w": 1500,
        "h": 2000
      },
      {
        "h": "Day 5 — Black Sand Beach"
      },
      {
        "p": "Our flight was at 3 PM, so we woke up at around 7 AM, spent some time on the beach, ate breakfast at our hotel then drove on the highway to El Sunzal, where we enjoyed the beach views from the cliff by drinking some tender coconuts! We took more pictures, then headed back toward our hotel, stopping once again at El Tunco for the beach view."
      },
      {
        "p": "On the way, we stopped by a gas station where we bought a mango popsicle which tasted amazing. It had a chamoy-type flavour to it, with some salt, sweet, sour, and spicy all at once. We wanted more so we stopped at another ice cream shop and bought more. Finally, we reached the airport, returned the rental car, and took our flight back to California."
      }
    ]
  },
  {
    "id": "tokyo",
    "title": "Japan",
    "place": "Japan",
    "blurb": "Twelve hours on a layover",
    "date": "January 2023",
    "year": 2023,
    "month": 1,
    "image": "images/tokyo-1.jpg",
    "width": 1679,
    "height": 2000,
    "scale": 0.95,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Tokyo is one of the most hustling and bustling cities, but it is unique from all the others such as London, San Francisco, and New York. There are vending machines everywhere selling anything from bowls of ramen to hot coffee for less than 2 dollars. The food is also world famous, from Japanese A5 Wagyu to ramen bowls and KitKats. In this 12-hour layover, I visited everything from Shibuya Crossing to Shinjuku Gyoen."
      },
      {
        "h": "Hours 1–3"
      },
      {
        "p": "After a long flight from San Francisco to Tokyo we arrived at Haneda Airport. We were left very drowsy and tired when we landed, but we didn’t have any time to freshen up immediately. Once landed, my family and I headed straight to customs, where we had to stand in a line for nearly an hour and a half before it was our turn. Only 2 people were working in customs, so the usual 20–30 minutes was lengthened much longer."
      },
      {
        "p": "We took the metro, and 15 minutes and 1 line switch later, we arrived at Shibuya Crossing — one of the most famous scramble crossings in the world. During the night, it is especially stunning due to the bright billboards and buildings in the night sky. We arrived at around 5 AM, meaning that almost all the stores were closed. With nothing to do, we walked around the streets, at a freezing 30°F! After about 30 minutes we found a McDonald’s where we ate breakfast."
      },
      {
        "img": "images/tokyo-2.jpg",
        "w": 1711,
        "h": 2000
      },
      {
        "h": "Hours 4–5"
      },
      {
        "p": "We spent around an hour warming up in the McDonald’s before taking the metro again to Shibuya Garden. One of the strange things about Tokyo was that some of the alleys were really dirty with a huge amount of trash on the ground, while the main streets and roads were spick and span. Shibuya Garden was a beautiful city park with ponds and creeks, like a mini Central Park."
      },
      {
        "p": "It didn’t take us long to cover the park, so we headed to Yoyogi Garden and Temple on the metro. This garden was very beautiful, but much colder than the other places, due to the huge trees that blocked the sun and a more moist climate. I highly recommend going to these places at noon or later."
      },
      {
        "img": "images/tokyo-3.jpg",
        "w": 1674,
        "h": 2000
      },
      {
        "h": "Hours 6–7"
      },
      {
        "p": "In Yoyogi Garden, there was a shrine in the middle, which was very beautiful. On the way toward the shrine, there were many barrels of sake, a type of Japanese rice wine. Photos weren’t allowed inside the temple, but they did have souvenirs with pictures of the temple and religious gifts in the gift shop. On the way out of the garden, we window-shopped the main gift shop and left for the metro station again."
      },
      {
        "p": "This time we got a ticket to Shinjuku Gyoen, a very famous park for its numerous plants and trees. It was a thirty-minute walk from the station, so we stopped at an Ikea to get some cinnamon rolls and warm up again. Some of the items on the menu were different compared to the ones in the USA."
      },
      {
        "img": "images/tokyo-4.jpg",
        "w": 2000,
        "h": 1332
      },
      {
        "h": "Hours 8–9"
      },
      {
        "p": "After the cinnamon rolls, we headed to Shinjuku Gyoen, which was very, very beautiful. There were many types of plants and trees with stunning blossoms, in all colors! The entire park was gated and had a boardwalk, so it was very comfortable. I highly recommend this to anybody who comes to Tokyo. We were about to head to the Imperial Palace right after, but it was closed."
      },
      {
        "p": "On the walk back to the train station we got some boba and sipped it on our way back to Shibuya Crossing. Our legs were very tired, after walking around 15,000 steps, so we decided to head to Uniqlo. The Uniqlo in Tokyo was huge with over 5 floors! They had unique clothing, most of it for cold weather, so I got a sweater."
      },
      {
        "img": "images/tokyo-5.jpg",
        "w": 1676,
        "h": 2000
      }
    ]
  },
  {
    "id": "laos-january2023",
    "title": "Laos",
    "date": "January 2023",
    "year": 2023,
    "month": 1,
    "image": "images/laos-january2023.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.58
  },
  {
    "id": "cambodia",
    "title": "Cambodia",
    "place": "Siem Reap",
    "blurb": "Three days around Angkor",
    "date": "December 2022",
    "year": 2022,
    "month": 12,
    "image": "images/cambodia-1.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.88,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Welcome to the enchanting realm of Cambodia, a jewel in Southeast Asia adorned with cultural treasures and rich history. Beyond the iconic Angkor Wat, prepare to be captivated by the mystical allure of Bayon Temple and the floating wonders of Kampong Phluk villages. In this whirlwind 3-day escapade, I dove into the heart of Cambodia’s most sought-after attractions, indulging in a tapestry of unique experiences that left an indelible mark on my journey."
      },
      {
        "h": "Day 1 — The Floating Villages of Kampong Phluk"
      },
      {
        "p": "It was around 2 PM when I arrived at Siem Reap Airport, from Ho Chi Minh City, Vietnam. The temperature was moderately hot, and also a little more humid compared to Vietnam. A driver at the airport offered for us to hire him, for the next 2 days, so we could tour around Cambodia, and after some negotiating, we were able to get to a good price. He drove us to our hotel where we put our check-in luggage and then took off to Kampong Phluk."
      },
      {
        "p": "The drive to Kampong Phluk could have been smoother. Most of the way, there was a paved road, but towards the end when we neared the river the road became unpaved and much bumpier. The ticket center was 30 minutes before reaching the river, and was 60 dollars a person! This was so expensive, but we decided to buy tickets. At the river, we gave our tickets and were assigned a skipper, who took us to Kampong Phluk, the biggest freshwater reserve in Asia."
      },
      {
        "p": "In the lake, there was an anchored boathouse with 2 floors, in which they served coconut water and a viewing deck. We got some coconuts and enjoyed the sunset. In about 30 minutes the sun was set, so we returned. I highly recommend Kampong Phluk, as the lake, the route to the lake, and the floating villages are all beautiful. In about 45 minutes we made it back to Siem Reap, and it was pitch dark."
      },
      {
        "p": "For dinner, we went to Pub Street, which is a tourist strip in downtown Siem Reap, with loud music, disco, neon lights, and great food. The food was both delicious and cheap! It was about 10 PM when we walked back to our hotel, and we slept immediately."
      },
      {
        "img": "images/cambodia-2.jpg",
        "w": 2000,
        "h": 1500
      },
      {
        "h": "Day 2 — Angkor Wat"
      },
      {
        "p": "I woke up at 4 AM, to see the sunrise at Angkor Wat. Quickly showering, our driver drove us to the ticketing center where we bought tickets for 2 days. After buying tickets, we headed to the temple where we walked to the viewing area. In about 30 minutes of arriving at the temple, the sun started rising, and it was breathtaking! Looking at the majestic silhouette of the temple is extremely worth it, and I urge tourists to go for the sunrise!"
      },
      {
        "p": "In another 30 minutes, the sun came up entirely, and we hired a guide for a tour of the temple. We weren’t allowed in level 3 of the temple because it was Buddha Day. The temple is truly an ancient wonder, with nearly 10 million tons of carved sandstone! The temple was originally Hindu, with many Hindu sculptures and carvings but was later converted into a Buddhist temple. In about 2.5 hours, we were able to finish the temple and left for Bayon temple."
      },
      {
        "p": "Bayon temple was bigger in area, but the temple itself was small. It consisted of many Buddha face carvings at the entrance and many small shrines inside the borders. Before leaving, we drank some coconuts at a nearby shop and saw some monkeys climbing some trees. It was around lunch so our driver took us to a nice outdoor restaurant with traditional Khmer food."
      },
      {
        "p": "We were really tired after walking so much in the hot sun, so we went to the Ta Prohm temple, also known as the Tomb Raider Temple, as the movie was filmed there. Many trees were growing from the walls of the temple, including the iconic Crocodile Tree, which starred in the movie! Although the area of the temple was small, the paths were windy causing us to spend around an hour at the beautiful temple."
      },
      {
        "img": "images/cambodia-3.jpg",
        "w": 2000,
        "h": 1500
      },
      {
        "h": "Day 3 — The Lady Temple"
      },
      {
        "p": "I woke up at 6 AM, a bit later than yesterday as we weren’t watching the sunrise in Angkor Wat again. Once ready, we took a 45-minute drive to the Lady Temple, nicknamed for its unique pink color. The distinct pink color of the temple is from the pink sandstone used exclusively only on this temple out of all the others from the Khmer Empire."
      },
      {
        "p": "We visited the temple right at opening time, which meant that there was no one in the temple! We were able to get many photos and observe the elaborate carvings. In my opinion, I felt the temple was the most well-preserved due to most of the carvings being very sharp and not sanded down like the others. Once done, we left for the King’s Swimming Pool, a man-made pool dug and filled by manual labor spanning over 2.26 million square feet! During the time of use, only the king was able to swim in the pool."
      },
      {
        "p": "Near the pool was the King’s Palace, which had multiple viewing points, so we toured the entire remnant. For our final attraction in Cambodia, we returned to Angkor Wat, to look at level 3. We used the back entrance, which was closer to the temple and had a much more symmetric view. We climbed the very steep steps up to level 3, with amazing views of the rest of the temple along with the main Buddha shrine."
      },
      {
        "img": "images/cambodia-4.jpg",
        "w": 2000,
        "h": 1500
      }
    ]
  },
  {
    "id": "vietnam",
    "title": "Vietnam",
    "place": "Saigon to Halong Bay",
    "blurb": "Six days, north to south",
    "date": "December 2022",
    "year": 2022,
    "month": 12,
    "image": "images/vietnam-1.jpg",
    "width": 1666,
    "height": 2000,
    "scale": 0.66,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Vietnam, nestled in Southeast Asia, is a captivating country with a rich cultural heritage and breathtaking landscapes. One cannot miss the vibrant Vietnamese cuisine, featuring iconic dishes like pho, a delicious noodle soup, and banh mi, a mouthwatering baguette sandwich filled with flavorful ingredients. Beyond its culinary delights, Vietnam offers many attractions, from the stunning limestone formations of Halong Bay to the bustling streets of Hanoi and Ho Chi Minh City."
      },
      {
        "h": "Day 1 — A Visa Problem in HCM City"
      },
      {
        "p": "After a long flight with a 12-hour layover in Tokyo, Japan we arrived in Ho Chi Minh City, Vietnam at around 10 PM, so we were sleepy. During customs, my mom and dad could pass, but unfortunately, they didn’t let me pass due to my visa being invalid as it was in an old passport, even when the US Embassy said it was possible. The Visa Officers started threatening that I return to the United States, and told us that they would only let us in the country if we paid 200 dollars for a new Visa. This was all a money scam as the price should’ve been 15 dollars."
      },
      {
        "p": "We waited for 3 hours and tried negotiating, but they tried threatening us! They said a few other US and Australian citizens had “invalid” visas and made them pay 200 dollars. As we knew they wouldn’t let me in without paying, we paid and got the visa and finally made it to our hotel at around 1 AM!"
      },
      {
        "img": "images/vietnam-2.jpg",
        "w": 1658,
        "h": 2000
      },
      {
        "h": "Day 2 — The Ben Thanh Market"
      },
      {
        "p": "After eating breakfast in our hotel, we visited the Ho Chi Minh Post Office. The post office was famous for its French Gothic architecture and was built in 1896. Currently, it operates as a tourist spot with multiple souvenir shops inside as well as an operating post office. I was able to buy a Vietnamese coffee filter which was on my to-do list. After the post office, we took a taxi to the HCM Zoo and Garden!"
      },
      {
        "p": "The zoo was pretty regular with the usual animals such as lions and elephants but also had rooms filled with skeletons of archaic animals. The zoo had many small attractions, filled with lush plants and vivid flowers. I even got lost in the corn maze! Quickly after covering the zoo, we left for the Vietnam War Museum where we spent around 2 hours learning about the dark history of the Vietnam War and how it affected the country, including Agent Orange."
      },
      {
        "p": "It was getting moderately late, so we left to get some lunch at an American Chinese restaurant, where we got vast amounts of food for a low price! After eating till we were full, we went to the nearby Ben Thanh Market, famous for almost any kind of item. Its specialty is selling cheap fakes of expensive items. I had to admit some of the fake Jordan 1s and Rolex watches did seem pretty real. Later, we walked around enjoying the city life and Vespa traffic on the roads."
      },
      {
        "img": "images/vietnam-3.jpg",
        "w": 1662,
        "h": 2000
      },
      {
        "h": "Day 3 — Thoi Son Isle"
      },
      {
        "p": "We woke up early at 6 and finished breakfast in our hotel. We took our rented car to Thoi Son Isle which is around an hour and a half away from HCM City. We booked a tour with a local company and took a horse carriage ride to the main island. Here we went to a small part of the village where I saw a small bee farm, full of honeycombs along with a pet snake they had, which I got to hold! Here, we tasted honey tea, which is made with the special honey cultivated there."
      },
      {
        "p": "After drinking some tea, we took a riverboat ride with one of the locals through the lush rivers on the island! The views were amazing, with water coconuts growing in the water. After the ride, I had my first trial of water coconut juice which was different compared to tender coconut, as it had a much sweeter taste. Before ending our tour, we walked to another location on the island, where we ate native fruits, which were very fresh! While we ate, the locals sang and played music with their instruments for us. Lastly, we visited a peanut candy-making tour — an open-air room with a giant fire pit where they cooked the sugar and peanuts."
      },
      {
        "p": "We drove 2 hours to the Cu Chi Tunnels. I was very interested in this, as it was a series of paths for the Vietnamese during the Vietnam War. They used tunnels less than 2 feet high to get around and hide from the US military. During the guided tour, we were able to try a few of the tunnels, but they were enlarged to make it safer for tourists now! I genuinely can’t believe fitting in a 2-foot tunnel."
      },
      {
        "img": "images/vietnam-4.jpg",
        "w": 1662,
        "h": 2000
      },
      {
        "h": "Day 4 — Leaving Ho Chi Minh City"
      },
      {
        "p": "We slept in till about 7:30, as we didn’t have much to cover today. After eating breakfast in the hotel, we walked around outside and took pictures of the cityscape. We visited the City Center around half a mile from our hotel then visited the HCM Opera House, which was close by. Vietnam is famous for coffee, so I wanted to try the local coffee at a cafe chain called Highlands Coffee. Here I bought a Phin Freeze. I made a good decision, as it was one of the best coffee drinks I’ve ever had — a frappe with dark coffee notes and coffee jelly!"
      },
      {
        "p": "Before leaving, we went to the Independence Palace, which is now a tourist spot but was the home and workplace of the Vietnamese President during the war. As it was time for our flight we left back to the airport where we took a flight to Siem Reap, Cambodia."
      },
      {
        "img": "images/vietnam-5.jpg",
        "w": 1679,
        "h": 2000
      },
      {
        "h": "Day 5 — The Route to Halong Bay"
      },
      {
        "p": "Once arriving in Hanoi, Vietnam we needed a car to drive to Halong Bay. We hailed an Uber and made it to a place where we met a guy to rent the car. He tried to manipulate us by remaking our previous deal and kept asking for more money. After about 40 minutes we settled back on the old deal, and took the car to Halong Bay, which took around 2 hours! Google Maps malfunctioned along the way, so we had slight difficulties finding the hotel when we got near, and we were finally able to sleep at around 11 PM."
      },
      {
        "img": "images/vietnam-6.jpg",
        "w": 2000,
        "h": 1698
      },
      {
        "h": "Day 6 — Lush Caves and Cliffs"
      },
      {
        "p": "We only had the Halong Bay day tour planned for the day, so we only needed to wake up at 8. We got ready and drove to the docks, which was very close to our hotel, and waited for an hour till we boarded the boat. Around 1 mile out from the mainland, we were in Halong Bay with all the rock spires and cliffs! I was surprised that it was so close to shore!"
      },
      {
        "p": "In 30 minutes, they served lunch, then we kept going toward the first lookout point. In an hour we made it there, where we climbed up the cliffs and through the caves in the rock formations. There I was able to see the picturesque sight of Halong Bay! After we boarded the boat again, we made it to another location where we could kayak into a lagoon surrounded by lush rock spires. After kayaking we turned back to the mainland, briefly stopping at one of the small rock spire islands which had a manmade beach along with a lookout point at the top of the spire, which had a beautiful view of the sunset."
      },
      {
        "p": "After finishing the entire day trip in Halong Bay, we finally made it back to our car. We took the car and drove 3 hours to Ninh Binh, where we settled for the night."
      }
    ]
  },
  {
    "id": "canada",
    "title": "Canada",
    "place": "Jasper & Banff",
    "blurb": "Five days through the Rockies",
    "date": "October 2022",
    "year": 2022,
    "month": 10,
    "image": "images/canada-1.jpg",
    "width": 2000,
    "height": 1428,
    "scale": 0.78,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Canada is a very unique country famous for many attractions, including its historic monuments and very famous national parks. Although very cold during the winters, Canada has tourism year round to Jasper and Banff National Park, the most visited national park in the country. The parks include amazing attractions including the famous Lake Louise, and the Columbia Icefields. In this short 5 day trip, I covered Canada from Edmonton to Calgary, stopping at both Jasper and Banff."
      },
      {
        "p": "This trip was one of the first travels I had after Covid-19, so I was very, very excited to get out and travel again."
      },
      {
        "h": "Day 1 — Arrival in Edmonton"
      },
      {
        "p": "I was very excited about this trip, since I hadn’t traveled in over 2 years. I left school early, at about 1 PM on Wednesday. When I got home, my family and I got ready and we left for Oakland Airport where we took a flight on Air Canada to Edmonton. It was a bit cold, about 20°F, when we landed, but it was manageable. We got our luggage, picked up a car — an orange Jeep Compass — then got on the road. It was about 9:30 PM, so we got some food and arrived at our hotel."
      },
      {
        "img": "images/canada-2.jpg",
        "w": 1502,
        "h": 2000
      },
      {
        "h": "Day 2 — West Edmonton Mall"
      },
      {
        "p": "This morning, we vacated our hotel and left to see Edmonton’s attractions. We got some breakfast at Tim Hortons, which was both very cheap and tasty. After breakfast, we headed to Fort Edmonton Park. It was closed till Halloween so we just took some pictures in the parking lot. The fall colors were very beautiful, and it was as if we were in Vermont."
      },
      {
        "p": "Next, we went to West Edmonton Mall. Sadly, we somehow got locked out of our car because our keys were inside it. We decided to call our insurance and headed to the mall anyway. The mall was amazing — it had an entire waterpark, hundreds of shops, a Diagon Alley, mini golf and an entire pirate ship! We spent about 2 hours in the mall. We still didn’t have any way of getting into our car, so instead of waiting on the insurance company, we called a locksmith. He charged us over 200 dollars, and broke into our locked car within 2 minutes."
      },
      {
        "p": "Once we got our car back, we headed on the road to Jasper National Park. As we got farther away from Edmonton, the landscape started to change from buildings every few miles to many, many trees and rock formations. The road also got straighter, like something from a movie. After about 2 hours, we made it into Jasper National Park. When we entered, we encountered some goats, so I was able to stop and take a quick selfie with them. When we made it to the city of Jasper, we were able to meet some elk — I was only a few feet away!"
      },
      {
        "img": "images/canada-3.jpg",
        "w": 1502,
        "h": 2000
      },
      {
        "h": "Day 3 — Creeks and Canyons"
      },
      {
        "p": "It was very cold in the morning, and I was very discouraged to get up. However, I was excited to check out all the cool attractions in Jasper National Park, so I slowly got up. We headed to Medicine Lake. The lake was very misty and a little dried up, but was one of my favorite lakes of the trip. We headed in the same direction to visit Maligne Lake, which was very beautiful, with lots of waves and huge amounts of mist, which made it seem like the ocean."
      },
      {
        "p": "Before heading back, we made sure to visit Maligne Canyon, a deep, deep canyon with huge amounts of moss and trees with a creek going through it. It was very hard to see the water, because of the depth, but the sound was very loud. We wanted to really enjoy our lunch so we stopped at a nearby river and ate on the riverbanks. After lunch, we took some photos of the fall colors in the middle of the road, as it was very empty."
      },
      {
        "p": "On the way to our hotel, we went to a small lookout point, where we hiked to Athabasca Falls. Athabasca Falls is easily one of the most beautiful falls I have ever seen — the water was as blue as the Tahitian sea, if not more. After that, we headed toward Banff National Park. On the way we visited Sunwapta Falls, which was absolutely stunning. I liked it even more than Athabasca Falls. We took some pictures through our car window of the Columbia Icefields en route to our hotel."
      },
      {
        "img": "images/canada-4.jpg",
        "w": 1502,
        "h": 2000
      },
      {
        "h": "Day 4 — Lake Louise"
      },
      {
        "p": "I was very hyped up for today. From every single video I’ve watched and article I’ve read, Lake Louise is the number 1 attraction in Banff National Park. I was exuberant to see the one-of-a-kind blue water and surrounding mountainous landscape. We visited Peyto Lake first, which was very beautiful, looking similar to Lake Louise. It does take a short hike to make it to the lake, but it was worth it."
      },
      {
        "p": "We then visited Bow Lake, which looked just like a mirror. I was very shocked to see how still the water was. Despite the fact it was already cold, and the lake was even colder, I decided to get into the water and take a few pictures. By the time I got out, I couldn’t feel my feet, but the pictures were worth it."
      },
      {
        "p": "There was a huge crowd to get into Lake Louise, and after being rejected to park there twice, we decided to drop each other off instead of going together. Lake Louise was very beautiful, but I was disappointed. Instead of the opaque sky blue waters, I was greeted with a much clearer green-blue. There was a huge crowd, and also boating on the lake, which made it look much less attractive. I may have had really high expectations, but during the time I went it wasn’t the blue it is in the images on Google."
      },
      {
        "p": "After a quick lunch, we hiked on the trail in Taylor Creek, which was very beautiful in the middle of the woods, but was very long so we turned back. Next, we went on to Silverton Falls — an amazing waterfall with a 1 mile hike, very steep at the end. Before arriving at Banff City, we made a detour to Johnston Creek. The hike was very green, and one of the easiest, as it had no incline. At the end there was a private tunnel which let you go right next to the falls, and I got a bit wet."
      },
      {
        "img": "images/canada-5.jpg",
        "w": 2000,
        "h": 1501
      },
      {
        "h": "Day 5 — Canada’s First National Park"
      },
      {
        "p": "The morning was very cold, but the welcoming view of the mountains from our hotel room urged me to wake up. We first made our way to Tunnel Mountain, which has no tunnel, but gave us an amazing view of the entire valley. Before heading to the next attraction we drove to the other side of the mountain, where we got an incredible view of the Fairmont Hotel — the best and most expensive hotel in the Banff area, built in 1888, with an amazing castle look."
      },
      {
        "p": "We set off to Cave and Basin National Park. The park was actually very small, but also amazing. It is known as the first ever in Canada, and is famous for the warm sulfurous springs that are underground. The park was established by 3 railway workers in 1883, but was used by the natives there for much longer. Sadly, you can’t swim in the pool, as an endangered species called the Banff Springs snail lives there."
      },
      {
        "p": "Our flight was at 5 PM, so we quickly went to two more lakes. First, Two Jack Lake, which was very peaceful and had some kayaking spots. Next, Lake Minnewanka, which had lots of boating opportunities and eateries. By this time it was almost noon, so we made sure to go to downtown Banff, where we window-shopped through all the stores. The scenery was eye-catching, and it’s a must-see."
      },
      {
        "img": "images/canada-6.jpg",
        "w": 1502,
        "h": 2000
      }
    ]
  },
  {
    "id": "montana-october2022",
    "title": "Montana",
    "date": "October 2022",
    "year": 2022,
    "month": 10,
    "image": "images/montana-october2022.jpg",
    "width": 1500,
    "height": 2000,
    "scale": 0.92
  },
  {
    "id": "australia-november2019",
    "title": "Australia",
    "date": "November 2019",
    "year": 2019,
    "month": 11,
    "image": "images/australia-november2019.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.72
  },
  {
    "id": "new-zealand-november2019",
    "title": "New Zealand",
    "date": "November 2019",
    "year": 2019,
    "month": 11,
    "image": "images/new-zealand-november2019.jpg",
    "width": 1500,
    "height": 2000,
    "scale": 0.82
  },
  {
    "id": "fiji-november2018",
    "title": "Fiji",
    "date": "November 2018",
    "year": 2018,
    "month": 11,
    "image": "images/fiji-november2018.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 1
  },
  {
    "id": "belize-september2017",
    "title": "Belize",
    "date": "September 2017",
    "year": 2017,
    "month": 9,
    "image": "images/belize-september2017.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.62
  },
  {
    "id": "guatemala-september2017",
    "title": "Guatemala",
    "date": "September 2017",
    "year": 2017,
    "month": 9,
    "image": "images/guatemala-september2017.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.85
  },
  {
    "id": "italy-april2017",
    "title": "Italy",
    "date": "April 2017",
    "year": 2017,
    "month": 4,
    "image": "images/italy-april2017.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.7
  },
  {
    "id": "denmark",
    "title": "Denmark",
    "place": "Denmark",
    "blurb": "Pastries and Nyhavn Harbor",
    "date": "July 2016",
    "year": 2016,
    "month": 7,
    "image": "images/denmark-1.jpg",
    "width": 2000,
    "height": 1335,
    "scale": 0.95,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Denmark is an amazing country known for its architecture and Danish pastries. Out of all the Scandinavian countries, Denmark is the smallest and southernmost. The country has many famous attractions other than its pastries, such as the Tivoli Gardens. In my short 2½ day trip, I covered everything in Copenhagen, Denmark’s capital, including Christiansborg Palace and Nyhavn Harbor."
      },
      {
        "h": "Day 1 — Arrival in Copenhagen"
      },
      {
        "p": "The flight from Ålesund to Copenhagen via Bergen took around 2.5 hours without the transit time. When we arrived in Copenhagen we took our luggage and then took an Uber to our hotel. Our Uber driver was another person from Sri Lanka who recommended some tourist spots and eateries. Before checking into our hotel, we ordered pizza at a nearby Domino’s, then headed to the hotel, ate dinner, unpacked, and slept after the long travel day."
      },
      {
        "img": "images/denmark-2.jpg",
        "w": 1335,
        "h": 2000
      },
      {
        "h": "Day 2 — Nyhavn Harbor"
      },
      {
        "p": "In the morning, I ate to the fullest at a café near our hotel. I ate many Danish pastries, with jam and sweet cream cheese fillings. I also drank some hot chocolate which got me ready for the day. The breakfast was relaxing and slow, but we had lots of attractions to cover, so we hailed a taxi and went to the first attraction of the day: Nyhavn Harbor."
      },
      {
        "p": "Nyhavn Harbor was a colorful Venice. All the buildings were in the colors of the rainbow, and very close together. In the middle of the buildings was a river with many boats of many shapes, sizes, and colors. My family and I spent some time in the harbor, tasting some of the pastries and other food."
      },
      {
        "p": "After having a nice time in Nyhavn Harbor, my family and I left for the Carlsberg factory for a quick history and tour of how they brew on a massive scale compared to the small breweries spanning across Denmark. In the gift shop, I even got a cap that said Carlsberg."
      },
      {
        "p": "The sun started setting, so we headed to the last attraction of the day, Kastellet — a citadel famous for being the best-preserved fortress in Northern Europe. Just like the Pentagon in the United States, Kastellet is in the shape of a pentagon but looks more like a star. The fortress is also surrounded by water which makes it extra cool. Right near Kastellet was the famous statue, The Little Mermaid, which we quickly visited."
      },
      {
        "img": "images/denmark-3.jpg",
        "w": 1335,
        "h": 2000
      },
      {
        "h": "Day 3 — The Tivoli Gardens"
      },
      {
        "p": "After eating breakfast at a nearby café, my family and I left to go to the Tivoli Gardens, an amusement park with lots of decorations, ponds, and more. The Tivoli Gardens has lots of structures from different cultures such as a Japanese minka. I enjoyed the Tivoli Gardens as it was a very fun and entertaining place to be. I loved all the plants and activities, and went on a small boat ride, which was very fun."
      },
      {
        "p": "After spending a few hours at the Tivoli Gardens, we headed to Christiansborg Palace. It is the seat of the Danish Parliament, the Prime Minister of Denmark, and the Supreme Court of Denmark. It was completed in around 1745 and has over 345 rooms. We paid a 20-dollar entry fee to get into the palace where we got an audio tour around the entire building."
      },
      {
        "p": "We were limited on time so we quickly made our way to the last attraction in Denmark. In about 10 minutes we were standing in Frederiksberg Palace, a beautiful yellow building. In front of it was a long field of grass with 2 walkways surrounded by tall trees."
      },
      {
        "p": "The palace was very fun, but my trip to Denmark was coming to an end. After eating a snack in a café, my family and I went on a train ride from Copenhagen to Stockholm, which took about 5 hours."
      },
      {
        "img": "images/denmark-4.jpg",
        "w": 1335,
        "h": 2000
      }
    ]
  },
  {
    "id": "norway-june2016",
    "title": "Norway",
    "date": "June 2016",
    "year": 2016,
    "month": 6,
    "image": "images/norway-june2016.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.58
  },
  {
    "id": "sweden",
    "title": "Sweden",
    "place": "Sweden",
    "blurb": "The Vasa, and the first Ikea",
    "date": "June 2016",
    "year": 2016,
    "month": 6,
    "image": "images/sweden-1.jpg",
    "width": 1335,
    "height": 2000,
    "scale": 0.88,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "Sweden is a unique country known for its ancient Viking history, Swedish meatballs and much more! Out of the Scandinavian countries, Sweden is the most populous and is surrounded by Norway and Finland. Some of the famous attractions in this amazing country are the world-renowned Vasa Museum and the Royal Palace. In my very short 3½ day trip, I covered the main attractions of Sweden and wacky ones such as the first Ikea in the world."
      },
      {
        "h": "Day 1 — Arrival in Stockholm"
      },
      {
        "p": "After a nice time in Denmark, we took a train from Copenhagen all the way to Stockholm. The journey took about 5 hours and was very scenic. I was very tired from the attractions that I saw in Denmark so I slept for most of it. An advantage was that, since we were traveling within Europe, even though we were passing through the borders of countries, we didn’t have to pass through customs again. On arrival, we bought some pizza and immediately headed to our hotel."
      },
      {
        "img": "images/sweden-2.jpg",
        "w": 2000,
        "h": 1334
      },
      {
        "h": "Day 2 — The Vasa"
      },
      {
        "p": "I was very excited for Sweden! Some of my favorite things such as Minecraft, Spotify and Ikea were all founded there. In the morning we went to Old Stockholm, more commonly known as Gamla Stan. This place is a small island separate from modern-day Stockholm and has lots of colorful buildings similar to the buildings in Nyhavn Harbor. Here, I ate breakfast and soaked in all the colors."
      },
      {
        "p": "Next, we had one of the most prominent museums in the world to cover: the Vasa Museum. After getting tickets, I realized how massive the building was. They had fit an entire Viking longboat inside and it took up so much space! The ship spanned about 230 feet and 12 stories. I was surprised at how well the boat was preserved — it is the best-preserved ship of its kind ever found. We spent about an hour in the museum, then went to the gift shop, where I bought a cap for my collection."
      },
      {
        "p": "Before heading to the final attraction of the day, we got some lunch and headed to the boat dock of Stockholm, where we booked tickets for a boat tour. During the tour, we were able to see many of the landmarks of Stockholm from the bay. One of them was Stockholm City Hall, famous for being the venue of the Nobel Prize banquet held on December 10 every year. The ride got me a bit wet, but it made it all the more relaxing."
      },
      {
        "img": "images/sweden-3.jpg",
        "w": 1335,
        "h": 2000
      },
      {
        "h": "Day 3 — The Royal Palace"
      },
      {
        "p": "In the morning, we ate in the same restaurant that we ate at the night before. After a full breakfast, my parents and I went to the first attraction of the day: Ikea. The Ikea we were going to was the biggest and the first that was ever built. Personally, I really like Ikea furniture, since you get to build it yourself. I also like the store since they have very tasty cinnamon rolls."
      },
      {
        "p": "When we got into Ikea, I was impressed at the scale of the build. Unlike other Ikeas, this one was more round in the interior and also had many floors. Since we were traveling we didn’t have too much space in our luggage so we only bought small products. There was also a small candy store on the first floor, where we bought some sour candy."
      },
      {
        "p": "After the amazing Ikea store, we went to the second attraction of the day. The ride there took about 15–20 minutes, and when I arrived I saw the Royal Palace awaiting me. The Royal Palace, also known as the Stockholm Palace, is the residence of the Swedish monarch. The building was very monotone, in a U-like shape. On the contrary, the palace also looked very majestic and beautiful from the view across the river."
      },
      {
        "p": "Once again, when we were done, we headed to Gamla Stan for one last time to look at our last attraction in Sweden: the world-renowned Nobel Prize Museum. The museum tells the long history of the Nobel Peace Prize and how it was created. Next to it is the Nobel Prize Hall, where the awards are given each year. The interior seemed as if it was a palace."
      },
      {
        "img": "images/sweden-4.jpg",
        "w": 2000,
        "h": 1334
      },
      {
        "h": "Day 4 — Goodbye, Scandinavia"
      },
      {
        "p": "Our flight was early in the morning, so I quickly got ready. My parents and I packed our luggage and departed the hotel. We went to Stockholm International Airport, where we boarded our flight to London Heathrow. Being a Harry Potter fan, I went to the official Harry Potter store which I found in one of the terminals and bought an official Hogwarts cup. Our flight to San Francisco was about to take off, so we quickly headed to our gate. In about 12 hours we landed in San Francisco."
      }
    ]
  },
  {
    "id": "costa-rica-april2015",
    "title": "Costa Rica",
    "date": "April 2015",
    "year": 2015,
    "month": 4,
    "image": "images/costa-rica-april2015.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.66
  },
  {
    "id": "panama-april2015",
    "title": "Panama",
    "date": "April 2015",
    "year": 2015,
    "month": 4,
    "image": "images/panama-april2015.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.78
  },
  {
    "id": "peru-april2014",
    "title": "Peru",
    "date": "April 2014",
    "year": 2014,
    "month": 4,
    "image": "images/peru-april2014.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.92
  },
  {
    "id": "alaska-july2013",
    "title": "Alaska",
    "date": "July 2013",
    "year": 2013,
    "month": 7,
    "image": "images/alaska-july2013.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.72
  },
  {
    "id": "newyork",
    "title": "New York City",
    "place": "The Big Apple",
    "blurb": "One day, end to end",
    "date": "March 2013",
    "year": 2013,
    "month": 3,
    "image": "images/newyork-1.jpg",
    "width": 2000,
    "height": 1500,
    "scale": 0.82,
    "with": [
      "Family"
    ],
    "body": [
      {
        "p": "New York City is one of the best cities in the world, nicknamed the Big Apple. It has many attractions such as the Statue of Liberty and Ellis Island, holding centuries of history from the birth of this country. In my short day trip, I covered all the main attractions in New York City from the Charging Bull to the Empire State Building."
      },
      {
        "p": "A quick note before we start: unfortunately, I couldn’t find the photos of my short trip to NYC, even though I did take them. Because of this, the pictures here are stock images."
      },
      {
        "h": "Morning — The Charging Bull"
      },
      {
        "p": "After the early morning flight from Oakland, California to NYC, my family and I took the AirTrain to go to Battery Park. Initially we were about to get off at the Jamaica Station, but instead we dropped off at the Howard Beach Station. The stop was really beautiful with lots of trees and birds cooing. We then took another subway from Howard Beach to the Charging Bull."
      },
      {
        "p": "When we made it I ate some breakfast at Dunkin Donuts — a bagel and some donut holes — then we made it back to see the Charging Bull. The Charging Bull was really cool, and it didn’t look like it had aged at all, despite being built in 1987. We took a few pictures, and roamed around in the streets to take a look at the tall buildings surrounding us."
      },
      {
        "img": "images/newyork-2.jpg",
        "w": 2000,
        "h": 2000
      },
      {
        "h": "Noon — The Statue of Liberty"
      },
      {
        "p": "Next, we headed to Battery Park, a famous park honoring soldiers and veterans from war, and incidents such as 9/11. The park is also famous for having nice views of the harbor, walking and bike paths and much more. At Battery Park, we roamed around taking beautiful pictures of the harbor and also enjoying the ambience."
      },
      {
        "p": "We then booked a ferry to the Statue of Liberty, where I was able to see the world famous statue. In person, it was absolutely huge. I never knew that the pedestal itself was that big. We got to go into the Statue of Liberty, but since we were short on time, my family and I only went up to the base of the statue, and not to the torch."
      },
      {
        "p": "Ellis Island was an immigration office, used during the 20th century for incoming immigrants to the United States. During the early 19th century the island was used as a bunker for the War of 1812. We spent some time in the museum learning some facts about the immigrants and everyone that came through."
      },
      {
        "img": "images/newyork-3.jpg",
        "w": 2000,
        "h": 1328
      },
      {
        "h": "Evening — The Empire State Building"
      },
      {
        "p": "It was around 3 and was getting late, so we got some 99¢ pizza which tasted really good, and headed to the final attraction. We didn’t have too much time, as we had another flight in a few hours, so we went underground through the subway system and made it to the Empire State Building. We still had a few minutes to sundown, so we roamed around looking at the building from different perspectives."
      },
      {
        "p": "After all the walking, I was a bit tired so I got some food at Shake Shack, and we returned to the Empire State Building, where we had some time to watch and enjoy the light show. We only had about 3 hours to our flight to Italy, so we immediately got back onto the subway, and went to the airport."
      }
    ]
  },
  {
    "id": "mexico-february2013",
    "title": "Mexico",
    "date": "February 2013",
    "year": 2013,
    "month": 2,
    "image": "images/mexico-february2013.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 1
  },
  {
    "id": "wyoming-august2012",
    "title": "Wyoming",
    "date": "August 2012",
    "year": 2012,
    "month": 8,
    "image": "images/wyoming-august2012.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.62
  },
  {
    "id": "washington-state-june2012",
    "title": "Washington State",
    "date": "June 2012",
    "year": 2012,
    "month": 6,
    "image": "images/washington-state-june2012.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.85
  },
  {
    "id": "canada-may2012",
    "title": "Canada",
    "date": "May 2012",
    "year": 2012,
    "month": 5,
    "image": "images/canada-may2012.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.7
  },
  {
    "id": "colorado-may2010",
    "title": "Colorado",
    "date": "May 2010",
    "year": 2010,
    "month": 5,
    "image": "images/colorado-may2010.jpg",
    "width": 2000,
    "height": 1333,
    "scale": 0.95
  }
];
