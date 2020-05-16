# CS4011_project3_backend

1. API key and URL data must be stored in environment files.
 **see** the SAMPLE.env for how I have it set up.

2. Must have some method of authentication.
For authentication I went with Bearer tokens and I create them in **tokenRouter** which then they are checked by **tokenAuth**

3. Must make use of logging in some regard.
I used a logger to log inside of the index.js file.

4. Must allow for basic CRUD.
To make this easy to find I created a folder specifically called 'crud' where I created sub-folders named to represent which part of CRUD they were.

