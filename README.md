News API
This is a Node.js API for fetching news articles from a public news API. The API includes basic methods for fetching N news articles, finding a news article with a specific title or author, and searching by keywords. A cache has also been implemented to improve performance by reducing the number of API calls.

Installation
To install the dependencies, run:

Copy code
npm install
Running the API
To start the server, run:

sql
Copy code
npm start
This will start the server on port 3000.

API Methods
GET /articles
This endpoint retrieves the latest news articles. You can specify the number of articles to retrieve using the limit query parameter. If no limit is provided, it will return 10 articles by default.

Example:

bash
Copy code
http://localhost:3000/articles?limit=5
GET /articles/search
This endpoint allows you to search for news articles by keyword. You can specify the keyword using the q query parameter. You can also specify the number of articles to retrieve using the limit query parameter. If no limit is provided, it will return 10 articles by default.

Example:

bash
Copy code
http://localhost:3000/articles/search?q=technology&limit=5
GET /articles/:title
This endpoint retrieves a news article with a specific title. You can specify the title of the article using the title parameter.

Example:

bash
Copy code
http://localhost:3000/articles/elon-musk-launches-new-spacex-rocket
GET /articles/author/:author
This endpoint retrieves news articles written by a specific author. You can specify the author using the author parameter.

Example:

bash
Copy code
http://localhost:3000/articles/author/jane-doe
Caching
This API uses the node-cache module to cache responses from the news API. The default cache duration is set to 5 minutes, but this can be configured in the config.js file.

Error Handling
If an error occurs while fetching news articles, the API will return a JSON response with an error property describing the error.

Contributing
Contributions are welcome! Please open an issue or pull request if you find any bugs or want to suggest new features.

License
This project is licensed under the MIT License.
