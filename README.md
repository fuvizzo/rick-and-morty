# Playing with JWT (Json web token)

Actually I should have chosen a more detailed title since, in this project, I decided indeed to setup a basic JWT authentication/authorization system but I also chose to use docker and Typescript. 

Of course I've also used node.js (my favorite runtime environment) and MongoDb for data persistence (my favorite noSQL database).

I've been dusting off typescript since a while now (I used it first time some year ago in a Ionic/angular project and didn't undesrtand exactly that time wheather I was liking it or not).
Now that I've been used it more and more I'm starting appreciating it more and more as well.

Last but not the least I had also the chance to try and use finally the [***Awilix***](https://www.npmjs.com/package/awilix) library for DI and I had some fun with that.

## Project structure
The project is fully dockerized. I used 3 containers where I spun up the following services:
- MongoDb
- User-service
- Auth-service

Both the auth and user service use the [***jsonwebtoken***](https://www.npmjs.com/package/jsonwebtoken) library to perform authentication/authorization operations.

I referred mainly to this article to go through the jwt library and the way to use it:

[***Authentication and Authorization with JWTs in Express.js***](https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/)

Keeping on talking about security concerns, it's worth mentioning that user account passwords were encrypted before being stored in mongodb. Nobody wants for plain text password to be stored in a database, right?!?
I used [bcrypt](https://www.npmjs.com/package/bcrypt) library for that and that little friend caused me some really annoying issues with docker (I'll come on that later on...)

### The auth service
It's responsible for User authentication. I wrote some basic functionalities here.
The APIs provided are:
- sign-up
- sign-in
- sign-out
- token (used to emit a brand new accessToken making use of a valid refrehToken)

Both the sing-up and the sign-in methods are implemented to return a  _**{accessToken, refreshToken}**_ json response.

The _accessToken_ and the _refreshToken_ differ only for an expiration time I set on the former one when that is generated (_expiresIn_ property). Apart from that they both share the same body structure, something like this:

```json
{
    "userId": "abc123",
    "userName": "foo",
    "roles": ["Customer"]
}
```
###### Mongodb data models
#
| UserAccount| | |
| -------------- | ------------ | ------------- |
| _account_ | Object {}| | 
|| _email_| String |
||_password_ |String|
||_disabled_|Boolean|
||_roles_| Array[] (Values: Customer, Admin) |
| _basicInfo_ | Object {}| | 
||_firstName_| String |
||_lastName_ |String| 

| RefreshToken| |  
| -------------- | ------------ |
| _value_ | String| 

The refresh token mechanism was provided to solve a quite dangerous issue in terms of security:
 - If a never-expiring accessToken is stolen someway, whoever comes into possession of it will have access to the account forever and the actual user won't be able to revoke access.

### The user service
It allows an authenticated user to perform some actions on User data. Users, depending on the authorizations they own, can perform role (either Customer or Admin) based operation on the User repository.
For example users with _**Customer**_ role are only allowed to SELECT/EDIT/DELETE their own data whereas users with _**Admin**_ role can perform generic CRUD operations on any User data.

I used an express router to group all the "users" endpoints and I applied a middleware to perform the authentication operations I needed to.
Since I needed more fine-grained control for the authorization operations, I applied an authorization middleware directly to the endpoints I needed to authorize.

###### Mongodb data model
#
| User |||
| -------------- | ------------ |---------------- |
| _userId_|String||
| _phoneNumber_ |String| |  
| _address_ | Object {}| | 
|| _street_| String |
||_streetNumber_ |String|
||_zipCode_|Boolean|
||_city_|String|
||_country_| String |

I used the property ***userId*** here to store the reference id of the UserAccount created in the UserAccount repository (auth-service).

I deliberately went here for a ***"Subset Pattern"*** against the ***"Embedded Document"*** one for the following reason:

 - I wanted to keep data models of different micro-services completely separated to adhere to the ***"bounded context"*** principle. By doing that I gave more scalibility to the system. Everytime I need to manage UserAccount data I can do that freely by avoiding these from being polluted with extra unneeded, potentially growing in size, user info.
 
Of course the trade-off is I need to issue multiple queries to resolve the full reference.

More info here: 
[***MongoDB, Model One-to-One Relationships with Embedded Documents section***](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/)
 
# Environment variables

You have to create a **.env** file in the main directory of the project and specify the following _environment_ variables :

##### Express
- USER_SERVICE_LISTENING_PORT = 3000
- AUTH_SERVICE_LISTENING_PORT = 3001
##### JWT
- ACCESS_TOKEN_SECRET = <*secret string to encrypt access tokens*>
- REFRESH_TOKEN_SECRET = <*secret string to encrypt refresh tokens*>
- ENCRYPTION_SALT_ROUNDS = 10
- ACCESS_TOKEN_EXPIRATION_TIME=20m
##### MongoDB
- MONGO_URL = <*mongo db coonnection string*>
- MONGO_INITDB_ROOT_USERNAME = <*root username*>
- MONGO_INITDB_ROOT_PASSWORD = <*root password*>
- MONGO_INITDB_DATABASE = <*database name*>
- MONGO_INITDB_USERNAME = <*username*>
- MONGO_INITDB_PASSWORD = <*password*>
- MONGO_REPLICA_SET_NAME = rs0
##### Test specific env variables (Mongodb in-memory server)
- MONGOMS_DISABLE_POSTINSTALL=1
- MONGOMS_SYSTEM_BINARY = ../node_modules/.cache/mongodb-memory-server/mongodb-binaries/<*mongodb binaries version number*>/mongod  
 
## Setup
As I said at the beginning, the solution is entirely dockerized. 
What I struggled with was the intial setup, since I wanted to setup my development environment in a way I was able to debug my code while running it directly in a docker container. I was already able to achive that in the past but by using just javascript. 
With Typescript I knew things would have got more complicated.

I used the **docker-compose tool** to run my Docker application. In order to do that I created 2 separated configuartion files, _docker-compose.yml_ and _docker-compose.debug.yml_ to deal with the production and development stages of the project.

Both the ***auth*** and ***user*** services (see _auth-service_ and _user-service_ folders in my repo) are built up by docker according the directives of a specific ***Dockerfile*** stored in the corresponding folder.
In each Dockerfile 2 distinct set of commands to be executed, for  ***dev*** and ***prod***, are respectively defined. 

In each docker-compose config file,   ***dev*** and ***prod*** are referred as the value of the _target_ property of the _build_ section in the container definition of each service.

### The dev enviroment
In the _docker-compose.debug.yml_, for both _**auth**_ and _**user**_ service, I created volumes (_local bind-mounts_) to link the folder I developed the source code in to the corresponding container I was running (and debugging) the service in. 
Since the environemnt I host and develop my projects in is **Windows 10** and I use _wsl2_ to run docker in it natively, I had to deal with the  ***node_modules hassle*** (the nice way I like to address the problem). 
It was the **bcrypt** library that rang the bell when I realized that I could never make the same library that was working fine on Windows working on Linux as well (and the other way around). 
- "The core of this issue for Node.js is that node_modules can contain binaries compiled for your host OS, and if it's different than the container OS, you'll get errors trying to run your app when you're bind-mounting it from the host for development"

Thus I went for the solution described here ([***Top 4 Tactics To Keep Node.js Rockin’ in Docker***](https://www.docker.com/blog/keep-nodejs-rockin-in-docker/)), moved the node_modules folder up a directory and followed all the related instructions I read in the aforementioned article to manage to make it work. 

Before running the _docker-compose up_ command to spin up all the containers to work in development mode however I had to do something else more.

If we give a look to the _auth-service_ folder, more precisely to the ***package.json*** you can see that I used the following script:

```sh 
 "build:dev": "npm run tsc:dev"
```
to transpile my typescript code, using the corresponding ***tsconfig.json*** configuration file, and generating all the javascript code (in the _build_ folder) nodejs is capable to run.
Moreover the compiler runs in ***watch*** mode. This together with ***nodemon*** configured to watch the _build_ folder allowed me to automatically restart every node process as soon as I was making any change to my typescript code.

I did the same for the _user-service_.
Once each service folder had its own code transpiled in the _build_ folder (with the compiler running in watch mode) I finally ran the following command:

```sh
$ COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f docker-compose.debug.yml up
```

The ***COMPOSE_DOCKER_CLI_BUILD*** flag tells docker to use the **Buildkit** builder mode that allows the docker-compose tool to run only the commands addressed by the target _tag_ (**dev** in this case) in the Dockerfile(s).

##### ATTENTION:  
Remember **always** to run this command from the same folder where the docker-compose.yml or docker-compose.debug.yml is defined otherwise your environemnt variables won't be taken over!

------

One more thing is worth mentioning:

in the _docker-compose.debug.yml_, both the ***auth*** and ***user*** services, map host ports to container ports. In particular, besides the host/container port mapping for each Express server (ports 3000 and 3001) I've also defined one more mapping (ports 9228 and 9229).
That last port mapping is mandatory in order to allow any debugger process to be attached to any service running in its container.
When docker-compose finishes building any service container it runs what is written in the ***command*** property (i.e. _npm start_) meaning:

```sh 
  "start": "nodemon --inspect=0.0.0.0:9228"
```
for the ***auth-service*** or 
```sh 
  "start": "nodemon --inspect=0.0.0.0:9229"
```
for the ***user-service***.

In the ***.vscode*** folder there are a bunch of working (and some non working) configurations to attach debuggers to running node processes.

### Tests

There are both unit and integration tests provided for this project:

- testing framework: **Jest**

Run the following command from the main folder to run all the tests at once (for all the services):
```sh
$ npm run test:all
```

otherwise you can run tests directly from any service foder by running the following scripts
```sh
$ npm run test
$ npm run test:int 
```

Note:
Since I've used [mongodb-in-memory server](https://www.npmjs.com/package/mongodb-memory-server) to write integration tests for both services and that library is listed among the devDependencies of the package.json in the main folder, the binaries are in the .cache folder of the node_modules directory of the main folder as well. 

That means I had to specify in the .env file an environment variable with the _path to those binaries_ (i.e. MONGOMS_SYSTEM_BINARY) otherwise, running integration tests from within any service folder would have attempted to download the binaries once again and causing the tests to fail (due to Jest timeout exceeding).

In the ***.vscode*** folder there are 2 useful configurations to execute jest tests in debug mode.

### The prod enviroment
TODO

# TO-DO
- more test coverage
- provide swagger (OpenAPI) endpoint definitions
