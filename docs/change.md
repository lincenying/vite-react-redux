# 变更记录

## 2026-05-23 12:00:00

### 改动内容

- 修正 `Window.$timeout` 类型：使用 `ReturnType<typeof window.setTimeout>`，消除与浏览器 `setTimeout` 返回值（`number`）的类型冲突

### Commit Message

```
fix: 修正 window.$timeout 的 setTimeout 返回类型
```

## 2026-05-23

### 改动内容

- 按 `.cursor/rules`（global-07-react）重组 `src` 目录：`api/`、`hooks/`、`utils/`、`types/`、`router/`、`layouts/`、`stores/*Slice.ts`
- 请求层迁移至 `utils/request.ts`，业务接口封装至 `api/articleApi.ts`，统一 `IApiResponse<T>` 类型
- 路由升级为 `createBrowserRouter` + `RouterProvider`，布局抽离为 `BasicLayout`
- 页面与组件改为 PascalCase：`TopicsPage`、`ArticlePage`、`NotFoundPage`、`Nav`
- Redux 异步改为 `createAsyncThunk`，移除 `react-router-redux`
- 消息提示由 toastr 改为 Ant Design `message`
- 新增 `.env.example`、`styles/antd-theme.ts`

### Commit Message

```
refactor: 按项目规范重组目录并升级路由与 API 分层
```
