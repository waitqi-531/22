// 首页雨滴效果（可选）
document.addEventListener('DOMContentLoaded', () => {
  // 创建雨滴元素
  function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = `${Math.random() * 100}vw`;
    raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
    raindrop.style.opacity = Math.random() * 0.8 + 0.2;
    document.body.appendChild(raindrop);

    // 雨滴落地后移除
    setTimeout(() => {
      raindrop.remove();
    }, 2000);
  }

  // 循环创建雨滴
  setInterval(createRaindrop, 100);

  // 雨滴样式
  const style = document.createElement('style');
  style.textContent = `
    .raindrop {
      position: fixed;
      top: -10px;
      width: 1px;
      height: 20px;
      background-color: var(--light-blue);
      z-index: 0;
      animation: fall linear forwards;
    }

    @keyframes fall {
      to {
        transform: translateY(100vh);
      }
    }
  `;
  document.head.appendChild(style);
});