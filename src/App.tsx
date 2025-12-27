import React, { Suspense, useEffect } from 'react';
import {  Routes, Route } from "react-router-dom";
import Spinners from './common/components/Spinners';
import './App.css'
import useExchangeToken from './hooks/useExchangeToken';

const AppLayout = React.lazy(()=> import('./layout/AppLayout'));
const HomePage = React.lazy(()=> import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(()=> import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(()=> import('./pages/SearchPage/SearchWithKeywordPage'));
const PlaylistPage = React.lazy(()=> import('./pages/Playlist/PlaylistPage'))
const PlaylistDetailPage = React.lazy(()=> import('./pages/Playlist/PlaylistDetailPage'))

/* lazyLoading의 장점은 번들 사이즈 줄어들고 초기 로딩이 빨라진다.  */

//1. 홈페이지 /
//2. 서치 페이지 /search
//3. 서치 결과 페이지 /search/:keyword
//4. 플레이리스트 디테일 페이지 /playlist/:id
//5. [모바일 버전] 플레이리스트 보여주는 페이지 /playlist

const App = () => {

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');

  const {mutate :exchangeToken} = useExchangeToken();

  useEffect(()=>{
    if(code && codeVerifier){
      exchangeToken({code,codeVerifier});
    }
  },[code,codeVerifier,exchangeToken])

  return (
    <Suspense fallback={<div>{<Spinners/>}</div>}>

      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<AppLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='search' element={<SearchPage/>}/>
            <Route path='search/:keyword' element={<SearchWithKeywordPage/>}/>
            <Route path='playlist/:id' element={<PlaylistDetailPage/>}/>
            <Route path='playlist' element={<PlaylistPage/>}/>

          </Route>
        </Routes>
      {/* </BrowserRouter> */}
    </Suspense>
  );
};

export default App;