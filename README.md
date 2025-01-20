# Business management app

Live: https://business-mgmt.netlify.app/

> The first API promise might take a bit longer to resolve because the backend is hosted on a free web service on Render.com. Thank you for your understanding.

---

### ✨ Project description

The application helps users manage their business and monitor expenses. It emphasizes data analysis and editing. Key functionalities include filtering, sorting, setting record limits, and pagination.

---

### 🙌 What’s easy to overlook but helps fully appreciate the project?

- `useAsyncPagination` - A custom hook for handling filters (add, replace, delete, reset) and sorting data from the API, providing an effortless experience.
- `useModalMode` - A single hook managing the state, content, and functionality of modals.
- `InnerTableWrapper` - A component ensuring that nested tables are responsive and maintain appropriate widths.
- Extensive configuration of `MUI` in the `theme` folder.
- Enhanced backend - built on `json-server` with custom modifications for added functionality.
- Redux logic utilizing `RTK Query` for API communication and `redux-persist` for storing the state in localStorage.
- Project scale, considering it was developed by a single person.

---

### Technologies

```
React
TypeScript
Redux Toolkit / RTK Query
MUI
Formik
Node.js / Express / json-server
```

---
