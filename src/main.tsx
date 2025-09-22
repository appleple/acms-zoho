
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// DOM要素が存在するかチェック
let targetElement = document.getElementById('js-acms-zoho');

if (!targetElement) {
  // テーブルの外にReact用のコンテナdivを作成
  const table = document.getElementById('js-acms-zoho-link-field');
  if (table) {
    targetElement = document.createElement('div');
    targetElement.id = 'js-acms-zoho-container';
    targetElement.style.display = 'none'; // 非表示にする（dispatch処理のみ）
    table.parentNode?.insertBefore(targetElement, table);
  }
}

if (targetElement) {
  const root = ReactDOM.createRoot(targetElement);
  root.render(<React.StrictMode><App /></React.StrictMode>);
} else {
  console.error('No suitable DOM element found for React root');
}