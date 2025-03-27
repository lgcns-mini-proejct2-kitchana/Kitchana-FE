import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoginPage from '@/pages/LoginPage';
import JoinPage from '@/pages/JoinPage';
import MyPickPage from '@/pages/MyPickPage';
import HomePage from '@/pages/HomePage';
import KitchaPage from '@/pages/KitchaPage';
import RandomPage from '@/pages/RandomPage';
import UploadPage from '@/pages/UploadPage';
import NewsListPage from '@/pages/NewsListPage';
import NewsDetailPage from '@/pages/NewsDetailPage';
import BoardListPage from '@/pages/BoardListPage';
import BoardDetailPage from '@/pages/BoardDetailPage';
import WritePage from '@/pages/WritePage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<Layout />}>
          <Route path="/join" element={<JoinPage />} />
          <Route path="/mypick" element={<MyPickPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/kitcha" element={<KitchaPage />} />
          <Route path="/random" element={<RandomPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:newsId" element={<NewsDetailPage />} />
          <Route path="/board" element={<BoardListPage />} />
          <Route path="/board/:boardId" element={<BoardDetailPage />} />
          <Route path="/board/write" element={<WritePage />} />
          <Route path="/board/edit/:boardId" element={<WritePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
