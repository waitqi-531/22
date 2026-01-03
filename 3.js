// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  // 获取DOM元素
  const commentInput = document.getElementById('comment-input');
  const submitBtn = document.getElementById('submit-btn');
  const commentList = document.getElementById('comment-list');
  const countNumber = document.getElementById('count-number');

  // 从本地存储加载评论
  let comments = JSON.parse(localStorage.getItem('aotComments')) || [];
  // 更新评论计数
  updateCommentCount();
  // 渲染评论列表
  renderComments();

  // 发表评论按钮点击事件
  submitBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    // 检查是否为空（包括全空格）
    if (!commentText) {
      showToast('写点什么吧！');
      return;
    }

    // 添加新评论
    comments.push(commentText);
    // 保存到本地存储
    localStorage.setItem('aotComments', JSON.stringify(comments));
    // 清空输入框
    commentInput.value = '';
    // 更新计数和列表
    updateCommentCount();
    renderComments();
  });

  // 输入框空格检测（仅输入空格时提示）
  commentInput.addEventListener('input', () => {
    const value = commentInput.value.trim();
    if (commentInput.value.length > 0 && value === '') {
      showToast('写点什么吧！');
    }
  });

  // 更新评论计数
  function updateCommentCount() {
    countNumber.textContent = comments.length;
  }

  // 渲染评论列表
  function renderComments() {
    // 清空列表
    commentList.innerHTML = '';
    // 遍历评论生成DOM
    comments.forEach((comment, index) => {
      const commentItem = document.createElement('div');
      commentItem.className = 'comment-item';
      commentItem.innerHTML = `
        <p class="comment-text">${comment}</p>
        <button class="delete-btn" data-index="${index}">删除</button>
      `;
      commentList.appendChild(commentItem);

      // 添加删除按钮事件
      const deleteBtn = commentItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        // 删除对应索引的评论
        comments.splice(index, 1);
        // 保存到本地存储
        localStorage.setItem('aotComments', JSON.stringify(comments));
        // 更新计数和列表
        updateCommentCount();
        renderComments();
      });
    });
  }

  // 显示提示框
  function showToast(message) {
    // 检查是否已有提示框
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    // 设置提示文本
    toast.textContent = message;
    // 显示提示框
    toast.classList.add('show');
    // 3秒后隐藏
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }
});