# Recur Flow API

## Development

### (I): Typescript and Express Initialization

#### Initialize npm (creates a package.json file)
```
npm init -y
```

#### Install Dependencies (dev also)
```
npm install cors dotenv express

npm install --save-dev typescript tsx @types/cors @types/express @types/node
```

#### Initialize typescript (creates a tsconfig.json file)
```
npx tsc --init 
```

### (II): Prisma Initialization

#### Install Prisma
```
npm install @prisma/client@7 @prisma/adapter-neon

npm install --save-dev prisma@7
```

#### Initialize Prisma
```
npx prisma init
```