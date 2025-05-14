# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.


حذف الملفات القديمة: إذا لم تكن قد فعلت ذلك بالفعل، قم بحذف الملفات الخاصة بـ Next.js والتي لم نعد بحاجة إليها:
next.config.ts
src/app/layout.tsx (تم استبدال وظيفته بـ src/App.tsx و index.html)
src/app/page.tsx (تم استبدال وظيفته بـ src/App.tsx)
تثبيت الاعتماديات: افتح الطرفية (terminal) في مجلد المشروع وقم بتشغيل npm install (أو yarn install إذا كنت تستخدم Yarn). هذا سيقوم بتحديث node_modules بناءً على التغييرات في package.json.
تشغيل خادم التطوير: بعد تثبيت الاعتماديات، قم بتشغيل npm run dev (أو yarn dev) لبدء خادم Vite ومعاينة التطبيق.