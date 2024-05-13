 <img src="https://readme-typing-svg.herokuapp.com/?lines=NextCMS&center=true&size=36" width='100%'>
 <center>nextcms@v1.0.0</center>
 
 ------


use `node_version >= 18`

install packages
```bash 
npm install
```
or
```bash
yarn
```

to create table and update prisma client
config .env
```env
DATABASE_URL="mysql://root:password@localhost:3306/next_cms"
```
```bash
npx prisma migrate dev
npx prisma generate 
```

and run development server
```bash
npm run dev
```

use `src/app/(web)/*` to develop more
```
src/
│
├── app/
│   ├── (admin)
│   ├── api/
│   ├── (web)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── resources.md

```
