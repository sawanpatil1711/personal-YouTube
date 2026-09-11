# YouTube Clone Frontend Notes

## Phase 1: Project Setup

### Installed Dependencies

```bash
npm install axios
npm install react-router-dom
npm install react-redux @reduxjs/toolkit
npm install react-hook-form
npm install react-hot-toast
npm install react-icons
```

### Environment Variables

Created:

`.env`

```env
VITE_API_URL=http://localhost:3000/api/v1
```

### Axios Configuration

Created:

```js
// src/api/axios.js

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export default api;
```

### Why `withCredentials`

Our backend uses:

```js
.cookie("accessToken", ...)
.cookie("refreshToken", ...)
```

Cookies are automatically sent and received by the browser.

We do NOT store JWTs in localStorage.

---

# Phase 2: React Router Setup

Created:

```text
src/
├── routes/
│   └── AppRoutes.jsx
│
├── pages/
│   ├── Login.jsx
│   └── Register.jsx
```

Configured:

```jsx
<BrowserRouter>
    <App />
</BrowserRouter>
```

Created routes:

```jsx
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
```

---

# Error #1: Blank White Screen

## Symptom

Application loaded but displayed a blank page.

No visible UI.

---

## Root Cause

Import/export mismatch.

Error:

```text
The requested module '/src/page/Register.jsx'
does not provide an export named 'default'
```

---

## Wrong

```jsx
export const Register = () => {
    return <h1>Register</h1>;
}
```

Imported as:

```jsx
import Register from "../page/Register";
```

---

## Fix

Either:

```jsx
export default Register;
```

or

```jsx
import { Register } from "../page/Register";
```

Export and import must match.

---

# Error #2: Main.jsx Not Rendering

## Symptom

Even:

```jsx
<h1>Hello</h1>
```

did not appear.

---

## Investigation

Checked:

```bash
tree src /F
```

Verified:

```text
main.jsx
App.jsx
```

exist.

---

## Learning

When React shows a blank page, always inspect:

```text
Browser Console (F12)
```

The console revealed the actual error.

The browser console is often more useful than the terminal.

---

# Error #3: CORS Error

## Symptom

Login request failed.

Error:

```text
Access-Control-Allow-Origin
must not be '*'
when credentials mode is 'include'
```

---

## Root Cause

Frontend used:

```js
withCredentials: true
```

Backend used:

```js
origin: "*"
```

This combination is not allowed.

---

## Fix

Backend:

```js
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
```

Environment variable:

```env
CORS_ORIGIN=http://localhost:5173
```

---

# Redux Setup

Created:

```text
src/
├── app/
│   └── store.js
│
└── features/
    └── auth/
        └── authSlice.js
```

Store:

```js
configureStore({
    reducer: {
        auth: authReducer
    }
})
```

Auth state:

```js
{
    user: null,
    isAuthenticated: false
}
```

---

# React Hook Form

Installed:

```bash
npm install react-hook-form
```

Used:

```js
const {
    register,
    handleSubmit
} = useForm();
```

Registered fields:

```jsx
<input {...register("email")} />
<input {...register("password")} />
```

Submission:

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
```

---

# Learning: React Hook Form vs Express

Backend:

```js
req.body.email
req.body.password
```

Frontend:

```js
{
    email: "...",
    password: "..."
}
```

React Hook Form automatically builds this object.

---

# Login Service Layer

Created:

```js
// authService.js

export const loginUser = async (data) => {
    const response = await api.post(
        "/users/login",
        data
    );

    return response.data;
}
```

---

# Login API Success

Received:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "user": {},
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

Backend also successfully set:

```text
accessToken cookie
refreshToken cookie
```

---

# Important Security Learning

Current backend:

```js
{
    user,
    accessToken,
    refreshToken
}
```

while also setting cookies.

Production recommendation:

```js
{
    user
}
```

and keep tokens only in HTTP-only cookies.

This prevents JavaScript from accessing JWTs.

---

# Current Project Status

Completed:

✅ Vite Setup

✅ Tailwind Setup

✅ Axios Setup

✅ Environment Variables

✅ React Router

✅ Redux Store

✅ Auth Slice

✅ React Hook Form

✅ Login Form

✅ Backend Connection

✅ Cookie Authentication

✅ CORS Configuration

Next:

➡ Dispatch User To Redux

➡ Protected Routes

➡ Current User API

➡ Register Page

➡ Home Feed

➡ Video Watch Page

➡ Upload Video
