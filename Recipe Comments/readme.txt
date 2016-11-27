

In this lab, it contains: 
   config folder: set Mongodb Collections, contains mongoCollections.js and mongoConnection.js
   data folder:   set comments and recipes module functions, contains index.js, comments.js and recipes.js
   routes folder: set server options, contains index.js, comments.js and recipes.js
   tasks folder:  send seed to mongodb database, contains seed.js
   app.js file:   start jsfile, to start npm
   package.json file:  set npm params

You can use postman to GET, POST, PUT, DELETE the information in lab5_recipes database.



For Recipe routes
    GET    /recipes        : http://localhost:3000/recipes/
			     return like this:
			     [
  {
    "_id": "2a97c55a-312e-44b0-a005-3777d56060b5",
    
				     "title": "Fried Eggs"
  },
  
				{
    "_id": "c085fe41-29cd-4992-9a3f-601238744c04",
    
				     "title": "Sky High Yorkshire Pudding"
  }
]

    GET    /recipes/:id    : http://localhost:3000/recipes/:id
			     return all detail information for this id recipes

    POST   /recipes        : http://localhost:3000/recipes/
			     You need to post the full information of a new recipes, it should contains:
			     "title", "ingredients", "steps", "comments", it should be like this:
			     {
	"title": "Sky High Yorkshire Pudding",
	
				"ingredients": [
		
				{
			
					"name": "Egg",
			
					"amount": "4 eggs"
		
				},
		
			      ],
	
				"steps": [
		
					"Preheat the oven to 450 degrees F (230 degrees C)",
		
					"Bake for 30 to 35 minutes in the preheated oven. Serve immediately"
	
				],
	
				"comments": []
}

    PUT    /recipes/:id    : http://localhost:3000/recipes/:id
			     You could update specified recipe with only supplied changes
			     ("title","ingredients","steps")

    DELETE /recipes/:id    : if it shows OK, means delete successfully

For Comments routes
    GET    /comments/recipe/:recipeId     : http://localhost:3000/comments/recipe/:recipeId
					    return the comment list under this recipeId recipes, like this:
					    [
  {
    "_id": "d0896a35-1620-4a2a-b4f8-cf429c4a8faf",

						    "recipeId": "2a97c55a-312e-44b0-a005-3777d56060b5",
 
						    "recipeTitle": "Fried Eggs",
    
						    "name": "These eggs are delicious!",
    
						    "poster": "Gordan Ramsay"
  } ]
 

    GET    /comments/:commentId           : http://localhost:3000/comments/:commentId
					    returns the comment specified by that commentId in the format like this:
					    {
    "_id": "d0896a35-1620-4a2a-b4f8-cf429c4a8faf",

						 "recipeId": "2a97c55a-312e-44b0-a005-3777d56060b5",
 
						 "recipeTitle": "Fried Eggs",
    
						 "name": "These eggs are delicious!",
    
				                 "poster": "Gordan Ramsay"
  }  		

    POST   /comments/:recipeId		  : http://localhost:3000/comments/:recipeId
					    post the full information of a comment, contains "poster", "comment"
					    {
	"poster": "John",
	"comment": "This cooking is amazing!"
}
					    and returns a new comment:
					    {
  "_id": "af8fa117-abe9-4154-b15b-6342c4ce6381",
  
					       "recipeId": "2a97c55a-312e-44b0-a005-3777d56060b5",
  
					       "recipeTitle": "Fried Eggs",
  
					       "name": "This cooking is amazing!",
  
					       "poster": "John"
}

    PUT    /comments/:recipeId/:commentId : http://localhost:3000/comments/:recipeId/:commentId
					    update a specified commentid comment of a recipeid recipe 
					    after you set your recipeId and commentId in the website
					    you can chage the filed : "poster"   "comment"
    					    like you update: {"comment": "hhhhhhhhhhhhhh"
}
					    return the current update comment:
					    {
  "_id": "54f06153-883d-4fa9-847d-8a895b1015a7",
  
					       "recipeId": "2a97c55a-312e-44b0-a005-3777d56060b5",
  
					       "recipeTitle": "Fried Eggs",
  
					       "name": "hhhhhhhhhhhhhh",
 
					       "poster": "John"
}

    DELETE /comments/:id    : if it shows OK, means comment delete successfully, both in recipe and comment database

In comments routes, once you POST, PUT, DELETE, after you clike the operation button("PUT","POST","DELETE")
both our recipe and comment databse will update at the meantime. 
					    will update the info you input
