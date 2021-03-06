# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Clothing.destroy_all
Outfit.destroy_all
OutfitClothing.destroy_all

cher = User.create(username: "Cher")
blaire = User.create(username: "Blaire")
ebyan = User.create(username: "Ebyan")

black_jeans = Clothing.create(name: "High Waisted Skinny Jeans", brand: "Levi's", category: "pants", color: "Black", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHxDApGI8Lwu6WV0MwBEX3A7Mbybevgi5sg&usqp=CAU", user_id: blaire.id)
blue_jeans = Clothing.create(name: "Boyfriend Jeans", brand: "Madewell", category: "pants", color: "Blue", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2e18DX9p9KXpRo8umRDPjmeI85-HJAH9zCA&usqp=CAU", user_id: blaire.id)
striped_top = Clothing.create(name: "Striped Tee", brand: "Madewell", category: "tops", color: "Multi", image: "https://i.s-madewell.com/is/image/madewell/H2671_KA4133_ld?wid=500&hei=635&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0", user_id: blaire.id)
white_tee = Clothing.create(name: "White Tee", brand: "Uniqlo", category: "tops", color: "White", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ18omBFWcI9FkMbUSJgWVcKNJYLQTZ_EdTv83i9Gi1DmJ2pG-Aex84zznAlmQVvO-DaD_T58T3A&usqp=CAc", user_id: blaire.id)
dress = Clothing.create(name: "Emerald Midi Dress", brand: "Calvin Klein", category: "dresses", color: "Green", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuDkbcT3IejRpXZuMbD2CPidgdRhCve6zo3Q&usqp=CAU", user_id: blaire.id)
sneakers = Clothing.create(name: "Stan Smith Sneakers", brand: "Adidas", category: "shoes", color: "White/Green", image: "https://n.nordstrommedia.com/id/sr3/3d4dc2f8-2650-4811-b430-378e50e2a19f.jpeg?height=650&width=434", user_id: blaire.id)
heels = Clothing.create(name: "Black Suede Pumps", brand: "J. Crew", category: "shoes", color: "Black", image: "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/28/5b5ce7e34f50d0d06b922cc5/m_5b5ce7e7baebf6ea69355250.jpeg", user_id: blaire.id)

fancy_night = Outfit.create(name: "Company Christmas Party", season: "Winter", occasion: "Cocktail", user_id: blaire.id)
    OutfitClothing.create(clothing_id: dress.id, outfit_id: fancy_night.id)
    OutfitClothing.create(clothing_id: heels.id, outfit_id: fancy_night.id)

basics = Outfit.create(name: "Back to Basics", season: "Any", occasion: "Casual", user_id: blaire.id)
    OutfitClothing.create(clothing_id: white_tee.id, outfit_id: basics.id)
    OutfitClothing.create(clothing_id: blue_jeans.id, outfit_id: basics.id)
    OutfitClothing.create(clothing_id: sneakers.id, outfit_id: basics.id)

casual = Outfit.create(name: "Brunch Date", season: "Spring", occasion: "Casual", user_id: blaire.id)
    OutfitClothing.create(clothing_id: striped_top.id, outfit_id: casual.id)
    OutfitClothing.create(clothing_id: black_jeans.id, outfit_id: casual.id)
    OutfitClothing.create(clothing_id: sneakers.id, outfit_id: casual.id)

date_night = Outfit.create(name: "Date Night", season: "Any", occasion: "Upscale Casual", user_id: blaire.id)
    OutfitClothing.create(clothing_id: black_jeans.id, outfit_id: date_night.id)
    OutfitClothing.create(clothing_id: heels.id, outfit_id: date_night.id)
    OutfitClothing.create(clothing_id: white_tee.id, outfit_id: date_night.id)

# cher's clothes
black_dress = Clothing.create(name: "Skater Dress", brand: "Forever 21", category: "dresses", color: "Black", image: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw6cf27273/4_full_750/00402624-03.jpg?sw=500&sh=750", user_id: cher.id)
plaid_coat = Clothing.create(name: "Plaid Coat", brand: "Bagatelle", category: "jackets", color: "Plaid", image: "https://n.nordstrommedia.com/id/sr3/42de9f1d-3bd5-4bc3-a5a4-5010e1ce65ca.jpeg?height=650&width=434", user_id: cher.id)
button_up = Clothing.create(name: "Striped Button Down", brand: "Ann Taylor", category: "tops", color: "White", image: "https://anninc.scene7.com/is/image/ATF/505715_9000?$488x601$", user_id: cher.id)
bike_shorts = Clothing.create(name: "Bike Shorts", brand: "Alo", category: "shorts", color: "Black", image: "https://cdn.shopify.com/s/files/1/2185/2813/products/W6218R_01_1_750x.jpg?v=1605323974", user_id: cher.id)
cami = Clothing.create(name: "Silk Cami", brand: "Lulu's", category: "tops", color: "Chartreuse", image: "https://www.lulus.com/images/product/xlarge/5422590_1022762.jpg?w=560", user_id: cher.id)
red_dress = Clothing.create(name: "Cowl Neck Slip Dress", brand: "UO", category: "dresses", color: "Red", image: "https://s7d5.scene7.com/is/image/UrbanOutfitters/49120231_063_f?$xlarge$=&fit=constrain&fmt=webp&qlt=80&wid=683", user_id: cher.id)
skirt = Clothing.create(name: "Pleated Mini Skirt", brand: "Romwe", category: "skirts", color: "Purple", image: "https://img.ltwebstatic.com/images3_pi/2019/11/27/15748376930dc40aa88a9597d05ad3502766664173_thumbnail_600x.jpg", user_id: cher.id)

