## What
This is a quick Redis demo to try out the concept of caching.

## Why
Caching is very relevant for enhancing performance - by connecting to the cache, the response can be around 50-60x quicker!

## How
I have used express and axios to create endpoints for routing and make http requests. 
Redis is used to cache temporary data, in this example I have used the data of a post from a user. 
In this try-out I have demonstrated: 
- Setting data with key and value 
- Setting fake data from a user with post
- Getting specific data 
- Add an expiration so cached data will always be updated 
I have tested this and learned that by caching, the response time can be improved immensely (300ms -> 5ms). 
