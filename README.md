# Team Too

## Team Members
* UI Design Lead: Kim Zhang
* Team Lead: Cole Bemis
* API/DB Lead: Derek Lam
* Architect: Sujit Madiraju
* QA Lead: Gabriel Medina-Kim

## Team Information
* Motto: "Have it your way."
* Pizza Topping: Bacon, Pineapple, Sausage

## Team Links
* [Requirements Document [Google Drive]](https://docs.google.com/document/d/1HpaTuRBecx1ZbhxYL6glrHLT2Lg676OVGS2v6zB32JM/edit#)
* [Test Plan Document [Google Drive]](https://docs.google.com/spreadsheets/d/1-unNcLQL7Nr2V69aXBpQKMH-Uv7lJhNOD3K-V7wv5Ik/edit?usp=sharing)
* [Wireframes [Whimsical]](https://whimsical.co/PoJRJkUPFDgsKC8ksBceEN)
* [Routes Flowchart [Whimsical]](https://whimsical.co/RqhABsacE5yzYE2SvL85Rt)
* [Database Diagram [Whimsical]](https://whimsical.co/7PBV8ZYSoxCeq6V4dUw2Sz)
* [Mockups [Figma]](https://www.figma.com/file/PhGB8jF6dLpfQwqsv5IRfudi/Foxcycle)

## Project Setup

Follow these steps to set up and run the project locally:

> **Disclaimer:** Database queries and mutations are very slow and sometimes fail with the error "There are too many concurrent queries for this service." This is a recent issue with Prisma and is being tracked [here](https://www.prisma.io/forum/t/too-many-concurrent-queries/5103). 

> **Note:** This requires Node.js and npm to be set up locally
```shell
# Clone the project
git clone https://github.com/CSC307Fall2018/team-too.git

# Navigate to the `server` directory
cd team-too/server

# Install server dependencies
npm install

# Run API server locally
npm start

# API playground is now available on http://localhost:4000

### Open a new terminal session ###

# Navigate to `client` directory
cd path/to/team-too/client

# Install client dependencies
npm install

# Run frontend dev server locally
npm run serve

# Website is now available on http://localhost:8080
```

## Running Tests

### Client

```shell
# Navigate to `client` directory
cd path/to/team-too/client

# Run tests
npm run test:e2e

# This should open a cypress window. 
# Click on any of the tests to run them (ignore the examples directory).
```

### Server

```shell
# Navigate to `server` directory
cd path/to/team-too/server

# Run tests
npm run test
```

