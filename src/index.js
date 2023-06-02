import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import "./styles.css";

//** 리엑트 쿼리와 그래프 큐엘 같이 쓰는 예제 */

//? 설치한 라이브러리 
//? react-queryGraphQL API와 상호 작용하고 데이터를 검색할 수 있습니다.
//? react-router-dom앱에서 라우팅을 활성화합니다.
//? graphql에 대한 종속성입니다 graphql-request.
//? graphql-requestGraphQL 백엔드에서 데이터를 가져올 수 있습니다
//? react-markdownReact 앱에서 Markdown을 렌더링하는 데 도움이 됩니다.

/*
  useRequest.js. 
  RQ를 사용하여 TakeShape GraphQL API에서 데이터를 검색하는 사용자 지정 후크,
  API와 상호 작용하여 블로그 게시물을 가져오는 데 도움을 준다
  컴포넌트에서 RQ 훅을 생성해도 되나 반복을 피하기 위해 이처럼 사용자 정의훅으로 사용하는 것이 좋다
*/
const root = ReactDOM.createRoot(document.getElementById('root'));

// 1. queryClient 설정 
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    {/* 2. queryClientProvider wrap */}
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);